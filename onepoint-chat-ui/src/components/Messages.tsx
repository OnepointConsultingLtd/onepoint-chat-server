import React from 'react';
import Flow from './flow/Flow';

type MessagesProps = {
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  handleSubmit: (text: string) => void;
};

export default function Messages({ messagesEndRef, handleSubmit }: MessagesProps) {
  return (
    <div className="flex-1 flex flex-col" style={{ height: 'calc(100vh - 10rem)' }}>
      <Flow messagesEndRef={messagesEndRef} handleSubmit={handleSubmit} />
    </div>
  );
}
