import React, { useEffect } from 'react';
import { Play } from 'lucide-react';

export default function StepTwoSection() {
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
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-brand-blue-accent flex items-center justify-center text-white font-bold text-sm">
          2
        </div>
        <div>
          <h2 className="text-white font-bold text-base">Complete Your Strategy Survey</h2>
          <p className="text-gray-400 text-xs">Answer a few quick questions to see if you qualify</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-6">
        <iframe
          src="https://ai.mantechdesigns.com/widget/survey/TuWaHqf61ArtpYON5OTb"
          style={{ width: '100%', minHeight: '500px', border: 'none' }}
          scrolling="no"
          id="TuWaHqf61ArtpYON5OTb"
          title="survey"
        />
      </div>

      <a
        href="https://profitleakfix.com/stopleaks-1"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-brand-blue-accent hover:bg-brand-blue-dark text-white font-semibold text-sm rounded-lg transition-all mb-3"
      >
        <Play className="w-4 h-4" />
        Watch Free Training
      </a>

      <button
        onClick={() => {
          window.parent.postMessage({ type: 'profit-leak-complete' }, '*');
        }}
        className="w-full text-center text-gray-500 text-xs hover:text-gray-400 transition-colors py-2"
      >
        I'll do this later
      </button>
    </div>
  );
}
