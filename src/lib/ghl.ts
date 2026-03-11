import type { AuditFormData } from '../types/form';
import type { AnalysisResponse } from '../types/analysis';

const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/eY4yNTySi9uB0TT73oU0/webhook-trigger/i1zNpKfWVmnHdp4GxAq2';

export async function createGHLContact(data: {
  email: string;
  firstName: string;
  formData: AuditFormData;
  analysisResults?: Partial<AnalysisResponse>;
}): Promise<{ contactId: string }> {
  const response = await fetch('/api/create-contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to create contact');
  }

  return response.json();
}

export async function sendGHLWebhook(
  formData: AuditFormData,
  analysis: AnalysisResponse,
): Promise<void> {
  const payload = {
    first_name: formData.firstName || 'Business Owner',
    email: formData.email,
    inputs: {
      lead_gen: Array.isArray(formData.leadSources) ? formData.leadSources.join(', ') : '',
      sales: formData.salesFollowUp || '',
      branding: formData.authorityPosition || '',
      retention: formData.retentionSystem || '',
      ceo_bottleneck: formData.ceoBottleneck || '',
      revenue_range: formData.revenueRange || '',
      speed_to_lead: formData.speedToLead || '',
      monthly_leads: formData.monthlyLeadCount || '',
      revenue_per_client: formData.revenuePerClient || '',
      conversion_rate: formData.conversionRate || '',
    },
    leaks: {
      total_annual: analysis.totalAnnualLeak,
      leak_percentage: analysis.leakPercentage,
      lead_gen: {
        severity: analysis.pillars.leadGeneration.severity,
        annual_loss: analysis.pillars.leadGeneration.leakAmount,
        explanation: analysis.pillars.leadGeneration.explanation,
        recommendation: analysis.pillars.leadGeneration.recommendation,
      },
      sales: {
        severity: analysis.pillars.salesFollowUp.severity,
        annual_loss: analysis.pillars.salesFollowUp.leakAmount,
        explanation: analysis.pillars.salesFollowUp.explanation,
        recommendation: analysis.pillars.salesFollowUp.recommendation,
      },
      branding: {
        severity: analysis.pillars.authorityBranding.severity,
        annual_loss: analysis.pillars.authorityBranding.leakAmount,
        explanation: analysis.pillars.authorityBranding.explanation,
        recommendation: analysis.pillars.authorityBranding.recommendation,
      },
      retention: {
        severity: analysis.pillars.retentionLTV.severity,
        annual_loss: analysis.pillars.retentionLTV.leakAmount,
        explanation: analysis.pillars.retentionLTV.explanation,
        recommendation: analysis.pillars.retentionLTV.recommendation,
      },
      ceo_bottleneck: {
        severity: analysis.pillars.ceoBottleneck.severity,
        annual_loss: analysis.pillars.ceoBottleneck.leakAmount,
        explanation: analysis.pillars.ceoBottleneck.explanation,
        recommendation: analysis.pillars.ceoBottleneck.recommendation,
      },
    },
    biggest_leak: analysis.biggestLeak,
    best_immediate_fix: analysis.bestImmediateFix,
    snapshot_bullets: analysis.snapshotBullets,
    action_steps: analysis.actionSteps,
  };

  await fetch(GHL_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
