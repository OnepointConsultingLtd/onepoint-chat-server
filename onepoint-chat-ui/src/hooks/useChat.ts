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
}

function sendMessage(socket: WebSocket | null, event: string, message: string) {
  if (socket) {
    socket.send(JSON.stringify({ type: event, content: message }));
    console.info(`Sent ${event} ${message}!`);
  } else {
    console.warn(`Socket is null, cannot send ${event} message.`);
  }
}

function messageFactoryAgent(text: string): Message {
  return {
    id: Date.now().toString(),
    text,
    type: "agent",
    timestamp: new Date(),
  };
}

// TODO: get user id from web socket.
const getUserId = () => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("userId", userId);
  }
  return userId;
};



export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const wsOpen = useRef<boolean>(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const userId = getUserId();

  console.log("userId", userId);

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
      wsRef.current.close();
      wsOpen.current = false;
    }

    // Create new WebSocket connection
    wsRef.current = new WebSocket(`ws://${window.location.hostname}:4000`);
    const ws = wsRef.current;

    ws.onopen = () => {
      const connectionMessage: Message = messageFactoryAgent(
        "OSCA at your service!",
      );
      setMessages((prev) => [...prev, connectionMessage]);
      wsOpen.current = true;
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
      const closeMessage: Message = messageFactoryAgent("Connection closed");
      setMessages((prev) => [...prev, closeMessage]);
      wsOpen.current = false;
    };
  };

  const handleRestart = () => {
    setIsRestarting(true);
    setMessages([]);
    setInputText("");
    setIsThinking(false);
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
    setIsThinking(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question.text,
      type: "user",
      timestamp: new Date(),
    };

    sendMessage(wsRef.current, "message", question.text);
    setMessages((prev) => [...prev, userMessage]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsThinking(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      type: "user",
      timestamp: new Date(),
    };

    sendMessage(wsRef.current, "message", inputText);
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
