interface NextStepsYTProps {
  firstName?: string;
}

export default function NextStepsYT({ firstName }: NextStepsYTProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="max-w-lg mx-auto w-full">
        {/* Confirmation Icon */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent-teal/10 border border-accent-teal/30 flex items-center justify-center animate-fadeIn">
          <svg className="w-8 h-8 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-accent-gold leading-tight mb-3 animate-fadeIn">
          {firstName ? `${firstName}, you're` : "You're"} all set!
        </h1>

        <p className="text-white text-base md:text-lg mb-8 leading-relaxed animate-fadeIn">
          Your strategy call is booked. Here's what to expect.
        </p>

        {/* What to expect */}
        <div className="bg-bg-card border border-border-card rounded-xl p-6 mb-6 text-left animate-fadeIn">
          <p className="text-accent-gold font-bold text-sm mb-4 uppercase tracking-wider">
            What Happens Next
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-accent-cyan text-xs font-bold">1</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-0.5">Check your inbox</p>
                <p className="text-text-secondary text-xs">You'll receive a calendar invite and your Profit Leak Report PDF.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-accent-cyan text-xs font-bold">2</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-0.5">Review your report</p>
                <p className="text-text-secondary text-xs">Look over your Profit Leak Report before the call so we can dive right in.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-accent-cyan text-xs font-bold">3</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-0.5">Show up ready</p>
                <p className="text-text-secondary text-xs">Come with 1-2 questions about your business operations so we make the most of our time.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Prep */}
        <div className="bg-bg-card border border-accent-gold/20 rounded-xl p-5 mb-6 text-left animate-fadeIn">
          <p className="text-accent-gold font-bold text-sm mb-2 uppercase tracking-wider">
            Quick Prep (Optional)
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-accent-teal mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-text-secondary text-sm">Know your current monthly revenue (rough estimate is fine)</p>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-accent-teal mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-text-secondary text-sm">Think about your biggest bottleneck right now</p>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-accent-teal mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-text-secondary text-sm">Have your Profit Leak Report handy (PDF from your email)</p>
            </li>
          </ul>
        </div>

        {/* Video placeholder — existing short video */}
        <div className="bg-bg-card border border-border-card rounded-xl p-5 mb-6 text-center animate-fadeIn">
          <p className="text-white font-semibold text-sm mb-3">Quick message from Manny</p>
          <div className="aspect-video rounded-lg overflow-hidden bg-black/50 flex items-center justify-center">
            <p className="text-text-muted text-xs px-4">
              Video will appear here — add your short video embed URL
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12">
        <p className="text-text-muted text-[10px] max-w-lg mx-auto leading-relaxed">
          &copy; 2026 | Man-Tech Designs LLC. This audit is an educational tool. Financial figures shown are illustrative estimates based on your inputs. They do not guarantee specific results.
        </p>
      </footer>
    </div>
  );
}
