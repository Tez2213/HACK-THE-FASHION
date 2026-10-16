"use client";

import { Tbc } from "../components/Tbc";
import { timeline } from "../lib/event";
import { useNow } from "../lib/useNow";
import { delay, Sprite } from "./ui";

const times = timeline.map((t) => Date.parse(t.at));
// Water drips running down the chain, staggered.
const drips = ["0s", "-1.7s", "-3.1s", "-4.6s"];

/**
 * Lantern chain down the waterfall cave: each date hangs a lantern on the
 * chain that lights (and swings) as it scrolls in, a beam of light reaches
 * out to its deepslate slab, and the next date's lantern pulses.
 */
export function McTimeline() {
  const now = useNow();
  const nextIndex = now === null ? -1 : times.findIndex((t) => t > now);

  return (
    <div className="relative mt-16">
      <div aria-hidden="true" className="mc-chain-spine absolute top-0 bottom-0 left-[18px] md:left-1/2 md:-translate-x-1/2" />
      {drips.map((d) => (
        <span key={d} aria-hidden="true" className="mc-drip left-[18px] md:left-1/2" style={{ animationDelay: d }} />
      ))}
      <ol className="relative space-y-10 md:space-y-8">
        {timeline.map((m, i) => {
          const left = i % 2 === 0;
          const past = now !== null && times[i] <= now;
          const next = i === nextIndex;
          return (
            <li
              key={m.title}
              data-reveal
              data-next={next || undefined}
              style={delay(i * 70)}
              className={`mc-lamp-row relative md:grid md:grid-cols-2 md:gap-28 ${left ? "mc-from-left" : "mc-from-right"}`}
            >
              {/* Lantern on the chain, with its halo and a beam out to the slab */}
              <div aria-hidden="true" className="absolute top-1/2 left-[18px] z-10 md:left-1/2">
                <span className="mc-halo" />
                <span className={`mc-lamp-beam ${left ? "mc-lamp-beam-l" : ""}`} />
                <span className="mc-lamp-hang">
                  <Sprite src="lantern" w={12} h={16} className="mc-lantern" />
                </span>
              </div>

              <div className={`mc-slab ml-14 px-6 py-5 md:ml-0 ${left ? "" : "md:col-start-2"} ${past ? "opacity-75" : ""}`}>
                <p className="mc-font text-[14px] tracking-[0.15em] text-[#9ff6ff] uppercase">
                  {m.date}
                  {next && <span className="ml-3 text-[var(--gold)]">▸ Up next</span>}
                  {past && <span className="ml-3 text-[#80e030]">✓ Done</span>}
                </p>
                <h3 className="mc-font mt-2 text-[22px] font-bold tracking-wide uppercase [text-shadow:2px_2px_0_rgb(0_0_0/0.5)]">
                  {m.title}
                  <Tbc when={m.tbc} />
                </h3>
                <p className="mt-1 text-[15px] text-white/80">{m.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
