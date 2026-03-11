import React from 'react';
import RadioGroup from '../ui/RadioGroup';
import {
  SPEED_TO_LEAD_OPTIONS,
  MONTHLY_LEAD_COUNT_OPTIONS,
  REVENUE_PER_CLIENT_OPTIONS,
  CONVERSION_RATE_OPTIONS,
} from '../../types/form';
import type { AuditFormData } from '../../types/form';

interface StepLeadMetricsProps {
  formData: AuditFormData;
  updateField: (field: keyof AuditFormData, value: any) => void;
}

export default function StepLeadMetrics({ formData, updateField }: StepLeadMetricsProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-brand-gold mb-1">Lead Metrics</h2>
      <p className="text-gray-400 text-sm mb-6">These numbers help us calculate your exact profit leak.</p>

      <RadioGroup
        name="speedToLead"
        label="9. Speed-to-lead: About how long does it take you to respond to a new lead?"
        options={SPEED_TO_LEAD_OPTIONS}
        value={formData.speedToLead}
        onChange={(value) => updateField('speedToLead', value)}
      />

      <RadioGroup
        name="monthlyLeadCount"
        label="10. About how many new leads do you get per month?"
        options={MONTHLY_LEAD_COUNT_OPTIONS}
        value={formData.monthlyLeadCount}
        onChange={(value) => updateField('monthlyLeadCount', value)}
      />

      <RadioGroup
        name="revenuePerClient"
        label="11. What's your average revenue per new client?"
        options={REVENUE_PER_CLIENT_OPTIONS}
        value={formData.revenuePerClient}
        onChange={(value) => updateField('revenuePerClient', value)}
      />

      <RadioGroup
        name="conversionRate"
        label="12. Roughly what % of leads become paying clients?"
        options={CONVERSION_RATE_OPTIONS}
        value={formData.conversionRate}
        onChange={(value) => updateField('conversionRate', value)}
      />
    </div>
  );
}
