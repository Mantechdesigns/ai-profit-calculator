import { useState, useEffect, useRef } from 'react';
import type { AuditResult } from '../lib/calculations';
import { getPillarCopy } from '../lib/pillarCopy';
import { QUIZ_SECTIONS } from '../data/questions';
import PillarCardV2 from './PillarCardV2';
import { trackResultsViewed, trackTrainingClick, trackPdfDownload } from '../lib/metaPixel';

const VSL_URL = 'https://profitleakfix.com/stopleaks-1';

interface FullResultsProps {
  result: AuditResult;
  scores: Record<string, number>;
  firstName: string;
}

export default function FullResults({ result, scores, firstName }: FullResultsProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [isUserActive, setIsUserActive] = useState(false);
  const redirectTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasRedirected = useRef(false);

  const biggestCopy = getPillarCopy(result.biggestLeakPillar.id, result.biggestLeakPillar.score);

  // Get selected answer text for each pillar
  const getSelectedAnswer = (pillarId: string) => {
    const section = QUIZ_SECTIONS.find((s) => s.id === pillarId);
    const score = scores[pillarId];
    if (!section) return '';
    const option = section.options.find((o) => o.score === score);
    return option?.text || '';
  };

  useEffect(() => {
    trackResultsViewed();

    // Show banner after 8 seconds
    bannerTimerRef.current = setTimeout(() => {
      setShowBanner(true);
    }, 8000);

    // Start countdown from 15
    let remaining = 15;
    redirectTimerRef.current = setInterval(() => {
      if (isUserActive) return;
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0 && !hasRedirected.current) {
        hasRedirected.current = true;
        trackTrainingClick();
        window.location.href = VSL_URL;
      }
    }, 1000);

    return () => {
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
      if (redirectTimerRef.current) clearInterval(redirectTimerRef.current);
    };
  }, []);

  // Pause redirect when user scrolls or downloads PDF
  useEffect(() => {
    const handleScroll = () => {
      setIsUserActive(true);
      // Resume after 5 seconds of no scrolling
      const timeout = setTimeout(() => setIsUserActive(false), 5000);
      return () => clearTimeout(timeout);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWatchTraining = () => {
    trackTrainingClick();
    window.location.href = VSL_URL;
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    setIsUserActive(true);
    try {
      const { generateProfitLeakPdfV2 } = await import('../lib/pdf/generatePdfV2');
      const blob = await generateProfitLeakPdfV2(firstName, result, scores);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Profit-Leak-Report-${firstName || 'Report'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setPdfDownloaded(true);
      trackPdfDownload();
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Sort pillars by score descending (highest risk first)
  const sortedPillars = [...result.pillars].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen px-6 py-8">
      {/* Auto-redirect banner */}
      {showBanner && !hasRedirected.current && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-bg-card/95 backdrop-blur-md border-b border-accent-cyan/30 px-4 py-3 animate-fadeIn">
          <div className="max-w-xl mx-auto flex items-center justify-between">
            <p className="text-white text-sm">
              Your free training is loading... <span className="text-text-muted">({countdown}s)</span>
            </p>
            <button
              onClick={handleWatchTraining}
              className="px-4 py-1.5 rounded-lg text-sm font-bold text-white bg-gradient-cta hover:opacity-90 transition-all"
            >
              Watch Now
            </button>
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto">
        {/* Top Section */}
        <div className="text-center mb-6 animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-accent-red/10 border border-accent-red/30 px-4 py-2 rounded-full mb-4">
            <span className="text-accent-red text-sm font-medium">Profit Leak Detected</span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            {firstName}, your estimated annual profit leak:
          </h2>
          <p className="text-4xl md:text-5xl font-extrabold text-accent-cyan mb-2">
            ${result.totalLeak.toLocaleString()}
          </p>
          <p className="text-text-secondary text-sm mb-4">
            That's roughly {result.leakPercentage}% of your estimated annual revenue
          </p>

          {/* Quick Snapshot */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left mb-4">
            <p className="text-text-secondary text-sm mb-1">
              Revenue estimated at ${result.annualRevenue.toLocaleString()}/year with a {result.leakPercentage}% profit leak.
            </p>
            <p className="text-text-secondary text-sm mb-1">
              <span className="text-white font-semibold">{sortedPillars[0]?.name}</span> and{' '}
              <span className="text-white font-semibold">{sortedPillars[1]?.name}</span> are your biggest leak areas.
            </p>
            <p className="text-text-secondary text-sm">
              Best immediate fix: <span className="text-accent-gold font-medium">{biggestCopy.fix.split('.')[0]}.</span>
            </p>
          </div>
        </div>

        {/* Pillar Cards */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">
            Leak Breakdown by Pillar
          </h3>
          {sortedPillars.map((pillar) => (
            <div key={pillar.id} className="animate-fadeIn">
              <PillarCardV2
                pillar={pillar}
                selectedAnswer={getSelectedAnswer(pillar.id)}
              />
            </div>
          ))}
        </div>

        {/* Recovery callout */}
        <div className="bg-accent-teal/10 border border-accent-teal/30 rounded-xl p-4 mb-6">
          <p className="text-white text-sm font-semibold leading-relaxed">
            Even if you recovered just half of this over the next 12 months, that's an extra ${result.halfLeak.toLocaleString()} in profit - without increasing ad spend or working more hours.
          </p>
        </div>

        {/* One Thing box */}
        <div className="bg-bg-card border border-border-card rounded-xl p-5 mb-8">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-2">
            If you only fix ONE thing in the next 30 days, fix this:
          </p>
          <p className="text-white font-bold text-base leading-relaxed">
            {biggestCopy.fix}
          </p>
        </div>

        {/* Training Bridge */}
        <div className="bg-gradient-to-br from-bg-card to-bg-card-hover border border-accent-cyan/20 rounded-2xl p-6 mb-6 shadow-lg">
          <h3 className="text-accent-gold font-bold text-lg mb-3">
            See How to Fix These Leaks - Free Training
          </h3>
          <p className="text-text-secondary text-sm mb-2 leading-relaxed">
            I put together a 15-minute walkthrough of the exact framework behind this audit - the same system that helped one client uncover $750K in pipeline revenue and another add $300K in 30 days.
          </p>
          <p className="text-text-secondary text-sm mb-5 leading-relaxed">
            Others pay for this. You get it free because you took the audit.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleWatchTraining}
              className="w-full py-4 rounded-xl font-bold text-base text-white bg-gradient-cta hover:opacity-90 transition-all duration-300 shadow-lg shadow-accent-cyan/25"
            >
              Watch the Free Training Now
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="w-full py-4 rounded-xl font-bold text-base text-white border border-white/20 hover:bg-white/5 transition-all duration-300 disabled:opacity-50"
            >
              {isGeneratingPdf ? 'Generating PDF...' : pdfDownloaded ? 'Download Again' : 'Download Your PDF Report'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 pb-8">
          <p className="text-text-muted text-[10px]">
            &copy; 2026 | Man - Tech Designs LLC. This audit is an educational tool. Any financial figures are illustrative estimates and do not guarantee specific results.
          </p>
        </footer>
      </div>
    </div>
  );
}
