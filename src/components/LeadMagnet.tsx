import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { createGHLContact } from '../lib/ghl';

interface LeadMagnetProps {
  savings: number;
  formData: {
    monthlyLeads: number;
    leadValue: number;
    operationalCosts: number;
    adminHours: number;
    marketingSpend?: number;
    churnRate?: number;
  };
}

export default function LeadMagnet({ savings, formData }: LeadMagnetProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (!import.meta.env.VITE_GHL_API_KEY || !import.meta.env.VITE_GHL_LOCATION_ID) {
        throw new Error('GHL configuration is missing. Please check your environment variables.');
      }

      // Create contact in GHL
      const ghlResponse = await createGHLContact({
        email,
        ...formData,
      });

      if (!ghlResponse?.contact?.id) {
        throw new Error('Failed to create contact in Go High Level');
      }

      // Store in Supabase if configured
      if (isSupabaseConfigured() && supabase) {
        const { error: dbError } = await supabase
          .from('submissions')
          .insert([
            {
              email,
              monthly_leads: formData.monthlyLeads,
              lead_value: formData.leadValue,
              operational_costs: formData.operationalCosts,
              admin_hours: formData.adminHours,
              marketing_spend: formData.marketingSpend,
              churn_rate: formData.churnRate,
              ghl_contact_id: ghlResponse.contact.id,
              annual_savings: savings,
            },
          ]);

        if (dbError) throw dbError;
      }

      setSubmitted(true);
      setTimeout(() => {
        window.open('https://savvyaiassist.com/toolkit', '_blank');
      }, 1500);
    } catch (err) {
      console.error('Submission error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to submit form. Please try again or contact support.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-12 border border-white/20 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Claim Your FREE Business Resilience Toolkit
        </h2>
        <p className="text-xl text-indigo-200 mb-8">
          Start recovering ${savings.toLocaleString('en-US', { maximumFractionDigits: 0 })} in annual revenue today!
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
            <h3 className="font-semibold text-xl text-white mb-6">What You'll Get:</h3>
            <ul className="space-y-4 text-left">
              <BenefitItem text="5 Custom AI Templates (Recover Leads in 24 Hours)" />
              <BenefitItem text='"Profit Autopilot" Video Guide ($997 Value)' />
              <BenefitItem text="30-Min Strategy Session with That AI Man" />
            </ul>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-6">
              <img
                src="https://storage.googleapis.com/msgsndr/vs8KNq9TD1P2P6hB21ZC/media/66fffcac9274d04a697026d8.png"
                alt="That AI Man"
                className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-500/30"
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-xl text-white">That AI Man</h3>
              <p className="text-indigo-200 mb-4">AI Business Automation Expert</p>
              <div className="flex justify-center space-x-2">
                <Badge text="Certified AI Consultant" />
                <Badge text="500+ Businesses Helped" />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-400 p-4 rounded-xl mb-4 border border-red-500/20">
            {error}
          </div>
        )}

        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 px-4 py-3 text-lg focus:border-indigo-500 focus:ring focus:ring-indigo-500/20"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105 font-semibold text-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Get Access'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-green-500/10 text-green-400 p-4 rounded-xl inline-flex items-center border border-green-500/20">
            <CheckCircle2 className="w-6 h-6 mr-2" />
            Redirecting you to your Business Resilience Toolkit...
          </div>
        )}

        <p className="text-indigo-200 mt-6">
          Want a custom plan? Book a{' '}
          <a 
            href="https://pro.automationstation.io/widget/bookings/savvy-ai" 
            className="text-indigo-400 font-semibold hover:text-indigo-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Free AI Audit
          </a>{' '}
          to save ${savings.toLocaleString('en-US', { maximumFractionDigits: 0 })}/month (guaranteed).
        </p>
      </div>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <li className="flex items-center space-x-3">
      <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
      <span className="text-indigo-200">{text}</span>
    </li>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
      {text}
    </span>
  );
}