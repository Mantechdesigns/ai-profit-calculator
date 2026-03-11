import type { AuditFormData } from '../types/form';
import type { AnalysisResponse } from '../types/analysis';

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
