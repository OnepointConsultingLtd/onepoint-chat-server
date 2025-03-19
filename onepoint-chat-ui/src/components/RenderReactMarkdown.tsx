import ReactMarkdown from "react-markdown";
import { useChat } from "../hooks/useChat";
import CopyButton from "./CopyButton";

export interface Message {
  id: string;
  text: string;
  type: "user" | "agent";
  timestamp: Date;
}

interface RenderReactMarkdownProps {
  children: string; // <-- Update this line
  message: Message;
  handleFloatingBtn?: () => void;
}

export default function RenderReactMarkdown({
  children,
  message,
}: RenderReactMarkdownProps) {
  const { copiedId, handleCopy } = useChat();

  return (
    <>
      {" "}
      <ReactMarkdown
        components={{
          a: ({ ...props }) => (
            <a
              {...props}
              className={`underline ${
                message.type === "user"
                  ? "text-purple-100 hover:text-white"
                  : "text-purple-500 hover:text-purple-600"
              } transition-colors duration-200`}
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          ul: ({ ...props }) => (
            <ul {...props} className="my-4 ml-4 space-y-2 list-disc" />
          ),
          li: ({ ...props }) => (
            <li
              {...props}
              className={`${
                message.type === "user" ? "text-white" : "text-slate-700"
              }`}
            />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
      <div className="flex items-center justify-between mt-2 text-xs">
        <p
          className={
            message.type === "user" ? "text-purple-100" : "text-slate-400"
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
    </>
  );
}
