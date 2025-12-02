import { useShallow } from 'zustand/react/shallow';
import { interceptServerError } from '../../lib/interceptServerError';
import useChatStore from '../../store/chatStore';
import ChatInput from '../ChatInput';
import ErrorCard from '../flow/ErrorCard';
import Messages from '../Messages';
import FloatingChatButton from './FloatingChatButton';
import FloatingHeader from './FloatingHeader';
import FeatureHighlights from './FeatureHighlights';
import { PROJECT_INFO } from '../../lib/constants';

type FloatingChatMainProps = {
  handleSubmit: (text: string) => void;
  sendMessageToServer: (text: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
};

export default function FloatingChatMain({
  handleSubmit,
  sendMessageToServer,
  messagesEndRef,
}: FloatingChatMainProps) {
  const { isFloatingOpen, toggleFloatingChat, messages, isThreadShareMode } = useChatStore(
    useShallow(state => ({
      isFloatingOpen: state.isFloatingOpen,
      toggleFloatingChat: state.toggleFloatingChat,
      messages: state.messages,
      isThreadShareMode: state.isThreadShareMode,
    }))
  );
  const isError = interceptServerError(messages);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 p-3 sm:p-4 lg:p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl hidden sm:block"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl hidden sm:block"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl hidden sm:block"></div>
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Logo/Brand Section */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 md:mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl sm:shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 px-2">
            Meet {PROJECT_INFO.NAME}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-2 sm:mb-3 px-2">
            Onepoint Smart Company Advisor
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 px-2">
            Powered by Onepoint AI
          </p>
        </div>

        {/* Description */}
        <div className="mb-8 sm:mb-12 md:mb-16 px-2 sm:px-4">
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6 sm:mb-8 md:mb-12 max-w-xl mx-auto">
            Your AI guide to data strategy, AI innovation, and solution architecture.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-12 max-w-4xl mx-auto">
            <FeatureHighlights
              title="Data Strategy"
              description="Expert guidance on data governance and management"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </FeatureHighlights>

            <FeatureHighlights
              title="AI Innovation"
              description="Cutting-edge AI solutions and implementation"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </FeatureHighlights>
          </div>
          <div className="max-w-md mx-auto">
            <FeatureHighlights
              title="Architecture"
              description="Robust solution design and architecture planning"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </FeatureHighlights>
          </div>
        </div>

        {isError ? (
          <ErrorCard
            title="Connection Error"
            message="We were unable to connect to the server. Please check your internet connection or try again later."
          />
        ) : (
          isFloatingOpen && (
            <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900">
              <div className="flex flex-col h-full">
                {/* Header */}
                <FloatingHeader />

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
                  <Messages
                    messagesEndRef={messagesEndRef}
                    sendMessageToServer={sendMessageToServer}
                  />
                </div>

                {/* Input Container */}
                {!isThreadShareMode && (
                  <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div className="w-full mx-auto">
                      <div className="flex flex-col gap-2">
                        <ChatInput handleSubmit={handleSubmit} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        )}

        {!isFloatingOpen && <FloatingChatButton click={toggleFloatingChat} />}
      </div>
    </div>
  );
}
