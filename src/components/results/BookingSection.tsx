import { useEffect } from 'react';
import { Calendar, FileText, Upload, Phone } from 'lucide-react';

interface BookingSectionProps {
  onBack: () => void;
}

export default function BookingSection({ onBack }: BookingSectionProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://ai.mantechdesigns.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center text-brand-dark font-bold text-sm">
          2
        </div>
        <div>
          <h2 className="text-white font-bold text-base">Book Your Strategy Call</h2>
          <p className="text-gray-400 text-xs">Let's build your custom fix plan together</p>
        </div>
      </div>

      {/* Steps reminder */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-4 h-4 text-green-400 flex-shrink-0" />
          <p className="text-green-400 text-xs font-medium">PDF Report Downloaded</p>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <Upload className="w-4 h-4 text-brand-cyan flex-shrink-0" />
          <p className="text-white text-xs font-medium">Upload your PDF below when booking</p>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-brand-blue-light flex-shrink-0" />
          <p className="text-gray-400 text-xs">Pick a time that works for you</p>
        </div>
      </div>

      {/* Embedded calendar booking form */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-4">
        <iframe
          src="https://profitleakfix.com/audit-calendar-yt"
          style={{ width: '100%', minHeight: '600px', border: 'none' }}
          scrolling="no"
          id="resilience-booking"
          title="Book Strategy Call"
        />
      </div>

      {/* Back to results */}
      <button
        onClick={onBack}
        className="w-full text-center text-gray-500 text-xs hover:text-gray-400 transition-colors py-2"
      >
        Back to Results
      </button>
    </div>
  );
}
