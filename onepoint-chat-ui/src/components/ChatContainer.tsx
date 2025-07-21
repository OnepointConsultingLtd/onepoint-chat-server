import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useChat } from '../hooks/useChat';
import initialQuestions from '../lib/initialQuestions';
import useChatStore from '../store/chatStore';
import Header from './Header';
import Messages from './Messages';
import Sidebar from './Sidebar';
import SideBarButton from './SideBarButton';

export default function ChatContainer() {
  const { messagesEndRef, handleSubmit } = useChat();
  const { messages, selectedTopic, fetchRelatedTopics, setHandleSubmit } = useChatStore(
    useShallow(state => ({
      messages: state.messages,
      selectedTopic: state.selectedTopic,
      fetchRelatedTopics: state.fetchRelatedTopics,
      setHandleSubmit: state.setHandleSubmit,
    }))
  );

  useEffect(() => {
    setHandleSubmit(handleSubmit);
  }, [handleSubmit, setHandleSubmit]);

  useEffect(() => {
    if (selectedTopic) {
      fetchRelatedTopics(selectedTopic.name);
    }
  }, [selectedTopic, fetchRelatedTopics]);

  return (
    <main className="flex">
      {/* Mobile Sidebar */}
      <Sidebar questions={initialQuestions} />
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center border-b border-[#e2e8f0] bg-white/80 backdrop-blur-lg sticky top-0 z-[100]">
          <SideBarButton />
          <Header chatHistory={messages} />
        </div>
        {/* Messages Container */}
        <Messages messagesEndRef={messagesEndRef} handleSubmit={handleSubmit} />
      </div>
    </main>
  );
}
