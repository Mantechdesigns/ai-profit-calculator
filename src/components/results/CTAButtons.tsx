import { Calendar, ArrowRight, Lock } from 'lucide-react';

interface CTAButtonsProps {
  onDismiss: () => void;
}

export default function CTAButtons({ onDismiss }: CTAButtonsProps) {
  return (
    <div className="space-y-3 mt-6">
      {/* Primary CTA — curiosity-driven Step 2 hook */}
      <button
        onClick={onDismiss}
        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-brand-cyan via-brand-blue-accent to-brand-cyan bg-[length:200%_100%] animate-shimmer px-6 py-4 text-white font-bold text-base shadow-lg shadow-brand-cyan/25 hover:shadow-brand-cyan/40 transition-shadow"
      >
        <div className="flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" />
          <span>Unlock Your Custom Fix Plan</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
        <p className="text-white/80 text-xs mt-1 font-normal">
          See exactly which leaks to fix first — takes 60 seconds
        </p>
      </button>

      <a
        href="https://ai.mantechdesigns.com/widget/bookings/resilience"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm rounded-lg transition-all"
      >
        <Calendar className="w-4 h-4" />
        Book Free Strategy Session
      </a>
    </div>
  );
}
