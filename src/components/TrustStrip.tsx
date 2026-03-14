export default function TrustStrip() {
  return (
    <div className="mt-10 space-y-4">
      <p className="text-text-muted text-xs uppercase tracking-widest font-medium">
        As Featured On
      </p>

      {/* Logo row */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 opacity-70">
        {/* Stellar - Trusted Ethical Business Accreditation */}
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent-gold" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-white/80 text-sm font-bold tracking-wide">STELLAR</span>
        </div>

        <span className="text-white/20 hidden sm:inline">|</span>

        {/* Business News Daily */}
        <div className="flex items-center">
          <span className="text-white/80 text-sm font-bold tracking-tight">BUSINESS</span>
          <span className="text-white/50 text-sm font-light tracking-tight ml-1">NEWS DAILY</span>
        </div>

        <span className="text-white/20 hidden sm:inline">|</span>

        {/* Fox News */}
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded bg-gradient-to-b from-blue-900 to-blue-800 flex items-center justify-center">
            <span className="text-white text-[7px] font-extrabold leading-none">FOX</span>
          </div>
          <span className="text-white/80 text-sm font-bold tracking-wide">FOX NEWS</span>
        </div>

        <span className="text-white/20 hidden sm:inline">|</span>

        {/* USA Today */}
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600" />
          <div className="flex flex-col leading-none">
            <span className="text-white/80 text-[11px] font-extrabold tracking-wider">USA</span>
            <span className="text-white/80 text-[11px] font-extrabold tracking-wider">TODAY</span>
          </div>
        </div>

        <span className="text-white/20 hidden sm:inline">|</span>

        {/* Digital Journal */}
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-5 flex flex-col gap-px">
            <div className="w-2 h-2 bg-accent-gold/80 rounded-sm" />
            <div className="w-4 h-2 bg-accent-gold/60 rounded-sm" />
          </div>
          <span className="text-white/80 text-sm font-bold tracking-tight">DIGITAL JOURNAL</span>
        </div>
      </div>

      {/* Social proof line */}
      <p className="text-text-muted text-xs max-w-sm mx-auto leading-relaxed">
        Used by 500+ service-based CEOs and business owners
        who have collectively recovered over $2.5 million in identified profit leaks
      </p>
    </div>
  );
}
