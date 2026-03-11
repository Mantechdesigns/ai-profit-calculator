import React from 'react';
import RadioGroup from '../ui/RadioGroup';
import { CEO_BOTTLENECK_OPTIONS, REVENUE_RANGE_OPTIONS } from '../../types/form';
import type { AuditFormData } from '../../types/form';

interface StepBusinessContextProps {
  formData: AuditFormData;
  updateField: (field: keyof AuditFormData, value: any) => void;
}

export default function StepBusinessContext({ formData, updateField }: StepBusinessContextProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-brand-gold mb-1">Business Context</h2>
      <p className="text-gray-400 text-sm mb-6">Help us understand your business situation.</p>

      <RadioGroup
        name="ceoBottleneck"
        label='5. CEO Bottleneck: "If you disappeared for 2 weeks, what breaks first?"'
        options={CEO_BOTTLENECK_OPTIONS}
        value={formData.ceoBottleneck}
        onChange={(value) => updateField('ceoBottleneck', value)}
      />

      <RadioGroup
        name="revenueRange"
        label={"6. Revenue Range: \"What's your average monthly revenue?\""}
        options={REVENUE_RANGE_OPTIONS}
        value={formData.revenueRange}
        onChange={(value) => updateField('revenueRange', value)}
      />
    </div>
  );
}
