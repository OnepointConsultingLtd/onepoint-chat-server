import { useEffect } from 'react';
import { TfiReload } from 'react-icons/tfi';
import { useShallow } from 'zustand/react/shallow';
import { PROJECT_INFO } from '../lib/constants';
import useChatStore from '../store/chatStore';
import CloseIcon from './Menus/CloseIcon';
import QuestionItem from './QuestionItem';

type SidebarProps = {
  sendMessageToServer: (text: string) => void;
};

export default function Sidebar({ sendMessageToServer }: SidebarProps) {
  const {
    isSidebarOpen,
    toggleSidebar,
    topicQuestions,
    topicQuestionsLoading,
    topicQuestionsError,
    refreshQuestions,
  } = useChatStore(
    useShallow(state => ({
      isSidebarOpen: state.isSidebarOpen,
      toggleSidebar: state.toggleSidebar,
      topicQuestions: state.topicQuestions,
      topicQuestionsLoading: state.topicQuestionsLoading,
      topicQuestionsError: state.topicQuestionsError,
      refreshQuestions: state.refreshQuestions,
    }))
  );

  // Fetch topic questions on component mount
  useEffect(() => {
    if (topicQuestions.length === 0 && !topicQuestionsLoading) {
      refreshQuestions();
    }
  }, [topicQuestions.length, topicQuestionsLoading, refreshQuestions]);

  const renderQuestionsContent = () => {
    if (topicQuestionsLoading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 dark:border-gray-600 border-t-indigo-600 dark:border-t-indigo-400"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-300">Loading questions...</span>
        </div>
      );
    }

    if (topicQuestionsError) {
      return (
        <div className="text-center py-8">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-red-600 dark:text-red-400 mb-2 font-medium">
            Failed to load questions
          </p>
          <button
            onClick={refreshQuestions}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline text-sm font-medium transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    if (topicQuestions.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400">No questions available</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {topicQuestions.map((question, index) => (
          <QuestionItem
            key={question.id || index}
            question={question}
            sendMessageToServer={sendMessageToServer}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen lg:!sticky top-0 z-[120]">
      <div className="flex flex-col h-screen">
        <div
          className={`${isSidebarOpen ? '!w-full opacity-100' : '!w-0 opacity-0'} h-screen transition-all duration-300 lg:bg-transparent fixed inset-0 bg-black/60 backdrop-blur-sm z-[85] lg:!relative`}
          onClick={toggleSidebar}
        >
          <div
            className={`fixed inset-y-0 ${
              isSidebarOpen ? 'block left-0 w-[300px] lg:!w-[385px]' : '-left-[1180px] w-0 hidden'
            } transition-all duration-300 bg-white shadow-2xl lg:!shadow-xl lg:!relative z-50 flex flex-col h-full animate-fade-in`}
            onClick={e => e.stopPropagation()}
          >
            {/* Mobile Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 lg:!hidden !block bg-white dark:!bg-gray-800 shadow-sm">
              <div className="flex items-center justify-between px-5 h-16">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-[#0d8ecb] flex items-center justify-center mr-3 shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-white"
                    >
                      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                      <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {PROJECT_INFO.NAME}
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">AI Assistant</p>
                  </div>
                </div>
                <CloseIcon />
              </div>
            </div>

            {/* Desktop Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 hidden lg:!flex justify-between items-center bg-white dark:bg-gray-800">
              <div className="flex items-center px-6 py-5">
                <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center mr-4 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                    <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {PROJECT_INFO.NAME}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    {PROJECT_INFO.NAME_DESCRIPTION}
                  </p>
                </div>
              </div>
              <div className="px-6">
                <CloseIcon />
              </div>
            </div>

            {/* Questions Section */}
            <div
              className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#d1d5db transparent',
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                    How can I help you today?
                  </h2>
                  <button
                    onClick={refreshQuestions}
                    disabled={topicQuestionsLoading}
                    className="p-2 cursor-pointer rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700 shadow-sm"
                    title="Get new questions"
                  >
                    <TfiReload
                      className={`w-4 h-4 ${topicQuestionsLoading ? 'animate-spin' : ''}`}
                    />
                  </button>
                </div>

                {/* Label for clarity */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Please select a question below to get instant insights.
                </p>

                {renderQuestionsContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
