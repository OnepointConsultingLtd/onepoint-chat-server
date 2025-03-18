import React from "react";

interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isThinking: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputText,
  setInputText,
  handleSubmit,
  isThinking,
}) => {
  return (
    <div className=" bg-white sticky bottom-0">
      <div className="max-w-6xl mx-auto w-full px-4 py-4">
        <div className="flex flex-col gap-2">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              value={inputText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setInputText(e.target.value)
              }
              placeholder="Type your message here..."
              className="w-full p-4 pr-24 overflow-hidden transition-all duration-300 bg-white border-2 shadow-sm outline-none resize-none rounded-xl border-sky-100 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isThinking}
              style={{
                height:
                  Math.min(48 + 24 * inputText.split("\n").length, 200) + "px",
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  const form = e.currentTarget.form;
                  if (form) form.requestSubmit();
                }
              }}
            />
            <button
              type="submit"
              className="absolute flex items-center gap-2 p-3 text-white transition-all duration-300 rounded-lg shadow-md cursor-pointer right-2 bottom-2 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
              disabled={isThinking}
            >
              <svg
                width="24"
                height="24"
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

          <span className="text-xs text-center text-slate-500">
            Powered by Onepoint's Smart Cognitive Assistant
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
