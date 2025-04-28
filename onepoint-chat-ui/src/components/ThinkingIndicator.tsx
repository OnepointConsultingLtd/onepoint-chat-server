export default function ThinkingIndicator() {
  return (
    <div className="p-4 bg-white">
      <div className="text-xs text-gray-500 mb-1">Assistant</div>
      <div className="skeleton-container">
        <div className="skeleton-line w-3/4 h-3 bg-gray-200 rounded my-2 animate-pulse"></div>
        <div className="skeleton-line w-1/2 h-3 bg-gray-200 rounded my-2 animate-pulse"></div>
        <div className="skeleton-line w-2/3 h-3 bg-gray-200 rounded my-2 animate-pulse"></div>
      </div>
    </div>
  );
}
