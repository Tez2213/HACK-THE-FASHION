import { Fragment, type ReactNode } from "react";
import { Tbc } from "../components/Tbc";
import type { TrackIcon } from "../lib/event";
import { event, prizes, REGISTER_URL, registrationOpen, specialAwards, stats, tracks } from "../lib/event";
import { McCountdown } from "./McCountdown";
import { container, delay, Heading, Item, McRegister, Section, Sprite, type ItemName } from "./ui";

const b = (n: number) => `calc(var(--b) * ${n})`;

/* ----------------------------------------------------------------- Hero */
// Sparks rise either side of the coder (lefts are relative to the beacon).
const sparks = [
  { left: "-70%", delay: "0s", color: "#fcdc5f" },
  { left: "150%", delay: "-0.8s", color: "#b9a9ff" },
  { left: "-40%", delay: "-1.6s", color: "#ffffff" },
  { left: "125%", delay: "-2.2s", color: "#fcdc5f" },
  { left: "-95%", delay: "-1.1s", color: "#b9a9ff" },
  { left: "175%", delay: "-2.7s", color: "#ffffff" },
];
const kw = (t: string) => <span className="text-[#b9a9ff]">{t}</span>;
const code: ReactNode[] = [
  <Fragment key="1">{kw("const")} look = scan(user);</Fragment>,
  <Fragment key="2">{kw("const")} fit = tryOn(look);</Fragment>,
  <Fragment key="3">
    {kw("if")} (fit.score {">"} 0.95) {"{"}
  </Fragment>,
  <Fragment key="4">
    {"  "}ship(<span className="text-[var(--gold)]">&quot;Hack the Fashion&quot;</span>);
  </Fragment>,
  <Fragment key="5">{"}"}</Fragment>,
  <span key="6" className="text-white/45">
    {"// 24h to build ▸"}
  </span>,
];

/**
 * Giant block wordmark over the amethyst-cave backdrop, with a coder
 * typing on a Clothsy laptop atop a beacon whose beam shoots up through the
 * letters. Below: slanted date bars, an F3-style status panel, and the tailor
 * who walks on to flip a "Join now" sign.
 */
