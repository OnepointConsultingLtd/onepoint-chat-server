import React, { useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import useChatStore from '../store/chatStore';
import { ChatInputProps } from '../type/types';
import { PROJECT_INFO } from '../lib/constants';

export default function ChatInput({ handleSubmit }: ChatInputProps) {
  const [inputText, setInputText] = useState('');

  const { isThinking, setShowInput, isInitialMessage } = useChatStore(
    useShallow(state => ({
      isThinking: state.isThinking,
      setShowInput: state.setShowInput,
      isInitialMessage: state.isInitialMessage,
    }))
  );

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isInitialMessage) {
        setShowInput(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setShowInput, isInitialMessage]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(inputText);
    setInputText('');
  }

  const textareaStyle = useMemo(
    () => ({
      height: Math.min(30 + 24 * inputText.split('\n').length, 200) + 'px',
    }),
    [inputText]
  );

  return (
    <div
      className={`${!isInitialMessage ? 'flex flex-col md:fixed inset-0 justify-center items-center rounded-sm md:rounded-lg md:px-24 z-[85] w-full h-full' : 'bg-[#fafffe] p-3 border-t border-gray-200 dark:border-gray-700 dark:!bg-[#1F1925]'}`}
    >
      {!isInitialMessage && (
        <div
          className="md:fixed inset-0 bg-[#fafffe]/50 dark:!bg-[#1F1925]/60 backdrop-blur-sm w-full h-full"
          onClick={() => setShowInput(false)}
        ></div>
      )}
      <div className="w-full px-2 py-2">
        <div className="flex flex-col gap-2">
          <form onSubmit={onSubmit} className="relative">
            <textarea
              id="chat-input"
              value={inputText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
              placeholder="Type your message here..."
              className="w-full p-2 pr-24 overflow-hidden transition-all duration-300 bg-[#fafffe] dark:!bg-[#1F1925] border-2 shadow-sm outline-none resize-none rounded-sm md:rounded-xl border-[#636565] dark:border-[#fafffe] focus:border-[#9a19ff] dark:focus:border-[#9a19ff] focus:ring-4 focus:ring-[#9a19ff]/20 dark:focus:ring-[#9a19ff]/50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:!text-[#fafffe] placeholder-gray-500 dark:placeholder-gray-400"
              disabled={isThinking}
              style={textareaStyle}
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  const form = e.currentTarget.form;
                  if (form) form.requestSubmit();
                }
              }}
              autoFocus
            />
            <button
              type="submit"
              className="absolute flex items-center gap-2 p-1 text-white transition-all duration-300 rounded shadow-md cursor-pointer right-2 bottom-[1.3rem] bg-gradient-to-r from-[#9a19ff] to-[#9a19ff] hover:from-[#9a19ff] hover:to-[#9a19ff] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group rotate-90"
              disabled={isThinking}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform rotate-[-90deg] transition-transform group-hover:scale-110"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </form>

          <span className="text-[8px]  md:text-xs text-center text-slate-900 dark:!text-[#fafffe] z-[85]">
            {PROJECT_INFO.NAME} can make mistakes. Check important information with your Onepoint
            advisor.
            <br /> Press{' '}
            <kbd className="px-1 py-0.5 bg-[#9a19ff] text-white dark:!bg-[#1F1925] dark:!text-[#fafffe] rounded">
              Esc
            </kbd>{' '}
            to close
          </span>
        </div>
      </div>
    </div>
  );
}
