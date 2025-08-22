import { Topic } from '../type/types';

interface TopicButtonProps {
  topic: Topic;
  index: number;
  onTopicClick: (topic: Topic) => void;
}

export default function TopicButton({ topic, index, onTopicClick }: TopicButtonProps) {
  // Get topic colors for unique styling
  const getTopicColors = (topicName: string) => {
    const colorSchemes = [
      {
        gradient: 'from-blue-50 to-blue-100',
        border: 'border-blue-200',
        hover: 'hover:from-blue-100 hover:to-blue-200',
        text: 'text-blue-700',
        hoverText: 'group-hover:text-blue-800',
      },
      {
        gradient: 'from-purple-50 to-purple-100',
        border: 'border-purple-200',
        hover: 'hover:from-purple-100 hover:to-purple-200',
        text: 'text-purple-700',
        hoverText: 'group-hover:text-purple-800',
      },
      {
        gradient: 'from-emerald-50 to-emerald-100',
        border: 'border-emerald-200',
        hover: 'hover:from-emerald-100 hover:to-emerald-200',
        text: 'text-emerald-700',
        hoverText: 'group-hover:text-emerald-800',
      },
      {
        gradient: 'from-orange-50 to-orange-100',
        border: 'border-orange-200',
        hover: 'hover:from-orange-100 hover:to-orange-200',
        text: 'text-orange-700',
        hoverText: 'group-hover:text-orange-800',
      },
      {
        gradient: 'from-cyan-50 to-cyan-100',
        border: 'border-cyan-200',
        hover: 'hover:from-cyan-100 hover:to-cyan-200',
        text: 'text-cyan-700',
        hoverText: 'group-hover:text-cyan-800',
      },
    ];

    const colorIndex = topicName.length % colorSchemes.length;
    return colorSchemes[colorIndex];
  };

  const colors = getTopicColors(topic.name);

  return (
    <button
      key={topic.name || index}
      onClick={() => onTopicClick(topic)}
      className={`group relative bg-gradient-to-br ${colors.gradient} ${colors.hover} p-3 rounded-xl border ${colors.border} transition-all duration-200 hover:shadow-md active:scale-95`}
    >
      {/* Content */}
      <div className="flex items-center">
        <div className="flex-1 text-left min-w-0">
          <h4
            className={`font-medium ${colors.text} ${colors.hoverText} text-sm leading-tight truncate`}
          >
            {topic.name}
          </h4>
        </div>
        <div className="flex-shrink-0 ml-2">
          <div
            className={`w-4 h-4 ${colors.text} opacity-50 group-hover:opacity-80 transition-opacity`}
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
