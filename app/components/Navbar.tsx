"use client";

import { useEffect, useState } from "react";
import { navLinks } from "../lib/event";
import { ClothsyMark } from "./ClothsyMark";
import { RegisterButton } from "./RegisterButton";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-forest/80 bg-linen/95 backdrop-blur-sm">
      <nav
        aria-label="Main"
        className="mx-auto flex h-[68px] max-w-[var(--container)] items-center justify-between gap-4 px-4 sm:px-6"
      >
        <a href="#top" className="flex shrink-0 items-center gap-2" aria-label="Hack the Fashion — home">
          <span className="cut-sm grid size-8 place-items-center bg-forest text-linen">
            <ClothsyMark className="size-[18px]" />
          </span>
          <span className="font-display text-[17px] leading-none font-semibold tracking-tight whitespace-nowrap sm:text-[19px]">
            Hack the <span className="accent">Fashion</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? "true" : undefined}
                className="relative px-3 py-2 text-[15px] font-medium text-forest/75 transition-colors hover:text-forest aria-[current]:text-forest"
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-0.5 h-px bg-terracotta transition-transform duration-300 ${active === l.href ? "scale-x-100" : "scale-x-0"}`}
                  style={{ transformOrigin: "left" }}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <RegisterButton className="btn-sm" />
          <button
            type="button"
            className="grid size-10 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h10" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-forest/15 bg-linen px-4 pb-6 lg:hidden"
      >
        <ul className="divide-y divide-forest/10">
          {navLinks.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-4 font-display text-2xl font-semibold"
              >
                {l.label}
                <span className="font-mono text-xs text-moss">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
