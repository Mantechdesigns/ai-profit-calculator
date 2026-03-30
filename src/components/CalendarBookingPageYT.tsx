import { useState, useEffect, useRef } from 'react';
import { trackBookingClick, trackPdfDownload } from '../lib/metaPixel';
import type { AuditResult } from '../lib/calculations';

const GHL_CALENDAR_URL = 'https://profitleakfix.com/audit-calendar-yt';

interface CalendarBookingPageYTProps {
  firstName: string;
  result: AuditResult;
  scores: Record<string, number>;
}

export default function CalendarBookingPageYT({ firstName, result, scores }: CalendarBookingPageYTProps) {
  const [pdfStatus, setPdfStatus] = useState<'generating' | 'ready' | 'error'>('generating');
  const [countdown, setCountdown] = useState(20);
  const pdfBlobUrl = useRef<string | null>(null);
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Auto-redirect countdown after PDF is ready (or on error)
  useEffect(() => {
    if (pdfStatus === 'generating') return;

    trackBookingClick();

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = GHL_CALENDAR_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    redirectTimer.current = interval;
    return () => clearInterval(interval);
  }, [pdfStatus]);

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

  const handleBookNow = () => {
    if (redirectTimer.current) clearInterval(redirectTimer.current);
    trackBookingClick();
    window.location.href = GHL_CALENDAR_URL;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="max-w-lg mx-auto w-full">
        {/* Confirmation header */}
        <div className="mb-6">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent-teal/10 border border-accent-teal/30 flex items-center justify-center">
            <svg className="w-7 h-7 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-accent-gold leading-tight mb-3">
            {firstName ? `${firstName}, your` : 'Your'} Profit Leak Report is ready.
          </h1>

          {/* PDF status */}
          {pdfStatus === 'generating' && (
            <p className="text-text-secondary text-sm animate-pulse">
              Generating your report...
            </p>
          )}
          {pdfStatus === 'ready' && (
            <p className="text-accent-teal text-sm font-medium">
              ✓ Your PDF report has been downloaded to your device.
            </p>
          )}
          {pdfStatus === 'error' && (
            <p className="text-text-secondary text-sm">
              Your full Profit Leak Report is on its way to your inbox.
            </p>
          )}
        </div>

        {/* Recovery message */}
        <div className="bg-bg-card border border-accent-teal/20 rounded-xl p-5 mb-6 text-left">
          <p className="text-white text-base leading-relaxed">
            Even if you recovered just half of this over the next 12 months, that's an extra{' '}
            <span className="text-accent-cyan font-bold">${result.halfLeak.toLocaleString()}</span>{' '}
            in profit — without increasing ad spend or working more hours.
          </p>
        </div>

        {/* Download Again button */}
        {pdfStatus === 'ready' && (
          <button
            onClick={handleDownloadPdf}
            className="w-full py-3 rounded-xl font-bold text-sm text-white bg-accent-cyan/20 border border-accent-cyan/30 hover:bg-accent-cyan/30 transition-all duration-300 mb-6 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Your Report Again
          </button>
        )}

        {/* Book Call CTA + Auto-redirect */}
        <div className="bg-bg-card border border-accent-gold/20 rounded-2xl p-6 mb-6 animate-fadeIn">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <h2 className="text-white font-bold text-lg mb-2">
            Next Step — Book Your Free Strategy Call
          </h2>
          <p className="text-text-secondary text-sm mb-5 leading-relaxed">
            Let's walk through your Profit Leak Report together. I'll personally show you the highest-impact fix and help you map out a 30-90 day action plan.
          </p>

          <button
            onClick={handleBookNow}
            className="w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-cta hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent-cyan/25 mb-3 flex flex-col items-center"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book My Strategy Call Now
            </span>
          </button>

          {pdfStatus !== 'generating' && countdown > 0 && (
            <p className="text-text-muted text-xs animate-pulse">
              Redirecting you to the calendar in {countdown} seconds...
            </p>
          )}
        </div>

        {/* What happens on the call */}
        <div className="bg-bg-card border border-border-card rounded-xl p-5 text-left">
          <p className="text-accent-gold font-bold text-sm mb-3 uppercase tracking-wider">
            What happens on the call
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-accent-cyan text-lg font-bold">1</span>
              <p className="text-text-secondary text-sm">We walk through your Profit Leak Report together</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-accent-cyan text-lg font-bold">2</span>
              <p className="text-text-secondary text-sm">Identify your #1 highest-impact fix</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-accent-cyan text-lg font-bold">3</span>
              <p className="text-text-secondary text-sm">Map out your 30-90 day action plan to start plugging leaks</p>
            </div>
          </div>
          <p className="text-text-muted text-xs mt-4">
            No charge. No obligation. Just a clear path forward.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12">
        <p className="text-text-muted text-[10px] max-w-lg mx-auto leading-relaxed">
          &copy; 2026 | Man-Tech Designs LLC. This audit is an educational tool. Financial figures shown are illustrative estimates based on your inputs. They do not guarantee specific results.
        </p>
      </footer>
    </div>
  );
}
