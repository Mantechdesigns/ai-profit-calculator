import React from 'react';
import CheckboxGroup from '../ui/CheckboxGroup';
import RadioGroup from '../ui/RadioGroup';
import {
  LEAD_SOURCE_OPTIONS,
  SALES_FOLLOWUP_OPTIONS,
  AUTHORITY_OPTIONS,
  RETENTION_OPTIONS,
} from '../../types/form';
import type { AuditFormData } from '../../types/form';

interface StepPillarsProps {
  formData: AuditFormData;
  updateField: (field: keyof AuditFormData, value: any) => void;
}

export default function StepPillars({ formData, updateField }: StepPillarsProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-brand-gold mb-1">Business Audit</h2>
      <p className="text-gray-400 text-sm mb-6">Tell us about your current business systems.</p>

      <CheckboxGroup
        name="leadSources"
        label="1. Leads (Pillar 1): Where do most of your leads come from right now?"
        options={LEAD_SOURCE_OPTIONS}
        values={formData.leadSources}
        onChange={(values) => updateField('leadSources', values)}
      />

      <RadioGroup
        name="salesFollowUp"
        label="2. Sales Follow-Up (Pillar 2): When someone shows interest, what happens in the first 24 hours?"
        options={SALES_FOLLOWUP_OPTIONS}
        value={formData.salesFollowUp}
        onChange={(value) => updateField('salesFollowUp', value)}
      />

      <RadioGroup
        name="authorityPosition"
        label="3. Authority/Positioning (Pillar 3): Which best describes your current market position?"
        options={AUTHORITY_OPTIONS}
        value={formData.authorityPosition}
        onChange={(value) => updateField('authorityPosition', value)}
      />

      <RadioGroup
        name="retentionSystem"
        label="4. Retention / LTV (Pillar 4): How do you retain, upsell, or generate repeat business today?"
        options={RETENTION_OPTIONS}
        value={formData.retentionSystem}
        onChange={(value) => updateField('retentionSystem', value)}
      />
    </div>
  );
}
