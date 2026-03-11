import React, { useState, useEffect } from 'react';

const MESSAGES = [
  'Analyzing your business data...',
  'Calculating profit leaks across 4 pillars...',
  'Generating your personalized report...',
  'Almost done...',
];

export default function LoadingSpinner() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
        <div className="absolute inset-0 border-4 border-brand-blue-accent border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-white text-lg font-semibold mb-2">Generating Your Report</p>
      <p className="text-gray-400 text-sm text-center transition-all duration-300">
        {MESSAGES[messageIndex]}
      </p>
    </div>
  );
}
