import React from 'react';
import { Message } from '../../type/types';
import RenderReactMarkdown from '../RenderReactMarkdown';

interface AgentMessageProps {
  message: Message;
}

const AgentMessage: React.FC<AgentMessageProps> = ({ message }) => {
  return (
    <div className="border-l-4 border-green-400 bg-green-50">
      <div className="px-6 py-4 text-left bg-white">
        <RenderReactMarkdown message={message}>{message.text}</RenderReactMarkdown>
      </div>
    </div>
  );
};

export default AgentMessage;
