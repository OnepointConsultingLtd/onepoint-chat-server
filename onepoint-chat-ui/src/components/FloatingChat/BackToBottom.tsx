export default function BackToBottom({ scrollToTop }: { scrollToTop: () => void }) {
  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-28 transform -translate-x-1/2 left-1/2 z-50 w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group active:scale-95"
      aria-label="Back to top"
    >
      <svg
        className="w-3 h-3 transform group-hover:translate-y-0.5 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>
  );
}
