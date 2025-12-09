import { TopicOrQuestion } from '../type/types';

interface TopicButtonProps {
  topic: TopicOrQuestion;
  index: number;
  onTopicClick: (topic: TopicOrQuestion) => void;
}

export default function TopicButton({ topic, index, onTopicClick }: TopicButtonProps) {
  const topicName = 'name' in topic ? topic.name : topic.label;

  return (
    <button
      key={'name' in topic ? topic.name : topic.label || index}
      onClick={() => onTopicClick(topic)}
      className={`group relative bg-[#fafffe] dark:!bg-[#1F1925] p-3 rounded-xl border border-[#636565] dark:border-[#fafffe] hover:border-[#9a19ff] dark:hover:border-[#9a19ff] transition-all duration-200 hover:shadow-md active:scale-95`}
    >
      {/* Content */}
      <div className="flex items-center">
        <div className="flex-1 text-left min-w-0">
          <h4
            className={`font-medium text-gray-700 dark:!text-[#fafffe] group-hover:text-[#9a19ff] dark:group-hover:text-[#9a19ff] text-sm leading-tight truncate`}
          >
            {topicName}
          </h4>
        </div>
        <div className="flex-shrink-0 ml-2">
          <div
            className={`w-4 h-4 text-gray-700 dark:!text-[#fafffe] group-hover:text-[#9a19ff] dark:group-hover:text-[#9a19ff] opacity-50 group-hover:opacity-80 transition-opacity`}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}
