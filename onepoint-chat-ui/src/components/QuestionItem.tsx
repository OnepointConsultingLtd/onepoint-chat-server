import React from "react";
import { Question } from "../type/types";

interface QuestionItemProps {
  question: Question;
  onClick: () => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, onClick }) => {
  return (
    <button
      className="group w-full p-4 text-left bg-[#f8fafc] cursor-pointer hover:bg-[#f1f5f9] rounded-lg transition-colors duration-200"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          </div>
          <p className="text-[#0369a1] text-sm font-medium">{question.text}</p>
        </div>
        <svg
          className="w-5 h-5 text-gray-400"
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
    </button>
  );
};

export default QuestionItem;
