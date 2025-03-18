import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Message } from "../hooks/useChat";
import ThinkingIndicator from "./ThinkingIndicator";
import CopyButton from "./CopyButton";

interface MessagesProps {
  messages: Message[];
  isThinking: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onCopy: (messageId: string) => void;
  copiedId: string | null;
}

const Messages: React.FC<MessagesProps> = ({
  messages,
  isThinking,
  messagesEndRef,
}) => {
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

  console.log("messages", messages);
  return (
    <div className="flex-1 overflow-hidden !min-h-screen overflow-y-auto flex-col mb-[8rem]">
      <div className="h-full overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-6 p-4 md:px-8">
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
                          className="my-4 ml-4 space-y-2 list-disc"
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
        </div>
      </div>
    </div>
  );
};

export default Messages;
