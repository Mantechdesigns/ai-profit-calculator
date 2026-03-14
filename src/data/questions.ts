export interface QuizOption {
  text: string;
  score: number;
}

export interface QuizSection {
  id: string;
  pillarName: string;
  question: string;
  options: QuizOption[];
}

export const QUIZ_SECTIONS: QuizSection[] = [
  {
    id: 'lead_generation',
    pillarName: 'Lead Generation',
    question: 'How do you get most of your leads right now?',
    options: [
      { text: 'Word of mouth / referrals only', score: 4 },
      { text: 'Cold outreach - DMs, emails, calling', score: 3 },
      { text: 'Paid ads but inconsistent results', score: 2 },
      { text: 'Multi-channel - ads + content + referrals working together', score: 1 },
    ],
  },
  {
    id: 'sales_followup',
    pillarName: 'Sales & Follow-Up',
    question: 'When a new lead shows interest, what usually happens?',
    options: [
      { text: 'I follow up manually when I remember', score: 4 },
      { text: 'I follow up same day but no set process', score: 3 },
      { text: 'Some automation - emails or texts go out', score: 2 },
      { text: 'Automated follow-up within 1 hour + personal outreach', score: 1 },
    ],
  },
  {
    id: 'branding_authority',
    pillarName: 'Branding & Authority',
    question: 'How would a stranger online perceive your brand today?',
    options: [
      { text: 'I have almost no online presence', score: 4 },
      { text: 'I post inconsistently / no real brand', score: 3 },
      { text: 'I run ads but they don\'t really convert', score: 2 },
      { text: 'I\'m positioned as a go-to expert in my space', score: 1 },
    ],
  },
  {
    id: 'retention',
    pillarName: 'Retention & Repeat Revenue',
    question: 'How do you retain, upsell, or generate repeat business?',
    options: [
      { text: 'No system - most clients are one-and-done', score: 4 },
      { text: 'Occasional follow-up but nothing consistent', score: 3 },
      { text: 'Manual upsells / repeat sales', score: 2 },
      { text: 'Automated retention with referral program', score: 1 },
    ],
  },
];

export interface RevenueOption {
  label: string;
  annualRevenue: number;
}

export const REVENUE_OPTIONS: RevenueOption[] = [
  { label: 'Under $10K/month', annualRevenue: 84000 },
  { label: '$10K - $30K/month', annualRevenue: 240000 },
  { label: '$30K - $50K/month', annualRevenue: 480000 },
  { label: '$50K - $100K/month', annualRevenue: 900000 },
  { label: '$100K+/month', annualRevenue: 1500000 },
];
