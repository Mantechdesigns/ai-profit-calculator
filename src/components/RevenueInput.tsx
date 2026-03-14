import { useState } from 'react';
import { REVENUE_OPTIONS } from '../data/questions';

interface RevenueInputProps {
  onSelect: (annualRevenue: number, label: string) => void;
  onBack: () => void;
}

export default function RevenueInput({ onSelect, onBack }: RevenueInputProps) {
  const [justSelected, setJustSelected] = useState<number | null>(null);

  const handleSelect = (annualRevenue: number, label: string) => {
    setJustSelected(annualRevenue);
    setTimeout(() => {
      onSelect(annualRevenue, label);
      setJustSelected(null);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      <div className="max-w-xl mx-auto w-full mb-8">
        <button
          onClick={onBack}
          className="text-text-secondary text-sm hover:text-white transition-colors"
        >
          &larr; Back
        </button>
      </div>

      <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 bg-accent-cyan/10 border border-accent-cyan/30 px-4 py-2 rounded-full mb-6 self-start">
          <span className="text-accent-cyan text-sm font-medium">Almost done!</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
          One more thing - roughly what's your monthly revenue?
        </h2>
        <p className="text-text-muted text-sm mb-8">
          This helps us calculate your actual dollar leak.
        </p>

        <div className="space-y-3">
          {REVENUE_OPTIONS.map((option) => {
            const isSelected = justSelected === option.annualRevenue;
            return (
              <button
                key={option.annualRevenue}
                onClick={() => handleSelect(option.annualRevenue, option.label)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 min-h-[56px] ${
                  isSelected
                    ? 'border-accent-cyan bg-accent-cyan/10 shadow-[0_0_20px_rgba(0,212,255,0.15)]'
                    : 'border-border-card bg-bg-card hover:bg-bg-card-hover hover:border-white/20'
                }`}
              >
                <span className={`text-base font-medium ${isSelected ? 'text-white' : 'text-text-secondary'}`}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
