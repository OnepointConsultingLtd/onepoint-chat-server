import WebSocket from 'isomorphic-ws';
import { useEffect, useRef } from 'react';
import { MessageEvent } from 'ws';
import { useShallow } from 'zustand/react/shallow';
import { messageFactoryAgent, messageFactoryUser } from '../lib/messageFactory';
import { getConversationId, markChatAsActive, saveConversationId } from '../lib/persistence';
import { createWebSocket, sendMessage, sendPing } from '../lib/websocket';
import useChatStore from '../store/chatStore';
import { Message, ServerMessage } from '../type/types';
import { formatChatHistory, fetchRawHistory } from '../utils/fetchChatHistory';

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

  const wsRef = useRef<WebSocket | null>(null);
  const wsOpen = useRef<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const currentConversationId = useRef<string | null>(null);
  const hasInitialized = useRef<boolean>(false);
  const messageQueue = useRef<{ text: string }[]>([]);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch chat history from the server
  async function loadChatHistory(conversationId: string): Promise<ServerMessage[]> {
    const rawHistory = await fetchRawHistory(conversationId);
    const formattedMessages = await formatChatHistory(conversationId, rawHistory);
    if (formattedMessages && formattedMessages.length > 0) {
      setMessages(formattedMessages);
      currentConversationId.current = conversationId;
      markChatAsActive();
      hasInitialized.current = true;
    }
    return rawHistory;
  }

  const initializeChat = () => {
    if (!hasInitialized.current && currentConversationId.current) {
      markChatAsActive();
      saveConversationId(currentConversationId.current);
      hasInitialized.current = true;
    }
  };

  const setupWebSocket = () => {
    if (window.barrier) return;
    console.info('Setting up WebSocket connection');
    window.barrier = true;

    wsRef.current = createWebSocket();
    const ws = wsRef.current;

    ws.onopen = async () => {
      console.info('WebSocket connection opened');
      wsOpen.current = true;

      // Start ping interval to keep connection alive (every 5 minutes)
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
      console.info('[PING] Starting ping interval - will send keep-alive every 5 minutes');
      pingIntervalRef.current = setInterval(() => {
        if (wsRef.current && wsOpen.current) {
          sendPing(wsRef.current, currentConversationId.current || '');
        }
      }, 5 * 60 * 1000);
    };


    const updateLastMessage = (messages: Message[], updater: (msg: Message) => Message): Message[] => {
      if (!messages.length) return messages;
      const updated = updater({ ...messages[messages.length - 1] });
      return [...messages.slice(0, -1), updated];
    }

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
              setMessages((prev: Message[]) =>
                updateLastMessage(prev, (msg) => ({
                  ...msg,
                  id: message.message.id,
                }))
              );
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
      setIsStreaming(false);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      wsOpen.current = false;
      setIsStreaming(false);

      // Clear ping interval
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
        pingIntervalRef.current = null;
        console.info('[PING] Stopped ping interval due to connection close');
      }

      // Attempt to reconnect after 3 seconds
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      reconnectTimeoutRef.current = setTimeout(() => {
        console.info('Attempting to reconnect WebSocket...');
        window.barrier = false;
        setupWebSocket();
      }, 3000);
    };
  };

  useEffect(() => {
    setupWebSocket();
    return () => {
      const socket = wsRef.current;
      if (socket && socket.readyState === WebSocket.OPEN && wsOpen.current) {
        socket.close();
      }

      // Clean up timers
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
        pingIntervalRef.current = null;
        console.info('[PING] Stopped ping interval due to component unmount');
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [isRestarting]);

  useEffect(() => {
    if (isThinking) {
      scrollToBottom();
    }
  }, [messages, isThinking]);

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
