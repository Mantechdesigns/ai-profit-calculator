import { useState } from 'react';
import type { QuizSection as QuizSectionType } from '../data/questions';

interface QuizSectionProps {
  section: QuizSectionType;
  currentStep: number;
  totalSteps: number;
  selectedScore: number | null;
  onSelect: (score: number) => void;
  onBack: () => void;
  canGoBack: boolean;
}

export default function QuizSection({
  section,
  currentStep,
  totalSteps,
  selectedScore,
  onSelect,
  onBack,
  canGoBack,
}: QuizSectionProps) {
  const [justSelected, setJustSelected] = useState<number | null>(null);

  const handleSelect = (score: number) => {
    setJustSelected(score);
    setTimeout(() => {
      onSelect(score);
      setJustSelected(null);
    }, 300);
  };

  const progressPct = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      <div className="max-w-xl mx-auto w-full mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-text-secondary text-sm font-medium">
            Step {currentStep + 1} of {totalSteps}
          </span>
          {canGoBack && (
            <button
              onClick={onBack}
              className="text-text-secondary text-sm hover:text-white transition-colors"
            >
              &larr; Back
            </button>
          )}
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-teal transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
          {section.question}
        </h2>
        <p className="text-text-muted text-sm mb-6">Tap one</p>

        <div className="space-y-3">
          {section.options.map((option) => {
            const isSelected = selectedScore === option.score || justSelected === option.score;
            return (
              <button
                key={option.score}
                onClick={() => handleSelect(option.score)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 min-h-[56px] ${
                  isSelected
                    ? 'border-accent-cyan bg-accent-cyan/10 shadow-[0_0_20px_rgba(0,212,255,0.15)]'
                    : 'border-border-card bg-bg-card hover:bg-bg-card-hover hover:border-white/20'
                }`}
              >
                <span className={`text-base font-medium ${isSelected ? 'text-white' : 'text-text-secondary'}`}>
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
