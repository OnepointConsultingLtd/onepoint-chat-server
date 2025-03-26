import React, { useRef, useState } from "react";
import { Message } from "../type/types";
import { ChatContext } from "./ChatContextDefinition";

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Chat State
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [inputText, setInputText] = useState("");
  const [clientId, setClientId] = useState<string>("");
  const [isThinking, setIsThinking] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // UI
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleFloatingBtn = () => {
    setIsFloatingOpen(!isFloatingOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        inputText,
        setInputText,
        clientId,
        setClientId,
        isThinking,
        setIsThinking,
        isRestarting,
        setIsRestarting,
        isSidebarOpen,
        setIsSidebarOpen,
        isFloatingOpen,
        setIsFloatingOpen,
        copiedId,
        setCopiedId,
        messagesEndRef,
        handleFloatingBtn,
        toggleSidebar,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
