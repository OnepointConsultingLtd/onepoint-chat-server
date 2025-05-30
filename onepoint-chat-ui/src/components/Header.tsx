import { nameDescription, siteName } from '../lib/constants';
import { Message } from '../type/types';
import { exportChatToMarkdown, exportChatToPDF } from '../utils/exportChat';
import GradientButton from './GradientButton';
import { useState, useRef, useEffect, ReactNode } from 'react';

interface HeaderProps {
  handleRestart: () => void;
  chatHistory: Message[];
}

// Mini button component for dropdown items
type MiniGradientButtonProps = {
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
};

const MiniGradientButton = ({ onClick, icon, children }: MiniGradientButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full cursor-pointer px-4 py-3 text-left text-sm flex items-center transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transform hover:translate-x-1"
    >
      <div className="mr-3 flex-shrink-0">{icon}</div>
      <span className="text-gray-700 font-medium">{children}</span>
    </button>
  );
};

export default function Header({ handleRestart, chatHistory }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleExport = (type: 'markdown' | 'pdf') => {
    const date = new Date().toISOString().split('T')[0];

    if (type === 'markdown') {
      exportChatToMarkdown(chatHistory, `chat-history-${date}.md`);
    } else {
      exportChatToPDF(chatHistory, `chat-history-${date}.pdf`);
    }

    setShowDropdown(false);
  };

  // Icons for dropdown menu options
  const markdownIcon = (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9h6M9 13h6M9 17h6" />
    </svg>
  );

  const pdfIcon = (
    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12v5m-3-3h6" />
    </svg>
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <header className="bg-white p-4 w-full relative">
          <div className="flex items-center space-x-4 w-full justify-between">
            {/* Logo, title and description */}
            <div className="flex items-center space-x-4 pr-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full hidden md:flex items-center justify-center shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text">
                  {siteName}
                </h1>
                <p className="text-gray-600 lg:text-base text-sm md:block hidden">
                  {nameDescription}
                </p>
              </div>
            </div>

            <div className="flex justify-start md:flex-row flex-col gap-4 space-x-2">
              <GradientButton
                onClick={handleRestart}
                icon={
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 ease-out group-hover:rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                }
              >
                New Chat
              </GradientButton>

              <div className="relative" ref={dropdownRef}>
                <GradientButton
                  onClick={() => setShowDropdown(!showDropdown)}
                  title="Export chat history"
                  icon={
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 ease-out group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  }
                >
                  Download Chat
                </GradientButton>

                {showDropdown && (
                  <div className="absolute left-4 mt-2 w-56 bg-white rounded-md shadow-lg z-10 overflow-hidden border border-gray-200 animate-fade-in">
                    <div className="py-1">
                      <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                        Export Options
                      </div>
                      <MiniGradientButton
                        onClick={() => handleExport('markdown')}
                        icon={markdownIcon}
                      >
                        Markdown (.md)
                      </MiniGradientButton>

                      <MiniGradientButton onClick={() => handleExport('pdf')} icon={pdfIcon}>
                        PDF Document (.pdf)
                      </MiniGradientButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
