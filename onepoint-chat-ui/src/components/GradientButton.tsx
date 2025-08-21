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
      className="group h-full flex items-center gap-2 dark:text-gray-100 py-2.5 px-4 rounded-lg cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600 bg-white hover:bg-gray-50 border border-gray-200 dark:border-[#0d8ecb] hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 hover:text-gray-900 dark:hover:text-gray-300 font-medium focus:outline-none focus:ring-2 focus:ring-[#0d8ecb]  md:w-full w-fit  focus:ring-offset-1"
    >
      {icon && <div className="transition-colors duration-200  !fill-blue-500">{icon}</div>}
      <span className="text-sm font-medium transition-colors duration-200 md:block hidden">
        {children}
      </span>
    </button>
  );
}

// Mini button component for dropdown items
type MiniGradientButtonProps = {
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
  disabled?: boolean;
};

export const MiniGradientButton = ({
  onClick,
  icon,
  children,
  disabled = false,
}: MiniGradientButtonProps) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`group w-full cursor-pointer px-3 py-2.5 text-left text-sm flex items-center transition-colors duration-200 rounded-lg mx-1 my-0.5 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
      }`}
    >
      <div
        className={`mr-3 flex-shrink-0 transition-colors duration-200 ${
          disabled ? 'text-gray-400' : 'text-gray-500 group-hover:text-gray-700'
        }`}
      >
        {icon}
      </div>
      <span
        className={`font-medium transition-colors duration-200 ${
          disabled ? 'text-gray-400' : 'text-gray-700 group-hover:text-gray-900'
        }`}
      >
        {children}
      </span>
    </button>
  );
};
