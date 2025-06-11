import { ReactNode } from 'react';

type GradientButtonProps = {
  onClick: () => void;
  icon?: ReactNode;
  title?: string;
  children: ReactNode;
};

export default function GradientButton({ onClick, icon, title, children }: GradientButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex items-center gap-2 py-2 rounded-lg cursor-pointer bg-white border border-gray-200 shadow-sm hover:bg-blue-50 transition-colors text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300 w-auto px-4"
    >
      {icon && icon}
      <span className="md:font-medium font-light text-xs md:text-base">{children}</span>
    </button>
  );
}

// Mini button component for dropdown items
type MiniGradientButtonProps = {
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
};

export const MiniGradientButton = ({ onClick, icon, children }: MiniGradientButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full cursor-pointer px-4 py-3 text-left text-sm flex items-center transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transform hover:translate-x-1"
    >
      <div className="mr-3 flex-shrink-0">{icon}</div>
      <span className="text-gray-700 font-medium">{children}</span>
    </button>
  );
};
