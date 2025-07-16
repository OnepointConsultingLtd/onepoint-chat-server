import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useChat } from '../hooks/useChat';
import initialQuestions from '../lib/initialQuestions';
import useChatStore from '../store/chatStore';
import Header from './Header';
import Messages from './Messages';
import Sidebar from './Sidebar';
import SideBarButton from './SideBarButton';

export default function ChatContainer() {
  const { messagesEndRef, handleQuestionClick, handleRestart, handleSubmit } = useChat();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { messages, isThinking, loadTopics, topics, setHandleSubmit } = useChatStore(
    useShallow(state => ({
      messages: state.messages,
      isThinking: state.isThinking,
      loadTopics: state.loadTopics,
      topics: state.topics,
      setHandleSubmit: state.setHandleSubmit,
    }))
  );

  useEffect(() => {
    if (!topics) {
      loadTopics();
    }
  }, [topics, loadTopics]);

  useEffect(() => {
    setHandleSubmit(handleSubmit);
  }, [handleSubmit, setHandleSubmit]);

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
        <Messages
          messages={messages}
          messagesEndRef={messagesEndRef}
          isThinking={isThinking}
          handleSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
