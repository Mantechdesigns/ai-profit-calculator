import React from 'react';

interface RadioGroupProps {
  name: string;
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function RadioGroup({ name, label, options, value, onChange }: RadioGroupProps) {
  return (
    <div className="mb-6">
      <p className="text-sm text-gray-300 mb-3 font-medium">{label}</p>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
              value === option
                ? 'border-brand-blue-accent bg-brand-blue-accent/10 text-white'
                : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                value === option ? 'border-brand-blue-accent' : 'border-gray-500'
              }`}
            >
              {value === option && (
                <div className="w-2 h-2 rounded-full bg-brand-blue-accent" />
              )}
            </div>
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
