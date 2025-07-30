import WebSocket from 'isomorphic-ws';
import { useEffect, useRef } from 'react';
import { MessageEvent } from 'ws';
import { useShallow } from 'zustand/react/shallow';
import { messageFactoryAgent, messageFactoryUser } from '../lib/messageFactory';
import { getConversationId, markChatAsActive, saveConversationId } from '../lib/persistence';
import { createWebSocket, sendMessage } from '../lib/websocket';
import useChatStore from '../store/chatStore';
import { Message, ServerMessage } from '../type/types';
import { fetchChatHistory, fetchRawHistory } from '../utils/fetchChatHistory';

export function useChat() {
  const { messages, isThinking, setMessages, setIsThinking, isRestarting, isStreaming, setIsStreaming, setIsSidebarOpen, handleTopicAction, setEditHandler } =
    useChatStore(
      useShallow(state => ({
        messages: state.messages,
        isThinking: state.isThinking,
        setMessages: state.setMessages,
        setIsThinking: state.setIsThinking,
        isRestarting: state.isRestarting,
        isStreaming: state.isStreaming,
        setIsStreaming: state.setIsStreaming,
        setIsSidebarOpen: state.setIsSidebarOpen,
        handleTopicAction: state.handleTopicAction,
        setEditHandler: state.setEditHandler,
      }))
    );

  const wsRef = useRef<WebSocket | null>(null);
  const wsOpen = useRef<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const currentConversationId = useRef<string | null>(null);
  const hasInitialized = useRef<boolean>(false);
  const messageQueue = useRef<{ text: string }[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch chat history from the server
  async function loadChatHistory(conversationId: string): Promise<ServerMessage[]> {
    const rawHistory = await fetchRawHistory(conversationId);
    const formattedMessages = await fetchChatHistory(conversationId, rawHistory);
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
              lastMessage.text += message.chunk;
              return [...prev.slice(0, -1), lastMessage];
            });
            break;
          case 'stream-end':
            setIsThinking(false);
            setIsStreaming(false);
            if (message.subType === 'streamEndError') {
              setMessages((prev: Message[]) => [...prev, messageFactoryAgent(message.message)]);
            }
            break;
          case 'message':
            setIsThinking(false);
            console.log('This is the message in the useChat hook: ', message);
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
    };
  };

  useEffect(() => {
    setupWebSocket();
    return () => {
      const socket = wsRef.current;
      if (socket && socket.readyState === WebSocket.OPEN && wsOpen.current) {
        socket.close();
      }
    };
  }, [isRestarting]);

  useEffect(() => {
    if (isThinking) {
      scrollToBottom();
    }
  }, [messages, isThinking]);

  const sendMessageToServer = (text: string, isEdit: boolean = false) => {
    if (!text.trim() || !wsRef.current) return;

    if (!currentConversationId.current) {
      messageQueue.current.push({ text: text.trim() });
      sendMessage(wsRef.current, 'request-conversation-id', '', '');
      return;
    }

    setIsThinking(true);

    // Only create a new user message if this is not an edit
    if (!isEdit) {
      const userMessage: Message = messageFactoryUser(text, currentConversationId.current);
      setMessages((prev: Message[]) => [...prev, userMessage]);
    }

    sendMessage(wsRef.current, 'message', text, currentConversationId.current);
    setIsSidebarOpen(false);
    if (!hasInitialized.current) {
      initializeChat();
    }
  };

  const handleSubmit = (text: string) => {
    sendMessageToServer(text);
    handleTopicAction({ type: 'manual', text });
  };

  // Handle message editing and regeneration
  const handleEditMessage = (_messageId: string, newText: string) => {
    console.log('handleEditMessage called with:', { _messageId, newText });
    sendMessageToServer(newText, true); // Pass isEdit=true to prevent duplicate user message
  };

  // Set up the edit handler
  useEffect(() => {
    setEditHandler(handleEditMessage);
  }, [setEditHandler]);

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
