import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../type/types';
import CopyButton from './CopyButton';
import TopicButtons from './TopicButtons';
import useChatStore from '../store/chatStore';
import { useShallow } from 'zustand/react/shallow';

export default function RenderReactMarkdown({ message }: { message: Message }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { currentMessage, relatedTopics, isInitialMessage } = useChatStore(
    useShallow(state => ({
      currentMessage: state.currentMessage,
      relatedTopics: state.relatedTopics,
      isInitialMessage: state.isInitialMessage,
    }))
  );

  const shouldShowTopicButtons =
    message.type === 'agent' &&
    currentMessage &&
    message.id === currentMessage.id &&
    (isInitialMessage ||
      (relatedTopics && relatedTopics.topics && relatedTopics.topics.length > 0));

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
      <div>{shouldShowTopicButtons && <TopicButtons />}</div>

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
