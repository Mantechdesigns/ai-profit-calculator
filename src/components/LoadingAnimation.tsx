import { useEffect, useState } from 'react';

export default function LoadingAnimation() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-accent-cyan/30 animate-ping" />
        <div className="absolute inset-2 rounded-full border-2 border-accent-teal/40 animate-ping" style={{ animationDelay: '0.3s' }} />
        <div className="absolute inset-4 rounded-full border-2 border-accent-cyan/50 animate-ping" style={{ animationDelay: '0.6s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-accent-cyan to-accent-teal animate-pulse" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-2">
        Calculating your results{dots}
      </h2>
      <p className="text-text-secondary text-sm">
        Analyzing your responses across all 4 pillars
      </p>
    </div>
  );
}
