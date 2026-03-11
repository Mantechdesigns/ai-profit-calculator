import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxGroupProps {
  name: string;
  label: string;
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
}

export default function CheckboxGroup({ name, label, options, values, onChange }: CheckboxGroupProps) {
  const toggle = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      onChange([...values, option]);
    }
  };

  return (
    <div className="mb-6">
      <p className="text-sm text-gray-300 mb-3 font-medium">{label}</p>
      <div className="space-y-2">
        {options.map((option) => {
          const checked = values.includes(option);
          return (
            <label
              key={option}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                checked
                  ? 'border-brand-blue-accent bg-brand-blue-accent/10 text-white'
                  : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
              }`}
            >
              <input
                type="checkbox"
                name={name}
                value={option}
                checked={checked}
                onChange={() => toggle(option)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  checked ? 'border-brand-blue-accent bg-brand-blue-accent' : 'border-gray-500'
                }`}
              >
                {checked && <Check className="w-3 h-3 text-brand-dark" />}
              </div>
              <span className="text-sm">{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
