import type { PillarResult } from '../lib/calculations';
import { getPillarCopy } from '../lib/pillarCopy';
import RiskBadge from './RiskBadge';
import { QUIZ_SECTIONS } from '../data/questions';

interface PillarCardV2Props {
  pillar: PillarResult;
  selectedAnswer: string;
}

export default function PillarCardV2({ pillar, selectedAnswer }: PillarCardV2Props) {
  const copy = getPillarCopy(pillar.id, pillar.score);

  return (
    <div className="bg-bg-card border border-border-card rounded-xl p-5 mb-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white font-bold text-base">{pillar.name}</h4>
        <RiskBadge risk={pillar.risk} />
      </div>

      <p className="text-2xl font-extrabold mb-3" style={{ color: pillar.riskColor }}>
        ${pillar.leakAmount.toLocaleString()}<span className="text-sm font-normal text-text-muted">/year</span>
      </p>

      <div className="mb-3">
        <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">Diagnosis</p>
        <p className="text-text-secondary text-sm leading-relaxed">{copy.diagnosis}</p>
      </div>

      <div className="mb-3">
        <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">DIY Fix</p>
        <p className="text-white text-sm leading-relaxed font-medium">{copy.fix}</p>
      </div>

      <div className="bg-white/5 rounded-lg px-3 py-2">
        <p className="text-text-muted text-xs">
          <span className="font-semibold">Your answer:</span> {selectedAnswer}
        </p>
      </div>
    </div>
  );
}
