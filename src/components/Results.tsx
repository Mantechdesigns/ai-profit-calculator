import React from 'react';
import { DollarSign, TrendingUp, Clock } from 'lucide-react';

interface ResultsProps {
  data: {
    monthlyLeads: number;
    leadValue: number;
    operationalCosts: number;
    adminHours: number;
    marketingSpend: number;
    churnRate: number;
  };
}

export default function Results({ data }: ResultsProps) {
  const leadRecovery = data.monthlyLeads * data.leadValue * 0.2;
  const costSavings = data.operationalCosts * 0.15 + data.adminHours * 50;
  const annualLoss = (leadRecovery + costSavings) * 12;

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-center text-white">
        Your Business Impact Analysis
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        <MetricCard
          title="Monthly Lead Recovery"
          value={leadRecovery}
          description="We'll recover this amount in lost revenue monthly"
          icon={<TrendingUp className="w-8 h-8 text-green-400" />}
        />
        <MetricCard
          title="Monthly Cost Savings"
          value={costSavings}
          description="Save by automating tasks like invoicing and follow-ups"
          icon={<Clock className="w-8 h-8 text-green-400" />}
        />
        <MetricCard
          title="Annual Loss Without AI"
          value={annualLoss}
          description="Total amount you're losing without AI automation"
          icon={<DollarSign className="w-8 h-8 text-red-400" />}
          isNegative
        />
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">Savings Breakdown</h3>
        <div className="space-y-6">
          <ProgressBar
            label="Lead Generation"
            percentage={40}
            value={annualLoss * 0.4}
          />
          <ProgressBar
            label="Sales Automation"
            percentage={30}
            value={annualLoss * 0.3}
          />
          <ProgressBar
            label="Branding & Marketing"
            percentage={20}
            value={annualLoss * 0.2}
          />
          <ProgressBar
            label="Customer Retention"
            percentage={10}
            value={annualLoss * 0.1}
          />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, description, icon, isNegative = false }) {
  return (
    <div className={`rounded-2xl p-6 border backdrop-blur-sm ${
      isNegative ? 'bg-red-500/5 border-red-500/20' : 'bg-green-500/5 border-green-500/20'
    }`}>
      <div className="flex items-center space-x-4 mb-4">
        <div className={`p-3 rounded-xl ${
          isNegative ? 'bg-red-400/10' : 'bg-green-400/10'
        }`}>
          {icon}
        </div>
        <h3 className="font-semibold text-xl text-white">{title}</h3>
      </div>
      <p className={`text-4xl font-bold mb-3 ${
        isNegative ? 'text-red-400' : 'text-green-400'
      }`}>
        ${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}
      </p>
      <p className="text-indigo-200">{description}</p>
    </div>
  );
}

function ProgressBar({ label, percentage, value }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-lg font-medium text-white">{label}</span>
        <span className="text-lg font-medium text-indigo-300">
          ${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}