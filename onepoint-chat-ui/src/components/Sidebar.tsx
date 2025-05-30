import { Question } from '../type/types';
import QuestionItem from './QuestionItem';

type SidebarProps = {
  questions: Question[];
  onQuestionClick: (question: Question) => void;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
};

export default function Sidebar({
  questions,
  onQuestionClick,
  toggleSidebar,
  isSidebarOpen,
}: SidebarProps) {
  return (
    <div className="h-screen lg:!sticky top-0 z-[120]">
      <div className="flex flex-col h-full">
        <div
          className={`${isSidebarOpen ? '!w-full opacity-100' : '!w-0 opacity-0'} transition-all duration-300 lg:bg-transparent fixed inset-0 bg-black/50 z-[85] lg:!relative`}
          onClick={toggleSidebar}
        >
          <div
            className={`fixed inset-y-0 ${isSidebarOpen ? 'block left-0 w-[280px] lg:!w-[385px]' : '-left-[1180px] w-0 hidden'} transition-all duration-300 lg:!bg-blue-50 lg:!relative bg-white z-50 flex flex-col h-full`}
            onClick={e => e.stopPropagation()}
          >
            {/* Mobile Header */}
            <div className="border-b border-gray-200 lg:!hidden !block">
              <div className="flex items-center justify-between px-4 h-14">
                <h1 className="text-lg font-semibold text-gray-900">OSCA</h1>
                <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Questions Section */}
            <div className="flex-1 min-h-screen overflow-y-auto">
              <div className="p-4">
                <h2 className="px-2 mb-4 text-lg font-medium text-left text-gray-900">
                  How can I help you today?
                </h2>
                <div className="space-y-2">
                  {questions.map(question => (
                    <QuestionItem
                      key={question.id}
                      question={question}
                      onClick={() => {
                        onQuestionClick(question);
                        toggleSidebar();
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="p-4 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500">
                Powered by Onepoint's Smart Cognitive Assistant
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
