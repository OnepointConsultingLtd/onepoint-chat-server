import { FaCopy } from 'react-icons/fa';
import { BiSolidCheckboxChecked } from 'react-icons/bi';

type CopyButtonProps = {
  text: string;
  id: string;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
  isUserMessage?: boolean;
};

export default function CopyButton({ text, id, copiedId, onCopy }: CopyButtonProps) {
  const isActive = copiedId === id;

  const baseColorClass =
    'text-[#64748b] hover:text-[#0ea5e9] dark:text-gray-500 dark:hover:text-blue-400';

  return (
    <button
      onClick={() => onCopy(text, id)}
      className={`
        p-1 rounded-md
        ${baseColorClass}
        before:opacity-90 before:rounded-lg
        hover:before:opacity-100
        active:scale-95
        transition-all duration-200
        cursor-pointer
        relative
      `}
      title={isActive ? 'Copied!' : 'Copy to clipboard'}
    >
      <span className="relative block w-4 h-4 transition-all duration-300 hover:scale-110">
        {isActive ? (
          <BiSolidCheckboxChecked className="absolute inset-0 text-green-500 dark:text-green-400 w-full h-full transition-transform duration-300" />
        ) : (
          <FaCopy className="absolute inset-0 w-full h-full text-blue-500 dark:text-blue-400 transition-transform duration-300" />
        )}
      </span>
    </button>
  );
}
