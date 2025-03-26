import WebSocket from "isomorphic-ws";
import { useEffect, useRef, useState } from "react";
import { MessageEvent } from "ws";
import { messageFactoryAgent, messageFactoryUser } from "../lib/messageFactory";
import { Message, Question } from "../type/types";
import { fetchChatHistory } from "../utils/fetchChatHistory";
import { useChatContext } from "./useChatContext";
import { createWebSocket, sendMessage } from "../lib/websocket";


export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const wsOpen = useRef<boolean>(false);

  const {
    isRestarting,
    setIsRestarting,
    copiedId,
    setCopiedId,
    isThinking,
    setIsThinking,
    clientId,
    setClientId,
    inputText,
    setInputText,
    messagesEndRef,
  } = useChatContext();


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch chat history from the server
  const loadChatHistory = async (clientId: string) => {
    const formattedMessages = await fetchChatHistory(clientId);
    setMessages(formattedMessages);
  };

  const setupWebSocket = () => {
    if (wsOpen.current && wsRef.current) {
      return;
    }

    // Create new WebSocket connection
    wsRef.current = createWebSocket();
    const ws = wsRef.current;

    ws.onopen = () => {
      wsOpen.current = true;
      const getCurrentClientId = localStorage.getItem("clientId");
      if (getCurrentClientId) {
        console.log(
          "Using existing client ID from localStorage:",
          getCurrentClientId,
        );

        setClientId(getCurrentClientId);
        loadChatHistory(getCurrentClientId);
      } else {
        sendMessage(ws, "request-client-id", "", "");
      }
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data.toString());
        let newClientId: string;

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
          case "client-id":
            newClientId = message.clientId;
            setClientId(newClientId);
            localStorage.setItem("clientId", newClientId);
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
    wsRef.current = null
    setIsRestarting(true);
    setMessages([]);
    setInputText("");
    setIsThinking(false);
    setClientId("");
    setIsRestarting(!isRestarting);
  };

  useEffect(() => {
    setupWebSocket();
    return () => {
      if (wsOpen.current && wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [isRestarting]);

  useEffect(() => {
    if (isThinking) {
      scrollToBottom();
    }
  }, [messages, isThinking]);

  const handleQuestionClick = (question: Question) => {
    if (!clientId) {
      console.warn("No client ID available");
      return;
    }

    setIsThinking(true);
    const userMessage: Message = messageFactoryUser(question.text, clientId);

    sendMessage(wsRef.current, "message", question.text, clientId);
    setMessages((prev) => [...prev, userMessage]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim() || !clientId) return;

    setIsThinking(true);
    const userMessage: Message = messageFactoryUser(inputText, clientId);
    sendMessage(wsRef.current, "message", inputText, clientId);
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return {
    messages,
    inputText,
    setInputText,
    messagesEndRef,
    handleQuestionClick,
    handleSubmit,
    handleRestart,
    isThinking,
    copiedId,
    handleCopy,
  };
}
