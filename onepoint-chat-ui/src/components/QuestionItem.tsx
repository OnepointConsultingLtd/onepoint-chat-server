import { Question } from '../type/types';

type QuestionItemProps = {
  question: Question;
  onClick: () => void;
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

export default function QuestionItem({ question, onClick }: QuestionItemProps) {
  return (
    <button
      className="group w-full p-4 text-left bg-white hover:bg-indigo-50 cursor-pointer rounded-xl transition-all duration-200 border border-gray-100 hover:border-indigo-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md mr-3">
          <QuestionIcon />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-800 font-medium line-clamp-2 group-hover:text-indigo-700 transition-colors">
            {question.text}
          </p>
        </div>
        <div className="ml-3 flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}
