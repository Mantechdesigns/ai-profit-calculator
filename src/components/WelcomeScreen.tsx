interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-accent-gold leading-tight mb-6">
          Most Scaling Businesses Have Hidden Revenue Gaps - Here's a 90-Second Audit to Reveal Yours.
        </h1>

        <p className="text-white text-lg md:text-xl mb-8 leading-relaxed">
          Answer 4 quick questions and see exactly where your business is leaking profit - in real dollars.
        </p>

        <p className="text-text-muted text-sm mb-10 max-w-md mx-auto leading-relaxed">
          This isn't a personality quiz. These questions expose where revenue slips through broken systems, slow follow-up, and CEO dependency. Answer honestly - your results are only as accurate as your inputs.
        </p>

        <button
          onClick={onStart}
          className="w-full md:w-auto px-12 py-4 rounded-xl font-bold text-lg text-white bg-gradient-cta hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent-cyan/25"
        >
          Start My Free Audit
        </button>
      </div>

      <footer className="mt-16">
        <p className="text-text-muted text-[10px]">
          &copy; 2026 | Man - Tech Designs LLC. This audit is an educational tool. Any financial figures are illustrative estimates and do not guarantee specific results.
        </p>
      </footer>
    </div>
  );
}
