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
      className="group h-full flex items-center gap-2 dark:!text-[#fafffe] py-2.5 px-4 rounded-lg cursor-pointer dark:!bg-[#1F1925] dark:hover:bg-[#2a1f35] bg-[#fafffe] hover:bg-gray-50 border border-[#636565] dark:border-[#fafffe] hover:border-[#9a19ff] dark:hover:border-[#9a19ff] shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 hover:text-gray-900 dark:hover:!text-[#fafffe] font-medium focus:outline-none focus:ring-2 focus:ring-[#9a19ff]  md:w-full w-fit  focus:ring-offset-1"
    >
      {icon && <div className="transition-colors duration-200  !fill-[#9a19ff]">{icon}</div>}
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
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <div
        className={`mr-3 flex-shrink-0 transition-colors duration-200 ${
          disabled
            ? 'text-gray-400'
            : 'dark:!text-[#fafffe] text-gray-500 group-hover:text-[#9a19ff]'
        }`}
      >
        {icon}
      </div>
      <span
        className={`font-medium transition-colors duration-200 ${
          disabled
            ? 'text-gray-400'
            : 'dark:!text-[#fafffe] text-gray-500 group-hover:text-[#9a19ff]'
        }`}
      >
        {children}
      </span>
    </button>
  );
};
