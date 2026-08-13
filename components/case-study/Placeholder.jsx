// Clean placeholder shown wherever a project asset/screenshot is not yet
// available. Clearly labelled so it is obvious where the real asset belongs.
const Placeholder = ({ label, className = "" }) => {
  return (
    <div
      className={`relative flex items-center justify-center w-full h-full min-h-[180px] rounded-xl border border-dashed border-white/20 bg-white/[0.03] overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent" />
      <div className="relative z-10 flex flex-col items-center gap-2 px-6 py-10 text-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          className="text-white/30"
          aria-hidden
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
          <path
            d="M21 15l-5-5L5 21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[11px] uppercase tracking-[0.18em] text-white/50 font-semibold">
          Project Asset
        </span>
        <span className="text-xs text-white/70 font-medium leading-snug max-w-[240px]">
          {label}
        </span>
      </div>
    </div>
  );
};

export default Placeholder;
