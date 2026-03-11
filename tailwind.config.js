/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0d1b2a',
        'brand-darker': '#1C1C1C',
        'brand-navy': '#152741',
        'brand-gold': '#D5AB2B',
        'brand-gold-dark': '#967A08',
        'brand-blue': '#188bf6',
        'brand-green': '#22c55e',
        'brand-green-accent': '#37ca37',
        'brand-green-dark': '#2da82d',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
