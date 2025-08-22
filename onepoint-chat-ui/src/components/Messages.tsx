import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import chatStore from '../store/chatStore';
import RenderReactMarkdown from './RenderReactMarkdown';
import ThinkingIndicator from './ThinkingIndicator';
import { Topic } from '../type/types';
import { predefinedTopics } from '../lib/predefinedTopics';

type MessagesProps = {
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  sendMessageToServer: (message: string) => void;
};

export default function Messages({ messagesEndRef, sendMessageToServer }: MessagesProps) {
  const { messages, isThinking, relatedTopics, handleTopicAction } = chatStore(
    useShallow(state => ({
      messages: state.messages,
      isThinking: state.isThinking,
      relatedTopics: state.relatedTopics,
      handleTopicAction: state.handleTopicAction,
    }))
  );

  const renderTopics = relatedTopics?.topics || predefinedTopics;

  const handleTopicClick = (topic: Topic) => {
    handleTopicAction({ type: 'related', topic });
    const prompt = `Tell me more about ${topic.name}`;
    sendMessageToServer(prompt);
  };

  // Get topic colors for unique styling
  const getTopicColors = (topicName: string) => {
    const colorSchemes = [
      {
        gradient: 'from-blue-50 to-blue-100',
        border: 'border-blue-200',
        hover: 'hover:from-blue-100 hover:to-blue-200',
        text: 'text-blue-700',
        hoverText: 'group-hover:text-blue-800',
      },
      {
        gradient: 'from-purple-50 to-purple-100',
        border: 'border-purple-200',
        hover: 'hover:from-purple-100 hover:to-purple-200',
        text: 'text-purple-700',
        hoverText: 'group-hover:text-purple-800',
      },
      {
        gradient: 'from-emerald-50 to-emerald-100',
        border: 'border-emerald-200',
        hover: 'hover:from-emerald-100 hover:to-emerald-200',
        text: 'text-emerald-700',
        hoverText: 'group-hover:text-emerald-800',
      },
      {
        gradient: 'from-orange-50 to-orange-100',
        border: 'border-orange-200',
        hover: 'hover:from-orange-100 hover:to-orange-200',
        text: 'text-orange-700',
        hoverText: 'group-hover:text-orange-800',
      },
      {
        gradient: 'from-cyan-50 to-cyan-100',
        border: 'border-cyan-200',
        hover: 'hover:from-cyan-100 hover:to-cyan-200',
        text: 'text-cyan-700',
        hoverText: 'group-hover:text-cyan-800',
      },
    ];

    // Assign color based on topic name for consistency
    const colorIndex = topicName.length % colorSchemes.length;
    return colorSchemes[colorIndex];
  };

  return (
    <div className="flex-1 flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 h-full relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 w-32 h-32 bg-blue-400/5 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-8 w-24 h-24 bg-purple-400/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-8 w-28 h-28 bg-emerald-400/5 rounded-full blur-xl"></div>
      </div>

      <div className="h-full overflow-y-auto relative z-10">
        <div className="max-w-full px-4 py-6">
          <div className="flex flex-col gap-4">
            {messages?.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideIn`}
              >
                <div
                  className={`relative ${
                    message.type === 'user'
                      ? 'max-w-[85%] bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-br-md p-4 shadow-lg shadow-blue-500/25'
                      : 'w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tl-md p-4 shadow-lg'
                  }`}
                >
                  {message.type === 'user' && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-600 rotate-45"></div>
                  )}

                  {message.type === 'agent' && (
                    <div className="flex items-start mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        OSCA
                      </span>
                    </div>
                  )}

                  <RenderReactMarkdown message={message} />
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex justify-start animate-slideIn">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl rounded-tl-md p-4 shadow-lg relative w-full">
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 rotate-45"></div>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      OSCA
                    </span>
                  </div>
                  <ThinkingIndicator />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Amazing Topics Section */}
        {renderTopics && renderTopics.length > 0 && !isThinking && (
          <div className="px-4 pb-6 relative z-10">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl p-3 sm:p-6 shadow-2xl">
              {/* Header with sparkle effect */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    ✨ Explore Topics
                  </h3>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Topic Cards Grid */}
              <div className="grid grid-cols-2 gap-2">
                {renderTopics?.map((topic, index) => {
                  const colors = getTopicColors(topic.name);
                  return (
                    <button
                      key={topic.name || index}
                      onClick={() => handleTopicClick(topic)}
                      className={`group relative bg-gradient-to-br ${colors.gradient} ${colors.hover} p-3 rounded-xl border ${colors.border} transition-all duration-200 hover:shadow-md active:scale-95`}
                    >
                      {/* Content */}
                      <div className="flex items-center">
                        <div className="flex-1 text-left min-w-0">
                          <h4
                            className={`font-medium ${colors.text} ${colors.hoverText} text-sm leading-tight truncate`}
                          >
                            {topic.name}
                          </h4>
                        </div>
                        <div className="flex-shrink-0 ml-2">
                          <div
                            className={`w-4 h-4 ${colors.text} opacity-50 group-hover:opacity-80 transition-opacity`}
                          >
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-full h-full"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
