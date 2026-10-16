"use client";

import { HACK_END, HACK_START } from "../lib/event";
import { useNow } from "../lib/useNow";

const START = Date.parse(HACK_START);
const END = Date.parse(HACK_END);

export function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    Days: Math.floor(s / 86400),
    Hours: Math.floor((s % 86400) / 3600),
    Minutes: Math.floor((s % 3600) / 60),
    Seconds: s % 60,
  };
}

export function Countdown() {
  const now = useNow();

  const phase = now === null ? "pending" : now < START ? "before" : now < END ? "live" : "done";
  const target = phase === "live" ? END : START;
  const parts = now === null ? null : split(target - now);

  if (phase === "done") {
    return (
      <div className="cut-md bg-forest p-6 text-linen">
        <p className="label text-sage">Hack the Fashion 2026</p>
        <p className="mt-2 font-display text-3xl font-semibold">
          That&apos;s a <span className="text-terracotta-light italic">wrap</span>. Thank you, makers.
        </p>
      </div>
    );
  }

  return (
    <div className="cut-md bg-forest p-5 text-linen sm:p-6">
      <p className="label flex items-center gap-2 text-sage">
        {phase === "live" && (
          <span className="pulse-dot size-2 bg-terracotta-light" aria-hidden="true" />
        )}
        {phase === "live" ? "Live now · code freeze in" : "Hacking starts in"}
      </p>
      <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-4" role="timer" aria-live="off">
        {(["Days", "Hours", "Minutes", "Seconds"] as const).map((unit) => {
          const value = parts ? String(parts[unit]).padStart(2, "0") : "--";
          return (
            <div key={unit} className="min-w-0">
              <span className="block font-mono text-[36px] leading-none font-semibold tabular-nums md:text-[56px]">
                <span key={value} className={parts ? "tick" : undefined}>
                  {value}
                </span>
              </span>
              <span className="mt-2 block text-[11px] font-medium tracking-[0.08em] text-linen/70 uppercase sm:text-[13px]">
                {unit}
              </span>
            </div>
          );
        })}
      </div>
      {parts && (
        <p className="sr-only">
          {parts.Days} days, {parts.Hours} hours and {parts.Minutes} minutes{" "}
          {phase === "live" ? "until code freeze" : "until hacking starts"}.
        </p>
      )}
    </div>
  );
}
