import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(): boolean {
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};

		// Check on mount
		checkIsMobile();

		// Listen for resize events
		window.addEventListener('resize', checkIsMobile);

		// Cleanup
		return () => window.removeEventListener('resize', checkIsMobile);
	}, []);

	return isMobile;
} 