export default function FloatingChatButton({ click }: { click: () => void }) {
  return (
    <div className="flex justify-center fixed bottom-4 left-1/2 -translate-x-1/2">
      <button
        onClick={click}
        className="group relative px-3 md:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-sm md:text-base rounded-xl shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-purple-700 flex items-center gap-2"
      >
        <div className="relative flex items-center justify-center w-4 h-4">
          <div className="absolute w-full h-0.5 transition-all duration-300 rotate-0 bg-white rounded group-hover:rotate-45"></div>
          <div className="absolute w-full h-0.5 transition-all duration-300 rotate-90 bg-white rounded group-hover:-rotate-45"></div>
        </div>
        <span>Start Conversation</span>
        <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse"></div>
      </button>
    </div>
  );
}
