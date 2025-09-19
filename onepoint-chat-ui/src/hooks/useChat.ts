import WebSocket from 'isomorphic-ws';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MessageEvent } from 'ws';
import { useShallow } from 'zustand/react/shallow';
import { messageFactoryAgent, messageFactoryUser } from '../lib/messageFactory';
import { getConversationId, markChatAsActive, saveConversationId } from '../lib/persistence';
import { createWebSocket, sendMessage } from '../lib/websocket';
import useChatStore from '../store/chatStore';
import { Message, ServerMessage } from '../type/types';
import { fetchRawHistory, formatChatHistory } from '../utils/fetchChatHistory';

export function useChat() {
  const { messages, isThinking, setMessages, setIsThinking, isRestarting, isStreaming, setIsStreaming, handleTopicAction, setIsSidebarOpen } =
    useChatStore(
      useShallow(state => ({
        messages: state.messages,
        isThinking: state.isThinking,
        setMessages: state.setMessages,
        setIsThinking: state.setIsThinking,
        isRestarting: state.isRestarting,
        isStreaming: state.isStreaming,
        setIsStreaming: state.setIsStreaming,
        handleTopicAction: state.handleTopicAction,
        setIsSidebarOpen: state.setIsSidebarOpen,
      }))
    );

  const [connectionLost, setConnectionLost] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const wsOpen = useRef<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const currentConversationId = useRef<string | null>(null);
  const hasInitialized = useRef<boolean>(false);
  const messageQueue = useRef<{ text: string }[]>([]);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateLastMessage = (messages: Message[], updater: (msg: Message) => Message): Message[] => {
    if (!messages.length) return messages;
    const updated = updater({ ...messages[messages.length - 1] });
    return [...messages.slice(0, -1), updated];
  };

  // Fetch reference sources for a specific message
  const fetchReferenceSources = async (conversationId: string, messageId: string) => {
    try {
      const response = await fetch(`${window.oscaConfig.httpUrl}/api/chat/${conversationId}/message/${messageId}/references`);
      if (!response.ok) return;

      const data = await response.json();
      if (data.referenceSources && data.referenceSources.length > 0) {
        // Update the message with reference sources
        setMessages((prev: Message[]) =>
          updateLastMessage(prev, (msg) => ({
            ...msg,
            referenceSources: data.referenceSources,
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching reference sources:', error);
    }
  };

  // Fetch chat history from the server
  const loadChatHistory = useCallback(async (conversationId: string): Promise<ServerMessage[]> => {
    const rawHistory = await fetchRawHistory(conversationId);
    const formattedMessages = await formatChatHistory(conversationId, rawHistory);
    if (formattedMessages && formattedMessages.length > 0) {
      setMessages(formattedMessages);
      currentConversationId.current = conversationId;
      markChatAsActive();
      hasInitialized.current = true;
    }
    return rawHistory;
  }, [setMessages]);

  const initializeChat = () => {
    if (!hasInitialized.current && currentConversationId.current) {
      markChatAsActive();
      saveConversationId(currentConversationId.current);
      hasInitialized.current = true;
    }
  };

  const setupWebSocket = useCallback(() => {
    if (window.barrier) return;
    console.info('Setting up WebSocket connection');
    window.barrier = true;

    wsRef.current = createWebSocket();
    const ws = wsRef.current;

    ws.onopen = async () => {
      console.info('WebSocket connection opened');
      wsOpen.current = true;
      startHeartbeat();
    };

    // Heartbeat mechanism to keep connection alive
    const startHeartbeat = () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }

      heartbeatIntervalRef.current = setInterval(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          const heartbeatTimestamp = new Date().toISOString();
          console.info(`Sending WebSocket heartbeat at ${heartbeatTimestamp}`);
          ws.send(JSON.stringify({
            type: 'heartbeat',
            timestamp: heartbeatTimestamp
          }));
        }
      }, 100000); // 10 minutes interval (10 * 60 * 1000 = 600000ms)
    };

    const stopHeartbeat = () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
        heartbeatIntervalRef.current = null;
      }
    };



    ws.onmessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data.toString());
        switch (message.type) {
          case 'stream-start':
            setIsThinking(true);
            setIsStreaming(true);
            break;
          case 'stream-chunk':
            setIsThinking(false);
            setMessages((prev: Message[]) => {
              const lastMessage = { ...prev[prev.length - 1] };
              if (!lastMessage || lastMessage.type !== 'agent') {
                return [...prev, messageFactoryAgent(message.chunk)];
              }
              return updateLastMessage(prev, (msg) => ({
                ...msg,
                text: msg.text + message.chunk,
              }));
            });
            break;
          case 'stream-end':
            setIsThinking(false);
            setIsStreaming(false);
            if (message.subType === 'streamEndError') {
              setMessages((prev: Message[]) => [...prev, messageFactoryAgent(message.message)]);
            } else {
              // Update message with ID and fetch reference sources
              setMessages((prev: Message[]) =>
                updateLastMessage(prev, (msg) => ({
                  ...msg,
                  id: message.message.id,
                }))
              );

              // Fetch reference sources for this message
              if (message.message.id && currentConversationId.current) {
                fetchReferenceSources(currentConversationId.current, message.message.id);
              }
            }
            break;
          case 'message':
            setIsThinking(false);
            setMessages((prev: Message[]) => [
              ...prev,
              messageFactoryAgent(message.message.content),
            ]);
            break;
          case 'conversation-id': {
            const { conversationId } = message;
            const lastConversationId = getConversationId();
            if (lastConversationId !== conversationId) {
              currentConversationId.current = conversationId;
              saveConversationId(conversationId);
              if (conversationId && lastConversationId) {
                // Here we should send a request to the server to get the chat history and
                // also to prefill the history of the new session on the server and client
                loadChatHistory(lastConversationId)
                  .then((serverMessages: ServerMessage[]) => {
                    if (!serverMessages || serverMessages?.length === 0) {
                      return;
                    }
                    if (wsRef.current) {
                      sendMessage(
                        wsRef.current,
                        'import-history',
                        { history: serverMessages },
                        conversationId
                      );
                    }
                  })
                  .catch(error => {
                    console.error('Error loading chat history:', error);
                  });
              }
            }
            break;
          }
          default:
            break;
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.onerror = error => {
      console.error('WebSocket error:', error);
      const errorMessage: Message = messageFactoryAgent(
        `Connection error: Unable to connect to server`
      );
      setMessages((prev: Message[]) => [...prev, errorMessage]);
      setIsStreaming(false);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      const closeMessage: Message = messageFactoryAgent('Connection closed');
      setMessages((prev: Message[]) => [...prev, closeMessage]);
      wsOpen.current = false;
      setIsStreaming(false);
      stopHeartbeat();
      setConnectionLost(true);
    };
  }, [setIsThinking, setIsStreaming, setMessages, loadChatHistory]);

  useEffect(() => {
    setupWebSocket();
    return () => {
      const socket = wsRef.current;
      if (socket && socket.readyState === WebSocket.OPEN && wsOpen.current) {
        socket.close();
      }
      // Clean up heartbeat interval
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
    };
  }, [isRestarting, setupWebSocket]);

  useEffect(() => {
    if (isThinking) {
      scrollToBottom();
    }
  }, [messages, isThinking]);

  // Auto-reload page when connection is lost
  useEffect(() => {
    if (connectionLost) {
      console.log('Connection lost - reloading page in 2 seconds...');
      const timer = setTimeout(() => {
        window.location.reload();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [connectionLost]);

  const sendMessageToServer = (text: string) => {
    if (!text.trim() || !wsRef.current) return;
    setIsSidebarOpen(false);
    if (!currentConversationId.current) {
      messageQueue.current.push({ text: text.trim() });
      sendMessage(wsRef.current, 'request-conversation-id', '', '');
      return;
    }

    setIsThinking(true);
    const userMessage: Message = messageFactoryUser(text, currentConversationId.current);
    setMessages((prev: Message[]) => [...prev, userMessage]);
    sendMessage(wsRef.current, 'message', text, currentConversationId.current);
    if (!hasInitialized.current) {
      initializeChat();
    }
  };

  const handleSubmit = (text: string) => {
    sendMessageToServer(text);
    handleTopicAction({ type: 'manual', text });
  };


  return {
    messages,
    messagesEndRef,
    handleSubmit,
    sendMessageToServer,
    isThinking,
    isRestarting,
    isStreaming,
  };
}
