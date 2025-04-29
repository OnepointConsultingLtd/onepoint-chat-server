import React, { useState } from 'react';
import { Message } from '../../type/types';
import ChatInput from '../ChatInput';
import ThinkingIndicator from '../ThinkingIndicator';
import UserMessage from './UserMessage';
import AgentMessage from './AgentMessage';

interface MessageCardProps {
  userMessage: Message;
  agentMessage: Message | null;
  isLastCard: boolean;
  isThinking: boolean;
  handleSubmit: (text: string) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({
  userMessage,
  agentMessage,
  isLastCard,
  isThinking,
  handleSubmit,
}) => {
  const isInitialMessage = userMessage.text.includes('Welcome to Onepoint');
  const [showInput, setShowInput] = useState(isInitialMessage && isLastCard);
  const [showButton, setShowButton] = useState(false);

  const handleClick = () => {
    setShowInput(true);
  };

  return (
    <div
      className="flex flex-col w-full overflow-hidden rounded-lg shadow group relative"
      onMouseEnter={() => !isInitialMessage && setShowButton(true)}
      onMouseLeave={() => !isInitialMessage && setShowButton(false)}
    >
      {/* User message */}
      <UserMessage message={userMessage} />

      {/* Agent message or thinking indicator */}
      {agentMessage ? (
        <AgentMessage message={agentMessage} />
      ) : isLastCard && isThinking ? (
        <div className="border-l-4 border-green-400 bg-green-50">
          <ThinkingIndicator />
        </div>
      ) : null}

      {showInput && !isThinking && isLastCard && (
        <div className="border-t border-gray-200">
          <ChatInput handleSubmit={handleSubmit} isThinking={isThinking} />
        </div>
      )}

      {!isInitialMessage && showButton && !showInput && !isThinking && isLastCard && (
        <div
          className="fixed left-1/2 transform -translate-x-1/2 transition-opacity duration-300"
          style={{
            bottom: '-15px',
            zIndex: 9999,
          }}
        >
          <button
            onClick={handleClick}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 !cursor-pointer flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span>Ask a follow up question</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageCard;
