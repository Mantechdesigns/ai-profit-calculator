import { useState } from 'react';
import type { AuditFormData } from '../types/form';
import type { AnalysisResponse } from '../types/analysis';
import { submitAuditForAnalysis } from '../lib/openai';

export default function useAnalysis() {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitAudit(formData: AuditFormData): Promise<AnalysisResponse | null> {
    setIsLoading(true);
    setError(null);

    try {
      const result = await submitAuditForAnalysis(formData);
      setAnalysis(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Analysis failed. Please try again.';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  return { analysis, isLoading, error, submitAudit };
}
