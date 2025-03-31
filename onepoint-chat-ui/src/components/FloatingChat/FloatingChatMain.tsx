import { useState } from "react";
import { useChat } from "../../hooks/useChat";
import initialQuestions from "../../lib/initialQuestions";
import Messages from "../Messages";
import QuestionItem from "../QuestionItem";

function FloatingChatMain({
  handleFloatingBtn,
}: {
  handleFloatingBtn: () => void;
}) {
  const {
    messages,
    messagesEndRef,
    handleRestart,
    handleQuestionClick,
    isThinking,
    handleSubmit,
  } = useChat();

  const [inputText, setInputText] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(inputText);
    setInputText("");
  };

  return (
    <div className="flex sm:!h-[calc(100vh-130px)] sm:!w-[436px] rounded-xl sm:bg-transparent sm:p-1 !h-[calc(100dvh)] !pt-[4vh]">
      <div className="flex flex-col flex-1 shadow-xl rounded-xl">
        {/* Header */}
        <header className="sticky top-0 z-10 w-full p-3 py-2 bg-white">
          <div className="flex items-center justify-between w-full space-x-4">
            <h1 className="text-xl md:text-3xl font-bold text-[#0284c7]">
              OSCA
            </h1>

            <button
              className="flex justify-center py-3 cursor-pointer group"
              onClick={handleFloatingBtn}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-radix-state-closed:rotate-180 stroke-[15px] transition"
              >
                <path
                  d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            {/* Restart Button */}
            <div className="flex justify-start">
              <button
                onClick={handleRestart}
                className="group px-1 md:px-3 py-1 md:py-2 bg-white border-2 border-[#e2e8f0] text-[#64748b] rounded-2xl hover:border-[#0ea5e9] hover:text-[#0ea5e9] cursor-pointer transition-all duration-300 flex items-center gap-2 relative"
              >
                <svg
                  className="w-5 h-5 transition-transform duration-500 ease-out group-hover:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="font-medium md:!block !hidden">New Chat</span>
              </button>
            </div>
          </div>
        </header>

        {/* Messages Container */}
        <div className="h-screen overflow-y-auto !bg-white">
          <div className="px-3 space-y-2">
            {initialQuestions.map((question) => (
              <QuestionItem
                key={question.id}
                question={question}
                onClick={() => handleQuestionClick(question)}
              />
            ))}
          </div>
          <Messages
            messages={messages}
            messagesEndRef={messagesEndRef}
            isFloating={true}
            isThinking={isThinking}
          />
        </div>
        {/* Input Container */}
        <div className="sticky bottom-0 bg-white">
          <div className="w-full px-4 py-3 mx-auto">
            <div className="flex flex-col gap-2">
              <form onSubmit={onSubmit} className="relative">
                <textarea
                  value={inputText}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setInputText(e.target.value)
                  }
                  placeholder="Type your message here..."
                  className="w-full p-2 pr-24 overflow-hidden transition-all duration-300 bg-white border-2 border-purple-100 shadow-sm outline-none resize-none rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isThinking}
                  style={{
                    height:
                      Math.min(48 + 24 * inputText.split("\n").length, 200) +
                      "px",
                  }}
                  onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      const form = e.currentTarget.form;
                      if (form) form.requestSubmit();
                    }
                  }}
                />
                {/* submit button */}
                <button
                  type="submit"
                  className="absolute flex items-center gap-2 p-3 transition-all duration-300 rounded-lg cursor-pointer right-2 bottom-2 group"
                  disabled={isThinking}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform rotate-[-90deg] stroke-blue-900 rounded-full transition-transform group-hover:scale-110"
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
      </div>
    </div>
  );
}

export default FloatingChatMain;
