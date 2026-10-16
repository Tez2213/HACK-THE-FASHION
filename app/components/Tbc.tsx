/**
 * Dev-only marker for content the build guide flags as "to be confirmed".
 * Renders nothing in production builds.
 */
export function Tbc({ when = true }: { when?: boolean }) {
  if (!when || process.env.NODE_ENV === "production") return null;
  return (
    <span
      title="To be confirmed before launch — edit app/lib/event.ts"
      className="ml-1.5 inline-block border border-dashed border-current px-1 align-middle font-mono text-[10px] leading-4 font-semibold tracking-wider opacity-70"
    >
      TBC
    </span>
  );
}
