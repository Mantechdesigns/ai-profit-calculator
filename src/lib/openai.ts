import type { AuditFormData } from '../types/form';
import type { AnalysisResponse } from '../types/analysis';

export async function submitAuditForAnalysis(formData: AuditFormData): Promise<AnalysisResponse> {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Analysis failed (${response.status})`);
  }

  const data = await response.json();
  return data as AnalysisResponse;
}
