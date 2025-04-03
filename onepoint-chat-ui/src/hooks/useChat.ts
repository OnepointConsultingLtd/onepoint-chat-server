import WebSocket from "isomorphic-ws";
import { useEffect, useRef, useState } from "react";
import { MessageEvent } from "ws";
import { messageFactoryAgent, messageFactoryUser } from "../lib/messageFactory";
import {
  clearChatData,
  getTheLastConversationId,
  markChatAsActive,
  saveConversationId
} from "../lib/persistence";
import { createWebSocket, sendMessage } from "../lib/websocket";
import { Message, Question } from "../type/types";
import { fetchChatHistory } from "../utils/fetchChatHistory";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const wsOpen = useRef<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const currentConversationId = useRef<string | null>(null);
  const hasInitialized = useRef<boolean>(false);
  const messageQueue = useRef<{ text: string }[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch chat history from the server
  const loadChatHistory = async (conversationId: string) => {
    const formattedMessages = await fetchChatHistory(conversationId);
    if (formattedMessages && formattedMessages.length > 0) {
      setMessages(formattedMessages);
      currentConversationId.current = conversationId;
      markChatAsActive();
      hasInitialized.current = true;
    }
  };

  const initializeChat = () => {
    if (!hasInitialized.current && currentConversationId.current) {
      markChatAsActive();
      saveConversationId(currentConversationId.current);
      hasInitialized.current = true;
    }
  };

  const setupWebSocket = () => {
    if (window.barrier) return;
    console.info("Setting up WebSocket connection");
    window.barrier = true;

    wsRef.current = createWebSocket();
    const ws = wsRef.current;

    ws.onopen = async () => {
      console.info("WebSocket connection opened");
      wsOpen.current = true;

      const lastConversationId = getTheLastConversationId();
      if (lastConversationId) {
        await loadChatHistory(lastConversationId);
      }
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data.toString());

        switch (message.type) {
          case "stream-start":
            setIsThinking(true);
            break;
          case "stream-chunk":
            setIsThinking(false);
            setMessages((prev) => {
              const lastMessage = { ...prev[prev.length - 1] };
              if (!lastMessage || lastMessage.type !== "agent") {
                return [...prev, messageFactoryAgent(message.chunk)];
              }
              lastMessage.text += message.chunk;
              return [...prev.slice(0, -1), lastMessage];
            });
            break;
          case "stream-end":
            setIsThinking(false);
            if (message.subType === "streamEndError") {
              setMessages((prev) => [
                ...prev,
                messageFactoryAgent(message.message),
              ]);
            }
            break;
          case "message":
            setIsThinking(false);
            setMessages((prev) => [
              ...prev,
              messageFactoryAgent(message.message.content),
            ]);
            break;
          case "conversation-id":
            currentConversationId.current = message.conversationId;
            saveConversationId(message.conversationId);
            break;
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      const errorMessage: Message = messageFactoryAgent(
        `Connection error: Unable to connect to server`,
      );
      setMessages((prev) => [...prev, errorMessage]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      const closeMessage: Message = messageFactoryAgent("Connection closed");
      setMessages((prev) => [...prev, closeMessage]);
      wsOpen.current = false;
    };
  };

  const handleRestart = () => {
    clearChatData();
    wsRef.current = null;
    window.barrier = false;
    setIsRestarting(true);
    setMessages([]);
    setIsThinking(false);
    currentConversationId.current = null;
    hasInitialized.current = false;
    messageQueue.current = [];
    setIsRestarting(!isRestarting);
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

  const handleQuestionClick = (question: Question) => {
    if (!wsRef.current) {
      console.warn("WebSocket not ready");
      return;
    }

    if (!currentConversationId.current) {
      messageQueue.current.push({ text: question.text });
      sendMessage(wsRef.current, "request-conversation-id", "", "");
      return;
    }

    setIsThinking(true);
    const userMessage: Message = messageFactoryUser(question.text, currentConversationId.current);
    setMessages((prev) => [...prev, userMessage]);
    sendMessage(wsRef.current, "message", question.text, currentConversationId.current);

    if (!hasInitialized.current) {
      initializeChat();
    }
  };

  const handleSubmit = (text: string) => {
    if (!text.trim() || !wsRef.current) return;

    if (!currentConversationId.current) {
      messageQueue.current.push({ text: text.trim() });
      sendMessage(wsRef.current, "request-conversation-id", "", "");
      return;
    }

    setIsThinking(true);
    const userMessage: Message = messageFactoryUser(text, currentConversationId.current);
    setMessages((prev) => [...prev, userMessage]);
    sendMessage(wsRef.current, "message", text, currentConversationId.current);

    if (!hasInitialized.current) {
      initializeChat();
    }
  };

  return {
    messages,
    messagesEndRef,
    handleQuestionClick,
    handleSubmit,
    handleRestart,
    isThinking,
    isRestarting,
  };
}
