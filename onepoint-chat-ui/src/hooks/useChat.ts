import WebSocket from "isomorphic-ws";
import { useEffect, useRef, useState } from "react";
import { MessageEvent } from "ws";

export interface Question {
  id: number;
  text: string;
}

export interface Message {
  id: string;
  text: string;
  type: "user" | "agent";
  timestamp: Date;
  clientId: string;
}

function sendMessage(socket: WebSocket | null, event: string, message: string, clientId: string) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: event, content: message, clientId }));
    console.info(`Sent ${event} ${message}!`);
  } else {
    console.warn(`Socket is null, cannot send ${event} message.`);
  }
}

function messageFactoryAgent(text: string, clientId: string): Message {
  return {
    id: Date.now().toString(),
    text,
    type: "agent",
    timestamp: new Date(),
    clientId
  };
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [clientId, setClientId] = useState<string>("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const wsOpen = useRef<boolean>(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleFloatingBtn = () => {
    setIsFloatingOpen(!isFloatingOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const setupWebSocket = () => {
    // Close existing connection if any
    if (wsOpen.current && wsRef.current) {
      debugger
      return
    }

    // Create new WebSocket connection
    wsRef.current = new WebSocket(`ws://${window.location.hostname}:4000`);
    const ws = wsRef.current;

    ws.onopen = () => {
      wsOpen.current = true;

      // Check localStorage for existing client ID
      const storedClientId = localStorage.getItem("clientId");
      if (storedClientId) {
        setClientId(storedClientId);
        setMessages((prev) => [...prev]);
      } else {
        sendMessage(wsRef.current, "request-client-id", "", "");
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
                return [...prev, messageFactoryAgent(message.chunk, message.clientId || clientId)];
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
                messageFactoryAgent(message.message, message.clientId || clientId),
              ]);
            }
            break;
          case "message":
            setIsThinking(false);
            setMessages((prev) => [
              ...prev,
              messageFactoryAgent(message.message.content, message.clientId || clientId),
            ]);
            break;
          case "client-id":
            newClientId = message.clientId;
            setClientId(newClientId);
            setMessages((prev) => [...prev]);
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
        clientId
      );
      setMessages((prev) => [...prev, errorMessage]);
    };

    ws.onclose = () => {
      const closeMessage: Message = messageFactoryAgent("Connection closed", clientId);
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
    setClientId(""); // Reset client ID on restart
    setIsRestarting(!isRestarting);
  };

  useEffect(() => {
    setupWebSocket();
    return () => {
      if (wsOpen.current && wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [isRestarting]); // Removed clientId dependency

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
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question.text,
      type: "user",
      timestamp: new Date(),
      clientId
    };

    sendMessage(wsRef.current, "message", question.text, clientId);
    setMessages((prev) => [...prev, userMessage]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim() || !clientId) return;

    setIsThinking(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      type: "user",
      timestamp: new Date(),
      clientId
    };

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
    isSidebarOpen,
    toggleSidebar,
    handleFloatingBtn,
    isFloatingOpen,
    copiedId,
    handleCopy
  };
}
