import React from "react";
import { Message } from "../type/types";
import RenderReactMarkdown from "./RenderReactMarkdown";
import ThinkingIndicator from "./ThinkingIndicator";

interface MessagesProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  isFloating?: boolean;
  isThinking: boolean;
}

const Messages: React.FC<MessagesProps> = ({
  messages,
  messagesEndRef,
  isFloating = false,
  isThinking,
}) => {
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
                  className={`text-left ${isFloating ? "p-2" : "p-6"} relative ${
                    message.type === "user"
                      ? isFloating
                        ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-lg rounded-tr-sm max-w-[85%] md:max-w-[70%] shadow-lg"
                        : "bg-gradient-to-br from-sky-500 to-blue-500 text-white rounded-lg rounded-tr-sm max-w-[85%] md:max-w-[50%] shadow-lg"
                      : isFloating
                        ? "bg-white text-slate-800 rounded-2xl rounded-tl-sm w-full border border-purple-100"
                        : "bg-white text-slate-800 rounded-2xl rounded-tl-sm !max-w-[85%] md:!max-w-[70%] border border-sky-100"
                  }`}
                >
                  <RenderReactMarkdown message={message}>
                    {message.text}
                  </RenderReactMarkdown>
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
