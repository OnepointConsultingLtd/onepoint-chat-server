import React, { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { predefinedTopics } from '../lib/predefinedTopics';
import chatStore from '../store/chatStore';
import { Topic } from '../type/types';
import BackToBottom from './FloatingChat/BackToBottom';
import RenderReactMarkdown from './RenderReactMarkdown';
import ThinkingIndicator from './ThinkingIndicator';
import TopicButton from './TopicButton';

type MessagesProps = {
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  sendMessageToServer: (message: string) => void;
};

export default function Messages({ messagesEndRef, sendMessageToServer }: MessagesProps) {
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const { messages, isThinking, relatedTopics, handleTopicAction } = chatStore(
    useShallow(state => ({
      messages: state.messages,
      isThinking: state.isThinking,
      relatedTopics: state.relatedTopics,
      handleTopicAction: state.handleTopicAction,
    }))
  );

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      setShowBackToTop(scrollHeight - scrollTop - clientHeight > 500);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const renderTopics = relatedTopics?.topics || predefinedTopics;

  const handleTopicClick = (topic: Topic) => {
    handleTopicAction({ type: 'related', topic });
    const prompt = `Tell me more about ${topic.name}`;
    sendMessageToServer(prompt);
  };

  return (
    <div className="flex-1 flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 h-full relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 w-32 h-32 bg-blue-400/5 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-8 w-24 h-24 bg-purple-400/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-8 w-28 h-28 bg-emerald-400/5 rounded-full blur-xl"></div>
      </div>

      <div ref={scrollContainerRef} className="h-full overflow-y-auto relative z-10">
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
              <div className="!w-full">
                <ThinkingIndicator />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {renderTopics && renderTopics.length > 0 && !isThinking && (
          <div className="px-4 pb-6 relative z-10">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-xl p-3 sm:p-6 shadow-2xl">
              {/* Header with sparkle effect */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    ✨ Explore Topics
                  </h3>
                </div>
              </div>

              {/* Topic Cards Grid */}
              <div className="grid grid-cols-2 gap-2">
                {renderTopics?.map((topic, index) => (
                  <TopicButton
                    key={topic.name || index}
                    topic={topic}
                    index={index}
                    onTopicClick={handleTopicClick}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Back to Top Button */}
      {showBackToTop && <BackToBottom scrollToTop={scrollToTop} />}
    </div>
  );
}
