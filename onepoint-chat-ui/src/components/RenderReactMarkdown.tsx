import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Message } from "../type/types";
import CopyButton from "./CopyButton";

interface RenderReactMarkdownProps {
  children: string;
  message: Message;
}

export default function RenderReactMarkdown({
  children,
  message,
}: RenderReactMarkdownProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (message: Message) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(message.text);
      } else {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = message.text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedId(message.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

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
            onCopy={() => copyToClipboard(message)}
          />
        )}
      </div>
    </>
  );
}
