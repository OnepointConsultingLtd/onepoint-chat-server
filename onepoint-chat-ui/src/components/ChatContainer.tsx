import { useState } from 'react';
import initialQuestions from '../lib/initialQuestions';
import Header from './Header';
import Messages from './Messages';
import Sidebar from './Sidebar';
import SideBarButton from './SideBarButton';
import useChatStore from '../context/chatStore';
import { useShallow } from 'zustand/react/shallow';

export default function ChatContainer() {
  const { messages, handleQuestionClick, handleRestart } = useChatStore(
    useShallow(state => ({
      messages: state.messages,
      handleQuestionClick: state.handleQuestionClick,
      handleRestart: state.handleRestart,
    }))
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
          <Header handleRestart={handleRestart} chatHistory={messages} />
        </div>

        {/* Messages Container */}
        <Messages />
      </div>
    </main>
  );
}
