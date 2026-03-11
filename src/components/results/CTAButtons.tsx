import React from 'react';
import { Play, Calendar } from 'lucide-react';
import Button from '../ui/Button';

interface CTAButtonsProps {
  onDismiss: () => void;
}

export default function CTAButtons({ onDismiss }: CTAButtonsProps) {
  return (
    <div className="space-y-3 mt-6">
      <a
        href="https://profitleakfix.com/stopleaks-1"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-brand-blue-accent hover:bg-brand-blue-dark text-white font-semibold text-sm rounded-lg transition-all"
      >
        <Play className="w-4 h-4" />
        Watch 15-Min Training
      </a>

      <a
        href="https://ai.mantechdesigns.com/widget/bookings/resilience"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm rounded-lg transition-all"
      >
        <Calendar className="w-4 h-4" />
        Book Free Strategy Session
      </a>

      <button
        onClick={onDismiss}
        className="w-full text-center text-gray-500 text-xs hover:text-gray-400 transition-colors py-2"
      >
        Close Results & Continue to Step 2
      </button>
    </div>
  );
}
