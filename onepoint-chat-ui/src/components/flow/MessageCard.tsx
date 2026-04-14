import { Handle, Position } from '@xyflow/react';
import { useEffect, useRef } from 'react';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { useShallow } from 'zustand/react/shallow';
import useChatStore from '../../store/chatStore';
import { Message } from '../../type/types';
import ChatInput from '../ChatInput';
import ThinkingIndicator from '../ThinkingIndicator';
import AgentMessage from './AgentMessage';
import ResponseTimer from './ResponseTimer';
import UserMessage from './UserMessage';

type MessageCardProps = {
  userMessage: Message;
  agentMessage: Message | null;
  isLastCard: boolean;
  isThinking: boolean;
  handleSubmit: (text: string) => void;
  onHeightChange: (height: number) => void;
  /** First paint: only the tenant welcome exists (skipped for user/agent pairing). */
  welcomeOnly?: Message;
};

function RenderHandle() {
  return (
    <Handle
      type="source"
      position={Position.Right}
      id="right"
      style={{ background: 'var(--osca-accent)', top: '50%', transform: 'translateY(-50%)' }}
    />
  );
}

export default function MessageCard({
  userMessage,
  agentMessage,
  isLastCard,
  isThinking,
  handleSubmit,
  onHeightChange,
  welcomeOnly,
}: MessageCardProps) {
  const {
    showInput,
    showButton,
    isInitialMessage,
    setShowButton,
    setIsInitialMessage,
    handleClick,
    relatedTopics,
    relatedTopicsLoading,
  } = useChatStore(
    useShallow(state => ({
      showInput: state.showInput,
      showButton: state.showButton,
      isInitialMessage: state.isInitialMessage,
      setShowButton: state.setShowButton,
      setIsInitialMessage: state.setIsInitialMessage,
      handleClick: state.handleClick,
      relatedTopics: state.relatedTopics,
      relatedTopicsLoading: state.relatedTopicsLoading,
    }))
  );

  useEffect(() => {
    setIsInitialMessage(welcomeOnly ?? userMessage, isLastCard);
  }, [welcomeOnly, userMessage, isLastCard, setIsInitialMessage]);

  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (cardRef.current && onHeightChange) {
      onHeightChange(cardRef.current.offsetHeight);
    }
  }, [onHeightChange, userMessage, agentMessage]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col w-full overflow-visible rounded-xl bg-[color:var(--osca-bg-light)] dark:!bg-[color:var(--osca-bg-dark)] border border-[color:var(--osca-border-light)] dark:border-[color:var(--osca-border-dark)] shadow-lg hover:shadow-xl hover:border-[color:var(--osca-accent)] dark:hover:border-[color:var(--osca-accent)] transition-all duration-300 group animate-fade-in z-50"
      onMouseEnter={() => !isInitialMessage && setShowButton(true)}
      onMouseLeave={() => !isInitialMessage && setShowButton(false)}
    >
      {/* Related Topics Label */}
      {isLastCard && !isInitialMessage &&
        !isThinking &&
        (relatedTopicsLoading ||
          (relatedTopics && relatedTopics.topics.length > 0) ||
          isInitialMessage) ? (
        <div className="absolute top-1/2 -right-[114px] -translate-y-1/2 -z-[1] flex flex-col items-center">
          {/* Label */}
          <div
            className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 
                  bg-gradient-to-r from-white/40 to-white/20 dark:from-[color:color-mix(in_srgb,var(--osca-bg-dark)_40%,transparent)] dark:to-[color:color-mix(in_srgb,var(--osca-surface-dark)_20%,transparent)]
                  backdrop-blur-md shadow-lg text-xs font-semibold text-gray-800 dark:text-white
                  hover:shadow-[0_0_24px_color-mix(in_srgb,var(--osca-accent)_40%,transparent)] transition-shadow duration-300"
          >
            {relatedTopicsLoading ? (
              <>
                <div className="flex items-center gap-5">
                  <span>Loading...</span>
                  <div className="w-2 h-2 rounded-full border border-[color:var(--osca-accent)] border-t-transparent animate-spin"></div>
                </div>
              </>
            ) : (
              <>{isInitialMessage ? 'Accelerate with' : 'Related Topics'}</>
            )}
          </div>

          <RenderHandle />
        </div>
      ) : (
        <RenderHandle />
      )}

      {/* Show thinking indicator for entire card when thinking */}
      {isLastCard && isThinking ? (
        <div className="border-l-4 border-[color:var(--osca-accent)] bg-[color:color-mix(in_srgb,var(--osca-accent)_20%,transparent)] transition-all duration-300 h-auto">
          <ThinkingIndicator />
        </div>
      ) : welcomeOnly ? (
        <div className="transition-all duration-300 overflow-hidden rounded-xl border-l-4 border-[color:var(--osca-accent)]">
          <AgentMessage message={welcomeOnly} />
        </div>
      ) : (
        <>
          {/* Always show user message first */}
          <div className="transition-all duration-300 overflow-hidden rounded-xl">
            <UserMessage message={userMessage} isInitialMessage={isInitialMessage} />
          </div>

          {/* If AI has replied, show agent message next */}
          {agentMessage && (
            <div className="transition-all duration-300 overflow-hidden rounded-xl">
              <AgentMessage message={agentMessage} />
            </div>
          )}
        </>
      )}

      {showInput && !isThinking && isLastCard && (
        <div className="border-t rounded-b-xl transition-all duration-300">
          <ChatInput handleSubmit={handleSubmit} />
        </div>
      )}

      {isLastCard && process.env.NODE_ENV === 'development' && <ResponseTimer />}

      {!isInitialMessage &&
        showButton &&
        !showInput &&
        !isThinking &&
        isLastCard &&
        (
          <div
            className="fixed z-[9999]! left-1/2 transform -translate-x-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100 animate-fade-up"
            style={{
              bottom: '-15px',
            }}
          >
            <button
              onClick={handleClick}
              className="bg-[color:var(--osca-accent)] hover:brightness-110 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-[0_8px_28px_color-mix(in_srgb,var(--osca-accent)_35%,transparent)] dark:shadow-[0_6px_20px_color-mix(in_srgb,var(--osca-accent)_25%,transparent)] transition-all duration-300 transform hover:scale-105 !cursor-pointer flex items-center space-x-2"
            >
              <BiMessageRoundedDots />
              <span>Ask a follow up question</span>
            </button>
          </div>
        )}
    </div>
  );
}
