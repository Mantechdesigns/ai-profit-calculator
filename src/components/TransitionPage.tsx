import { useState, useEffect, useRef } from 'react';
import { trackTrainingClick } from '../lib/metaPixel';

const VSL_URL = 'https://profitleakfix.com/stopleaks-1';

export default function TransitionPage() {
  const [countdown, setCountdown] = useState(30);
  const hasRedirected = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const next = prev - 1;
        if (next <= 0 && !hasRedirected.current) {
          hasRedirected.current = true;
          trackTrainingClick();
          window.location.href = VSL_URL;
        }
        return Math.max(next, 0);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleWatchNow = () => {
    if (!hasRedirected.current) {
      hasRedirected.current = true;
      trackTrainingClick();
      window.location.href = VSL_URL;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="max-w-lg mx-auto">
        {/* Confirmation line */}
        <p className="text-white text-base md:text-lg mb-8">
          Your full Profit Gap Report is on its way to your inbox.
        </p>

        {/* Transition headline */}
        <h1 className="text-2xl md:text-3xl font-bold text-accent-gold leading-tight mb-6">
          While you wait — your free training is loading now.
        </h1>

        {/* Value statement */}
        <p className="text-white text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto">
          In the next 28 minutes, you'll see the exact system service-based CEOs use to find and fix their biggest profit leaks — often within the first 14 days. This training is free, on-demand, and available right now.
        </p>

        {/* Countdown */}
        <p className="text-text-secondary text-sm mb-2">Your training begins in:</p>
        <p className="text-5xl md:text-6xl font-extrabold text-white mb-8 tabular-nums">
          {countdown}
        </p>

        {/* CTA button */}
        <button
          onClick={handleWatchNow}
          className="w-full md:w-auto px-12 py-4 rounded-xl font-bold text-lg text-white bg-gradient-cta hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent-cyan/25 mb-6"
        >
          Watch My Free Training Now →
        </button>

        {/* Supporting line */}
        <p className="text-text-muted text-sm">
          No credit card. No pitch on this page. Just the system.
        </p>
      </div>
    </div>
  );
}
