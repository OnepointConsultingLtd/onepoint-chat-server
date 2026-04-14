export default function Loader() {
	return (
		<div className="flex flex-col justify-center items-center h-screen bg-[color:var(--osca-bg-light)] dark:!bg-[color:var(--osca-bg-dark)]">
			{/* Logo/Brand Section */}

			{/* Loading Spinner */}
			<div className="relative mb-6">
				{/* Outer rotating ring */}
				<div className="w-20 h-20 border-4 border-[color:color-mix(in_srgb,var(--osca-border-light)_10%,transparent)] dark:border-[color:color-mix(in_srgb,var(--osca-border-dark)_10%,transparent)] rounded-full"></div>
				{/* Middle rotating ring */}
				<div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-[color:var(--osca-accent)] border-r-[color:color-mix(in_srgb,var(--osca-accent)_50%,transparent)] rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
				{/* Inner pulsing dot */}
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[color:var(--osca-accent)] rounded-full animate-pulse shadow-lg shadow-[color:color-mix(in_srgb,var(--osca-accent)_50%,transparent)]"></div>
			</div>

			{/* Loading Text */}
			<div className="text-center">
				<p className="text-gray-700 dark:!text-[color:var(--osca-text-on-dark)] text-base font-semibold mb-2">Loading</p>
				<div className="flex justify-center gap-1">
					<div className="w-1.5 h-1.5 bg-[color:var(--osca-accent)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
					<div className="w-1.5 h-1.5 bg-[color:var(--osca-accent)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
					<div className="w-1.5 h-1.5 bg-[color:var(--osca-accent)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
				</div>
			</div>
		</div>
	)
}
