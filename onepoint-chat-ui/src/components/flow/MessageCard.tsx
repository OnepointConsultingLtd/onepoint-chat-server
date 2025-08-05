import { Handle, Position } from '@xyflow/react';
import { useEffect, useRef } from 'react';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { useShallow } from 'zustand/react/shallow';
import useChatStore from '../../store/chatStore';
import { Message } from '../../type/types';
import ChatInput from '../ChatInput';
import ThinkingIndicator from '../ThinkingIndicator';
import AgentMessage from './AgentMessage';
import UserMessage from './UserMessage';

type MessageCardProps = {
  userMessage: Message;
  agentMessage: Message | null;
  isLastCard: boolean;
  isThinking: boolean;
  handleSubmit: (text: string) => void;
  onHeightChange: (height: number) => void;
  isMobile?: boolean;
};

export default function MessageCard({
  userMessage,
  agentMessage,
  isLastCard,
  isThinking,
  handleSubmit,
  onHeightChange,
  isMobile = false,
}: MessageCardProps) {
  const {
    showInput,
    showButton,
    isInitialMessage,
    setShowButton,
    setIsInitialMessage,
    handleClick,
  } = useChatStore(
    useShallow(state => ({
      showInput: state.showInput,
      showButton: state.showButton,
      isInitialMessage: state.isInitialMessage,
      setShowButton: state.setShowButton,
      setIsInitialMessage: state.setIsInitialMessage,
      handleClick: state.handleClick,
    }))
  );

  useEffect(() => {
    setIsInitialMessage(userMessage, isLastCard);
  }, [userMessage, isLastCard, setIsInitialMessage]);

  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (cardRef.current && onHeightChange) {
      onHeightChange(cardRef.current.offsetHeight);
    }
  }, [onHeightChange, userMessage, agentMessage]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col w-full overflow-hidden rounded-xl bg-white border border-gray-400 dark:border-[#0d8ecb] shadow-lg hover:shadow-xl transition-all duration-300 group relative animate-fade-in"
      onMouseEnter={() => !isInitialMessage && setShowButton(true)}
      onMouseLeave={() => !isInitialMessage && setShowButton(false)}
    >
      {/* Show thinking indicator for entire card when thinking */}
      {isLastCard && isThinking ? (
        <div className="border-l-4 border-blue-400 bg-blue-300 transition-all duration-300 h-auto">
          <ThinkingIndicator />
        </div>
      ) : (
        <>
          {/* User message or edit input */}
          <div className="transition-all duration-300 transform hover:scale-[1.01]">
            <UserMessage message={userMessage} isInitialMessage={isInitialMessage} />
          </div>

          {/* Agent message */}
          {agentMessage && (
            <div className="transition-all duration-300 transform hover:scale-[1.01]">
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

      {!isInitialMessage && showButton && !showInput && !isThinking && isLastCard && (
        <div
          className="fixed left-1/2 transform -translate-x-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100 animate-fade-up"
          style={{
            bottom: '-15px',
            zIndex: 9999,
          }}
        >
          <button
            onClick={handleClick}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 dark:from-blue-600 dark:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl dark:shadow-blue-900/20 dark:hover:shadow-blue-900/30 transition-all duration-300 transform hover:scale-105 !cursor-pointer flex items-center space-x-2"
          >
            <BiMessageRoundedDots />
            <span>Ask a follow up question</span>
          </button>
        </div>
      )}

      {/* Responsive handles */}
      {isMobile ? (
        <>
          {/* Mobile: Top handle for incoming connections */}
          <Handle
            type="target"
            position={Position.Top}
            id="top"
            style={{ background: '#3b82f6', left: '50%', transform: 'translateX(-50%)' }}
          />
          {/* Mobile: Bottom handle for outgoing connections */}
          <Handle
            type="source"
            position={Position.Bottom}
            id="bottom"
            style={{ background: '#3b82f6', left: '50%', transform: 'translateX(-50%)' }}
          />
        </>
      ) : (
        <>
          {/* Desktop: Right handle for outgoing connections */}
          <Handle
            type="source"
            position={Position.Right}
            id="right"
            style={{ background: '#3b82f6', top: '50%', transform: 'translateY(-50%)' }}
          />
        </>
      )}
    </div>
  );
}
