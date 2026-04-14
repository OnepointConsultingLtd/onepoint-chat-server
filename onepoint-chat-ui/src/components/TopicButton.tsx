import { TopicOrQuestion } from '../type/types';

interface TopicButtonProps {
  topic: TopicOrQuestion;
  onTopicClick: (topic: TopicOrQuestion) => void;
}

export default function TopicButton({ topic, onTopicClick }: TopicButtonProps) {
  const topicName = 'name' in topic ? topic.name : (topic.label || topic.text);

  return (
    <button
      type="button"
      onClick={() => onTopicClick(topic)}
      className="group flex min-h-[44px] w-full items-center gap-2 rounded-md border border-transparent bg-[color:var(--osca-bg-light)] px-2.5 py-2 text-left transition-colors active:bg-[color:color-mix(in_srgb,var(--osca-accent)_10%,transparent)] dark:bg-[color:var(--osca-surface-dark)] dark:active:bg-[color:color-mix(in_srgb,var(--osca-accent)_20%,transparent)]"
    >
      <span className="min-w-0 flex-1 text-[13px] leading-snug text-slate-700 line-clamp-2 dark:text-[color:var(--osca-text-on-dark)] sm:text-sm">
        {topicName}
      </span>
      <span
        className="shrink-0 text-slate-400 transition-colors group-hover:text-[color:var(--osca-accent)] dark:text-slate-500 dark:group-hover:text-[color:var(--osca-accent-secondary)]"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </button>
  );
}
