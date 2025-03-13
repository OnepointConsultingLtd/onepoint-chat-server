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

  console.log("inputText", inputText);
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-4 md:p-8 flex flex-col gap-4 min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-40 ">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
              <Header
                onQuestionClick={handleQuestionClick}
                handleRestart={handleRestart}
              />
            </div>

            {/* Restart Button */}
          </div>
        </div>
        {/* Chat Messages */}
        <div className="bg-white mb-4 py-[5rem] flex flex-col h-full mt-12">
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
                      ul: ({ node, ...props }) => (
                        <ul {...props} className="list-disc space-y-1 my-2" />
                      ),
                      li: ({ node, ...props }) => (
                        <li
                          {...props}
                          className={`${
                            message.type === "user"
                              ? "text-white"
                              : "text-gray-700"
                          } ml-2`}
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
          <div className="fixed bottom-0 left-0 right-0 z-40">
            <div className="flex flex-col  gap-2 max-w-6xl mx-auto bg-white rounded-2xl px-4">
              {/* Input Form */}
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setInputText(e.target.value)
                    }
                    placeholder="Type your message here..."
                    className={`w-full p-4 pr-24 rounded-2xl border-2 border-[#e2e8f0] focus:border-[#0ea5e9] focus:ring-4 focus:ring-[#bae6fd] outline-none bg-white disabled:opacity-50 overflow-hidden disabled:cursor-not-allowed transition-all duration-300
                      `}
                    disabled={isThinking}
                    style={{
                      height:
                        Math.min(48 + 24 * inputText.split("\n").length, 200) +
                        "px",
                    }}
                    onKeyDown={(
                      e: React.KeyboardEvent<HTMLTextAreaElement>
                    ) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 bottom-[18px] p-2 bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-white rounded-xl hover:from-[#0284c7] hover:to-[#0ea5e9] transition-all duration-300 shadow-md hover:shadow-lg flex cursor-pointer items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                    disabled={isThinking}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon-2xl"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>
                </div>
              </form>

              <span className="text-xs text-gray-500 pb-2">
                Powered by Onepoint's Smart Cognitive Assistant - OSCA can make
                mistakes.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
