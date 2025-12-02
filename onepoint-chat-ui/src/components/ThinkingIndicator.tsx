'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import useDelayedVisible from '../hooks/useDelayedVisible';
import { PROJECT_INFO } from '../lib/constants';
import useChatStore from '../store/chatStore';

export default function ThinkingIndicator() {
  const { isThinking } = useChatStore(useShallow(state => ({ isThinking: state.isThinking })));
  const delayedMessages = useDelayedVisible(isThinking);

  const getMessage = () => {
    if (delayedMessages.step2)
      return {
        title: 'Umm...',
        subtitle: 'This one’s taking a bit longer than my ego expected. Hang tight.',
      };
    if (delayedMessages.step1)
      return {
        title: 'Analyzing deeper patterns...',
        subtitle: 'Reviewing data, comparing possibilities, and aligning conclusions.',
      };
    return {
      title: 'Processing your request...',
      subtitle: 'Gathering context and preparing an intelligent response.',
    };
  };

  const message = getMessage();

  return (
    <AnimatePresence>
      {isThinking && (
        <motion.div
          key="thinking"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="w-full px-5 md:px-10 py-6 md:py-10 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 border-t border-gray-200 dark:border-gray-600 backdrop-blur-sm shadow-inner"
        >
          {/* Header */}
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mr-3 shadow-sm">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {' '}
                {PROJECT_INFO.NAME}
              </span>
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce"
                  style={{ animationDelay: '0ms' }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Animated content skeleton */}
          <div className="space-y-3 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-3 md:h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded animate-pulse"
                style={{
                  width: `${60 + Math.random() * 30}%`,
                  animationDelay: `${i * 0.25}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Message section */}
          <motion.div
            key={message.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.4 }}
            className="border-t border-gray-200 dark:border-gray-600 pt-6"
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-blue-500/25 rounded-full blur-md animate-pulse" />
                <svg
                  className="w-7 h-7 text-blue-500 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {/* AI/Robot Head Icon */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {message.title}
                </h4>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                  {message.subtitle}
                </p>
              </div>
            </div>

            {/* ALIVE Progress Bar */}
            <div className="relative mt-4 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              {/* Base shimmer wave */}
              <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400 animate-progress-alive rounded-full"></div>

              {/* Subtle glowing overlay */}
              <div className="absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-400/10 to-purple-500/10 animate-glow"></div>

              {/* Optional fine “signal” line — adds intelligence vibe */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-300 via-indigo-400 to-purple-400 blur-sm animate-pulse"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
