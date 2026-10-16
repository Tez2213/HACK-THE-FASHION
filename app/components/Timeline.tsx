"use client";

import { timeline } from "../lib/event";
import { useNow } from "../lib/useNow";
import { Tbc } from "./Tbc";

const times = timeline.map((t) => Date.parse(t.at));

/**
 * Key dates. Horizontal on desktop, vertical on mobile. Once the clock is known
 * on the client, past milestones are ticked off and the next one is flagged.
 */
export function Timeline() {
  const now = useNow();
  const nextIndex = now === null ? -1 : times.findIndex((t) => t > now);

  return (
    <div className="relative mt-14">
      {/* Track lines */}
      <div aria-hidden="true" className="absolute top-0 bottom-0 left-[7px] w-px bg-forest/20 lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
      <ol className="relative grid gap-8 lg:grid-cols-7 lg:gap-4">
        {timeline.map((m, i) => {
          const past = now !== null && times[i] <= now;
          const next = i === nextIndex;
          return (
            <li
              key={m.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
              className="relative pl-9 lg:pt-9 lg:pl-0"
            >
              <span
                aria-hidden="true"
                className={`absolute top-0.5 left-0 size-[15px] lg:top-0 ${
                  past ? "bg-forest" : next ? "bg-violet" : "border border-forest/40 bg-linen"
                }`}
              />
              <span className={`cut-sm inline-block px-2.5 py-1 font-mono text-[13px] font-semibold ${next ? "bg-violet text-white" : "bg-sage text-forest"}`}>
                {m.date}
              </span>
              {next && <span className="label ml-2 text-violet lg:mt-2 lg:ml-0 lg:block">Up next</span>}
              <h3 className={`mt-3 text-[17px] leading-snug font-semibold ${past ? "text-forest/60" : ""}`}>
                {m.title}
                <Tbc when={m.tbc} />
              </h3>
              <p className="mt-1 text-[15px] leading-relaxed text-moss">{m.description}</p>
              {past && <span className="sr-only">(completed)</span>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
