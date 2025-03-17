export default function ThinkingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] md:max-w-[70%] p-4 shadow-sm bg-[#f1f5f9] text-[#1e293b] rounded-r-2xl rounded-tl-2xl">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-[bounce_1s_infinite_-0.3s]"></div>
          <div className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-[bounce_1s_infinite_-0.15s]"></div>
          <div className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
