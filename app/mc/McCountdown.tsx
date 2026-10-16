"use client";

import { split } from "../components/Countdown";
import { HACK_END, HACK_START } from "../lib/event";
import { useNow } from "../lib/useNow";

const START = Date.parse(HACK_START);
const END = Date.parse(HACK_END);

/** Countdown in four dark inventory slots. */
export function McCountdown({ compact = false }: { compact?: boolean }) {
  const now = useNow();
  const phase = now === null ? "pending" : now < START ? "before" : now < END ? "live" : "done";

  if (phase === "done") {
    return <p className="mc-font text-xl text-[#f5ead0] [text-shadow:2px_2px_0_rgb(0_0_0/0.55)]">That&apos;s a wrap. Thank you, makers.</p>;
  }

  const parts = now === null ? null : split((phase === "live" ? END : START) - now);

  return (
    <div>
      <p className="mc-font text-[13px] tracking-[0.2em] text-[#f5ead0] uppercase [text-shadow:2px_2px_0_rgb(0_0_0/0.55)]">
        {phase === "live" ? "Live now · code freeze in" : "Hacking starts in"}
      </p>
      <div className="mt-3 grid grid-cols-4 gap-2" role="timer" aria-live="off">
        {(["Days", "Hours", "Minutes", "Seconds"] as const).map((unit) => (
          <div key={unit} className={`mc-slot mc-slot-dark min-w-0 content-center text-center ${compact ? "py-2.5" : "aspect-square py-1"}`}>
            <span className={`mc-font block leading-none font-bold tabular-nums [text-shadow:3px_3px_0_rgb(0_0_0/0.5)] ${compact ? "text-[26px]" : "text-[28px] sm:text-[40px]"}`}>
              <span key={parts?.[unit]} className={parts ? "tick" : undefined}>
                {parts ? String(parts[unit]).padStart(2, "0") : "--"}
              </span>
            </span>
            <span className="mc-font mt-1 block text-[10px] tracking-[0.12em] text-white/70 uppercase sm:text-[12px]">{unit}</span>
          </div>
        ))}
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
