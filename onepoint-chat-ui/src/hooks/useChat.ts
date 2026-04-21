import WebSocket from 'isomorphic-ws';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MessageEvent } from 'ws';
import { useAuth } from '@clerk/clerk-react';
import { useShallow } from 'zustand/react/shallow';
import { messageFactoryAgent, messageFactoryUser } from '../lib/messageFactory';
import { clearChatData, getConversationId, markChatAsActive, saveConversationId } from '../lib/persistence';
import { oscaTenantHeaders } from '../lib/resolveOscaConfig';
import { createWebSocket, sendMessage } from '../lib/websocket';
import { useUserContext } from './useUserContext';
import useChatStore from '../store/chatStore';
import { Message, ServerMessage } from '../type/types';
import { fetchRawHistory, formatChatHistory } from '../utils/fetchChatHistory';

export function useChat() {
  const { getToken } = useAuth();
  const { userId, anonymousId } = useUserContext();
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
  const reloadAttemptedRef = useRef(false);

  const wsRef = useRef<WebSocket | null>(null);
  const wsOpen = useRef<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const currentConversationId = useRef<string | null>(null);
  const hasInitialized = useRef<boolean>(false);
  const messageQueue = useRef<{ text: string }[]>([]);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Restore conversationId from localStorage on mount
  useEffect(() => {
    const savedConversationId = getConversationId();
    if (savedConversationId) {
      if (userId) {
        // User is logged in - restore their conversationId
        // The Header component will handle clearing anonymous conversationId when user logs in
        console.log(`[useChat] User is logged in (userId: ${userId}), restoring conversationId: ${savedConversationId}`);
        currentConversationId.current = savedConversationId;
      } else if (anonymousId) {
        // User is anonymous - safe to restore
        console.log(`[useChat] Restoring anonymous conversationId: ${savedConversationId}`);
        currentConversationId.current = savedConversationId;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount - userId/anonymousId will be checked when they change

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateLastMessage = (messages: Message[], updater: (msg: Message) => Message): Message[] => {
    if (!messages.length) return messages;
    const updated = updater({ ...messages[messages.length - 1] });
    return [...messages.slice(0, -1), updated];
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

  const fetchReferenceSources = useCallback(async (conversationId: string, messageId: string) => {
    try {
      const response = await fetch(`${window.oscaConfig.httpUrl}/api/chat/${conversationId}/message/${messageId}/references`, {
        headers: oscaTenantHeaders(),
      });
      if (!response.ok) return;

      const data = await response.json();
      if (data.referenceSources && data.referenceSources.length > 0) {
        setMessages((prev: Message[]) =>
          prev.map((m) =>
            (m.id === messageId || m.messageId === messageId)
              ? { ...m, referenceSources: data.referenceSources }
              : m
          )
        );
      }
    } catch (error) {
      console.error('Error fetching reference sources:', error);
    }
  }, [setMessages]);

  const setupWebSocket = useCallback(() => {
    // Check if WebSocket already exists and is connected/connecting
    const existingSocket = wsRef.current;
    if (existingSocket) {
      const state = existingSocket.readyState;
      if (state === WebSocket.OPEN || state === WebSocket.CONNECTING) {
        console.warn(`WebSocket already exists (state: ${state}), skipping setup`);
        return;
      }
      // Close existing socket if it's in closing or closed state
      if (state === WebSocket.CLOSING || state === WebSocket.CLOSED) {
        console.info('Cleaning up old WebSocket before creating new one');
        wsRef.current = null;
      }
    }

    if (window.barrier) {
      console.warn('WebSocket setup barrier is active, skipping...');
      return;
    }
    
    // Check if WebSocket URL is configured
    if (!window.oscaConfig?.websocketUrl) {
      console.error('WebSocket URL not configured');
      return;
    }
    
    console.info('Setting up new WebSocket connection');
    window.barrier = true;

    try {
      wsRef.current = createWebSocket(userId, anonymousId);
    } catch (error) {
      console.error('Failed to create WebSocket:', error);
      window.barrier = false;
      return;
    }

    const ws = wsRef.current;

    ws.onopen = async () => {
      console.info('WebSocket connection opened');
      wsOpen.current = true;
      window.barrier = true; // Keep barrier true while connected
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
      }, 600000); // 10 minutes
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
                  // Persist both ids to the backend-assigned message id.
                  // Thread share API expects chatHistory.messageId from Mongo.
                  id: message.message.id,
                  messageId: message.message.id,
                }))
              );

              // Fetch reference sources for this message
              if (message.message.id && currentConversationId.current) {
                fetchReferenceSources(currentConversationId.current, message.message.id);
              }
            }
            break;
          case 'message': {
            setIsThinking(false);
            const welcome =
              message.welcome === true ||
              (message.message && typeof message.message === 'object' && message.message.isWelcome === true);
            setMessages((prev: Message[]) => [
              ...prev,
              messageFactoryAgent(message.message.content, { isWelcome: welcome }),
            ]);
            break;
          }
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
                        conversationId,
                        { userId, anonymousId }
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

    ws.onclose = (event) => {
      console.log('WebSocket connection closed', event.code, event.reason);
      wsOpen.current = false;
      setIsStreaming(false);
      stopHeartbeat();
      
      // Only set connection lost if it was an unexpected close (not a normal close)
      // Code 1000 = normal closure, 1001 = going away
      if (event.code !== 1000 && event.code !== 1001) {
        const closeMessage: Message = messageFactoryAgent('Connection closed');
        setMessages((prev: Message[]) => [...prev, closeMessage]);
        setConnectionLost(true);
      } else {
        // Normal closure - reset barrier to allow reconnection
        window.barrier = false;
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      // Don't set connectionLost on error - let onclose handle it
    };
  }, [setIsThinking, setIsStreaming, setMessages, loadChatHistory, userId, anonymousId, fetchReferenceSources]);

  const stopStreaming = useCallback(() => {
    const socket = wsRef.current;
    if (!socket) return;
    if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
      // Close current stream/socket, then reconnect quickly for next turn.
      socket.close(1000, 'User stopped streaming');
      setIsThinking(false);
      setIsStreaming(false);
      setTimeout(() => {
        setupWebSocket();
      }, 120);
    }
  }, [setIsThinking, setIsStreaming, setupWebSocket]);

  // Note: Clearing conversationId when user logs in is handled by Header.tsx
  // This effect is removed to prevent clearing conversationId during normal chat operations
  // The conversationId should only be cleared when:
  // 1. User clicks "New" button (handled by handleRestart in chatStore)
  // 2. User logs in and Header detects anonymous conversationId (handled by Header.tsx)

  useEffect(() => {
    // Only setup WebSocket if one doesn't already exist and is open
    const existingSocket = wsRef.current;
    if (existingSocket && (existingSocket.readyState === WebSocket.OPEN || existingSocket.readyState === WebSocket.CONNECTING)) {
      console.info('WebSocket already exists and is connected/connecting, skipping setup');
      return;
    }

    // Only setup if not already in progress
    if (window.barrier && existingSocket) {
      console.info('WebSocket setup already in progress, skipping...');
      return;
    }

    setupWebSocket();
    
    return () => {
      const socket = wsRef.current;
      if (socket && socket.readyState === WebSocket.OPEN && wsOpen.current) {
        socket.close(1000, 'Component unmounting'); // Normal closure
      }
      // Clean up heartbeat interval
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
      // Don't reset barrier on cleanup - let it persist to prevent rapid reconnections
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRestarting]);

  useEffect(() => {
    const onStop = () => stopStreaming();
    window.addEventListener('osca-stop-stream', onStop);
    return () => window.removeEventListener('osca-stop-stream', onStop);
  }, [stopStreaming]);

  useEffect(() => {
    if (isThinking) {
      scrollToBottom();
    }
  }, [messages, isThinking]);

  // Auto-reload page when connection is lost (only once)
  useEffect(() => {
    if (connectionLost && !reloadAttemptedRef.current) {
      reloadAttemptedRef.current = true;      
      // Reset barrier before reload to allow reconnection
      window.barrier = false;
      
      const timer = setTimeout(() => {
        window.location.reload();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [connectionLost]);

  const sendMessageToServer = (text: string) => {
    if (!text.trim() || !wsRef.current) return;
    setIsSidebarOpen(false);

    const userMetadata = { userId, anonymousId };

    if (!currentConversationId.current) {
      console.log(`[useChat] No conversationId, requesting new one with metadata:`, userMetadata);
      messageQueue.current.push({ text: text.trim() });
      sendMessage(wsRef.current, 'request-conversation-id', '', '', userMetadata);
      return;
    }

    console.log(`[useChat] Sending message with conversationId: ${currentConversationId.current}, metadata:`, userMetadata);
    setIsThinking(true);
    const userMessage: Message = messageFactoryUser(text, currentConversationId.current);
    setMessages((prev: Message[]) => [...prev, userMessage]);
    sendMessage(wsRef.current, 'message', text, currentConversationId.current, userMetadata);
    if (!hasInitialized.current) {
      initializeChat();
    }
  };

  const handleSubmit = (text: string) => {
    sendMessageToServer(text);
    handleTopicAction({ type: 'manual', text });
  };

  const continueConversation = useCallback(async (conversationId: string) => {
    saveConversationId(conversationId);
    currentConversationId.current = conversationId;

    const rawHistory = await loadChatHistory(conversationId);

    if (rawHistory.length > 0 && wsRef.current) {
      sendMessage(wsRef.current, 'import-history', { history: rawHistory }, conversationId, { userId, anonymousId });
    }

    setIsSidebarOpen(false);
  }, [loadChatHistory, userId, anonymousId, setIsSidebarOpen]);

  const deleteConversation = useCallback(async (conversationId: string): Promise<boolean> => {
    if (!userId) return false;

    try {
      const token = await getToken();
      const headers = oscaTenantHeaders({
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      });

      const response = await fetch(`${window.oscaConfig.httpUrl}/api/conversations/${conversationId}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) return false;

      if (conversationId === currentConversationId.current) {
        setMessages([]);
        currentConversationId.current = null;
        clearChatData();
      }

      return true;
    } catch (error) {
      console.error('Error deleting conversation:', error);
      return false;
    }
  }, [userId, getToken, setMessages]);

  return {
    messages,
    messagesEndRef,
    handleSubmit,
    sendMessageToServer,
    continueConversation,
    deleteConversation,
    isThinking,
    isRestarting,
    isStreaming,
  };
}
