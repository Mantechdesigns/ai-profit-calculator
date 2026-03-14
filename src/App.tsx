import { useState, useEffect } from 'react';
import { QUIZ_SECTIONS } from './data/questions';
import { calculateAudit, type AuditResult } from './lib/calculations';
import { sendWebhook } from './lib/webhook';
import { trackPageView, trackQuizStart, trackLeadCapture } from './lib/metaPixel';
import WelcomeScreen from './components/WelcomeScreen';
import QuizSection from './components/QuizSection';
import RevenueInput from './components/RevenueInput';
import LoadingAnimation from './components/LoadingAnimation';
import ResultsBlurGate from './components/ResultsBlurGate';
import CalendarBookingPage from './components/CalendarBookingPage';

type AppStep = 'welcome' | 'quiz' | 'revenue' | 'loading' | 'blur-gate' | 'booking';

export default function App() {
  const [step, setStep] = useState<AppStep>('welcome');
  const [quizIndex, setQuizIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  useEffect(() => {
    trackPageView();
  }, []);

  const handleStart = () => {
    setStep('quiz');
    trackQuizStart();
  };

  const handleQuizSelect = (score: number) => {
    const section = QUIZ_SECTIONS[quizIndex];
    const newScores = { ...scores, [section.id]: score };
    setScores(newScores);

    if (quizIndex < QUIZ_SECTIONS.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      setStep('revenue');
    }
  };

  const handleQuizBack = () => {
    if (quizIndex > 0) {
      setQuizIndex(quizIndex - 1);
    } else {
      setStep('welcome');
    }
  };

  const handleRevenueSelect = (annualRevenue: number, label: string) => {
    setStep('loading');

    const result = calculateAudit(scores, annualRevenue, label);
    setAuditResult(result);

    setTimeout(() => {
      setStep('blur-gate');
    }, 1800);
  };

  const handleRevenueBack = () => {
    setStep('quiz');
    setQuizIndex(QUIZ_SECTIONS.length - 1);
  };

  const [firstName, setFirstName] = useState('');

  const handleUnlock = (name: string, email: string) => {
    setFirstName(name);

    if (auditResult) {
      trackLeadCapture(auditResult.totalLeak);

      // Fire webhook (fire-and-forget) — DO NOT MODIFY
      sendWebhook(name, email, auditResult).catch((err) =>
        console.error('Webhook failed:', err)
      );
    }

    setStep('booking');
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {step === 'welcome' && <WelcomeScreen onStart={handleStart} />}

      {step === 'quiz' && (
        <QuizSection
          section={QUIZ_SECTIONS[quizIndex]}
          currentStep={quizIndex}
          totalSteps={QUIZ_SECTIONS.length}
          selectedScore={scores[QUIZ_SECTIONS[quizIndex].id] ?? null}
          onSelect={handleQuizSelect}
          onBack={handleQuizBack}
          canGoBack={true}
        />
      )}

      {step === 'revenue' && (
        <RevenueInput
          onSelect={handleRevenueSelect}
          onBack={handleRevenueBack}
        />
      )}

      {step === 'loading' && <LoadingAnimation />}

      {step === 'blur-gate' && auditResult && (
        <ResultsBlurGate
          result={auditResult}
          scores={scores}
          onUnlock={handleUnlock}
        />
      )}

      {step === 'booking' && auditResult && (
        <CalendarBookingPage
          firstName={firstName}
          result={auditResult}
          scores={scores}
        />
      )}
    </div>
  );
}
