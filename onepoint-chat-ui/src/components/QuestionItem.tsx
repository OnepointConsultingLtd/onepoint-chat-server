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
      className="group w-full p-3 text-left cursor-pointer rounded-lg bg-gray-50 dark:!bg-[#1F1925] hover:bg-gray-100 dark:hover:bg-[#2a1f35] border border-[#636565] dark:border-[#fafffe] hover:border-[#9a19ff] dark:hover:border-[#9a19ff] transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#9a19ff]/50"
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        {/* Clean bullet point */}
        <div className="flex-shrink-0 mt-2">
          <div className="w-1.5 h-1.5 bg-[#9a19ff] dark:bg-[#9a19ff] rounded-full"></div>
        </div>

        {/* Question text */}
        <div className="flex-1 min-w-0">
          <p className="text-gray-700 dark:!text-[#fafffe] text-sm leading-relaxed">
            {question.text}
          </p>
        </div>
      </div>
    </button>
  );
}
