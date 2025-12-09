/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        primary: {
          hover: '#9a19ff',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'progress-bar': 'progress-bar 2s ease-in-out infinite',
        shimmer: 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        'progress-bar': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(200%)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      },
    },
  },
  plugins: [],
};
