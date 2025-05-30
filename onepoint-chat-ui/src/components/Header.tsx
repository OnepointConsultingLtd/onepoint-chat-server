export default function Header({ handleRestart }: { handleRestart: () => void }) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <header className="bg-white p-3 w-full relative !-50">
          <div className="flex items-center space-x-4 w-full justify-between">
            <div className="flex items-center space-x-4 pr-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0ea5e9] rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h1 className="text-xl md:text-3xl font-bold text-[#0284c7]">OSCA</h1>
                <p className="text-[#64748b] lg:text-base text-sm">
                  Onepoint's Smart Cognitive Assistant
                </p>
              </div>
            </div>

            <div className="flex justify-start">
              <button
                onClick={handleRestart}
                className="group px-2 md:px-5 py-2 md:py-2.5 bg-white border-2 border-[#e2e8f0] text-[#64748b] rounded-2xl hover:border-[#0ea5e9] hover:text-[#0ea5e9] cursor-pointer transition-all duration-300 flex items-center gap-2.5 relative"
              >
                <svg
                  className="w-5 h-5 transition-transform duration-500 ease-out group-hover:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="font-medium md:!block !hidden">New Chat</span>
              </button>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
