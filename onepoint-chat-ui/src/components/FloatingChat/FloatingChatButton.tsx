export default function FloatingChatButton({ click }: { click: () => void }) {
  return (
    <div className="flex justify-center fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-full px-4 sm:px-0 z-40">
      <button
        onClick={click}
        className="group relative w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-[#9a19ff] to-[#9a19ff] text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-[#9a19ff]/25 active:scale-95 sm:hover:scale-105 transition-all duration-300 hover:from-[#9a19ff] hover:to-[#9a19ff] flex items-center justify-center gap-2 sm:gap-2.5"
      >
        <div className="relative flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0">
          <div className="absolute w-full h-0.5 transition-all duration-300 rotate-0 bg-white rounded group-hover:rotate-45"></div>
          <div className="absolute w-full h-0.5 transition-all duration-300 rotate-90 bg-white rounded group-hover:-rotate-45"></div>
        </div>
        <span className="whitespace-nowrap">Start Conversation</span>
        <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse hidden sm:block"></div>
      </button>
    </div>
  );
}
