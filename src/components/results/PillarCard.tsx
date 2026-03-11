import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import type { PillarAnalysis } from '../../types/analysis';

interface PillarCardProps {
  name: string;
  analysis: PillarAnalysis;
}

const SEVERITY_CONFIG = {
  High: {
    icon: AlertTriangle,
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    badge: 'bg-red-500/20 text-red-400',
    text: 'text-red-400',
  },
  Medium: {
    icon: AlertCircle,
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    badge: 'bg-amber-500/20 text-amber-400',
    text: 'text-amber-400',
  },
  Low: {
    icon: CheckCircle,
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    badge: 'bg-green-500/20 text-green-400',
    text: 'text-green-400',
  },
};

export default function PillarCard({ name, analysis }: PillarCardProps) {
  const config = SEVERITY_CONFIG[analysis.severity];
  const Icon = config.icon;

  return (
    <div className={`${config.bg} ${config.border} border rounded-xl p-4 mb-3`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${config.text}`} />
          <h4 className="text-white font-semibold text-sm">{name}</h4>
        </div>
        <span className={`${config.badge} px-2 py-0.5 rounded-full text-xs font-medium`}>
          {analysis.severity} Risk
        </span>
      </div>
      <p className="text-brand-cyan text-lg font-bold mb-1">
        ${analysis.leakAmount.toLocaleString()}/year
      </p>
      <p className="text-gray-400 text-xs mb-2">{analysis.explanation}</p>
      <p className="text-gray-300 text-xs">
        <span className="text-brand-cyan font-medium">Fix: </span>
        {analysis.recommendation}
      </p>
    </div>
  );
}
