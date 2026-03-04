import { useUser } from '@clerk/clerk-react';
import { useMemo, useState } from 'react';
import { FiShare2 } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { useShallow } from 'zustand/react/shallow';
import { handleCopyToClipboard } from '../lib/handleCopyToClipboard';
import { predefinedQuestions, shuffleArray } from '../lib/predefinedTopics';
import useChatStore from '../store/chatStore';
import { Message } from '../type/types';
import CopyButton from './CopyButton';
import ReferenceSources from './ReferenceSources';

export default function RenderReactMarkdown({ message }: { message: Message }) {
  const { isSignedIn, isLoaded } = useUser();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sharedId, setSharedId] = useState<string | null>(null);

  const { generateThreadShareableId, isThreadShareMode, isInitialMessage, handleTopicAction, handleSubmit } = useChatStore(
    useShallow(state => ({
      generateThreadShareableId: state.generateThreadShareableId,
      isThreadShareMode: state.isThreadShareMode,
      isInitialMessage: state.isInitialMessage,
      handleTopicAction: state.handleTopicAction,
      handleSubmit: state.handleSubmit,
    }))
  );

  const copyToClipboard = async (text: string, id: string) => {
    handleCopyToClipboard({ text, id, setCopiedId });
  };

  const handleShareClick = async () => {
    try {
      if (message.type !== 'agent') {
        console.error('Share is only available for user and agent messages');
        return;
      }

      const messageId = message.id || message.messageId;
      const shareableUrl = generateThreadShareableId(messageId);

      if (shareableUrl) {
        handleCopyToClipboard({
          text: shareableUrl,
          id: messageId,
          setCopiedId: setSharedId,
        });
      } else {
        console.error('Failed to generate shareable URL');
      }
    } catch (error) {
      console.error('Failed to copy share URL:', error);
    }
  };

  const referenceSources = message.referenceSources;

  const showQuickQuestions = isInitialMessage && !isThreadShareMode;

  const quickQuestions = useMemo(() => shuffleArray(predefinedQuestions).slice(0, 4), []);

  const handleQuickQuestionClick = (question: { id: number; text: string; label?: string }) => {
    // Match the Sidebar behavior: set topic context then submit the question as a message
    handleTopicAction({
      type: 'question',
      question: {
        id: question.id,
        text: question.text,
        label: question.label,
      },
    });
    handleSubmit(question.text);
  };

  return (
    <div className="group w-full">
      <div className="relative text-left">

        <ReactMarkdown
          components={{
            a: ({ ...props }) => (
              <a
                {...props}
                className="text-[#9a19ff] hover:text-[#9a19ff] dark:text-[#9a19ff] dark:hover:text-[#9a19ff] group-hover:!underline group-hover:!text-[#9a19ff] dark:group-hover:!text-[#9a19ff]"
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

        {isInitialMessage && (
          <p className='!font-bold my-4'>
            What challenge or goal would you like to explore today?
          </p>
        )}

        {showQuickQuestions && quickQuestions.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-bold text-gray-700 dark:!text-[#fafffe]">
              Quick Questions to Accelerate Your Journey
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {quickQuestions.map(q => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => handleQuickQuestionClick(q)}
                  className="px-3 py-1.5 text-xs cursor-pointer font-medium rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a1f35] text-gray-700 dark:text-gray-100 hover:border-[#9a19ff] dark:hover:border-[#9a19ff] hover:bg-gray-50 dark:hover:bg-[#352840] transition-colors"
                  title={q.text}
                >
                  {q.label || q.text}
                </button>
              ))}
            </div>
          </div>
        )}


        {referenceSources && referenceSources.length > 0 && (
          <ReferenceSources sources={referenceSources} />
        )}

        <div className="flex items-center justify-between mt-2 text-xs">
          {!isInitialMessage && (
            <CopyButton
              text={message.text}
              id={message.id}
              copiedId={copiedId}
              onCopy={copyToClipboard}
            />

          )}
          {/* Only show share button if signed in, not in thread share mode, and is agent message */}
          {isLoaded && isSignedIn && !isThreadShareMode && !isInitialMessage && message.type === 'agent' && (
            <button
              onClick={handleShareClick}
              className={`p-1 md:p-2 rounded-full transition-all duration-200 transform scale-90 group-hover:scale-100 shadow-sm hover:shadow-md cursor-pointer ${sharedId === message.id
                ? 'bg-green-50 text-green-600 border border-green-200'
                : ' text-[#1F1925] dark:text-white hover:text-[#9a19ff] border border-[#636565] dark:border-[#fafffe] hover:border-[#9a19ff] dark:hover:border-[#9a19ff]'
                }`}
              title={sharedId === message.id ? 'Share URL copied!' : 'Share message'}
            >
              <FiShare2 className="w-5 h-5 md:w-4 md:h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
