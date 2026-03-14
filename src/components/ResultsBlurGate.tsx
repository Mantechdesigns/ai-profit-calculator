import { useState, useEffect, useRef } from 'react';
import type { AuditResult } from '../lib/calculations';
import { QUIZ_SECTIONS } from '../data/questions';
import PillarCardV2 from './PillarCardV2';

interface ResultsBlurGateProps {
  result: AuditResult;
  scores: Record<string, number>;
  onUnlock: (firstName: string, email: string) => void;
}

export default function ResultsBlurGate({ result, scores, onUnlock }: ResultsBlurGateProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animatedLeak, setAnimatedLeak] = useState(0);
  const counterRef = useRef<number | null>(null);

  const monthlyLeak = Math.round(result.totalLeak / 12);

  // Animated counter
  useEffect(() => {
    const target = result.totalLeak;
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedLeak(Math.round(target * eased));

      if (progress < 1) {
        counterRef.current = requestAnimationFrame(animate);
      }
    };

    counterRef.current = requestAnimationFrame(animate);
    return () => {
      if (counterRef.current) cancelAnimationFrame(counterRef.current);
    };
  }, [result.totalLeak]);

  // Form submit handler — WEBHOOK LOGIC UNTOUCHED, only visual changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    setIsSubmitting(true);
    onUnlock(firstName.trim(), email.trim());
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Get selected answer text for each pillar (used for blurred cards)
  const getSelectedAnswer = (pillarId: string) => {
    const section = QUIZ_SECTIONS.find((s) => s.id === pillarId);
    const score = scores[pillarId];
    if (!section) return '';
    const option = section.options.find((o) => o.score === score);
    return option?.text || '';
  };

  return (
    <div className="min-h-screen px-4 py-3">
      <div className="max-w-xl mx-auto">
        {/* SECTION A: Partial Results */}
        <div className="text-center mb-3 animate-fadeIn">
          {/* Profit Leak Detected badge */}
          <div className="inline-flex items-center gap-2 bg-accent-red/10 border border-accent-red/30 px-3 py-1 rounded-full mb-2">
            <span className="text-accent-red text-xs font-medium">Profit Leak Detected</span>
          </div>

          <h2 className="text-lg md:text-xl font-bold text-white mb-1">
            Your estimated annual profit leak:
          </h2>

          {/* Dollar figure — the biggest visual element */}
          <p className="text-4xl md:text-5xl font-extrabold text-accent-cyan mb-1 tracking-tight">
            ${animatedLeak.toLocaleString()}
          </p>

          {/* Percentage context */}
          <p className="text-text-secondary text-xs mb-2">
            That's roughly {result.leakPercentage}% of your estimated annual revenue
          </p>

          {/* Monthly cost breakdown — urgency trigger */}
          <p className="text-white text-sm md:text-base font-bold mb-2">
            That's approximately ${monthlyLeak.toLocaleString()} leaving your business every month.
          </p>

          {/* Biggest leak label */}
          <p className="text-white text-xs font-semibold">
            Your biggest leak: <span className="text-accent-orange">{result.biggestLeakPillar.name}</span>
          </p>
        </div>

        {/* Visual separator */}
        <div className="border-t border-white/10 mb-3" />

        {/* SECTION B: Opt-In Gate */}
        <div className="relative mb-4">
          {/* Blurred pillar cards in background */}
          <div className="filter blur-[8px] select-none pointer-events-none">
            {result.pillars.map((pillar) => (
              <PillarCardV2
                key={pillar.id}
                pillar={pillar}
                selectedAnswer={getSelectedAnswer(pillar.id)}
              />
            ))}
          </div>

          {/* Gate overlay + form */}
          <div className="absolute inset-0 bg-blur-overlay backdrop-blur-sm flex items-center justify-center rounded-xl">
            <div className="bg-bg-card border border-border-card rounded-2xl p-4 mx-4 max-w-md w-full shadow-2xl">
              <div className="text-center mb-3">
                {/* Lock icon */}
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>

                <h3 className="text-white font-bold text-base mb-1">
                  Enter your name and email to unlock your full breakdown
                </h3>
                <p className="text-text-secondary text-xs mb-2">
                  See exactly where the money is leaking — pillar by pillar — plus your custom fix for each.
                </p>

                {/* Trust micro-line — social proof at decision point */}
                <p className="text-text-muted text-xs">
                  Built on the same diagnostic used by 7-figure operators. Featured on Fox News &amp; CBS.
                </p>
              </div>

              {/* Form — field names, IDs, and submission handler are UNCHANGED */}
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your first name"
                  className="w-full px-3 py-2.5 rounded-xl bg-bg-primary border border-border-card text-white placeholder-text-muted focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/50 outline-none transition-all text-sm"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your best email"
                  className="w-full px-3 py-2.5 rounded-xl bg-bg-primary border border-border-card text-white placeholder-text-muted focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/50 outline-none transition-all text-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !firstName.trim() || !isValidEmail}
                  className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-cta hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent-cyan/25"
                >
                  {isSubmitting ? 'Unlocking...' : 'Show Me Where My Money Is Hiding'}
                </button>
              </form>

              <p className="text-text-muted text-xs text-center mt-3">
                We'll also email you a PDF copy. No spam, ever.
              </p>

              {/* Financial disclaimer */}
              <p className="text-text-muted text-[10px] text-center mt-2">
                Financial figures shown are illustrative estimates based on your inputs. They do not guarantee specific results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
