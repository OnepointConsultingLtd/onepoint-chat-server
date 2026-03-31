import React, { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import chatStore from '../store/chatStore';
import { PredefinedQuestion, Topic } from '../type/types';
import { getLastCardUserMessage } from '../utils/messageUtils';
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

  const {
    messages,
    isThinking,
    relatedTopics,
    handleTopicAction,
    isInitialMessage,
    setIsInitialMessage,
  } = chatStore(
    useShallow(state => ({
      messages: state.messages,
      isThinking: state.isThinking,
      relatedTopics: state.relatedTopics,
      handleTopicAction: state.handleTopicAction,
      isInitialMessage: state.isInitialMessage,
      setIsInitialMessage: state.setIsInitialMessage,
    }))
  );

  // Desktop sets this from MessageCard; mobile-only layout must sync the same way or quick questions never show.
  useEffect(() => {
    const msgs = messages.filter(m => !m.text.includes('Connection closed'));
    if (msgs.length === 0) {
      chatStore.setState({ isInitialMessage: false, showInput: false });
      return;
    }
    const userMessage = getLastCardUserMessage(msgs);
    if (userMessage) {
      setIsInitialMessage(userMessage, true);
    }
  }, [messages, setIsInitialMessage]);

  const filteredMessages = useMemo(() => {
    return messages.filter(message => !message.text.includes('Connection closed'));
  }, [messages]);

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

  /** Server-suggested topics only after the welcome turn; quick questions stay inside the welcome bubble. */
  const renderTopics = useMemo((): (Topic | PredefinedQuestion)[] => {
    if (isInitialMessage) {
      return [];
    }
    return relatedTopics?.topics ?? [];
  }, [isInitialMessage, relatedTopics]);

  const handleTopicClick = (topic: Topic | PredefinedQuestion) => {
    if ('name' in topic) {
      // It's a regular topic
      handleTopicAction({ type: 'related', topic });
      const prompt = `Tell me more about ${topic.name}`;
      sendMessageToServer(prompt);
    } else {
      // It's a predefined question
      handleTopicAction({ type: 'question', question: topic });
      sendMessageToServer(topic.text);
    }
  };

  return (
    <div className="relative -z-[0] flex min-h-0 flex-1 flex-col bg-[#fafffe] dark:!bg-[#1F1925]">
      {/* Floating background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-4 w-32 h-32 bg-[#9a19ff]/5 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-8 w-24 h-24 bg-[#9a19ff]/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-8 w-28 h-28 bg-[#9a19ff]/5 rounded-full blur-xl"></div>
      </div>

      <div ref={scrollContainerRef} className="relative z-10 min-h-0 flex-1 overflow-y-auto">
        <div className="max-w-full px-4 py-6">
          <div className="flex flex-col gap-4">
            {filteredMessages.map((message) => {
              const isUserMessage = message.type === 'user';
              const isAgentMessage = message.type === 'agent';

              return (
                <div
                  key={message.id}
                  className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'} animate-slideIn`}
                >
                  <div
                    className={`relative w-full bg-[#fafffe]/90 dark:!bg-[#1F1925]/90 backdrop-blur-sm border border-[#636565] dark:border-[#fafffe] hover:border-[#9a19ff] dark:hover:border-[#9a19ff] text-slate-800 dark:!text-[#fafffe]  p-4 shadow-lg ${isUserMessage
                      ? 'max-w-[85%] rounded-2xl rounded-br-md'
                      : 'w-full rounded-2xl rounded-tl-md'
                      }`}
                  >
                    {isAgentMessage && (
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 md:flex hidden bg-gradient-to-br from-[#9a19ff] to-purple-600 rounded-full items-center justify-center mr-3 shadow-lg">
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
                        <span className="text-sm font-semibold text-[#9a19ff] dark:!text-[#9a19ff]">
                          Osca
                        </span>
                      </div>
                    )}

                    <RenderReactMarkdown message={message} />
                  </div>
                </div>
              );
            })}

            {isThinking && (
              <div className="!w-full">
                <ThinkingIndicator />
              </div>
            )}

            {renderTopics && renderTopics.length > 0 && !isThinking && (
              <div className="relative z-10 -mx-1 pb-2">
                <div className="rounded-lg border border-[#636565]/40 bg-[#fafffe]/80 px-2 py-2 dark:border-[#fafffe]/25 dark:!bg-[#1F1925]/80">
                  <p className="mb-1.5 px-1 text-[11px] font-semibold uppercase tracking-wider text-[#9a19ff]/90 dark:text-[#c084fc]">
                    Related topics
                  </p>
                  <ul className="flex flex-col gap-1" role="list">
                    {renderTopics.map((topic, index) => (
                      <li key={'name' in topic ? topic.name : topic.label || index}>
                        <TopicButton topic={topic} onTopicClick={handleTopicClick} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

      </div>

      {/* Back to Top Button */}
      {showBackToTop && <BackToBottom scrollToTop={scrollToTop} />}
    </div>
  );
}
