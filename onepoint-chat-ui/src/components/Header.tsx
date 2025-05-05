import { Message } from '../type/types';
import { exportChatToMarkdown } from '../utils/exportChatToMarkdown';
import GradientButton from './GradientButton';

interface HeaderProps {
  handleRestart: () => void;
  chatHistory: Message[];
}

export default function Header({ handleRestart, chatHistory }: HeaderProps) {
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
                  OSCA
                </h1>
                <p className="text-gray-600 lg:text-base text-sm md:block hidden">
                  Onepoint's Smart Cognitive Assistant
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

              <GradientButton
                onClick={() => {
                  const date = new Date().toISOString().split('T')[0];
                  exportChatToMarkdown(chatHistory, `chat-history-${date}.md`);
                }}
                title="Export chat history to Markdown file"
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
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
