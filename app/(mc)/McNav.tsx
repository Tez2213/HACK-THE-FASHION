"use client";

import { useEffect, useState } from "react";
import { ClothsyMark } from "../components/ClothsyMark";
import { navLinks } from "../lib/event";
import { McRegister } from "./ui";

/** Floating dirt-block navbar with a grass strip on top. */
export function McNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative mx-2 mt-4 md:mx-6">
        <div className="relative mx-auto max-w-[1240px]">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[10px] -translate-y-[8px] border-2 border-b-0 border-[#1f2e14] bg-[url(/mc/grass.png)] bg-[length:16px_16px] [image-rendering:pixelated]"
          />
          <nav
            aria-label="Main"
            className="mc-tx tx-dirt flex items-center justify-between gap-3 border-2 border-[#1f2e14] px-3 py-2 shadow-[0_10px_28px_rgb(0_0_0/0.4)] [--b:32px] md:px-5"
          >
            <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="Hack the Fashion — home">
              <span className="grid size-9 place-items-center border-2 border-[#111] bg-violet text-white shadow-[inset_2px_2px_0_rgb(255_255_255/0.3),inset_-2px_-2px_0_rgb(0_0_0/0.35)]">
                <ClothsyMark className="size-5" />
              </span>
              <span className="mc-font text-[15px] leading-none font-bold tracking-wide whitespace-nowrap uppercase [text-shadow:2px_2px_0_rgb(0_0_0/0.5)] max-[440px]:sr-only sm:text-[17px]">
                Hack the <span className="mc-accent">Fashion</span>
              </span>
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="mc-font px-2.5 py-2 text-[14px] tracking-[0.15em] text-white/85 uppercase [text-shadow:1px_1px_0_rgb(0_0_0/0.6)] hover:text-[var(--gold)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <McRegister className="mc-btn-sm" />
              <button
                type="button"
                className="mc-btn mc-btn-sm px-2.5 lg:hidden"
                aria-expanded={open}
                aria-controls="mc-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((o) => !o)}
              >
                <span aria-hidden="true" className="grid w-5 gap-[4px]">
                  <span
                    className={`h-[3px] bg-white transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
                  />
                  <span className={`h-[3px] bg-white ${open ? "opacity-0" : ""}`} />
                  <span
                    className={`h-[3px] bg-white transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
                  />
                </span>
              </button>
            </div>
          </nav>

          <div
            id="mc-menu"
            hidden={!open}
            className="mc-tx tx-dirt wash-20 border-2 border-t-0 border-[#1f2e14] px-4 pb-4 [--b:32px] lg:hidden"
          >
            <ul>
              {navLinks.map((l) => (
                <li key={l.href} className="border-b-2 border-black/25 last:border-0">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="mc-font flex items-center justify-between py-3.5 text-lg tracking-[0.12em] uppercase [text-shadow:2px_2px_0_rgb(0_0_0/0.5)]"
                  >
                    {l.label}
                    <span aria-hidden="true" className="text-[var(--gold)]">
                      ▸
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
