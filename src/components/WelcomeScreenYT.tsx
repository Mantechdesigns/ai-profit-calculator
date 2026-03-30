import TrustStrip from './TrustStrip';

interface WelcomeScreenYTProps {
  onStart: () => void;
}

export default function WelcomeScreenYT({ onStart }: WelcomeScreenYTProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="max-w-xl mx-auto">
        {/* AI Badge */}
        <div className="inline-flex items-center gap-2 bg-accent-cyan/10 border border-accent-cyan/30 px-4 py-2 rounded-full mb-6">
          <svg className="w-4 h-4 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-accent-cyan text-sm font-semibold tracking-wide">AI-Powered Diagnostic</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6">
          AI Profit Leak Audit
        </h1>

        <p className="text-accent-gold text-lg md:text-xl mb-4 leading-relaxed font-semibold">
          Find out exactly where your business is quietly losing money — in under 90 seconds.
        </p>

        <p className="text-white text-base md:text-lg mb-8 leading-relaxed">
          Answer 4 quick questions about your business. Get an instant estimate — in real dollars — of where revenue is slipping through the cracks due to broken systems, slow follow-up, and operational gaps.
        </p>

        <p className="text-text-muted text-sm mb-10 max-w-md mx-auto leading-relaxed">
          Used by 7-figure operators to identify and fix hidden profit leaks.
        </p>

        <button
          onClick={onStart}
          className="w-full md:w-auto px-12 py-4 rounded-xl font-bold text-lg text-white bg-gradient-cta hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent-cyan/25"
        >
          Start My Free Audit
        </button>

        <TrustStrip />
      </div>

      <footer className="mt-16">
        <p className="text-text-muted text-[10px] max-w-lg mx-auto leading-relaxed">
          &copy; 2026 | Man-Tech Designs LLC. This audit is an educational tool. Financial figures shown are illustrative estimates based on your inputs and industry benchmarks. They do not guarantee specific results. Results vary based on industry, execution, and business model.
        </p>
      </footer>
    </div>
  );
}
