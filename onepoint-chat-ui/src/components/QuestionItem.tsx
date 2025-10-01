import { useShallow } from 'zustand/react/shallow';
import useChatStore from '../store/chatStore';
import { Question } from '../type/types';

type QuestionItemProps = {
  question: Question;
  sendMessageToServer: (text: string) => void;
};

export default function QuestionItem({ question, sendMessageToServer }: QuestionItemProps) {
  const { handleTopicAction } = useChatStore(
    useShallow(state => ({
      handleTopicAction: state.handleTopicAction,
    }))
  );

  const handleClick = () => {
    handleTopicAction({
      type: 'question',
      question: question,
    });
    sendMessageToServer(question.text);
  };

  return (
    <button
      className="group w-full p-3 text-left cursor-pointer rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        {/* Clean bullet point */}
        <div className="flex-shrink-0 mt-2">
          <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
        </div>

        {/* Question text */}
        <div className="flex-1 min-w-0">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {question.text}
          </p>
        </div>
      </div>
    </button>
  );
}
