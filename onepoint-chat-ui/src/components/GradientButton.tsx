import { ReactNode } from 'react';

interface GradientButtonProps {
  onClick: () => void;
  icon?: ReactNode;
  title?: string;
  children: ReactNode;
}

export default function GradientButton({ onClick, icon, title, children }: GradientButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="group px-1.5 md:px-4 py-2 md:py-3 bg-gradient-to-r from-blue-500 cursor-pointer to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2.5 transform hover:scale-[1.03] animate-fade-in"
    >
      {icon && icon}
      <span className="md:font-medium font-light text-xs md:text-base">{children}</span>
    </button>
  );
}
