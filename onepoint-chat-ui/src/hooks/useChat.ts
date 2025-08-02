import WebSocket from 'isomorphic-ws';
import { useEffect, useRef } from 'react';
import { MessageEvent } from 'ws';
import { useShallow } from 'zustand/react/shallow';
import { messageFactoryAgent, messageFactoryUser } from '../lib/messageFactory';
import { getConversationId, markChatAsActive, saveConversationId, isChatActive } from '../lib/persistence';
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

  // Centralized conversation initialization
  const initializeConversation = async (): Promise<void> => {
    console.log('🔄 Initializing conversation...');

    // Step 1: Check if existing conversation ID exists
    const existingConversationId = getConversationId();
    const isActive = isChatActive();

    console.log('📋 localStorage sessionId:', localStorage.getItem('sessionId'));
    console.log('📋 localStorage activeSession:', localStorage.getItem('activeSession'));
    console.log('📋 getConversationId():', existingConversationId);
    console.log('📋 isChatActive():', isActive);
    console.log('📋 currentConversationId.current:', currentConversationId.current);

    if (existingConversationId && isActive) {
      // Step 2: Use existing ID - DO NOT UPDATE IT
      console.log('✅ Using existing conversation:', existingConversationId);
      currentConversationId.current = existingConversationId;

      // Step 3: Load chat history for existing conversation
      console.log('📚 Loading chat history...');
      try {
        await loadChatHistory(existingConversationId);
        console.log('✅ Chat history loaded successfully');
      } catch (error) {
        console.error('❌ Failed to load chat history:', error);
      }

      hasInitialized.current = true;
    } else {
      console.log('🆕 No existing conversation - ready for new conversation');
      console.log('🆕 Reason: existingConversationId =', existingConversationId, ', isActive =', isActive);
    }
  };

  // Fetch chat history from the server
  async function loadChatHistory(conversationId: string): Promise<ServerMessage[]> {
    const rawHistory = await fetchRawHistory(conversationId);
    const formattedMessages = await fetchChatHistory(conversationId, rawHistory);

    if (formattedMessages && formattedMessages.length > 0) {
      console.log('📨 Setting messages from history:', formattedMessages.length, 'messages');
      setMessages(formattedMessages);
      markChatAsActive();
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
    console.info('🔌 Setting up WebSocket connection');
    window.barrier = true;

    wsRef.current = createWebSocket();
    const ws = wsRef.current;

    ws.onopen = async () => {
      console.info('✅ WebSocket connection opened');
      wsOpen.current = true;

      // Initialize conversation on connection
      await initializeConversation();
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
            setMessages((prev: Message[]) => [...prev, messageFactoryAgent(message.message.content)]);
            break;
          case 'conversation-id': {
            const { conversationId } = message;
            console.log('🆔 Server wants to assign conversation ID:', conversationId);

            // Only accept if we don't already have one
            if (!currentConversationId.current) {
              console.log('✅ Accepting new conversation ID:', conversationId);
              currentConversationId.current = conversationId;
              saveConversationId(conversationId);
              markChatAsActive();
            } else {
              console.log('❌ Ignoring - already have conversation ID:', currentConversationId.current);
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

    // If no conversation ID, request one first
    if (!currentConversationId.current) {
      console.log('🆔 No conversation ID - requesting one');
      messageQueue.current.push({ text: text.trim() });
      sendMessage(wsRef.current, 'request-conversation-id', '', '');
      return;
    }

    console.log('📤 Sending message with conversation ID:', currentConversationId.current);
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
