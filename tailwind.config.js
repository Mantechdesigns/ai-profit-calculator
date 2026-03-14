/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0B0F19',
        'bg-card': '#111827',
        'bg-card-hover': '#1A2332',
        'accent-gold': '#F5A623',
        'accent-cyan': '#00D4FF',
        'accent-teal': '#00D4AA',
        'accent-red': '#FF4757',
        'accent-orange': '#FF6B35',
        'accent-yellow': '#FFD93D',
        'accent-green': '#00C853',
        'text-primary': '#FFFFFF',
        'text-secondary': '#94A3B8',
        'text-muted': '#64748B',
        'border-card': 'rgba(255, 255, 255, 0.08)',
        'blur-overlay': 'rgba(11, 15, 25, 0.6)',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-cta': 'linear-gradient(135deg, #00D4FF, #00D4AA)',
      },
    },
  },
  plugins: [],
};
