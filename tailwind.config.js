/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0D1B2A',
        'bg-card': '#111827',
        'bg-card-hover': '#1A2332',
        'accent-gold': '#D4A843',
        'accent-cyan': '#00D4FF',
        'accent-teal': '#00D4AA',
        'accent-red': '#E53E3E',
        'accent-orange': '#ED8936',
        'accent-yellow': '#FFD93D',
        'accent-green': '#00C853',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0AEC0',
        'text-muted': '#64748B',
        'border-card': 'rgba(255, 255, 255, 0.08)',
        'blur-overlay': 'rgba(13, 27, 42, 0.6)',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-cta': 'linear-gradient(135deg, #00D4AA, #00B4D8)',
      },
    },
  },
  plugins: [],
};
