import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../type/types';
import CopyButton from './CopyButton';
import { FiShare2 } from 'react-icons/fi';
export default function RenderReactMarkdown({ message }: { message: Message }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (message: Message) => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopiedId(message.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handleShareClick = () => {
    // TODO: Implement share functionality
    console.log('Share clicked for message:', message.id);
  };

  return (
    <div className="group">
      <ReactMarkdown
        components={{
          a: ({ ...props }) => (
            <a
              {...props}
              className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 group-hover:!underline group-hover:!text-blue-600 dark:group-hover:!text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          ul: ({ ...props }) => <ul {...props} className="my-4 ml-4 list-disc dark:text-white" />,
          li: ({ ...props }) => <li {...props} className="text-slate-700 dark:!text-gray-100" />,
        }}
      >
        {message.text}
      </ReactMarkdown>

      <div className="flex items-center justify-between mt-2 text-xs">
        <CopyButton
          text={message.text}
          id={message.id}
          copiedId={copiedId}
          onCopy={() => copyToClipboard(message)}
        />

        {/* FOR AGENT MESSAGE   */}
        {message.type === 'agent' && (
          <button
            onClick={handleShareClick}
            className="z-10 p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 transition-all duration-200 transform scale-90 group-hover:scale-100 shadow-sm hover:shadow-md cursor-pointer"
            title="Share message"
          >
            <FiShare2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
