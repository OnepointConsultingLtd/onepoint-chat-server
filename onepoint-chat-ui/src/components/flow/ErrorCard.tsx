import { MdError, MdRefresh } from 'react-icons/md';
import { IoWarningOutline } from 'react-icons/io5';

export default function ErrorCard({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative max-w-lg w-full">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-red-500 to-red-600 dark:from-red-600 dark:via-red-700 dark:to-red-800 rounded-2xl blur-sm opacity-75 animate-pulse"></div>

        {/* Main card */}
        <div className="relative bg-[#fafffe] dark:!bg-[#1F1925] rounded-2xl shadow-2xl overflow-hidden border border-red-200 dark:border-red-800/50 backdrop-blur-sm">
          {/* Decorative top border */}
          <div className="h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-600 dark:from-red-500 dark:via-red-600 dark:to-red-700"></div>

          {/* Header section with floating icon */}
          <div className="relative p-4">
            {/* Floating error icon with glow effect */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 dark:bg-red-600 rounded-full blur-md opacity-60 animate-pulse"></div>
                <div className="relative bg-red-500 dark:bg-red-600 p-4 rounded-full shadow-xl">
                  <MdError className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:!text-[#fafffe] mb-2 tracking-tight">
              {title}
            </h3>

            {/* Decorative line */}
            <div className="flex justify-center">
              <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-red-600 dark:from-red-500 dark:to-red-700 rounded-full"></div>
            </div>
          </div>

          {/* Message content with subtle background */}
          <div className="px-8 py-6 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <IoWarningOutline className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700 dark:!text-[#fafffe] leading-relaxed text-base">
                {message}
              </p>
            </div>
          </div>

          {/* Enhanced action area */}
          <div className="px-8 py-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={() => window.location.reload()}
                className="group flex items-center gap-2 cursor-pointer bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/30 dark:focus:ring-red-600/30"
              >
                <MdRefresh className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </button>
            </div>
          </div>

          {/* Subtle bottom glow effect */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-red-400 dark:bg-red-500 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-8 right-6 w-1 h-1 bg-red-500 dark:bg-red-600 rounded-full opacity-40 animate-pulse"></div>
        <div
          className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-red-300 dark:bg-red-400 rounded-full opacity-50 animate-bounce"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>
    </div>
  );
}
