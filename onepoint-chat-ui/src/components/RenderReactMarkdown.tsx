import { useMemo, useState } from 'react';
import { FiCheck, FiShare2 } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { useShallow } from 'zustand/react/shallow';
import { handleCopyToClipboard } from '../lib/handleCopyToClipboard';
import { predefinedQuestions, shuffleArray } from '../lib/predefinedTopics';
import { useUserContext } from '../hooks/useUserContext';
import useChatStore from '../store/chatStore';
import { Message } from '../type/types';
import CopyButton from './CopyButton';
import ReferenceSources from './ReferenceSources';

export default function RenderReactMarkdown({ message }: { message: Message }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [threadShareCopied, setThreadShareCopied] = useState(false);
  const { userId, anonymousId } = useUserContext();

  const { isInitialMessage, handleTopicAction, handleSubmit, generateThreadShareableId } = useChatStore(
    useShallow(state => ({
      isInitialMessage: state.isInitialMessage,
      handleTopicAction: state.handleTopicAction,
      handleSubmit: state.handleSubmit,
      generateThreadShareableId: state.generateThreadShareableId,
    }))
  );

  const copyToClipboard = async (text: string, id: string) => {
    handleCopyToClipboard({ text, id, setCopiedId });
  };

  const referenceSources = message.referenceSources;
  const isSentraMessage = message.text.includes("Welcome. I'm AegisAI — your advisor for responsible")
  const showQuickQuestions = isInitialMessage;

  const quickQuestions = useMemo(() => {
    const tenant = typeof window !== 'undefined' ? window.oscaTenantUi?.quickQuestions : undefined;
    const pool =
      tenant && tenant.length > 0 ? tenant : predefinedQuestions.map(({ id, text, label }) => ({ id, text, label }));
    return shuffleArray(pool).slice(0, 4);
  }, []);

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
                className="text-[color:var(--osca-accent)] hover:text-[color:var(--osca-accent)] dark:text-[color:var(--osca-accent)] dark:hover:text-[color:var(--osca-accent)] group-hover:!underline group-hover:!text-[color:var(--osca-accent)] dark:group-hover:!text-[color:var(--osca-accent)]"
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

        {isInitialMessage && !isSentraMessage && (
          <p className='!font-bold my-4'>
            What challenge or goal would you like to explore today?
          </p>
        )}

        {showQuickQuestions && quickQuestions.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-bold text-gray-700 dark:!text-[color:var(--osca-text-on-dark)]">
              Quick Questions to Accelerate Your Journey
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {quickQuestions.map(q => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => handleQuickQuestionClick(q)}
                  className="px-3 py-1.5 text-xs cursor-pointer font-medium rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[color:var(--osca-surface-dark)] text-gray-700 dark:text-gray-100 hover:border-[color:var(--osca-accent)] dark:hover:border-[color:var(--osca-accent)] hover:bg-gray-50 dark:hover:bg-[color:var(--osca-surface-dark-hover)] transition-colors"
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
          {/* Share icon: agent message, not welcome */}
          {message.type === 'agent' && !message.isWelcome && (
            <button
              onClick={async () => {
                const ok = await generateThreadShareableId(message.messageId || message.id, userId, anonymousId);
                if (ok) {
                  setThreadShareCopied(true);
                  setTimeout(() => setThreadShareCopied(false), 2000);
                }
              }}
              className="p-1 md:p-2 rounded-full transition-all duration-200 transform scale-90 group-hover:scale-100 shadow-sm hover:shadow-md cursor-pointer text-[color:var(--osca-bg-dark)] dark:text-white hover:text-[color:var(--osca-accent)] border border-[color:var(--osca-border-light)] dark:border-[color:var(--osca-border-dark)] hover:border-[color:var(--osca-accent)] dark:hover:border-[color:var(--osca-accent)]"
              title={threadShareCopied ? 'Copied!' : 'Share message'}
            >
              {threadShareCopied ? (
                <FiCheck className="w-5 h-5 md:w-4 md:h-4 text-green-600" />
              ) : (
                <FiShare2 className="w-5 h-5 md:w-4 md:h-4" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
