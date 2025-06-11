import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../type/types';
import CopyButton from './CopyButton';

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

  return (
    <>
      <ReactMarkdown
        components={{
          a: ({ ...props }) => (
            <a
              {...props}
              className="underline text-purple-500 hover:text-purple-600"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          ul: ({ ...props }) => <ul {...props} className="my-4 ml-4 list-disc" />,
          li: ({ ...props }) => <li {...props} className="text-slate-700" />,
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
      </div>
    </>
  );
}
