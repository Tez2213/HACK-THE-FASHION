/** The Clothsy "C": a block C with the signature 45° cut top-right corner. */
export function ClothsyMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M3 3H17L21 7V9H9V15H21V21H3Z" />
    </svg>
  );
}

export function PoweredBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`cut-sm inline-flex items-center gap-2 bg-violet py-2 pr-4 pl-3 text-[13px] font-medium tracking-[0.04em] text-white ${className}`}
    >
      <ClothsyMark className="size-4" />
      Powered by Clothsy AI
    </span>
  );
}
