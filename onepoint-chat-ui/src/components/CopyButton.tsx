import React from "react";

interface CopyButtonProps {
  text: string;
  id: string;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
  isUserMessage?: boolean;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  id,
  copiedId,
  onCopy,
  isUserMessage,
}) => {
  const isActive = copiedId === id;

  return (
    <div>
      <button
        onClick={() => onCopy(text, id)}
        className={`
          relative z-10 p-1
          ${isUserMessage ? "text-white hover:text-[#e0f2fe]" : "text-[#64748b] hover:text-[#0ea5e9]"} before:opacity-90 before:rounded-lg hover:before:opacity-100 active:scale-95 transition-all duration-200 cursor-pointer
        `}
        title={isActive ? "Copied!" : "Copy to clipboard"}
      >
        <div className="relative z-10 w-4 h-4 transform transition-all duration-300 group-hover/copy:scale-110">
          {isActive ? (
            <svg
              className="absolute inset-0 transform transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="absolute inset-0 transform transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
};

export default CopyButton;
