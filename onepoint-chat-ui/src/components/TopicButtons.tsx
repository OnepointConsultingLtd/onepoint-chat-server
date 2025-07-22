import useChatStore from '../store/chatStore';
import { useShallow } from 'zustand/react/shallow';

function TopicButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden bg-white border border-gray-200 hover:border-blue-300 rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
    >
      <div className="relative flex items-center gap-2">
        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
          {label.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-300">
          {label}
        </span>
      </div>
    </button>
  );
}

export default function TopicButtons() {
  const {
    handleTopicClick,
    relatedTopics,
    isInitialMessage,
    setSelectedTopic,
    relatedTopicsLoading,
  } = useChatStore(
    useShallow(state => ({
      handleTopicClick: state.handleTopicClick,
      relatedTopics: state.relatedTopics,
      isInitialMessage: state.isInitialMessage,
      setSelectedTopic: state.setSelectedTopic,
      relatedTopicsLoading: state.relatedTopicsLoading,
    }))
  );

  const predefinedTopics = [
    'Rapid Health Check',
    'Digital Transformation',
    'Digital Services',
    'AI Agents',
    'Boomi',
  ];

  const handlePredefinedTopicClick = (topic: string) => {
    const topicObj = { name: topic, description: '', type: 'predefined', questions: [] };
    setSelectedTopic(topicObj);
    handleTopicClick(topicObj);
  };

  // Handler for when a user clicks a related topic
  const handleRelatedTopicClick = (topic: {
    name: string;
    description: string;
    type: string;
    questions: string[];
  }) => {
    setSelectedTopic(topic);
    handleTopicClick(topic);
  };

  console.log('relatedTopics test', relatedTopics);

  return (
    <div className={`mt-4 space-y-3`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <span className="text-sm font-medium text-gray-700 uppercase tracking-wider">
          Select a Topic
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {isInitialMessage ? (
          predefinedTopics.map(topic => (
            <TopicButton
              key={topic}
              label={topic}
              onClick={() => handlePredefinedTopicClick(topic)}
            />
          ))
        ) : relatedTopicsLoading ? (
          <div className="w-full flex justify-center py-8">
            <span>Loading related topics...</span>
          </div>
        ) : (
          relatedTopics?.topics?.map((topic, index) => (
            <TopicButton
              key={`${topic.name}-${index}`}
              label={topic.name}
              onClick={() => handleRelatedTopicClick(topic)}
            />
          ))
        )}
      </div>
    </div>
  );
}
