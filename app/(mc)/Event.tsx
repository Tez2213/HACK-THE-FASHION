import { Tbc } from "../components/Tbc";
import { criteria, event, judges, mentorAreas, schedule, type SlotKind } from "../lib/event";
import { McTimeline } from "./McTimeline";
import { MentorsMotion } from "./Motion";
import { container, delay, Heading, Item, Section, Sprite, Sticker, type ItemName, type StickerName } from "./ui";

export function TimelineSection() {
  return (
    <Section id="timeline" tx="mc-photo bg-timeline" wash="wash-40">
      <div className={container}>
        <Heading
          center
          index="04"
          label="Timeline"
          title={
            <>
              Key <em>dates</em>
            </>
          }
        />
        <McTimeline />
      </div>
    </Section>
  );
}

const kinds: Record<SlotKind, { label: string; sticker: StickerName }> = {
  milestone: { label: "Milestone", sticker: "fire" },
  meal: { label: "Food", sticker: "pizza" },
  mentor: { label: "Mentors", sticker: "brain" },
  checkpoint: { label: "Checkpoint", sticker: "alarm" },
  judging: { label: "Judging", sticker: "monocle" },
  fun: { label: "Fun", sticker: "party" },
};
// Per-slot stickers by what happens; anything unmatched falls back to its kind.
const slotStickers: [RegExp, StickerName][] = [
  [/check-in/i, "wave"],
  [/opening/i, "popper"],
  [/freeze/i, "freeze"],
  [/closing|prize/i, "trophy"],
  [/pitch/i, "starstruck"],
  [/breakfast/i, "pancakes"],
  [/dinner/i, "noodles"],
  [/snack/i, "popcorn"],
];
const stickerFor = (s: { activity: string; kind?: SlotKind }): StickerName =>
  slotStickers.find(([re]) => re.test(s.activity))?.[1] ?? (s.kind ? kinds[s.kind].sticker : "wave");

type Slot = (typeof schedule)[number]["slots"][number];
type Row = { day: (typeof schedule)[number]; slot?: undefined } | { slot: Slot; day?: undefined };
const rows: Row[] = schedule.flatMap((day) => [{ day }, ...day.slots.map((slot) => ({ slot }))]);

// Path snakes in pairs: two rows right of centre, two left. x is % of width
// (desktop), xm the gentler wiggle down the left edge on phones.
const route = rows.map((_, i) => {
  const right = Math.floor(i / 2) % 2 === 0;
  const sign = right ? 1 : -1;
  return { side: right ? "r" : "l", x: 50 + sign * (i % 2 ? 13 : 8), xm: 6 + sign * 3 };
});

/** SVG path through each row's node, in viewBox units (100 wide, one unit per row). */
function routePath(xs: number[]) {
  let d = `M ${xs[0]} 0 L ${xs[0]} 0.5`;
  for (let i = 1; i < xs.length; i++) d += ` C ${xs[i - 1]} ${i}, ${xs[i]} ${i}, ${xs[i]} ${i + 0.5}`;
  return `${d} L ${xs[xs.length - 1]} ${xs.length}`;
}

