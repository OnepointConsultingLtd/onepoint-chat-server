import { useEffect } from 'react';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { Topic } from '../../type/types';
import ChatInput from '../ChatInput';
import ThinkingIndicator from '../ThinkingIndicator';
import AgentMessage from './AgentMessage';
import UserMessage from './UserMessage';
import useChatStore from '../../context/chatStore';
import { useShallow } from 'zustand/react/shallow';
type MessageCardProps = {
  userMessageIndex: number;
  isLastCard: boolean;
};

export default function MessageCard({ userMessageIndex, isLastCard }: MessageCardProps) {
  const {
    messages,
    loadTopics,
    showInput,
    showButton,
    isInitialMessage,
    isThinking,
    setIsInitialMessage,
    setShowButton,
    handleClick,
    handleSubmit,
  } = useChatStore(
    useShallow(state => ({
      messages: state.messages,
      loadTopics: state.loadTopics,
      showInput: state.showInput,
      showButton: state.showButton,
      isInitialMessage: state.isInitialMessage,
      isThinking: state.isThinking,
      setIsInitialMessage: state.setIsInitialMessage,
      setShowButton: state.setShowButton,
      handleClick: state.handleClick,
      handleSubmit: state.handleSubmit,
    }))
  );

  const userMessage = messages[userMessageIndex];
  const agentMessage =
    userMessageIndex + 1 < messages.length ? messages[userMessageIndex + 1] : null;

  const handleTopicClick = (topic: Topic) => {
    const questionText =
      topic.questions && topic.questions.length > 0
        ? topic.questions[0]
        : `Tell me more about ${topic.name}`;

    handleSubmit(questionText);
  };

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  useEffect(() => {
    if (userMessage) {
      setIsInitialMessage(userMessage, isLastCard);
    }
  }, [userMessage, isLastCard, setIsInitialMessage]);

  if (!userMessage) return null;

  return (
    <div
      className="flex flex-col w-full overflow-hidden rounded-xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group relative animate-fade-in"
      onMouseEnter={() => !isInitialMessage && setShowButton(true)}
      onMouseLeave={() => !isInitialMessage && setShowButton(false)}
    >
      {/* User message */}
      <div className="transition-all duration-300 transform hover:scale-[1.01]">
        <UserMessage
          message={userMessage}
          isInitialMessage={isInitialMessage}
          onTopicClick={handleTopicClick}
        />
      </div>

      {/* Agent message or thinking indicator */}
      {agentMessage ? (
        <div className="transition-all duration-300 transform hover:scale-[1.01]">
          <AgentMessage message={agentMessage} />
        </div>
      ) : isLastCard && isThinking ? (
        <div className="border-l-4 border-blue-400 bg-blue-50 transition-all duration-300">
          <ThinkingIndicator />
        </div>
      ) : null}

      {showInput && !isThinking && isLastCard && (
        <div className="border-t rounded-b-xl transition-all duration-300">
          <ChatInput />
        </div>
      )}

      {!isInitialMessage && showButton && !showInput && !isThinking && isLastCard && (
        <div
          className="fixed left-1/2 transform -translate-x-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100 animate-fade-up"
          style={{
            bottom: '-15px',
            zIndex: 9999,
          }}
        >
          <button
            onClick={handleClick}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 !cursor-pointer flex items-center space-x-2"
          >
            <BiMessageRoundedDots />
            <span>Ask a follow up question</span>
          </button>
        </div>
      )}
    </div>
  );
}
