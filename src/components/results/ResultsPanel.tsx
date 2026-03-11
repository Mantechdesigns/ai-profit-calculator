import { useState } from 'react';
import { Download, TrendingDown, Zap, Target, ArrowRight, CheckCircle } from 'lucide-react';
import type { AnalysisResponse } from '../../types/analysis';
import type { AuditFormData } from '../../types/form';
import PillarCard from './PillarCard';
import Button from '../ui/Button';

interface ResultsPanelProps {
  analysis: AnalysisResponse;
  formData: AuditFormData;
  onContinueToBooking: () => void;
}

export default function ResultsPanel({ analysis, formData, onContinueToBooking }: ResultsPanelProps) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      const { generateProfitLeakPdf } = await import('../../lib/pdf/generatePdf');
      const blob = await generateProfitLeakPdf(formData, analysis);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Profit-Leak-Report-${formData.firstName || 'Report'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setPdfDownloaded(true);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-full mb-4">
          <TrendingDown className="w-4 h-4 text-red-400" />
          <span className="text-red-400 text-sm font-medium">Profit Leak Detected</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">
          {formData.firstName ? `${formData.firstName}, your` : 'Your'} estimated annual profit leak:
        </h2>
        <p className="text-4xl font-extrabold text-brand-cyan">
          ${analysis.totalAnnualLeak.toLocaleString()}
        </p>
        <p className="text-gray-400 text-sm mt-1">
          That's roughly {analysis.leakPercentage}% of your estimated annual revenue
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
        <div className="flex items-start gap-3 mb-3">
          <Target className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm font-semibold">Biggest Leak</p>
            <p className="text-gray-400 text-sm">{analysis.biggestLeak}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-brand-blue-light flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm font-semibold">Best Immediate Fix</p>
            <p className="text-gray-400 text-sm">{analysis.bestImmediateFix}</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Quick Snapshot</h3>
        <ul className="space-y-1">
          {analysis.snapshotBullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
              <span className="text-brand-cyan mt-0.5">-</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Leak Breakdown by Pillar</h3>
        <PillarCard name="Lead Generation" analysis={analysis.pillars.leadGeneration} />
        <PillarCard name="Sales Follow-Up" analysis={analysis.pillars.salesFollowUp} />
        <PillarCard name="Authority & Branding" analysis={analysis.pillars.authorityBranding} />
        <PillarCard name="Retention & LTV" analysis={analysis.pillars.retentionLTV} />
        <PillarCard name="CEO Bottleneck" analysis={analysis.pillars.ceoBottleneck} />
      </div>

      <div className="bg-brand-cyan/10 border border-brand-cyan/30 rounded-xl p-4 mb-4">
        <p className="text-white text-sm font-semibold mb-1">
          Even if you recovered just half of this over the next 12 months, that's an extra ${Math.round(analysis.totalAnnualLeak / 2).toLocaleString()} in profit - without increasing ad spend or working more hours.
        </p>
      </div>

      {/* PDF Download */}
      <Button
        onClick={handleDownloadPdf}
        disabled={isGeneratingPdf}
        className="w-full flex items-center justify-center gap-2 mb-4"
      >
        <Download className="w-4 h-4" />
        {isGeneratingPdf ? 'Generating PDF...' : pdfDownloaded ? 'Download Again' : 'Download Full PDF Report'}
      </Button>

      {/* Continue to booking */}
      {pdfDownloaded ? (
        <button
          onClick={onContinueToBooking}
          className="group w-full rounded-xl bg-gradient-to-r from-brand-cyan via-brand-blue-accent to-brand-cyan bg-[length:200%_100%] animate-shimmer px-6 py-4 text-white font-bold text-base shadow-lg shadow-brand-cyan/25 hover:shadow-brand-cyan/40 transition-shadow"
        >
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Book Your Free Strategy Call</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
          <p className="text-white/80 text-xs mt-1 font-normal">
            You'll need to upload the PDF you just downloaded
          </p>
        </button>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">
            Download your report first, then book your strategy call.
          </p>
        </div>
      )}
    </div>
  );
}
