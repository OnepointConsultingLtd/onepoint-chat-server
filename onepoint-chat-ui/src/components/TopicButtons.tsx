import useChatStore from '../store/chatStore';
import { useShallow } from 'zustand/react/shallow';

export default function TopicButtons() {
  const { handleTopicClick, topics } = useChatStore(
    useShallow(state => ({
      handleTopicClick: state.handleTopicClick,
      topics: state.topics,
    }))
  );

  if (!topics || topics.topics.length === 0) {
    return null;
  }

  return (
    <div className={`mt-4 space-y-3 `}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <span className="text-sm font-medium text-gray-700 uppercase tracking-wider">
          Related Topics
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {topics?.topics?.map((topic, index) => (
          <button
            key={`${topic.name}-${index}`}
            onClick={() => handleTopicClick(topic)}
            className="group relative overflow-hidden bg-white border border-gray-200 hover:border-blue-300 rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Content */}
            <div className="relative flex items-center gap-2">
              {/* Topic icon */}
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                {topic.name.charAt(0).toUpperCase()}
              </div>

              {/* Topic name */}
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-300">
                {topic.name}
              </span>

              {/* Arrow icon */}
              <svg
                className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-indigo-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>
    </div>
  );
}
