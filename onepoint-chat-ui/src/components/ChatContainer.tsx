import { useState } from "react";
import { useChat } from "../hooks/useChat";
import initialQuestions from "../lib/initialQuestions";
import ChatInput from "./ChatInput";
import Header from "./Header";
import Messages from "./Messages";
import Sidebar from "./Sidebar";
import SideBarButton from "./SideBarButton";

export default function ChatContainer() {
  const {
    messages,
    messagesEndRef,
    handleQuestionClick,
    handleSubmit,
    handleRestart,
    isThinking,
  } = useChat();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="flex">
      {/* Mobile Sidebar */}
      <Sidebar
        questions={initialQuestions}
        onQuestionClick={handleQuestionClick}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center border-b border-[#e2e8f0] bg-white/80 backdrop-blur-lg sticky top-0 z-[100]">
          <SideBarButton toggleSidebar={toggleSidebar} />
          <Header handleRestart={handleRestart} />
        </div>

        {/* Messages Container */}
        <Messages
          messages={messages}
          messagesEndRef={messagesEndRef}
          isThinking={isThinking}
        />

        {/* Input Container */}
        <ChatInput handleSubmit={handleSubmit} isThinking={isThinking} />
      </div>
    </main>
  );
}
