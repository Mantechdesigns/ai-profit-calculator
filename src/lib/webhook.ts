import type { AuditResult } from './calculations';
import { getPillarCopy } from './pillarCopy';

const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/eY4yNTySi9uB0TT73oU0/webhook-trigger/i1zNpKfWVmnHdp4GxAq2';

export async function sendWebhook(
  firstName: string,
  email: string,
  result: AuditResult,
): Promise<void> {
  const biggest = result.biggestLeakPillar;
  const biggestCopy = getPillarCopy(biggest.id, biggest.score);

  const pillarScores: Record<string, { score: number; risk: string; leak_amount: number }> = {};
  for (const p of result.pillars) {
    pillarScores[p.id] = {
      score: p.score,
      risk: p.risk,
      leak_amount: p.leakAmount,
    };
  }

  const snapshotParts = result.pillars
    .filter((p) => p.score >= 3)
    .map((p) => {
      const copy = getPillarCopy(p.id, p.score);
      return copy.diagnosis.split('.')[0] + '.';
    });

  const payload = {
    first_name: firstName,
    email,
    estimated_annual_leak: result.totalLeak,
    leak_percentage: result.leakPercentage,
    revenue_range: result.revenueLabel,
    annual_revenue_estimate: result.annualRevenue,
    biggest_leak_pillar: biggest.name,
    biggest_leak_fix: biggestCopy.fix,
    pillar_scores: pillarScores,
    total_risk_score: result.totalRiskScore,
    quick_snapshot: snapshotParts.join(' '),
    source: 'profit-leak-audit-calendar',
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('Webhook failed, retrying once...', err);
    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (retryErr) {
      console.error('Webhook retry also failed:', retryErr);
    }
  }
}
