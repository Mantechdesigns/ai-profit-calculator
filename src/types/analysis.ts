export interface PillarAnalysis {
  severity: 'High' | 'Medium' | 'Low';
  leakAmount: number;
  leakPercentage: number;
  explanation: string;
  recommendation: string;
}

export interface ActionStep {
  title: string;
  description: string;
  timeframe: string;
  expectedImpact: string;
}

export interface AnalysisResponse {
  totalAnnualLeak: number;
  leakPercentage: number;
  pillars: {
    leadGeneration: PillarAnalysis;
    salesFollowUp: PillarAnalysis;
    authorityBranding: PillarAnalysis;
    retentionLTV: PillarAnalysis;
    ceoBottleneck: PillarAnalysis;
  };
  biggestLeak: string;
  bestImmediateFix: string;
  snapshotBullets: string[];
  actionSteps: ActionStep[];
}
