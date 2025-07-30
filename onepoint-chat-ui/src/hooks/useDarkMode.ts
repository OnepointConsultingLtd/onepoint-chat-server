import { useEffect, useState } from 'react';

export const useDarkMode = () => {
	const [isDark, setIsDark] = useState(() => {
		try {
			const saved = localStorage.getItem('theme');
			if (saved === 'dark') return true;
			if (saved === 'light') return false;
			return window.matchMedia('(prefers-color-scheme: dark)').matches;
		} catch {
			return false;
		}
	});

	useEffect(() => {
		const root = document.documentElement;
		if (isDark) {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}

		try {
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
		} catch {
			// Ignore localStorage errors
		}
	}, [isDark]);

	const toggleTheme = () => {
		setIsDark(current => !current);
	};

	const setLightMode = () => setIsDark(false);
	const setDarkMode = () => setIsDark(true);

	return {
		isDark,
		toggleTheme,
		setLightMode,
		setDarkMode,
	};
}; 