function RouteSvg({ xs, className }: { xs: number[]; className: string }) {
  const d = routePath(xs);
  return (
    <svg aria-hidden="true" className={`mc-route-svg ${className}`} viewBox={`0 0 100 ${xs.length}`} preserveAspectRatio="none">
      <path d={d} fill="none" stroke="#1b1030" strokeWidth="11" vectorEffect="non-scaling-stroke" />
      <path d={d} fill="none" stroke="#9a5cff" strokeWidth="6" vectorEffect="non-scaling-stroke" />
      <path
        className="mc-route-flow"
        d={d}
        pathLength={60} // 40 dashes; the CSS dash period is 1.5
        fill="none"
        stroke="#f3e8ff"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * The run of show as a glowing path winding down the floating-island backdrop:
 * a glowstone node per slot, the slot card on the outer side, day banners
 * where each day starts and loot floating beside the big moments.
 */
export function Schedule() {
  return (
    <Section id="schedule" tx="mc-photo bg-schedule" wash="wash-20">
      <div className={container}>
        <Heading
          center
          index="05"
          label="Schedule"
          title={
            <>
              24 hours, <em>mapped</em>
              <Tbc />
            </>
          }
        />
        <ul data-reveal aria-label="Legend" className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2">
          {Object.values(kinds).map((k) => (
            <li key={k.label} className="mc-font flex items-center gap-1.5 text-[14px] [text-shadow:1px_1px_0_rgb(0_0_0/0.8)]">
              <Sticker name={k.sticker} size={24} />
              {k.label}
            </li>
          ))}
        </ul>

        <ol className="mc-route mt-14" style={{ ["--rows" as string]: rows.length }}>
          <RouteSvg xs={route.map((r) => r.xm)} className="md:hidden" />
          <RouteSvg xs={route.map((r) => r.x)} className="hidden md:block" />
          {rows.map((row, i) => {
            const { side, x, xm } = route[i];
            const k = row.slot?.kind ? kinds[row.slot.kind] : null;
            const big = row.slot?.kind === "milestone" || row.slot?.kind === "judging";
            return (
              <li
                key={row.day ? row.day.day : row.slot.time + row.slot.activity}
                data-reveal
                data-side={side}
                className="mc-route-row"
                style={{ ["--i" as string]: i, ["--x" as string]: `${x}%`, ["--xm" as string]: `${xm}%` }}
              >
                <span aria-hidden="true" className="mc-route-node" />
                {row.day ? (
                  <div className={`mc-route-card ${side === "l" ? "md:flex md:justify-end" : ""}`}>
                    <h3 className="mc-route-tag inline-block px-3 py-1.5 text-[14px]">
                      {row.day.day} · {row.day.date}
                    </h3>
                  </div>
                ) : (
                  <>
                    <div
                      className={`mc-route-card mc-tooltip flex items-center gap-3 p-2.5 pr-4 ${row.slot.kind === "milestone" ? "mc-tooltip-gold" : ""}`}
                    >
                      <span className="mc-route-sticker">
                        <Sticker name={stickerFor(row.slot)} size={40} />
                      </span>
                      <div className="min-w-0">
                        <time className="mc-font block text-[14px] font-bold text-[var(--gold)] tabular-nums">{row.slot.time}</time>
                        <p className={`text-[15px] leading-snug ${row.slot.kind === "milestone" ? "font-bold" : "text-white/90"}`}>
                          {row.slot.activity}
                          {k && <span className="sr-only"> ({k.label})</span>}
                        </p>
                      </div>
                    </div>
                    {big && (
                      <span aria-hidden="true" className="mc-route-loot">
                        <Sticker name={stickerFor(row.slot)} size={72} className="mc-bob" />
                      </span>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ol>
        <p className="mc-font mt-10 text-center text-[12px] text-white/55">
          Animated stickers:{" "}
          <a
            href="https://googlefonts.github.io/noto-emoji-animation/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Noto Animated Emoji
          </a>{" "}
          by Google, CC BY 4.0
        </p>
      </div>
    </Section>
  );
}

/**
 * Criteria as tooltip plaques in the dark arch between the hall's two boards,
 * then the two judging rounds on stone pedestals.
 */
export function Judging() {
  return (
    <Section id="judging" tx="mc-photo bg-judging" wash="wash-40">
      <div className="mx-auto w-full max-w-[880px] px-4 sm:px-6">
        <Heading
          center
          index="06"
          label="Judging"
          title={
            <>
              How we <em>judge</em>
            </>
          }
        />

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {criteria.map((c, i) => (
            <li
              key={c.name}
              data-reveal
              style={delay(i * 70)}
              className={`mc-tooltip p-5 ${i === criteria.length - 1 && criteria.length % 2 ? "md:col-span-2" : ""}`}
            >
              <div className="flex items-center gap-4">
                <span className="mc-font text-4xl font-bold text-[var(--gold)] tabular-nums [text-shadow:3px_3px_0_rgb(0_0_0/0.6)]">
                  {c.weight}%
                </span>
                <h3 className="mc-tooltip-title text-[18px] leading-tight text-[#ffff7f]">{c.name}</h3>
              </div>
              <div className="mc-xp mt-3" role="presentation">
                <span className="bar-fill" style={{ width: `${(c.weight / 25) * 100}%` }} />
              </div>
              <p className="mt-3 text-[15px] text-white/80">{c.detail}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <div data-reveal className="mc-pedestal p-6 pt-0 text-center">
            <Item name="clock" size={48} className="mx-auto mt-5" />
            <p className="mc-font mt-3 text-[14px] font-bold tracking-[0.12em] text-[var(--gold)] uppercase">Round 1 · Table demos</p>
            <p className="mc-font mt-2 text-4xl font-bold">5 min + 2 min</p>
            <p className="mt-2 text-[15px] text-white/80">Judges visit each table for a 5-minute demo and a 2-minute Q&amp;A.</p>
          </div>
          <div data-reveal style={delay(100)} className="mc-pedestal p-6 pt-0 text-center">
            <Item name="star" size={48} className="mx-auto mt-5" />
            <p className="mc-font mt-3 text-[14px] font-bold tracking-[0.12em] text-[var(--gold)] uppercase">
              Final round · Top 8 teams
              <Tbc />
            </p>
            <p className="mc-font mt-2 text-4xl font-bold">4 min + 3 min</p>
            <p className="mt-2 text-[15px] text-white/80">Finalists pitch on stage: a 4-minute pitch and 3 minutes of Q&amp;A.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Mentor trades: what you bring, what you leave with (by mentorAreas order).
const trades: [ItemName, ItemName][] = [
  ["paper", "diamond"],
  ["spyglass", "painting"],
  ["map", "chest"],
  ["shears", "star"],
  ["shirt", "emerald"],
];

export function Judges() {
  return (
    <Section id="judges" tx="mc-photo bg-judges" wash="wash-40">
      <div className={container}>
        <Heading
          index="07"
          label="Judges"
          title={
            <>
              Meet the <em>judges</em>
            </>
          }
          intro="A balanced panel across technology, fashion business and design."
        />

        {/* Each judge is a guild banner hanging in the hall */}
        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {judges.map((j, i) => {
            const announced = j.name !== "To be announced";
            return (
              <li key={`${j.name}-${i}`} data-reveal style={delay(i * 70)} className="mc-banner-wrap">
                <div aria-hidden="true" className="mc-rod" />
                <div className={`mc-banner ${i % 2 ? "mc-banner-royal" : ""}`}>
                  <p className="mc-font text-center text-[12px] font-bold tracking-[0.2em] text-white/75">
                    JUDGE {String(i + 1).padStart(2, "0")}
                  </p>
                  <div className="mc-emblem mt-5">
                    <span className="mc-font text-4xl font-bold text-[var(--gold)] [text-shadow:3px_3px_0_rgb(0_0_0/0.45)]">
                      {announced ? initials(j.name) : "?"}
                    </span>
                  </div>
                  <h3 className="mc-font mt-7 text-center text-[16px] leading-tight font-bold">
                    {j.name}
                    <Tbc when={!j.confirmed} />
                  </h3>
                  <p className="mt-1 text-center text-[13px] leading-snug text-white/80">
                    {j.role} · {j.org}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <p data-reveal className="mc-font mt-10 text-[15px] tracking-[0.12em] text-white/75 uppercase">More judges to be announced</p>

        {/* Mentors: a villager trading screen */}
        <MentorsMotion>
          <div id="mentors" className="mt-24 grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-center lg:gap-14">
            <div>
              <Heading
                index="08"
                label="Mentors"
                title={
                  <>
                    Unstuck, <em>on call</em>
                  </>
                }
                intro="Mentors circulate through the night across five areas of expertise. Bring them what you're stuck on and trade it for a way forward, during mentor rounds or any time."
              />
              <div data-reveal className="mt-8 flex items-end gap-4">
                <Sprite src="villager" w={16} h={24} className="mc-villager h-auto w-[96px]" />
                <p className="mc-bubble-mini mc-font mb-16 text-[15px] font-bold">Hrmm!</p>
              </div>
              <a
                data-reveal
                href={`mailto:${event.contact.email}?subject=Mentoring%20at%20Hack%20the%20Fashion`}
                className="mc-btn mc-btn-grass mt-6"
              >
                Want to mentor? Write to us
              </a>
            </div>

            <div data-reveal className="mc-trade p-4 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="mc-gui-title">Mentor · Master</p>
                <div className="mc-xp w-32" role="presentation">
                  <span className="block h-full w-[78%]" />
                </div>
              </div>
              <ul className="mt-4 space-y-2.5">
                {mentorAreas.map((m, i) => {
                  const [cost, result] = trades[i % trades.length];
                  return (
                    <li key={m.area} className="mc-trade-row">
                      <span aria-hidden="true" className="mc-slot size-12 shrink-0">
                        <Item name={cost} size={30} />
                      </span>
                      <span aria-hidden="true" className="mc-trade-arrow">
                        <span className="mc-trade-fill" />
                      </span>
                      <span aria-hidden="true" className="mc-trade-result mc-slot size-12 shrink-0">
                        <Item name={result} size={30} />
                      </span>
                      <div className="min-w-0">
                        <p className="mc-gui-title text-[17px] leading-tight">{m.area}</p>
                        <p className="text-[14px] leading-snug text-[#3f3f3f]">{m.hint}</p>
                      </div>
                    </li>
                  );
                })}
                {/* Locked offer, like an out-of-stock trade */}
                <li className="mc-trade-row mc-trade-locked">
                  <span aria-hidden="true" className="mc-slot size-12 shrink-0">
                    <Item name="nametag" size={30} />
                  </span>
                  <span aria-hidden="true" className="mc-font text-2xl font-bold text-[#c43a3a]">✕</span>
                  <p className="mc-gui-title text-[16px]">
                    Mentor line-up revealed soon
                    <Tbc />
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </MentorsMotion>
      </div>
    </Section>
  );
}
