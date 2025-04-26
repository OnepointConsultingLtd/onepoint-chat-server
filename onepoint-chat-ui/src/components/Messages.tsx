import React from 'react';
import { Message } from '../type/types';
import Flow from './flow/Flow';

interface MessagesProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  isThinking: boolean;
  handleSubmit: (text: string) => void;
}

const Messages: React.FC<MessagesProps> = ({
  messages,
  messagesEndRef,
  isThinking,
  handleSubmit,
}) => {
  console.log('messagesEndRef', messagesEndRef);
  return (
    <div className="flex-1 flex flex-col mb-[4rem]" style={{ height: 'calc(100vh - 10rem)' }}>
      <Flow
        messages={messages}
        isThinking={isThinking}
        handleSubmit={handleSubmit}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
};

export default Messages;
