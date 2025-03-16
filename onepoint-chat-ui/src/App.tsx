import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";
import CopyButton from "./components/CopyButton";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SideBarButton from "./components/SideBarButton";
import ThinkingIndicator from "./components/ThinkingIndicator";
import { useChat } from "./hooks/useChat";
import initialQuestions from "./lib/initialQuestions";

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
    isSidebarOpen,
    toggleSidebar,
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
    <main className="relative w-full h-full flex">
      {/* Sidebar Container */}
      <div className="h-screen lg:!sticky top-0">
        <div className="flex flex-col h-full">
          {/* Mobile Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={toggleSidebar}
            questions={initialQuestions}
            onQuestionClick={handleQuestionClick}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen relative mx-auto grow">
        <div className="mx-auto flex flex-col gap-4 min-h-screen">
          <div className="sticky top-0 flex border-b border-[#e2e8f0]  items-center justify-between z-10 mx-auto w-full backdrop-blur-lg bg-white/80">
            <SideBarButton toggleSidebar={toggleSidebar} />

            <div className="w-full max-w-6xl mx-auto">
              <div className="flex justify-between items-center">
                <Header handleRestart={handleRestart} />
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="bg-transparent flex flex-col !min-h-screen max-w-6xl mx-auto w-full">
            <div className={`flex-1 overflow-y-auto p-4 px-4 md:px-8 space-y-6  ${isThinking ? "mb-[30rem]" : "mb-[10rem]"}`}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-slideIn`}
                >
                  <div
                    className={`text-left p-6 relative ${
                      message.type === "user"
                        ? "bg-gradient-to-br from-sky-500 to-blue-500 text-white rounded-lg rounded-tr-sm max-w-[85%] md:max-w-[50%] shadow-lg"
                        : "bg-white text-slate-800 rounded-2xl rounded-tl-sm !max-w-[85%] md:!max-w-[70%] border border-sky-100"
                    }`}
                  >
                    <ReactMarkdown
                      components={{
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            className={`underline ${
                              message.type === "user"
                                ? "text-sky-100 hover:text-white"
                                : "text-sky-500 hover:text-sky-600"
                            } transition-colors duration-200`}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            {...props}
                            className="list-disc space-y-2 my-4 ml-4"
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li
                            {...props}
                            className={`${
                              message.type === "user"
                                ? "text-white"
                                : "text-slate-700"
                            }`}
                          />
                        ),
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>

                    <div className="flex items-center justify-between mt-4 text-xs">
                      <p
                        className={
                          message.type === "user"
                            ? "text-sky-100"
                            : "text-slate-400"
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
            <div className="sticky bottom-0 flex items-center justify-between px-4 z-10 mx-auto w-full">
              <div className="flex flex-col gap-2 w-full backdrop-blur-lg bg-white/80 rounded-2xl p-4">
                <form onSubmit={handleSubmit} className="relative">
                  <div className="relative">
                    <textarea
                      value={inputText}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setInputText(e.target.value)
                      }
                      placeholder="Type your message here..."
                      className="w-full p-4 pr-24 rounded-xl border-2 border-sky-100 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none bg-white disabled:opacity-50 overflow-hidden disabled:cursor-not-allowed transition-all duration-300 resize-none shadow-sm"
                      disabled={isThinking}
                      style={{
                        height:
                          Math.min(
                            48 + 24 * inputText.split("\n").length,
                            200
                          ) + "px",
                      }}
                      onKeyDown={(
                        e: React.KeyboardEvent<HTMLTextAreaElement>
                      ) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          const form = e.currentTarget.form;
                          if (form) form.requestSubmit();
                        }
                      }}
                    />
                    <button
                      type="submit"
                      className="absolute right-2 bottom-2 p-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-lg hover:from-sky-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg flex cursor-pointer items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
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
                  </div>
                </form>

                <span className="text-xs text-slate-500 text-center">
                  Powered by Onepoint's Smart Cognitive Assistant
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
