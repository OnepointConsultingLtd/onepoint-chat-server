import React from 'react';
import { Message } from '../../type/types';
import RenderReactMarkdown from '../RenderReactMarkdown';

interface UserMessageProps {
  message: Message;
  isInitialMessage: boolean;
}

const UserMessage: React.FC<UserMessageProps> = ({ message, isInitialMessage }) => {
  return (
    <div className="border-l-4 border-blue-400 bg-gradient-to-r from-blue-50 to-white">
      <div className="px-6 py-5 text-left">
        {!isInitialMessage && (
          <div className="flex items-center mb-2">
            <div className="text-xs font-medium text-blue-600 uppercase tracking-wider">You</div>
            <div className="ml-2 h-1 w-1 rounded-full bg-gray-300"></div>
            <div className="ml-2 text-xs text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        )}
        <div className="prose prose-blue max-w-none">
          <RenderReactMarkdown message={message}>{message.text}</RenderReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
