export interface PillarResult {
  id: string;
  name: string;
  score: number;
  risk: 'HIGH' | 'MEDIUM-HIGH' | 'MEDIUM' | 'LOW';
  riskColor: string;
  leakAmount: number;
  leakPercentage: number;
}

export interface AuditResult {
  totalLeak: number;
  leakPercentage: number;
  annualRevenue: number;
  revenueLabel: string;
  totalRiskScore: number;
  pillars: PillarResult[];
  biggestLeakPillar: PillarResult;
  halfLeak: number;
}

const PILLAR_NAMES: Record<string, string> = {
  lead_generation: 'Lead Generation',
  sales_followup: 'Sales & Follow-Up',
  branding_authority: 'Branding & Authority',
  retention: 'Retention & Repeat Revenue',
};

function getRiskLabel(score: number): 'HIGH' | 'MEDIUM-HIGH' | 'MEDIUM' | 'LOW' {
  if (score === 4) return 'HIGH';
  if (score === 3) return 'MEDIUM-HIGH';
  if (score === 2) return 'MEDIUM';
  return 'LOW';
}

function getRiskColor(risk: string): string {
  switch (risk) {
    case 'HIGH': return '#FF4757';
    case 'MEDIUM-HIGH': return '#FF6B35';
    case 'MEDIUM': return '#FFD93D';
    case 'LOW': return '#00C853';
    default: return '#94A3B8';
  }
}

function getLeakPercentage(totalScore: number): number {
  if (totalScore <= 6) {
    const t = (totalScore - 4) / 2;
    return 12 + t * 6;
  } else if (totalScore <= 9) {
    const t = (totalScore - 7) / 2;
    return 20 + t * 10;
  } else if (totalScore <= 12) {
    const t = (totalScore - 10) / 2;
    return 30 + t * 10;
  } else {
    const t = (totalScore - 13) / 3;
    return 40 + t * 10;
  }
}

const REVENUE_CLAMPS: Record<number, [number, number]> = {
  84000: [25000, 50000],
  240000: [60000, 120000],
  480000: [120000, 220000],
  900000: [200000, 450000],
  1500000: [400000, 750000],
};

export function calculateAudit(
  scores: Record<string, number>,
  annualRevenue: number,
  revenueLabel: string,
): AuditResult {
  const totalRiskScore = Object.values(scores).reduce((sum, s) => sum + s, 0);
  const leakPct = getLeakPercentage(totalRiskScore);
  let totalLeak = Math.round(annualRevenue * (leakPct / 100));

  const clamp = REVENUE_CLAMPS[annualRevenue];
  if (clamp) {
    totalLeak = Math.max(clamp[0], Math.min(clamp[1], totalLeak));
  }

  const actualLeakPct = Math.round((totalLeak / annualRevenue) * 1000) / 10;

  const pillarIds = Object.keys(scores);
  const pillars: PillarResult[] = pillarIds.map((id) => {
    const score = scores[id];
    const risk = getRiskLabel(score);
    const pillarLeak = Math.round((score / totalRiskScore) * totalLeak);
    const pillarLeakPct = Math.round((pillarLeak / totalLeak) * 1000) / 10;

    return {
      id,
      name: PILLAR_NAMES[id] || id,
      score,
      risk,
      riskColor: getRiskColor(risk),
      leakAmount: pillarLeak,
      leakPercentage: pillarLeakPct,
    };
  });

  const pillarSum = pillars.reduce((s, p) => s + p.leakAmount, 0);
  if (pillarSum !== totalLeak && pillars.length > 0) {
    const biggest = pillars.reduce((a, b) => (a.leakAmount > b.leakAmount ? a : b));
    biggest.leakAmount += totalLeak - pillarSum;
  }

  const biggestLeakPillar = pillars.reduce((a, b) => (a.leakAmount > b.leakAmount ? a : b));

  return {
    totalLeak,
    leakPercentage: actualLeakPct,
    annualRevenue,
    revenueLabel,
    totalRiskScore,
    pillars,
    biggestLeakPillar,
    halfLeak: Math.round(totalLeak / 2),
  };
}
