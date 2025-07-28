import { Handle, Position } from '@xyflow/react';
import { useEffect, useRef } from 'react';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { FiEdit3 } from 'react-icons/fi';
import { useShallow } from 'zustand/react/shallow';
import useChatStore from '../../store/chatStore';
import { Message } from '../../type/types';
import ChatInput from '../ChatInput';
import ThinkingIndicator from '../ThinkingIndicator';
import AgentMessage from './AgentMessage';
import UserMessage from './UserMessage';
import EditMessage from './EditMessage';

type MessageCardProps = {
  userMessage: Message;
  agentMessage: Message | null;
  isLastCard: boolean;
  isThinking: boolean;
  handleSubmit: (text: string) => void;
  onHeightChange?: (height: number) => void;
};

export default function MessageCard({
  userMessage,
  agentMessage,
  isLastCard,
  isThinking,
  handleSubmit,
  onHeightChange,
}: MessageCardProps) {
  const {
    showInput,
    showButton,
    isInitialMessage,
    setShowButton,
    setIsInitialMessage,
    handleClick,
    editingMessageId,
    setEditingMessageId,
    editMessage,
  } = useChatStore(
    useShallow(state => ({
      showInput: state.showInput,
      showButton: state.showButton,
      isInitialMessage: state.isInitialMessage,
      setShowButton: state.setShowButton,
      setIsInitialMessage: state.setIsInitialMessage,
      handleClick: state.handleClick,
      editingMessageId: state.editingMessageId,
      setEditingMessageId: state.setEditingMessageId,
      editMessage: state.editMessage,
    }))
  );

  const isEditing = editingMessageId === userMessage.id;

  useEffect(() => {
    setIsInitialMessage(userMessage, isLastCard);
  }, [userMessage, isLastCard, setIsInitialMessage]);

  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (cardRef.current && onHeightChange) {
      onHeightChange(cardRef.current.offsetHeight);
    }
  }, [onHeightChange, userMessage, agentMessage, isEditing]);

  const handleEditClick = () => {
    setEditingMessageId(userMessage.id);
  };

  const handleSaveEdit = (newText: string) => {
    editMessage(userMessage.id, newText);
    setEditingMessageId(null);
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
  };

  return (
    <div
      ref={cardRef}
      className="flex flex-col w-full overflow-hidden rounded-xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group relative animate-fade-in"
      onMouseEnter={() => !isInitialMessage && setShowButton(true)}
      onMouseLeave={() => !isInitialMessage && setShowButton(false)}
    >
      {/* Edit button - positioned in top-right corner */}
      {!isThinking && !isEditing && (
        <button
          onClick={handleEditClick}
          className="absolute top-3 cursor-pointer right-3 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 shadow-sm hover:shadow-md"
          title="Edit message"
        >
          <FiEdit3 className="w-4 h-4" />
        </button>
      )}

      {/* Show thinking indicator for entire card when thinking */}
      {isLastCard && isThinking ? (
        <div className="border-l-4 border-blue-400 bg-blue-300 transition-all duration-300 h-auto">
          <ThinkingIndicator />
        </div>
      ) : (
        <>
          {/* User message or edit input */}
          <div className="transition-all duration-300 transform hover:scale-[1.01]">
            {isEditing && !isInitialMessage ? (
              <EditMessage
                message={userMessage}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
              />
            ) : (
              <UserMessage message={userMessage} isInitialMessage={isInitialMessage} />
            )}
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
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 !cursor-pointer flex items-center space-x-2"
          >
            <BiMessageRoundedDots />
            <span>Ask a follow up question</span>
          </button>
        </div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ background: '#3b82f6', top: '50%', transform: 'translateY(-50%)' }}
      />
    </div>
  );
}
