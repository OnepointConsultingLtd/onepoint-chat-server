import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Header from "./components/Header";
import ThinkingIndicator from "./components/ThinkingIndicator";
import CopyButton from "./components/CopyButton";
import "./App.css";
import { useChat } from "./hooks/useChat";

function App() {
  const {
    messages,
    inputText,
    setInputText,
    messagesEndRef,
    handleQuestionClick,
    handleSubmit,
    handleRestart,
    isThinking,
  } = useChat();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-4 md:p-8 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Header onQuestionClick={handleQuestionClick} />
        </div>

        {/* Restart Button */}
        <div className="flex justify-start">
          <button
            onClick={handleRestart}
            className="group px-5 py-2.5 bg-white border-2 border-[#e2e8f0] text-[#64748b] rounded-2xl hover:border-[#0ea5e9] hover:text-[#0ea5e9] cursor-pointer transition-all duration-300 flex items-center gap-2.5 relative"
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
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        {/* Chat Messages */}

        <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] mb-4 h-[500px] xl:!h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`text-left p-4 shadow-sm relative ${
                    message.type === "user"
                      ? "bg-[#0ea5e9] text-white rounded-l-2xl rounded-tr-2xl max-w-[50%]"
                      : "bg-[#f1f5f9] text-[#1e293b] rounded-r-2xl rounded-tl-2xl !max-w-full md:!max-w-[70%]"
                  }`}
                >
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          className={`underline ${
                            message.type === "user"
                              ? "text-white hover:text-[#e0f2fe]"
                              : "text-[#0ea5e9] hover:text-[#0284c7]"
                          } transition-colors duration-200`}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>

                  <div className="flex items-center justify-between mt-2 text-xs">
                    <p
                      className={
                        message.type === "user"
                          ? "text-[#e0f2fe]"
                          : "text-[#64748b]"
                      }
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                    {message.type === "agent" && (
                      <CopyButton
                        text={message.text}
                        id={message.id}
                        copiedId={copiedId}
                        onCopy={handleCopy}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isThinking && <ThinkingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="p-4 border-t border-[#e2e8f0]">
            <div className="flex flex-col gap-4">
              {/* Input Form */}
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setInputText(e.target.value)
                    }
                    placeholder="Type your message here..."
                    className="w-full p-4 pr-24 rounded-2xl border-2 border-[#e2e8f0] focus:border-[#0ea5e9] focus:ring-4 focus:ring-[#bae6fd] outline-none bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    disabled={isThinking}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-white rounded-xl hover:from-[#0284c7] hover:to-[#0ea5e9] transition-all duration-300 shadow-md hover:shadow-lg flex cursor-pointer items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                    disabled={isThinking}
                  >
                    <span className="font-medium">Send</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
