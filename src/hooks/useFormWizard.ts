import { useState, useCallback } from 'react';
import { INITIAL_FORM_DATA } from '../types/form';
import type { AuditFormData } from '../types/form';

const TOTAL_STEPS = 4;

function isStepValid(step: number, formData: AuditFormData): boolean {
  switch (step) {
    case 0:
      return (
        formData.leadSources.length > 0 &&
        formData.salesFollowUp !== '' &&
        formData.authorityPosition !== '' &&
        formData.retentionSystem !== ''
      );
    case 1:
      return formData.ceoBottleneck !== '' && formData.revenueRange !== '';
    case 2:
      return formData.email !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    case 3:
      return (
        formData.monthlyLeadCount !== '' &&
        formData.revenuePerClient !== '' &&
        formData.conversionRate !== ''
      );
    default:
      return false;
  }
}

export default function useFormWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<AuditFormData>(INITIAL_FORM_DATA);

  const updateField = useCallback((field: keyof AuditFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS - 1 && isStepValid(currentStep, formData)) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, formData]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const canAdvance = isStepValid(currentStep, formData);
  const isLastStep = currentStep === TOTAL_STEPS - 1;
  const isComplete = isStepValid(TOTAL_STEPS - 1, formData) && isStepValid(2, formData);

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    formData,
    updateField,
    nextStep,
    prevStep,
    canAdvance,
    isLastStep,
    isComplete,
  };
}
