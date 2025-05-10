import React from 'react';
import { Message } from '../../type/types';
import RenderReactMarkdown from '../RenderReactMarkdown';
import { nameDescription, siteName } from '../../lib/constants';

interface AgentMessageProps {
  message: Message;
}

const AgentMessage: React.FC<AgentMessageProps> = ({ message }) => {
  return (
    <div className="border-l-4 border-indigo-500 bg-gradient-to-r from-indigo-50 to-white">
      <div className="px-6 py-5 text-left">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <div className="text-xs font-medium text-indigo-600 uppercase tracking-wider">
              {siteName}
            </div>
            <div className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-indigo-100 text-indigo-600 rounded-sm">
              AI adviser
            </div>
          </div>
          <div className="ml-2 h-1 w-1 rounded-full bg-gray-300"></div>
          <div className="ml-2 text-xs text-gray-400">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
        <div className="prose prose-indigo max-w-none">
          <RenderReactMarkdown message={message}>{message.text}</RenderReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default AgentMessage;
