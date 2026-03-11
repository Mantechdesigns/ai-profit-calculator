/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0a1628',
        'brand-darker': '#0d1117',
        'brand-navy': '#111d33',
        'brand-cyan': '#06d6f2',
        'brand-cyan-dark': '#0891b2',
        'brand-blue': '#188bf6',
        'brand-blue-light': '#38bdf8',
        'brand-blue-accent': '#0ea5e9',
        'brand-blue-dark': '#0284c7',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};
