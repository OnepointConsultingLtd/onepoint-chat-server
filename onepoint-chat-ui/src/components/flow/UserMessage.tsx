import React from 'react';
import { Message } from '../../type/types';
import RenderReactMarkdown from '../RenderReactMarkdown';

interface UserMessageProps {
  message: Message;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="border-l-4 border-blue-400 bg-blue-50">
      <div className="px-6 py-4 text-left bg-white">
        <div className="text-xs text-gray-500 mb-1">You</div>
        <RenderReactMarkdown message={message}>{message.text}</RenderReactMarkdown>
      </div>
    </div>
  );
};

export default UserMessage;
