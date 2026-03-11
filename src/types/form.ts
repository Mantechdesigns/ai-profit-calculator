export interface AuditFormData {
  leadSources: string[];
  salesFollowUp: string;
  authorityPosition: string;
  retentionSystem: string;
  ceoBottleneck: string;
  revenueRange: string;
  email: string;
  firstName: string;
  speedToLead: string;
  monthlyLeadCount: string;
  revenuePerClient: string;
  conversionRate: string;
}

export const INITIAL_FORM_DATA: AuditFormData = {
  leadSources: [],
  salesFollowUp: '',
  authorityPosition: '',
  retentionSystem: '',
  ceoBottleneck: '',
  revenueRange: '',
  email: '',
  firstName: '',
  speedToLead: '',
  monthlyLeadCount: '',
  revenuePerClient: '',
  conversionRate: '',
};

export const LEAD_SOURCE_OPTIONS = [
  'Word of mouth',
  'Cold outreach (DMs/emails/Calling)',
  'Paid ads',
  'Organic content (social, YouTube, etc.)',
  'No consistent system',
  'Partnership',
];

export const SALES_FOLLOWUP_OPTIONS = [
  'I follow up manually',
  'Team follows up manually',
  'Some automation (emails/texts)',
  'No system at all',
];

export const AUTHORITY_OPTIONS = [
  'I post inconsistently / no real brand',
  'I run ads but they don\'t convert',
  'I have a presence but no strategy',
  'I\'m positioned as the go-to expert',
];

export const RETENTION_OPTIONS = [
  'No system',
  'Occasionally follow-up',
  'Manual upsells / repeat sales',
  'Automated retention & referrals',
];

export const CEO_BOTTLENECK_OPTIONS = [
  'Sales',
  'Delivery',
  'Operations',
  'Marketing',
  'Everything',
  'I don\'t know',
];

export const REVENUE_RANGE_OPTIONS = [
  'Under $10K/month',
  '$10K-$30K/month',
  '$30K-$100K/month',
  '$100K+/month',
];

export const SPEED_TO_LEAD_OPTIONS = [
  'Under 5 minutes',
  '5-30 minutes',
  '1-4 hours',
  '24+ hours',
  'I don\'t track this',
];

export const MONTHLY_LEAD_COUNT_OPTIONS = [
  '0-10',
  '10-25',
  '25-50',
  '50+',
];

export const REVENUE_PER_CLIENT_OPTIONS = [
  '$500-$2K',
  '$2K-$5K',
  '$5K-$10K',
  '$10K+',
];

export const CONVERSION_RATE_OPTIONS = [
  '5% or less',
  '5-15%',
  '15-30%',
  '30%+',
];

export const REVENUE_RANGE_MAP: Record<string, number> = {
  'Under $10K/month': 84000,
  '$10K-$30K/month': 240000,
  '$30K-$100K/month': 720000,
  '$100K+/month': 1800000,
};
