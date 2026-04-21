import React, { useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import useChatStore from '../store/chatStore';
import { ChatInputProps } from '../type/types';

export default function ChatInput({ handleSubmit, embedded = false }: ChatInputProps) {
  const [inputText, setInputText] = useState('');

  const { isThinking, isStreaming, setShowInput, isInitialMessage } = useChatStore(
    useShallow(state => ({
      isThinking: state.isThinking,
      isStreaming: state.isStreaming,
      setShowInput: state.setShowInput,
      isInitialMessage: state.isInitialMessage,
    }))
  );

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isInitialMessage && !embedded) {
        setShowInput(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setShowInput, isInitialMessage, embedded]);

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

  const useBottomBar = embedded || isInitialMessage;

  return (
    <div
      className={`${useBottomBar ? 'bg-[color:var(--osca-bg-light)] p-2 md:p-3 border-t border-gray-200 dark:border-gray-700 dark:!bg-[color:var(--osca-bg-dark)]' : 'flex flex-col md:fixed inset-0 justify-center items-center rounded-sm md:rounded-lg md:px-24 z-[85] w-full h-full'}`}
    >
      {!isInitialMessage && !embedded && (
        <div
          className="md:fixed inset-0 backdrop-blur-sm w-full h-full bg-[color:color-mix(in_srgb,var(--osca-bg-light)_50%,transparent)] dark:bg-[color:color-mix(in_srgb,var(--osca-bg-dark)_60%,transparent)]"
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
              className="w-full text-sm md:text-lg p-2 pr-24 overflow-hidden transition-all duration-300 bg-[color:var(--osca-bg-light)] dark:!bg-[color:var(--osca-bg-dark)] border shadow-sm outline-none resize-none rounded border-[color:var(--osca-border-light)] dark:border-[color:var(--osca-border-dark)] focus:border-[color:color-mix(in_srgb,var(--osca-accent)_70%,var(--osca-border-light))] dark:focus:border-[color:color-mix(in_srgb,var(--osca-accent)_70%,var(--osca-border-dark))] focus:ring-1 focus:ring-[color:color-mix(in_srgb,var(--osca-accent)_25%,transparent)] dark:focus:ring-[color:color-mix(in_srgb,var(--osca-accent)_35%,transparent)] disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:!text-[color:var(--osca-text-on-dark)] placeholder-gray-500 dark:placeholder-gray-400"
              disabled={isThinking || isStreaming}
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
              type={isStreaming ? 'button' : 'submit'}
              onClick={() => {
                if (isStreaming) {
                  window.dispatchEvent(new CustomEvent('osca-stop-stream'));
                }
              }}
              className="absolute flex items-center gap-2 p-1 text-white transition-all duration-300 rounded shadow-md cursor-pointer right-2 bottom-[1.3rem] bg-[color:var(--osca-accent)] hover:brightness-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group rotate-90"
              disabled={isThinking && !isStreaming}
              title={isStreaming ? 'Stop streaming' : 'Send message'}
            >
              {isStreaming ? (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transform rotate-[-90deg]"
                >
                  <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" />
                </svg>
              ) : (
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
              )}
            </button>
          </form>


        </div>
      </div>
    </div>
  );
}
