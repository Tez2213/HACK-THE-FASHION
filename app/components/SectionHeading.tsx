import type { ReactNode } from "react";

export function SectionHeading({
  index,
  label,
  title,
  intro,
  dark = false,
  className = "",
}: {
  index: string;
  label: string;
  title?: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <header data-reveal className={`max-w-3xl ${className}`}>
      <p className={`label ${dark ? "text-terracotta-light" : "text-terracotta"}`}>
        {index} — {label}
      </p>
      {title && <h2 className="h2 mt-4">{title}</h2>}
      {intro && (
        <p className={`mt-5 max-w-2xl ${dark ? "text-linen/80" : "text-moss"}`}>{intro}</p>
      )}
    </header>
  );
}
