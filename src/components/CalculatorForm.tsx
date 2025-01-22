import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CalculatorFormProps {
  onCalculate: (data: {
    monthlyLeads: number;
    leadValue: number;
    operationalCosts: number;
    adminHours: number;
    marketingSpend: number;
    churnRate: number;
  }) => void;
}

export default function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState({
    monthlyLeads: '',
    leadValue: '',
    operationalCosts: '',
    adminHours: '',
    marketingSpend: '',
    churnRate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      monthlyLeads: Number(formData.monthlyLeads) || 0,
      leadValue: Number(formData.leadValue) || 0,
      operationalCosts: Number(formData.operationalCosts) || 0,
      adminHours: Number(formData.adminHours) || 0,
      marketingSpend: Number(formData.marketingSpend) || 0,
      churnRate: Number(formData.churnRate) || 0,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <FormField
          label="How many leads are you missing monthly?"
          name="monthlyLeads"
          value={formData.monthlyLeads}
          onChange={handleChange}
          tooltip="e.g., 50 prospects who didn't convert"
          type="number"
        />
        <FormField
          label="What's the average value of one lead?"
          name="leadValue"
          value={formData.leadValue}
          onChange={handleChange}
          tooltip="e.g., $1,000 per customer"
          type="number"
          prefix="$"
        />
        <FormField
          label="What are your monthly admin operational costs?"
          name="operationalCosts"
          value={formData.operationalCosts}
          onChange={handleChange}
          tooltip="e.g., customer service, outreach, follow-ups, FAQ handling, data entry costs"
          type="number"
          prefix="$"
        />
        <FormField
          label="How many hours per week on admin tasks?"
          name="adminHours"
          value={formData.adminHours}
          onChange={handleChange}
          tooltip="Weekly hours spent on repetitive tasks that could be automated"
          type="number"
        />
      </div>

      <div className="border-t border-white/20 pt-8 flex flex-col items-center">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="group flex items-center text-xl font-medium text-purple-300 hover:text-purple-200 transition-all duration-300 bg-purple-500/10 hover:bg-purple-500/20 px-8 py-4 rounded-2xl border border-purple-500/20 hover:border-purple-500/30 shadow-lg hover:shadow-purple-500/10"
        >
          {showAdvanced ? (
            <ChevronUp className="w-6 h-6 mr-3 group-hover:-translate-y-0.5 transition-transform" />
          ) : (
            <ChevronDown className="w-6 h-6 mr-3 group-hover:translate-y-0.5 transition-transform" />
          )}
          {showAdvanced ? 'Hide' : 'Show'} Advanced Increased Profit Margin Options
        </button>

        {showAdvanced && (
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-8 w-full">
            <FormField
              label="Current marketing spend?"
              name="marketingSpend"
              value={formData.marketingSpend}
              onChange={handleChange}
              tooltip="Monthly marketing budget"
              type="number"
              prefix="$"
            />
            <FormField
              label="Customer churn rate?"
              name="churnRate"
              value={formData.churnRate}
              onChange={handleChange}
              tooltip="Percentage of customers lost monthly"
              type="number"
              suffix="%"
            />
          </div>
        )}
      </div>

      <div className="flex justify-center pt-8">
        <button
          type="submit"
          className="relative group bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-12 py-4 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] font-semibold text-lg md:text-xl shadow-lg hover:shadow-xl"
        >
          <span className="relative z-10 flex items-center">
            Calculate My Potential Savings With AI
          </span>
          <div className="absolute inset-0 rounded-xl bg-white/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </form>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tooltip: string;
  type: string;
  prefix?: string;
  suffix?: string;
}

function FormField({ label, name, value, onChange, tooltip, type, prefix, suffix }: FormFieldProps) {
  return (
    <div className="group relative">
      <label className="block text-lg font-medium text-white mb-2 group-hover:text-indigo-300 transition-colors">
        {label}
        <span 
          className="ml-2 text-indigo-300 text-sm cursor-help transition-colors hover:text-indigo-200" 
          title={tooltip}
        >
          ⓘ
        </span>
      </label>
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-400">{prefix}</span>
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 shadow-lg backdrop-blur-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all ${
            prefix ? 'pl-8' : 'pl-4'
          } ${suffix ? 'pr-8' : 'pr-4'} py-3 text-lg`}
          placeholder="0"
          min="0"
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-gray-400">{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
}