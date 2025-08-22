import { useShallow } from 'zustand/react/shallow';
import { FloatingChatButton } from '../../chat';
import { interceptServerError } from '../../lib/interceptServerError';
import useChatStore from '../../store/chatStore';
import { ChatInputProps } from '../../type/types';
import ChatInput from '../ChatInput';
import ErrorCard from '../flow/ErrorCard';
import Messages from '../Messages';
import FloatingHeader from './FloatingHeader';

export default function FloatingChatMain({
  handleSubmit,
  sendMessageToServer,
  messagesEndRef,
}: ChatInputProps) {
  const { isFloatingOpen, toggleFloatingChat, messages } = useChatStore(
    useShallow(state => ({
      isFloatingOpen: state.isFloatingOpen,
      toggleFloatingChat: state.toggleFloatingChat,
      messages: state.messages,
    }))
  );
  const isError = interceptServerError(messages);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900 p-2 lg:p-6 relative">
      <div className="max-w-full lg:max-w-sm w-full text-center">
        {/* Logo/Brand Section */}
        <div className="mb-12">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
            <svg
              className="w-8 h-8 text-white"
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Meet OSCA</h1>
          <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-2">
            Onepoint Smart Company Advisor
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Powered by Onepoint AI</p>
        </div>

        {/* Description */}
        <div className="mb-10 px-5">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Your AI guide to data strategy, AI innovation, and solution architecture.
          </p>
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
                <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <div className="w-full mx-auto">
                    <div className="flex flex-col gap-2">
                      <ChatInput
                        handleSubmit={handleSubmit}
                        sendMessageToServer={sendMessageToServer}
                        messagesEndRef={messagesEndRef}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {!isFloatingOpen && <FloatingChatButton click={toggleFloatingChat} />}
      </div>
    </div>
  );
}
