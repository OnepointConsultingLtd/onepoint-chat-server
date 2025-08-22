export default function ThinkingIndicator() {
  return (
    <div className="p-3 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-400 dark:to-gray-400 rounded-xl">
      {/* Header with AI indicator */}
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-3 shadow-sm">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">OSCA</span>
          <div className="flex space-x-1">
            <div
              className="w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce"
              style={{ animationDelay: '0ms' }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce"
              style={{ animationDelay: '150ms' }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-3">
        {/* First paragraph */}
        <div className="space-y-2">
          <div className="h-1 md:h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-600 rounded animate-pulse w-3/4"></div>
          <div className="h-1 md:h-4 md:block hidden bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-600 rounded animate-pulse w-full"></div>
          <div className="h-1 md:h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-600 rounded animate-pulse w-5/6"></div>
        </div>

        {/* Second paragraph */}
        <div className="space-y-2">
          <div className="h-1 md:h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-600 rounded animate-pulse w-2/3"></div>
          <div className="h-1 md:h-4 bg-gradient-to-r  md:block hidden from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-600 rounded animate-pulse w-full"></div>
          <div className="h-1 md:h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-600 rounded animate-pulse w-4/5"></div>
        </div>

        {/* Third paragraph */}
        <div className="space-y-2">
          <div className="h-1 md:h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-600 rounded animate-pulse w-1/2"></div>
          <div className="h-1 md:h-4 bg-gradient-to-r md:block hidden from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-600 rounded animate-pulse w-full"></div>
          <div className="h-1 md:h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-600 rounded animate-pulse w-3/4"></div>
        </div>

        {/* Final line */}
        <div className="h-1 md:h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-600 rounded animate-pulse w-2/3"></div>
      </div>

      {/* Subtle progress indicator */}
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-500">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-800">
          <span>Processing your request...</span>
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-blue-400 dark:bg-blue-300 rounded-full animate-pulse"></div>
            <div
              className="w-1 h-1 bg-blue-400 dark:bg-blue-300 rounded-full animate-pulse"
              style={{ animationDelay: '200ms' }}
            ></div>
            <div
              className="w-1 h-1 bg-blue-400 dark:bg-blue-300 rounded-full animate-pulse"
              style={{ animationDelay: '400ms' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
