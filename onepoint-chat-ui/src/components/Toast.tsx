import { useEffect } from 'react';
import { FiX, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, isVisible, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const baseClasses =
    'fixed top-4 right-4 z-[9999] max-w-sm w-full bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 transform transition-all duration-300 ease-in-out';
  const visibilityClasses = isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0';

  return (
    <div className={`${baseClasses} ${visibilityClasses}`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {type === 'success' ? (
              <FiCheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <FiAlertCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
          <div className="ml-3 w-0 flex-1">
            <p
              className={`text-sm font-medium ${
                type === 'success'
                  ? 'text-green-800 dark:text-green-200'
                  : 'text-red-800 dark:text-red-200'
              }`}
            >
              {type === 'success' ? 'Success' : 'Error'}
            </p>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={onClose}
              className="inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md"
            >
              <span className="sr-only">Close</span>
              <FiX className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
