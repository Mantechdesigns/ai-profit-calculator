import { useState } from 'react';
import { Shield } from 'lucide-react';
import useFormWizard from '../hooks/useFormWizard';
import useAnalysis from '../hooks/useAnalysis';
import ProgressBar from './ui/ProgressBar';
import Button from './ui/Button';
import LoadingSpinner from './ui/LoadingSpinner';
import StepPillars from './steps/StepPillars';
import StepBusinessContext from './steps/StepBusinessContext';
import StepContactInfo from './steps/StepContactInfo';
import StepLeadMetrics from './steps/StepLeadMetrics';
import ResultsPanel from './results/ResultsPanel';
import { createGHLContact, sendGHLWebhook } from '../lib/ghl';
import { supabase } from '../lib/supabase';

type WidgetState = 'form' | 'analyzing' | 'results';

export default function Widget() {
  const [widgetState, setWidgetState] = useState<WidgetState>('form');
  const { currentStep, totalSteps, formData, updateField, nextStep, prevStep, canAdvance, isLastStep } = useFormWizard();
  const { analysis, isLoading, error, submitAudit } = useAnalysis();

  const handleSubmit = async () => {
    setWidgetState('analyzing');

    const result = await submitAudit(formData);

    if (result) {
      setWidgetState('results');

      // Fire-and-forget: GHL API + GHL Webhook + Supabase
      createGHLContact({
        email: formData.email,
        firstName: formData.firstName,
        formData,
        analysisResults: result,
      }).catch((err) => console.error('GHL contact creation failed:', err));

      sendGHLWebhook(formData, result)
        .catch((err) => console.error('GHL webhook failed:', err));

      supabase?.from('submissions')
        .insert({
          email: formData.email,
          first_name: formData.firstName,
          lead_sources: formData.leadSources,
          sales_follow_up: formData.salesFollowUp,
          authority_position: formData.authorityPosition,
          retention_system: formData.retentionSystem,
          ceo_bottleneck: formData.ceoBottleneck,
          revenue_range: formData.revenueRange,
          speed_to_lead: formData.speedToLead,
          monthly_lead_count: formData.monthlyLeadCount,
          revenue_per_client: formData.revenuePerClient,
          conversion_rate: formData.conversionRate,
          total_profit_leak: result.totalAnnualLeak,
          biggest_leak_pillar: result.biggestLeak,
          analysis_json: result,
        })
        .then(({ error }) => {
          if (error) console.error('Supabase insert failed:', error);
        });
    } else {
      setWidgetState('form');
    }
  };

  const handleNext = () => {
    if (isLastStep && canAdvance) {
      handleSubmit();
    } else {
      nextStep();
    }
  };

  return (
    <div className="bg-brand-dark/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-brand-navy/50 px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-brand-cyan" />
          <div>
            <h1 className="text-white font-bold text-base">The Six-Figure Profit Leak Audit</h1>
            <p className="text-gray-400 text-xs">Discover where your business is leaking money</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-5">
        {widgetState === 'form' && (
          <>
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

            {currentStep === 0 && <StepPillars formData={formData} updateField={updateField} />}
            {currentStep === 1 && <StepBusinessContext formData={formData} updateField={updateField} />}
            {currentStep === 2 && <StepContactInfo formData={formData} updateField={updateField} />}
            {currentStep === 3 && <StepLeadMetrics formData={formData} updateField={updateField} />}

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3 mt-4">
              {currentStep > 0 && (
                <Button variant="secondary" onClick={prevStep} className="flex-1">
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!canAdvance}
                className="flex-1"
              >
                {isLastStep ? 'Get My Report' : 'Next'}
              </Button>
            </div>
          </>
        )}

        {widgetState === 'analyzing' && <LoadingSpinner />}

        {widgetState === 'results' && analysis && (
          <ResultsPanel
            analysis={analysis}
            formData={formData}
          />
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-white/5">
        <p className="text-gray-600 text-[10px] text-center">
          Copyrights 2026 | Man - Tech Designs LLC. This audit is an educational tool.
        </p>
      </div>
    </div>
  );
}
