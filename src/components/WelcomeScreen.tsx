import TrustStrip from './TrustStrip';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-accent-gold leading-tight mb-6">
          You're Probably Losing $100K+ a Year and Don't Know It.
          <br className="hidden md:block" />
          Here's a 90-Second Audit to Show You Exactly Where.
        </h1>

        <p className="text-white text-lg md:text-xl mb-8 leading-relaxed">
          Answer 4 quick questions about your business. Get an instant estimate — in real dollars — of where revenue is slipping through broken systems, slow follow-up, and CEO dependency.
        </p>

        <p className="text-text-muted text-sm mb-10 max-w-md mx-auto leading-relaxed">
          This isn't a personality quiz. These questions expose where money leaks due to gaps in your lead gen, sales, retention, and operations. Answer honestly — your results are only as accurate as your inputs.
        </p>

        <button
          onClick={onStart}
          className="w-full md:w-auto px-12 py-4 rounded-xl font-bold text-lg text-white bg-gradient-cta hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent-cyan/25"
        >
          Start My Free Audit
        </button>

        {/* Trust strip */}
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
