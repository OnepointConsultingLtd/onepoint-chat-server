export default function ThinkingIndicator() {
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
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
          <span className="text-sm font-medium text-gray-700">OSCA</span>
          <div className="flex space-x-1">
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: '0ms' }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: '150ms' }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-3">
        {/* First paragraph */}
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-5/6"></div>
        </div>

        {/* Second paragraph */}
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-2/3"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-4/5"></div>
        </div>

        {/* Third paragraph */}
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-1/2"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-3/4"></div>
        </div>

        {/* Final line */}
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-2/3"></div>
      </div>

      {/* Subtle progress indicator */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Processing your request...</span>
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
            <div
              className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
              style={{ animationDelay: '200ms' }}
            ></div>
            <div
              className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
              style={{ animationDelay: '400ms' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
