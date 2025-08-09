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
import { FiShare2 } from 'react-icons/fi';
import GradientButton from '../GradientButton';
import { MdOutlineRestartAlt } from 'react-icons/md';
import MessageTimestamp from './MessageTimestamp';

type MessageCardProps = {
  userMessage: Message;
  agentMessage: Message | null;
  isLastCard: boolean;
  isThinking: boolean;
  handleSubmit: (text: string) => void;
  onHeightChange: (height: number) => void;
  isMobile?: boolean;
};

function RenderHandle() {
  return (
    <Handle
      type="source"
      position={Position.Right}
      id="right"
      style={{ background: '#3b82f6', top: '50%', transform: 'translateY(-50%)' }}
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
  isMobile = false,
}: MessageCardProps) {
  const {
    showInput,
    showButton,
    isInitialMessage,
    setShowButton,
    setIsInitialMessage,
    handleClick,
    isThreadShareMode,
    exitThreadShareMode,
    relatedTopics,
  } = useChatStore(
    useShallow(state => ({
      showInput: state.showInput,
      showButton: state.showButton,
      isInitialMessage: state.isInitialMessage,
      setShowButton: state.setShowButton,
      setIsInitialMessage: state.setIsInitialMessage,
      handleClick: state.handleClick,
      isThreadShareMode: state.isThreadShareMode,
      exitThreadShareMode: state.exitThreadShareMode,
      relatedTopics: state.relatedTopics,
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

  console.log('userMessage', userMessage);
  return (
    <div
      ref={cardRef}
      className="flex flex-col w-full overflow-hidden rounded-xl bg-white border border-gray-400 dark:border-[#0d8ecb] shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in z-50"
      onMouseEnter={() => !isInitialMessage && setShowButton(true)}
      onMouseLeave={() => !isInitialMessage && setShowButton(false)}
    >
      {/* Related Topics Label */}
      {relatedTopics && isLastCard && !isThinking && relatedTopics.topics.length > 0 ? (
        <div className="absolute top-1/2 -right-[114px] -translate-y-1/2 -z-[1] flex flex-col items-center">
          {/* Label */}
          <div
            className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 
                  bg-gradient-to-r from-white/40 to-white/20 dark:from-[#1f2a38]/40 dark:to-[#0f1621]/20
                  backdrop-blur-md shadow-lg text-xs font-semibold text-gray-800 dark:text-white
                  hover:shadow-blue-400/50 transition-shadow duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 animate-pulse"></span>
            Related Topics
          </div>

          <RenderHandle />
        </div>
      ) : (
        <RenderHandle />
      )}

      {/* Thread Share Mode Indicator */}
      {isThreadShareMode && (
        <div className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 dark:from-slate-900 dark:via-gray-700 dark:to-slate-600 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <FiShare2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">Viewing Shared Thread</span>
                  <span className="text-blue-100 text-sm">
                    This is a read-only shared conversation
                  </span>
                  <MessageTimestamp timestamp={userMessage.timestamp} />
                </div>
              </div>
            </div>

            <div className="w-fit">
              <GradientButton onClick={exitThreadShareMode} icon={<MdOutlineRestartAlt />}>
                Start New Chat
              </GradientButton>
            </div>
          </div>

          {/* Animated bottom border */}
          <div className="h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        </div>
      )}

      {/* Show thinking indicator for entire card when thinking */}
      {isLastCard && isThinking ? (
        <div className="border-l-4 border-blue-400 bg-blue-300 transition-all duration-300 h-auto">
          <ThinkingIndicator />
        </div>
      ) : (
        <>
          {/* Always show user message first */}
          <div className="transition-all duration-300 transform hover:scale-[1.01]">
            <UserMessage message={userMessage} isInitialMessage={isInitialMessage} />
          </div>

          {/* If AI has replied, show agent message next */}
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

      {!isInitialMessage &&
        showButton &&
        !showInput &&
        !isThinking &&
        isLastCard &&
        !isThreadShareMode && (
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
      {isMobile && (
        <>
          <Handle
            type="target"
            position={Position.Top}
            id="top"
            style={{ background: '#3b82f6', left: '50%', transform: 'translateX(-50%)' }}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="bottom"
            style={{ background: '#3b82f6', left: '50%', transform: 'translateX(-50%)' }}
          />
        </>
      )}
    </div>
  );
}
