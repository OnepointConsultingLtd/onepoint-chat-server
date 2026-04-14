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
      className={`bg-[color:var(--osca-bg-light)] dark:!bg-[color:var(--osca-bg-dark)] border border-[color:var(--osca-border-light)] dark:border-[color:var(--osca-border-dark)] px-4 py-2 rounded-xl shadow-sm cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:border-[color:var(--osca-accent)] dark:hover:border-[color:var(--osca-accent)] w-full max-w-xs group flex flex-col justify-around  ${isStreaming ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={isStreaming ? undefined : data.onClick}
      style={{ minWidth: 250, maxWidth: 320, wordBreak: 'break-word' }}
    >
      {data.label && (
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base font-semibold text-gray-800 dark:!text-[color:var(--osca-text-on-dark)] group-hover:!text-[color:var(--osca-accent)] dark:group-hover:!text-[color:var(--osca-accent)]">
            {data.label}
          </span>
        </div>
      )}

      {(data.topic?.description || data.topic?.text) && (
        <div
          className="text-xs text-gray-600 dark:!text-[color:var(--osca-text-on-dark)] line-clamp-2 group-hover:text-gray-800 dark:group-hover:!text-[color:var(--osca-text-on-dark)]"
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
        style={{ background: 'var(--osca-accent)', top: '50%', transform: 'translateY(-50%)' }}
      />
    </div>
  );
}
