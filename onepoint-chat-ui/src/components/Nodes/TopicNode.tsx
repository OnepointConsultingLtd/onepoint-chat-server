import { Position } from '@xyflow/react';

import { Handle } from '@xyflow/react';
import { useChat } from '../../hooks/useChat';

type TopicNodeData = {
  label: string;
  topic: { description?: string; text?: string; name?: string };
  onClick?: () => void;
  isMobile?: boolean;
};

export default function TopicNode({ data }: { data: TopicNodeData }) {
  const { isStreaming } = useChat();
  const { isMobile = false } = data;

  return (
    <div
      className={`bg-white dark:bg-gray-700 border border-gray-400 dark:border-[#0d8ecb] px-4 py-2 rounded-xl shadow-sm cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl w-full max-w-xs group flex flex-col justify-around  ${isStreaming ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={isStreaming ? undefined : data.onClick}
      style={{ minWidth: 250, maxWidth: 320, wordBreak: 'break-word' }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base font-semibold text-gray-800 dark:text-gray-300 group-hover:!text-gray-600 dark:group-hover:!text-gray-200">
          {data.label}
        </span>
      </div>

      {(data.topic?.description || data.topic?.text) && (
        <div
          className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2 group-hover:text-gray-800 dark:group-hover:text-gray-200"
          style={{ whiteSpace: 'pre-line' }}
        >
          {data.topic.description || data.topic.text}
        </div>
      )}

      {/* Responsive handles */}
      {isMobile ? (
        <Handle
          type="target"
          position={Position.Top}
          id="top"
          style={{ background: '#3b82f6', left: '50%', transform: 'translateX(-50%)' }}
        />
      ) : (
        <Handle
          type="target"
          position={Position.Left}
          id="left"
          style={{ background: '#3b82f6', top: '50%', transform: 'translateY(-50%)' }}
        />
      )}
    </div>
  );
}
