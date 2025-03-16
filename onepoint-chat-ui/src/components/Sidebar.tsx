import React from "react";
import { Question } from "../hooks/useChat";
import QuestionItem from "./QuestionItem";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  onQuestionClick: (question: Question) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  questions,
  onQuestionClick,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50  z-[85] lg:!relative"
      onClick={onClose}
    >
      <div
        className="fixed inset-y-0 left-0 w-[280px] lg:!bg-blue-50 lg:!w-[385px] lg:!relative bg-white z-50 flex flex-col h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Header */}
        <div className="border-b border-gray-200 lg:!hidden !block">
          <div className="h-14 flex items-center justify-between px-4">
            <h1 className="text-lg font-semibold text-gray-900">OSCA</h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
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
        <div className="flex-1 overflow-y-auto min-h-screen">
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4 text-left px-2">
              How can I help you today?
            </h2>
            <div className="space-y-2">
              {questions.map((question) => (
                <QuestionItem
                  key={question.id}
                  question={question}
                  onClick={() => {
                    onQuestionClick(question);
                    onClose();
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="border-t border-gray-200 p-4">
          <p className="text-xs text-gray-500 text-center">
            Powered by Onepoint's Smart Cognitive Assistant
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
