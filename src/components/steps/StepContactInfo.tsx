import React from 'react';
import { Mail, User } from 'lucide-react';
import type { AuditFormData } from '../../types/form';

interface StepContactInfoProps {
  formData: AuditFormData;
  updateField: (field: keyof AuditFormData, value: any) => void;
}

export default function StepContactInfo({ formData, updateField }: StepContactInfoProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-brand-gold mb-1">Your Information</h2>
      <p className="text-gray-400 text-sm mb-6">We'll send your personalized report to this email.</p>

      <div className="mb-6">
        <label className="text-sm text-gray-300 mb-2 block font-medium">
          7. Email address <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 text-sm"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="text-sm text-gray-300 mb-2 block font-medium">
          8. First name (for personalization)
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            placeholder="Your first name"
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
