import React from 'react';
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
  return (
    <div className="flex flex-col w-full overflow-hidden rounded-lg shadow">
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

      {/* Input field - only show on last card when not thinking */}
      {isLastCard && !isThinking && (
        <div className="border-t border-gray-200">
          <ChatInput handleSubmit={handleSubmit} isThinking={isThinking} />
        </div>
      )}
    </div>
  );
};

export default MessageCard;
