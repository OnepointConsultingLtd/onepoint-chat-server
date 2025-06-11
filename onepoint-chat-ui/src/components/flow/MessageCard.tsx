import { useState } from 'react';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { Message } from '../../type/types';
import ChatInput from '../ChatInput';
import ThinkingIndicator from '../ThinkingIndicator';
import AgentMessage from './AgentMessage';
import UserMessage from './UserMessage';

type MessageCardProps = {
  userMessage: Message;
  agentMessage: Message | null;
  isLastCard: boolean;
  isThinking: boolean;
  handleSubmit: (text: string) => void;
};

export default function MessageCard({
  userMessage,
  agentMessage,
  isLastCard,
  isThinking,
  handleSubmit,
}: MessageCardProps) {
  const isInitialMessage = userMessage.text.includes('Welcome to Onepoint');
  const [showInput, setShowInput] = useState(isInitialMessage && isLastCard);
  const [showButton, setShowButton] = useState(false);

  const handleClick = () => {
    setShowInput(true);
  };

  return (
    <div
      className="flex flex-col w-full overflow-hidden rounded-xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group relative animate-fade-in"
      onMouseEnter={() => !isInitialMessage && setShowButton(true)}
      onMouseLeave={() => !isInitialMessage && setShowButton(false)}
    >
      {/* User message */}
      <div className="transition-all duration-300 transform hover:scale-[1.01]">
        <UserMessage message={userMessage} isInitialMessage={isInitialMessage} />
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
          <ChatInput handleSubmit={handleSubmit} isThinking={isThinking} />
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
