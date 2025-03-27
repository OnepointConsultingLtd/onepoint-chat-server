import WebSocket from "isomorphic-ws";
import { useEffect, useRef, useState } from "react";
import { MessageEvent } from "ws";
import { messageFactoryAgent, messageFactoryUser } from "../lib/messageFactory";
import { getTheLastConversationId, saveConversationId } from "../lib/persistence";
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch chat history from the server
  const loadChatHistory = async (conversationId: string) => {
    const formattedMessages = await fetchChatHistory(conversationId);
    setMessages(formattedMessages);
    currentConversationId.current = conversationId;
  };

  const setupWebSocket = () => {
    if (window.barrier) {
      return;
    }

    window.barrier = true;

    // Create new WebSocket connection
    wsRef.current = createWebSocket();
    const ws = wsRef.current;

    ws.onopen = () => {
      wsOpen.current = true;

      const lastConversationId = getTheLastConversationId();
      if (lastConversationId) {
        loadChatHistory(lastConversationId);
      } else {
        sendMessage(ws, "request-conversation-id", "", "");
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
    wsRef.current = null;
    window.barrier = false;
    setIsRestarting(true);
    setMessages([]);
    setIsThinking(false);
    currentConversationId.current = null;
    setIsRestarting(!isRestarting);
  };

  useEffect(() => {
    setupWebSocket();
    return () => {
      const socket = wsRef.current;
      if (socket && socket.readyState === WebSocket.OPEN) {
        if (wsOpen.current && socket) {
          socket.close();
        }
      }
    };
  }, [isRestarting]);

  useEffect(() => {
    if (isThinking) {
      scrollToBottom();
    }
  }, [messages, isThinking]);

  const handleQuestionClick = (question: Question) => {
    if (!currentConversationId.current) {
      console.warn("No conversation ID available");
      return;
    }

    setIsThinking(true);
    const userMessage: Message = messageFactoryUser(question.text, currentConversationId.current);
    sendMessage(wsRef.current, "message", question.text, currentConversationId.current);
    setMessages((prev) => [...prev, userMessage]);
  };

  const handleSubmit = (text: string) => {
    if (!text.trim()) return;
    if (!currentConversationId.current) {
      console.warn("No conversation ID available");
      return;
    }

    setIsThinking(true);
    const userMessage: Message = messageFactoryUser(text, currentConversationId.current);
    sendMessage(wsRef.current, "message", text, currentConversationId.current);
    setMessages((prev) => [...prev, userMessage]);
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
