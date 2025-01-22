import React, { useState } from 'react';
import { Calculator, ChevronDown, ChevronUp, ArrowRight, TrendingUp, DollarSign, Clock, Users } from 'lucide-react';
import CalculatorForm from './components/CalculatorForm';
import Results from './components/Results';
import LeadMagnet from './components/LeadMagnet';

export default function App() {
  const [showResults, setShowResults] = useState(false);
  const [calculationData, setCalculationData] = useState({
    monthlyLeads: 0,
    leadValue: 0,
    operationalCosts: 0,
    adminHours: 0,
    marketingSpend: 0,
    churnRate: 0,
  });

  const handleCalculate = (data: typeof calculationData) => {
    setCalculationData(data);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/10 p-3 sm:p-4 rounded-2xl backdrop-blur-lg">
              <Calculator className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-300" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
            AI Profit Calculator
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-indigo-200 max-w-2xl mx-auto font-light">
            How Much Is Your Business Losing? Find Out in 60 Seconds.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-8 md:p-12">
          {!showResults ? (
            <CalculatorForm onCalculate={handleCalculate} />
          ) : (
            <>
              <Results data={calculationData} />
              <LeadMagnet savings={calculationData.monthlyLeads * calculationData.leadValue * 0.2 * 12} formData={calculationData} />
            </>
          )}
        </div>

        {/* Social Proof */}
        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard
            title="Dental Practice"
            savings="$12,000"
            description="Saved monthly by automating appointments"
            icon={<Clock className="w-6 h-6 text-green-400" />}
          />
          <TestimonialCard
            title="E-Commerce Brand"
            savings="30%"
            description="Of lost leads recovered with AI"
            icon={<TrendingUp className="w-6 h-6 text-green-400" />}
          />
          <TestimonialCard
            title="Service Agency"
            savings="$8,500"
            description="Monthly operational costs reduced"
            icon={<DollarSign className="w-6 h-6 text-green-400" />}
          />
        </div>
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  title: string;
  savings: string;
  description: string;
  icon: React.ReactNode;
}

function TestimonialCard({ title, savings, description, icon }: TestimonialCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-green-400/10 rounded-xl p-3">
          {icon}
        </div>
        <h3 className="font-semibold text-lg text-white">{title}</h3>
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">{savings}</p>
      <p className="text-indigo-200">{description}</p>
    </div>
  );
}