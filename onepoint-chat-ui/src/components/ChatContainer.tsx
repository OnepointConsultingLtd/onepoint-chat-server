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
    inputText,
    setInputText,
    messagesEndRef,
    handleQuestionClick,
    handleSubmit,
    handleRestart,
  } = useChat();

  return (
    <main className="flex">
      {/* Mobile Sidebar */}
      <Sidebar
        questions={initialQuestions}
        onQuestionClick={handleQuestionClick}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center border-b border-[#e2e8f0] bg-white/80 backdrop-blur-lg sticky top-0 z-[100]">
          <SideBarButton />
          <Header handleRestart={handleRestart} />
        </div>

        {/* Messages Container */}
        <Messages messages={messages} messagesEndRef={messagesEndRef} />

        {/* Input Container */}
        <ChatInput
          inputText={inputText}
          setInputText={setInputText}
          handleSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
