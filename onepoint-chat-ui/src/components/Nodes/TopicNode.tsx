import { Position } from '@xyflow/react';

import { Handle } from '@xyflow/react';
import { useChat } from '../../hooks/useChat';

type TopicNodeData = {
  label: string;
  topic: { description?: string; text?: string; name?: string };
  onClick?: () => void;
};

export default function TopicNode({ data }: { data: TopicNodeData }) {
  const { isStreaming } = useChat();

  return (
    <div
      className={`bg-[#fafffe] dark:!bg-[#1F1925] border border-[#636565] dark:border-[#fafffe] px-4 py-2 rounded-xl shadow-sm cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:border-[#9a19ff] dark:hover:border-[#9a19ff] w-full max-w-xs group flex flex-col justify-around  ${isStreaming ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={isStreaming ? undefined : data.onClick}
      style={{ minWidth: 250, maxWidth: 320, wordBreak: 'break-word' }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base font-semibold text-gray-800 dark:!text-[#fafffe] group-hover:!text-[#9a19ff] dark:group-hover:!text-[#9a19ff]">
          {data.label}
        </span>
      </div>

      {(data.topic?.description || data.topic?.text) && (
        <div
          className="text-xs text-gray-600 dark:!text-[#fafffe] mt-1 line-clamp-2 group-hover:text-gray-800 dark:group-hover:!text-[#fafffe]"
          style={{ whiteSpace: 'pre-line' }}
        >
          {data.topic.description || data.topic.text}
        </div>
      )}

      {/* Desktop handles */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ background: '#9a19ff', top: '50%', transform: 'translateY(-50%)' }}
      />
    </div>
  );
}
