import { useState } from 'react';
import { ReferenceSource } from '../type/types';

interface ReferenceSourcesProps {
  sources: ReferenceSource[];
}


export default function ReferenceSources({ sources }: ReferenceSourcesProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mt-2">
        <div className="border border-[#636565] dark:border-[#fafffe] rounded-lg overflow-hidden bg-[#fafffe] dark:!bg-[#1F1925]/50 shadow-sm hover:shadow-md hover:border-[#9a19ff] dark:hover:border-[#9a19ff] transition-shadow duration-300">
          <button
            className="w-full flex items-center cursor-pointer justify-between p-3 sm:p-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-all duration-300 group"
            onClick={toggleAccordion}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base sm:text-lg transition-transform duration-300 group-hover:scale-110">
                📚
              </span>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:!text-[#fafffe] group-hover:text-[#9a19ff] dark:group-hover:text-[#9a19ff] transition-colors duration-300">
                Reference Sources ({sources.length})
              </h4>
            </div>
            <svg
              className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ease-in-out rotate-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="px-3 sm:px-4 pb-3 pt-2.5 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-2 mt-1">
                {sources.map((source, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 sm:gap-3 px-2.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 animate-fade-in-up"
                  >
                    <span className="flex-shrink-0 w-6 h-6 sm:w-5 sm:h-5 bg-gray-100 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center text-xs font-semibold border border-[#636565] dark:border-[#fafffe]">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-[#70389b] hover:text-[#9a19ff] dark:text-[#8852b2] dark:hover:text-[#9a19ff] group-hover:!underline group-hover:!text-[#9a19ff] dark:group-hover:!text-[#9a19ff]">{source.title}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
