import { useState, useEffect, useRef } from 'react';
import { trackTrainingClick, trackPdfDownload } from '../lib/metaPixel';
import type { AuditResult } from '../lib/calculations';

const VSL_URL = 'https://profitleakfix.com/stopleaks-1';

interface TransitionPageProps {
  firstName: string;
  result: AuditResult;
  scores: Record<string, number>;
}

export default function TransitionPage({ firstName, result, scores }: TransitionPageProps) {
  const [countdown, setCountdown] = useState(30);
  const [pdfStatus, setPdfStatus] = useState<'generating' | 'ready' | 'error'>('generating');
  const hasRedirected = useRef(false);
  const pdfBlobUrl = useRef<string | null>(null);

  // Auto-generate PDF on mount
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { generateProfitLeakPdfV2 } = await import('../lib/pdf/generatePdfV2');
        const blob = await generateProfitLeakPdfV2(firstName, result, scores);

        if (cancelled) return;

        const url = URL.createObjectURL(blob);
        pdfBlobUrl.current = url;
        setPdfStatus('ready');
        trackPdfDownload();

        // Auto-download the PDF
        const a = document.createElement('a');
        a.href = url;
        a.download = `Profit-Leak-Report-${firstName || 'Report'}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (err) {
        console.error('PDF generation failed:', err);
        if (!cancelled) setPdfStatus('error');
      }
    })();

    return () => { cancelled = true; };
  }, [firstName, result, scores]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const next = prev - 1;
        if (next <= 0 && !hasRedirected.current) {
          hasRedirected.current = true;
          trackTrainingClick();
          window.location.href = VSL_URL;
        }
        return Math.max(next, 0);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleWatchNow = () => {
    if (!hasRedirected.current) {
      hasRedirected.current = true;
      trackTrainingClick();
      window.location.href = VSL_URL;
    }
  };

  const handleDownloadPdf = () => {
    if (pdfBlobUrl.current) {
      const a = document.createElement('a');
      a.href = pdfBlobUrl.current;
      a.download = `Profit-Leak-Report-${firstName || 'Report'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="max-w-lg mx-auto">
        {/* PDF status line */}
        <div className="mb-6">
          {pdfStatus === 'generating' && (
            <p className="text-text-secondary text-sm animate-pulse">
              Generating your Profit Gap Report...
            </p>
          )}
          {pdfStatus === 'ready' && (
            <p className="text-accent-teal text-sm font-medium">
              Your Profit Gap Report has been downloaded.{' '}
              <button onClick={handleDownloadPdf} className="underline hover:text-white transition-colors">
                Download again
              </button>
            </p>
          )}
          {pdfStatus === 'error' && (
            <p className="text-text-secondary text-sm">
              Your full Profit Gap Report is on its way to your inbox.
            </p>
          )}
        </div>

        {/* Transition headline */}
        <h1 className="text-2xl md:text-3xl font-bold text-accent-gold leading-tight mb-6">
          While you wait — your free training is loading now.
        </h1>

        {/* Value statement */}
        <p className="text-white text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto">
          In less than 10 minutes, you'll see the exact system service-based CEOs use to find and fix their biggest profit leaks — often within the first 14 days. This training is free, on-demand, and available right now.
        </p>

        {/* Countdown */}
        <p className="text-text-secondary text-sm mb-2">Your training begins in:</p>
        <p className="text-5xl md:text-6xl font-extrabold text-white mb-8 tabular-nums">
          {countdown}
        </p>

        {/* CTA button */}
        <button
          onClick={handleWatchNow}
          className="w-full md:w-auto px-12 py-4 rounded-xl font-bold text-lg text-white bg-gradient-cta hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent-cyan/25 mb-6"
        >
          Watch My Free Training Now →
        </button>

        {/* Supporting line */}
        <p className="text-text-muted text-sm">
          No credit card. Exclusive invite. Just the system.
        </p>
      </div>
    </div>
  );
}
