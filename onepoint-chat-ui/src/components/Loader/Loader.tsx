export default function Loader() {
	return (
		<div className="flex flex-col justify-center items-center h-screen bg-[#fafffe] dark:!bg-[#1F1925]">
			{/* Logo/Brand Section */}

			{/* Loading Spinner */}
			<div className="relative mb-6">
				{/* Outer rotating ring */}
				<div className="w-20 h-20 border-4 border-[#636565]/10 dark:border-[#fafffe]/10 rounded-full"></div>
				{/* Middle rotating ring */}
				<div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-[#9a19ff] border-r-[#9a19ff]/50 rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
				{/* Inner pulsing dot */}
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#9a19ff] rounded-full animate-pulse shadow-lg shadow-[#9a19ff]/50"></div>
			</div>

			{/* Loading Text */}
			<div className="text-center">
				<p className="text-gray-700 dark:!text-[#fafffe] text-base font-semibold mb-2">Loading</p>
				<div className="flex justify-center gap-1">
					<div className="w-1.5 h-1.5 bg-[#9a19ff] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
					<div className="w-1.5 h-1.5 bg-[#9a19ff] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
					<div className="w-1.5 h-1.5 bg-[#9a19ff] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
				</div>
			</div>
		</div>
	)
}
