import type { ReactNode, SVGProps } from "react";
import type { TrackIcon } from "../lib/event";

type P = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
};

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const Pin = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const Mail = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 5h18v14H3z" />
    <path d="m3 6 9 7 9-7" />
  </svg>
);

export const Phone = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z" />
  </svg>
);

export const Instagram = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

export const LinkedIn = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5c0-1.2-.02-2.73-1.66-2.73-1.67 0-1.93 1.3-1.93 2.64V21h-4V9.75Z" />
  </svg>
);

/* Track icons: thin forest line drawings, sewing-pattern meets circuit. */
const trackPaths: Record<TrackIcon, ReactNode> = {
  tryon: (
    <>
      <path d="M7 3h10v18H7z" />
      <path d="M10 8.5 12 7l2 1.5V12h-4z" />
      <path d="M9.5 15h5" strokeDasharray="1.5 1.5" />
      <path d="M3 6v3M21 6v3M3 15v3M21 15v3" />
    </>
  ),
  discovery: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 6 6" />
      <path d="M8 9.5 10.5 8 13 9.5v3H8z" />
    </>
  ),
  design: (
    <>
      <path d="M3 21 14 10" />
      <path d="m14 10 3-7 4 4-7 3" />
      <circle cx="6" cy="6" r="2" />
      <path d="M3 13h4M17 17h4v4" />
    </>
  ),
  fit: (
    <>
      <path d="M3 9h18v6H3z" />
      <path d="M7 9v3M11 9v4M15 9v3M19 9v2" />
    </>
  ),
  sustain: (
    <>
      <path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16Z" />
      <path d="M4 20 14 10" />
    </>
  ),
  brands: (
    <>
      <path d="M3 20h18" />
      <path d="M6 20v-6M11 20V9M16 20v-9M21 4l-6 5-4-3-8 6" />
    </>
  ),
};

export function TrackGlyph({ icon, className }: { icon: TrackIcon; className?: string }) {
  return (
    <svg {...base} className={className}>
      {trackPaths[icon]}
    </svg>
  );
}
