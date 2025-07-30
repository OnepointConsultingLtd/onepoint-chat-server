import { useShallow } from 'zustand/react/shallow';
import useChatStore from '../store/chatStore';
import { Question } from '../type/types';

type QuestionItemProps = {
  question: Question;
  sendMessageToServer: (text: string) => void;
};

const QuestionIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default function QuestionItem({ question, sendMessageToServer }: QuestionItemProps) {
  const { handleQuestionClick } = useChatStore(
    useShallow(state => ({
      handleQuestionClick: state.handleQuestionClick,
    }))
  );

  const handleClick = () => {
    handleQuestionClick(question);
    sendMessageToServer(question.text);
  };

  // Topic-based color schemes
  const getTopicColors = (label?: string) => {
    switch (label?.toLowerCase()) {
      case 'onepoint':
        return {
          iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
          labelBg: 'bg-blue-100 dark:bg-blue-900/50',
          labelText: 'text-blue-700 dark:text-blue-300',
          hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
          hoverBorder: 'hover:border-blue-200 dark:hover:border-blue-700',
          hoverText: 'group-hover:text-blue-700 dark:group-hover:text-blue-300',
        };
      case 'ai':
        return {
          iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
          labelBg: 'bg-purple-100 dark:bg-purple-900/50',
          labelText: 'text-purple-700 dark:text-purple-300',
          hoverBg: 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
          hoverBorder: 'hover:border-purple-200 dark:hover:border-purple-700',
          hoverText: 'group-hover:text-purple-700 dark:group-hover:text-purple-300',
        };
      case 'boomi':
        return {
          iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
          labelBg: 'bg-green-100 dark:bg-green-900/50',
          labelText: 'text-green-700 dark:text-green-300',
          hoverBg: 'hover:bg-green-50 dark:hover:bg-green-900/20',
          hoverBorder: 'hover:border-green-200 dark:hover:border-green-700',
          hoverText: 'group-hover:text-green-700 dark:group-hover:text-green-300',
        };
      case 'dark data':
        return {
          iconBg: 'bg-gradient-to-br from-slate-500 to-slate-600',
          labelBg: 'bg-slate-100 dark:bg-slate-800/50',
          labelText: 'text-slate-700 dark:text-slate-300',
          hoverBg: 'hover:bg-slate-50 dark:hover:bg-slate-800/20',
          hoverBorder: 'hover:border-slate-200 dark:hover:border-slate-600',
          hoverText: 'group-hover:text-slate-700 dark:group-hover:text-slate-300',
        };
      case 'large language models':
        return {
          iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
          labelBg: 'bg-orange-100 dark:bg-orange-900/50',
          labelText: 'text-orange-700 dark:text-orange-300',
          hoverBg: 'hover:bg-orange-50 dark:hover:bg-orange-900/20',
          hoverBorder: 'hover:border-orange-200 dark:hover:border-orange-700',
          hoverText: 'group-hover:text-orange-700 dark:group-hover:text-orange-300',
        };
      default:
        return {
          iconBg: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
          labelBg: 'bg-indigo-100 dark:bg-indigo-900/50',
          labelText: 'text-indigo-700 dark:text-indigo-300',
          hoverBg: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20',
          hoverBorder: 'hover:border-indigo-200 dark:hover:border-indigo-700',
          hoverText: 'group-hover:text-indigo-700 dark:group-hover:text-indigo-300',
        };
    }
  };

  const colors = getTopicColors(question.label);

  return (
    <button
      className={`group w-full p-2 text-left bg-white dark:bg-gray-800 ${colors.hoverBg} cursor-pointer rounded-xl transition-all duration-200 border border-gray-100 dark:border-gray-700 ${colors.hoverBorder} shadow-sm hover:shadow-md dark:shadow-gray-900/25 transform hover:-translate-y-0.5 relative`}
      onClick={handleClick}
    >
      <div className="flex items-start">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full ${colors.iconBg} flex items-center justify-center text-white shadow-md mr-3 mt-1`}
        >
          <QuestionIcon />
        </div>
        <div className="flex-1 min-w-0">
          {question.label && (
            <div className="mb-2">
              <span
                className={`inline-block px-2 py-1 text-xs font-medium ${colors.labelText} ${colors.labelBg} rounded-full`}
              >
                {question.label}
              </span>
            </div>
          )}
          <p
            className={`text-gray-800 dark:text-gray-200 text-sm font-medium ${colors.hoverText} transition-colors leading-relaxed`}
          >
            {question.text}
          </p>
        </div>
        <div className="ml-3 flex-shrink-0 absolute top-3 right-2">
          <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}
