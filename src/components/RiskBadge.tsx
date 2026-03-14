interface RiskBadgeProps {
  risk: 'HIGH' | 'MEDIUM-HIGH' | 'MEDIUM' | 'LOW';
}

const BADGE_STYLES: Record<string, string> = {
  HIGH: 'bg-accent-red/15 text-accent-red border-accent-red/30',
  'MEDIUM-HIGH': 'bg-accent-orange/15 text-accent-orange border-accent-orange/30',
  MEDIUM: 'bg-accent-yellow/15 text-accent-yellow border-accent-yellow/30',
  LOW: 'bg-accent-green/15 text-accent-green border-accent-green/30',
};

export default function RiskBadge({ risk }: RiskBadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${BADGE_STYLES[risk] || ''}`}>
      {risk} RISK
    </span>
  );
}
