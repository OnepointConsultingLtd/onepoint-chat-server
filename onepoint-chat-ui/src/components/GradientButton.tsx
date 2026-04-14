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
      className="group h-full flex items-center gap-2 dark:!text-[color:var(--osca-text-on-dark)] py-2.5 px-4 rounded-lg cursor-pointer dark:!bg-[color:var(--osca-bg-dark)] dark:hover:bg-[color:var(--osca-surface-dark)] bg-[color:var(--osca-bg-light)] hover:bg-gray-50 border border-[color:var(--osca-border-light)] dark:border-[color:var(--osca-border-dark)] hover:border-[color:var(--osca-accent)] dark:hover:border-[color:var(--osca-accent)] shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 hover:text-gray-900 dark:hover:!text-[color:var(--osca-text-on-dark)] font-medium focus:outline-none focus:ring-2 focus:ring-[color:var(--osca-accent)]  md:w-full w-fit  focus:ring-offset-1"
    >
      {icon && <div className="transition-colors duration-200  !fill-[color:var(--osca-accent)]">{icon}</div>}
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
      className={`group w-full cursor-pointer px-3 py-2.5 text-left text-sm flex items-center transition-colors duration-200 rounded-lg mx-1 my-0.5 ${disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
    >
      <div
        className={`mr-3 flex-shrink-0 transition-colors duration-200 ${disabled
            ? 'text-gray-400'
            : 'dark:!text-[color:var(--osca-text-on-dark)] text-gray-500 group-hover:text-[color:var(--osca-accent)]'
          }`}
      >
        {icon}
      </div>
      <span
        className={`font-medium transition-colors duration-200 ${disabled
            ? 'text-gray-400'
            : 'dark:!text-[color:var(--osca-text-on-dark)] text-gray-500 group-hover:text-[color:var(--osca-accent)]'
          }`}
      >
        {children}
      </span>
    </button>
  );
};