export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[min(100svh,1100px)] flex-col overflow-hidden bg-[#0d0a16]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[url(/mc/bg/hero.webp)] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(13_10_22/0.75),transparent_28%,transparent_65%,rgb(13_10_22/0.85))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_52%_at_50%_60%,rgb(95_37_255/0.42),transparent_70%)]" />
        <Sprite
          src="rings"
          w={64}
          h={64}
          className="absolute top-[40%] -left-[180px] h-auto w-[384px] opacity-30 md:-left-[110px]"
        />
        <Sprite
          src="rings"
          w={64}
          h={64}
          className="absolute top-[14%] -right-[150px] hidden h-auto w-[256px] opacity-15 lg:block"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-4 pt-28 pb-10 sm:px-6 xl:pb-[150px]">
        <h1 className="hero-in text-center">
          <span className="mc-font block text-[clamp(18px,2.6vw,36px)] font-bold tracking-[0.4em] text-[var(--gold)] uppercase [text-shadow:3px_3px_0_rgb(0_0_0/0.5)]">
            Hack the
          </span>
          <span className="mc-wordmark mc-font block text-[20vw] leading-[0.82] font-bold uppercase sm:text-[17vw] xl:text-[min(17vw,280px)]">
            Fashion
          </span>
        </h1>

        {/* On xl: beacon centred, status panel in the right column, bars underneath. */}
        <div className="xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-end">
          {/* Coder on the beacon */}
          <div
            className="hero-in relative z-10 mx-auto -mt-[3vw] w-[min(44vw,220px)] xl:col-start-2 xl:row-start-1 xl:-mt-[150px] xl:w-[240px]"
            style={{ ["--d" as string]: "120ms" }}
          >
            <span className="mc-coder relative z-10 mx-auto block aspect-square w-[78%]" />
            <div className="relative mx-auto w-[36%]">
              <span aria-hidden="true" className="mc-beam" />
              {sparks.map((sp) => (
                <span
                  key={sp.left}
                  aria-hidden="true"
                  className="mc-spark z-20"
                  style={{ left: sp.left, animationDelay: sp.delay, background: sp.color }}
                />
              ))}
              <Sprite
                src="beacon"
                w={16}
                h={16}
                className="relative z-10 h-auto w-full drop-shadow-[0_0_24px_rgb(122_76_255/0.8)]"
              />
            </div>
            <div aria-hidden="true" className="mx-auto flex w-[84%]">
              {[0, 1, 2].map((i) => (
                <span key={i} className="mc-tx tx-gold aspect-square flex-1 [--b:100%]" />
              ))}
            </div>
            {/* Floating editor where the code types itself out */}
            <div
              aria-hidden="true"
              className="mc-ide absolute top-[30%] right-[calc(100%+28px)] hidden w-[300px] xl:block"
            >
              <p className="mc-ide-bar mc-font">try-on.ts</p>
              <pre className="mc-font px-4 py-3 text-[13px] leading-[22px] text-white/90">
                {code.map((line, i) => (
                  <span key={i} className="mc-ide-line" style={{ animationDelay: `${i * 0.9}s` }}>
                    {line}
                  </span>
                ))}
              </pre>
            </div>
          </div>

          {/* Slanted info bars */}
          <div
            className="hero-in relative z-20 mt-4 flex flex-col gap-2 [filter:drop-shadow(0_8px_0_rgb(0_0_0/0.4))] sm:flex-row sm:justify-center sm:gap-3 xl:col-span-3 xl:row-start-2 xl:mt-3"
            style={{ ["--d" as string]: "200ms" }}
          >
            <p className="mc-slant mc-font bg-violet px-9 py-3.5 text-center text-[clamp(18px,2.1vw,28px)] font-bold tracking-[0.12em] uppercase [text-shadow:3px_3px_0_rgb(0_0_0/0.35)]">
              {event.dates}
            </p>
            <p className="mc-slant mc-tx tx-wool mc-font px-9 py-3.5 text-center text-[clamp(14px,1.45vw,20px)] leading-tight font-bold tracking-[0.08em] text-[#1f1a2e] uppercase [--b:32px] sm:content-center">
              24-hour in-person hackathon at {event.venueShort}
            </p>
          </div>

          <JoinWalker />

          {/* Status panel, styled like the F3 debug screen */}
          <aside
            aria-label="Event status"
            className="hero-in relative z-10 mx-auto mt-8 w-full max-w-[360px] border-2 border-white/15 bg-black/55 p-5 backdrop-blur-sm xl:col-start-3 xl:row-start-1 xl:-mt-10 xl:w-[300px] xl:justify-self-end"
            style={{ ["--d" as string]: "260ms" }}
          >
            <p className="mc-font flex justify-between text-[12px] tracking-[0.2em] text-white/50 uppercase">
              <span>HTF 2026 // F3</span>
              <span className="text-[var(--gold)]">● {registrationOpen ? "Online" : "Loading"}</span>
            </p>
            <p className="mc-font mt-3 text-[30px] leading-none font-bold uppercase [text-shadow:3px_3px_0_rgb(0_0_0/0.5)]">
              {registrationOpen ? "Registrations" : "Applications"}
              <span className="block text-[var(--gold)]">{registrationOpen ? "are open" : "open soon"}</span>
            </p>
            <div className="mt-4">
              <McCountdown compact />
            </div>
            <McRegister className="mt-4 w-full" />
            <dl className="mc-font mt-4 grid grid-cols-[auto_1fr] gap-x-3 text-[12px] leading-5 text-white/55 xl:hidden">
              <dt>Seed</dt>
              <dd>HTF-2026</dd>
              <dt>Biome</dt>
              <dd>{event.venueShort}</dd>
              <dt>Players</dt>
              <dd>250 builders · 24 hours</dd>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

/**
 * The tailor walks in, raises a sign, flips it to "Join now", lowers it and
 * walks off, on a loop. On phones it sits under the date bars; on xl it walks
 * along the bottom edge of the hero, over whatever is there. Pure CSS;
 * decorative, since every Register button already leads to the same place.
 */
function JoinWalker() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative z-30 -mx-4 mt-6 h-[240px] overflow-hidden sm:-mx-6 md:h-[290px] xl:absolute xl:bottom-0 xl:left-1/2 xl:mx-0 xl:mt-0 xl:w-screen xl:-translate-x-1/2"
    >
      <div className="mc-ground absolute inset-x-0 bottom-0 h-[var(--b)]" />
      <div className="mc-walker absolute bottom-[var(--b)]">
        <a
          href={REGISTER_URL}
          tabIndex={-1}
          className="mc-walker-banner pointer-events-auto"
          {...(registrationOpen ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <span className="mc-walker-card">
            <span className="mc-walker-face mc-tx tx-wool [--b:24px]">
              <span className="mc-font text-[15px] leading-tight font-bold tracking-[0.12em] text-[#2b1d10] uppercase md:text-[18px]">
                Hack the
                <br />
                Fashion
              </span>
            </span>
            <span className="mc-walker-face mc-walker-back">
              <span className="mc-font text-[30px] leading-none font-bold uppercase [text-shadow:3px_3px_0_rgb(0_0_0/0.4)] md:text-[38px]">
                Join now ▸
              </span>
              <span className="mc-font mt-1.5 text-[12px] tracking-[0.15em] text-white/85 uppercase">{event.dates}</span>
            </span>
          </span>
        </a>
        <span className="mc-walker-walk" />
        <Sprite src="tailor_hold" w={18} h={28} className="mc-walker-hold" />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- About */
const statIcons: ItemName[] = ["clock", "book", "emerald", "heart"];
// Amethyst motes drifting up off the open book.
const motes = [
  { left: "8%", delay: "0s" },
  { left: "22%", delay: "-2.1s" },
  { left: "41%", delay: "-3.7s" },
  { left: "58%", delay: "-1.2s" },
  { left: "76%", delay: "-4.4s" },
  { left: "91%", delay: "-2.9s" },
];

/** Professor who waves a pointer at the pages while a speech bubble walks through them. */
function Guide() {
  const lines = [
    "Welcome, player! Here's your quest.",
    "Page 1: the problem fashion still has.",
    "Page 2: your quest log. 24h, 6 tracks.",
    `The loot? ${event.prizePool} and internships.`,
  ];
  return (
    <div data-reveal aria-hidden="true" className="order-last flex flex-col items-start gap-4 self-end lg:order-first">
      <div className="mc-bubble mc-font grid max-w-[240px] text-[15px] leading-snug font-semibold">
        {lines.map((l, i) => (
          <span key={l} className="mc-bubble-line" style={{ animationDelay: `${i * 4}s` }}>
            {l}
          </span>
        ))}
      </div>
      <span className="mc-prof block shrink-0" />
    </div>
  );
}

export function About() {
  return (
    <Section id="about" tx="mc-photo bg-about" wash="wash-40">
      <div className={container}>
        <Heading
          index="01"
          label="About"
          title={
            <>
              Fashion is evolving. The <em>tools</em> haven&apos;t caught up.
            </>
          }
        />

        {/* Professor stands bottom-left, pointing his stick at an open spellbook */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[230px_1fr] lg:gap-4">
          <Guide />
          <div data-reveal className="mc-grimoire">
            {motes.map((m) => (
              <span key={m.left} aria-hidden="true" className="mc-mote" style={{ left: m.left, animationDelay: m.delay }} />
            ))}
            <span aria-hidden="true" className="mc-ribbon" />
            <div className="mc-spread">
          <article className="mc-page mc-page-left px-7 py-9 md:px-10 md:py-11">
            <h3 className="text-2xl font-bold uppercase">The problem</h3>
            <p className="mt-4 leading-relaxed">
              Online shoppers still can&apos;t see how clothes will look on them before they buy. Brands struggle with
              product discovery, personalisation, size-related returns, inventory planning and waste from
              overproduction.
            </p>
            <p className="mt-4 leading-relaxed font-medium">
              Hack the Fashion brings together developers, designers and fashion minds for 24 hours to build working
              prototypes that make fashion more personalised, accessible, efficient and sustainable.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#5a4428]">
              Organised by the AI Skills Lab CoE at KIET, with supporting partners HP and Intel. Title sponsor Clothsy
              AI, powered by FabricVTON, sets the fashion-AI challenges.
            </p>
            <p className="mc-font mt-8 text-right text-[13px] text-[#7a5d33]">Page 1 of 2</p>
          </article>

          <article className="mc-page mc-page-right px-7 py-9 md:px-10 md:py-11">
            <h3 className="text-2xl font-bold uppercase">Quest log</h3>
            <dl className="mt-6 grid grid-cols-2 gap-x-3 gap-y-5">
              {stats.map((s, i) => (
                <div key={s.label} className="flex flex-col-reverse items-start gap-1">
                  <dt className="text-[15px] text-[#5a4428]">
                    {s.label}
                    <Tbc when={s.tbc} />
                  </dt>
                  <dd className="flex items-center gap-3">
                    <span className="mc-slot size-10 shrink-0 sm:size-12">
                      <Item name={statIcons[i]} size={28} />
                    </span>
                    <span className="mc-font text-[26px] font-bold text-[#8a3f22] sm:text-4xl md:text-5xl lg:text-[30px] xl:text-4xl">
                      {s.value}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 border-t-2 border-dashed border-[#c9b88c] pt-5 text-[15px] leading-relaxed">
              Objective: build something real for how the world shops, styles and dresses. Reward: cash, internships and
              a room full of people who get it.
            </p>
            <p className="mc-font mt-6 text-right text-[13px] text-[#7a5d33]">Page 2 of 2</p>
          </article>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- Tracks */
const trackItems: Record<TrackIcon, ItemName> = {
  tryon: "shirt",
  discovery: "spyglass",
  design: "shears",
  fit: "tape",
  sustain: "sapling",
  brands: "chest",
};

// Desktop flip times (s): when the rider stops on each sign. She rides row 1
// left to right, drops to row 2 and rides back, then leaves; see .mc-rider.
const flipAt = [1.4, 3.1, 4.8, 9.8, 8.1, 6.4];

/**
 * Oak sign hanging from a log beam by two chains. It starts blank and turns
 * over to show its content (on desktop when the rider lands on it).
 */
function HangingSign({ flip, children, className = "" }: { flip: number; children: ReactNode; className?: string }) {
  return (
    <div data-reveal className={`mc-sign-wrap ${className}`} style={{ ["--flip" as string]: `${flip}s` }}>
      <div
        aria-hidden="true"
        className="mc-tx tx-log -mx-3 h-3 [--b:16px] shadow-[inset_0_2px_0_rgb(255_255_255/0.16),inset_0_-2px_0_rgb(0_0_0/0.4)]"
      />
      <div className="mc-sign-hang mc-sign-chains mt-8 h-[calc(100%-44px)]">
        <div className="mc-sign-inner h-full">
          <div className="mc-sign mc-sign-front h-full p-6">{children}</div>
          <div aria-hidden="true" className="mc-sign mc-sign-back" />
        </div>
      </div>
    </div>
  );
}

export function Tracks() {
  return (
    <Section id="tracks" tx="mc-photo bg-tracks" wash="wash-40">
      <div className={container}>
        <Heading
          index="02"
          label="The challenge"
          title={
            <>
              Build what fashion <em>needs</em> next
            </>
          }
          intro="Use AI, machine learning, computer vision, AR, web or app development, data analytics, or any technology that fits. Pick a track, or bring your own idea."
        />

        <ul data-reveal className="mc-tracks relative mt-14 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t, i) => (
            <li key={t.title}>
              <HangingSign className="h-full" flip={flipAt[i]}>
                <div className="flex items-center justify-between">
                  <span className="mc-slot size-14">
                    <Item name={trackItems[t.icon]} size={36} />
                  </span>
                  <span className="mc-font text-sm font-bold tracking-[0.15em] text-[#5a3d1c]">
                    TRACK {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mc-font mt-4 text-[22px] leading-tight font-bold uppercase">{t.title}</h3>
                <div className="mt-2 h-[3px] bg-[#7a5d33]" aria-hidden="true" />
                <p className="mt-3 font-medium">{t.description}</p>
                <ul className="mt-4 space-y-1.5 text-[15px]">
                  {t.ideas.map((idea) => (
                    <li key={idea} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 bg-[#8a3f22]" />
                      {idea}
                    </li>
                  ))}
                </ul>
              </HangingSign>
            </li>
          ))}
          {/* Unicorn rider who lands on each sign in turn (desktop only) */}
          <li aria-hidden="true" className="mc-rider" />
        </ul>

        <HangingSign className="mc-tracks-extra mt-12" flip={12.6}>
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="mc-slot size-14 shrink-0">
                <Item name="star" size={36} />
              </span>
              <div>
                <p className="mc-font text-sm font-bold tracking-[0.15em] text-[#5a3d1c]">TRACK 07 · OPEN INNOVATION</p>
                <p className="mt-1 text-lg font-semibold">
                  Have an idea that doesn&apos;t fit a track? Any original solution to a real fashion problem is welcome.
                </p>
              </div>
            </div>
            <McRegister className="mc-btn-wood shrink-0">Pitch your idea</McRegister>
          </div>
        </HangingSign>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- Prizes */
const podium = [
  { tx: "tx-iron", blocks: 3, color: "#e6e6e6", rank: "2" },
  { tx: "tx-gold", blocks: 4, color: "#fcdc5f", rank: "1" },
  { tx: "tx-copper", blocks: 2, color: "#f0a27e", rank: "3" },
];
const awardIcons: ItemName[] = ["shirt", "sapling", "painting", "book"];

export function Prizes() {
  return (
    <Section id="prizes" tx="mc-photo bg-prizes" wash="wash-20" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgb(122_76_255/0.35),transparent_60%)]"
      />
      <div className={`${container} relative`}>
        <Heading
          center
          index="03"
          label="Prizes"
          title={
            <>
              {event.prizePool} in <em>prizes</em>
              <Tbc />
            </>
          }
          intro="Cash, internship interviews with Clothsy AI and FabricVTON, and special awards for standout builds."
        />

        {/* Each prize floats on its own sky island; the winner's rides highest */}
        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:items-end md:gap-6">
          {prizes.map((p, i) => {
            const pod = podium[i];
            return (
              <li
                key={p.place}
                data-reveal
                style={delay([150, 0, 300][i])}
                className={`flex flex-col ${p.winner ? "order-first md:order-none md:-translate-y-10" : ""}`}
              >
                <div className="mc-bob flex flex-col" style={{ animationDelay: `${i * -1.1}s`, animationDuration: "4s" }}>
                  <div className={`mc-tooltip px-6 py-5 ${p.winner ? "mc-tooltip-gold md:pb-7" : ""}`}>
                    <p className="mc-tooltip-title text-[15px] tracking-[0.12em] uppercase" style={{ color: pod.color }}>
                      {p.place}
                    </p>
                    <p
                      className={`mc-font mt-2 leading-none font-bold [text-shadow:3px_3px_0_rgb(0_0_0/0.6)] ${p.winner ? "text-6xl" : "text-5xl"}`}
                    >
                      {p.cash}
                      <Tbc />
                    </p>
                    <ul className="mt-4 space-y-1.5 text-[15px] text-[#b9a9ff]">
                      {p.extras.map((x) => (
                        <li key={x} className="flex gap-2">
                          <span aria-hidden="true">✦</span>
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Rank block standing on a floating island, with a waterfall off the edge */}
                  <div aria-hidden="true" className="mc-isle mt-6">
                    <div
                      className={`mc-tx ${pod.tx} relative z-10 grid place-items-center border-2 border-black/50`}
                      style={{ width: b(3), height: `max(var(--b), ${b(pod.blocks)} * var(--tall, 0))` }}
                    >
                      <span className="mc-font text-5xl font-bold text-white [text-shadow:3px_3px_0_rgb(0_0_0/0.6)]">
                        {pod.rank}
                      </span>
                    </div>
                    <Sprite src="island" w={52} h={26} className="-mt-1 h-auto w-[min(100%,calc(var(--b)*6))]" />
                    <span className="mc-fall" />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mx-auto mt-20 max-w-[760px]">
          <h3 data-reveal className="mc-font text-center text-2xl font-bold uppercase [text-shadow:2px_2px_0_rgb(0_0_0/0.5)]">
            Special awards
            <Tbc />
          </h3>
          {/* Advancement toasts */}
          <ul className="mt-6 space-y-3">
            {specialAwards.map((a, i) => (
              <li key={a.award} data-reveal style={delay(i * 90)} className="mc-toast mc-from-right">
                <span className="mc-slot mc-slot-dark size-12 shrink-0">
                  <Item name={awardIcons[i % awardIcons.length]} size={30} />
                </span>
                <div className="min-w-0">
                  <p className="mc-font text-[12px] tracking-[0.1em] text-[#d77bff] uppercase">Award unlocked!</p>
                  <p className="mc-font text-[17px] leading-tight font-bold text-[#ffff7f]">
                    {a.award}
                    {a.by && <span className="ml-2 text-[13px] font-normal text-[#b9a9ff]">{a.by}</span>}
                  </p>
                </div>
                <p className="col-span-2 text-[15px] text-white/85 sm:col-span-1 sm:text-right">{a.prize}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
