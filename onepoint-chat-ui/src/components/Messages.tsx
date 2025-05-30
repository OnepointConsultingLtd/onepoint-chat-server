import React from 'react';
import { Message } from '../type/types';
import Flow from './flow/Flow';

type MessagesProps = {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  isThinking: boolean;
  handleSubmit: (text: string) => void;
};

export default function Messages({
  messages,
  messagesEndRef,
  isThinking,
  handleSubmit,
}: MessagesProps) {
  return (
    <div className="flex-1 flex flex-col" style={{ height: 'calc(100vh - 10rem)' }}>
      <Flow
        messages={messages}
        messagesEndRef={messagesEndRef}
        isThinking={isThinking}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
