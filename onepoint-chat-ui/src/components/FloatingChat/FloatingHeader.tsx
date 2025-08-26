import { useState } from 'react';
import { CiExport } from 'react-icons/ci';
import { FaMarkdown } from 'react-icons/fa';
import { FiCheck, FiShare2 } from 'react-icons/fi';
import { MdOutlineRestartAlt, MdPictureAsPdf } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useExport } from '../../hooks/useExport';
import { handleCopyToClipboard } from '../../lib/handleCopyToClipboard';
import useChatStore from '../../store/chatStore';

export default function FloatingHeader() {
  const { isDark, toggleTheme } = useDarkMode();

  const {
    messages,
    generateShareableId,
    isInitialMessage,
    exportChatToPDF,
    handleRestart,
    toggleFloatingChat,
    isThreadShareMode,
  } = useChatStore(
    useShallow(state => ({
      messages: state.messages,
      generateShareableId: state.generateShareableId,
      isInitialMessage: state.isInitialMessage,
      exportChatToPDF: state.exportChatToPDF,
      handleRestart: state.handleRestart,
      toggleFloatingChat: state.toggleFloatingChat,
      isThreadShareMode: state.isThreadShareMode,
    }))
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const { handleExport, isExportingPdf } = useExport({
    messages,
    exportChatToPDF,
    onSuccess: () => {
      setShowDropdown(false);
    },
    onError: () => {
      setShowDropdown(false);
    },
  });

  const handleShare = async () => {
    const shareableUrl = generateShareableId();

    if (isInitialMessage || !shareableUrl) {
      return;
    }

    handleCopyToClipboard({ text: shareableUrl, setCopied });
  };

  const hasConversation = messages && messages.length >= 2 && !isInitialMessage;

  return (
    <header className="sticky top-0 z-10 w-full p-3 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between w-full space-x-2">
        <h1 className="text-3xl font-bold text-[#0284c7] dark:text-blue-400">OSCA</h1>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>
          {!isThreadShareMode && (
            <>
              {/* Share Button */}
              {hasConversation && (
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                  title={copied ? 'URL copied!' : 'Share this conversation'}
                >
                  {copied ? (
                    <FiCheck className="w-4 h-4 text-green-600" />
                  ) : (
                    <FiShare2 className="w-4 h-4" />
                  )}
                </button>
              )}

              <button
                onClick={handleRestart}
                className="p-2 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                title="Start new chat"
              >
                <MdOutlineRestartAlt />
                <span className="text-xs hidden sm:block">New</span>
              </button>

              {/* Export Button */}
              {hasConversation && (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="p-2 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                    title="Export conversation"
                  >
                    <CiExport className="w-4 h-4" />
                  </button>

                  {showDropdown && (
                    <>
                      {/* Dropdown menu */}
                      {/* center from left and right */}
                      <div className="absolute mt-2 w-fit md:w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-40 border border-gray-200 dark:border-gray-700 overflow-hidden transform left-1/2 -translate-x-1/2">
                        <button
                          onClick={() => handleExport('markdown')}
                          className="w-full px-3 py-2 text-left text-sm cursor-pointer flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
                        >
                          <FaMarkdown className="w-4 h-4 mr-2" />
                          Markdown
                        </button>
                        <button
                          onClick={() => handleExport('pdf')}
                          disabled={isExportingPdf}
                          className="w-full px-3 py-2 text-left text-sm cursor-pointer flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 text-gray-700 dark:text-gray-200"
                        >
                          <MdPictureAsPdf className="w-4 h-4 mr-2" />
                          {isExportingPdf ? 'Generating...' : 'PDF'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-1">
          {/* New Chat Button */}

          {/* Close Button */}
          <button
            className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-300"
            onClick={toggleFloatingChat}
            title="Close chat"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition"
            >
              <path
                d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
