import "./App.css";
import ChatInput from "./components/ChatInput";
import Header from "./components/Header";
import Messages from "./components/Messages";
import Sidebar from "./components/Sidebar";
import SideBarButton from "./components/SideBarButton";
import { useChat } from "./hooks/useChat";
import initialQuestions from "./lib/initialQuestions";

function App() {
  const {
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
  } = useChat();


  return (
    <main className="flex">
      {/* Mobile Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        questions={initialQuestions}
        onQuestionClick={handleQuestionClick}
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
          isThinking={isThinking}
          messagesEndRef={messagesEndRef}
        />

        {/* Input Container */}
        <ChatInput
          inputText={inputText}
          setInputText={setInputText}
          handleSubmit={handleSubmit}
          isThinking={isThinking}
        />
      </div>
    </main>
  );
}

export default App;
