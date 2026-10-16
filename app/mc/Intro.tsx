import type { ReactNode } from "react";
import { Tbc } from "../components/Tbc";
import type { TrackIcon } from "../lib/event";
import { event, prizes, REGISTER_URL, registrationOpen, specialAwards, stats, tracks } from "../lib/event";
import { McCountdown } from "./McCountdown";
import { AboutMotion, TracksMotion } from "./Motion";
import { container, delay, Heading, Item, McRegister, Section, Sprite, type ItemName } from "./ui";

const b = (n: number) => `calc(var(--b) * ${n})`;

/* ----------------------------------------------------------------- Hero */
// Rotating yellow splash text, like the title screen's.
const splashes = ["24 hours of code!", "Now with virtual try-on!", `${event.prizePool} in loot!`, "Also try FabricVTON!", "Made at KIET!"];
// Amethyst motes drifting up the cave.
const motes = [6, 14, 23, 31, 44, 57, 66, 74, 83, 92];

/**
 * Minecraft title screen: the cave backdrop pans slowly like the menu
 * panorama, the FASHION logo drops in block by block with a splash text
 * pulsing on its corner, then menu buttons and the countdown. The tailor
 * walks on along the bottom to flip a "Join now" sign. Fills the screen.
 */
export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0d0a16]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="mc-panorama" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(13_10_22/0.7),rgb(13_10_22/0.15)_30%,rgb(13_10_22/0.3)_70%,rgb(13_10_22/0.85))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_45%_at_50%_45%,rgb(95_37_255/0.35),transparent_70%)]" />
        {motes.map((left, i) => (
          <span key={left} className="mc-firefly" style={{ left: `${left}%`, animationDelay: `${i * -1.3}s` }} />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center px-4 pt-28 pb-[270px] sm:px-6 md:pb-[320px] lg:pb-[calc(var(--b)*2)]">
        <h1 className="relative text-center">
          <span className="hero-in mc-font block text-[clamp(16px,2.4vw,32px)] font-bold tracking-[0.45em] text-[var(--gold)] uppercase [text-shadow:3px_3px_0_rgb(0_0_0/0.5)]">
            Hack the
          </span>
          <span className="mc-font block text-[19vw] leading-[0.85] font-bold uppercase sm:text-[15vw] lg:text-[min(12.5vw,200px)]">
            {"FASHION".split("").map((ch, i) => (
              <span key={i} className="mc-wordmark mc-drop inline-block" style={{ animationDelay: `${120 + i * 70}ms` }}>
                {ch}
              </span>
            ))}
          </span>
          {/* Splash text, pinned to the logo's corner */}
          <span aria-hidden="true" className="mc-splash mc-font">
            {splashes.map((t, i) => (
              <span key={t} className="mc-splash-line" style={{ animationDelay: `${i * 3}s` }}>
                {t}
              </span>
            ))}
          </span>
        </h1>
        <p
          className="hero-in mc-font mt-4 text-center text-[clamp(13px,1.4vw,18px)] tracking-[0.12em] text-white/90 uppercase [text-shadow:2px_2px_0_rgb(0_0_0/0.6)]"
          style={{ ["--d" as string]: "600ms" }}
        >
          {event.dates} · 24-hour in-person hackathon at {event.venueShort}
        </p>

        {/* Title-screen menu */}
        <nav
          aria-label="Get started"
          className="hero-in mt-8 grid w-full max-w-[440px] gap-3"
          style={{ ["--d" as string]: "750ms" }}
        >
          <McRegister className="mc-btn-lg w-full" />
          <a href="#tracks" className="mc-btn mc-btn-lg w-full">
            Explore the tracks
          </a>
          <div className="grid grid-cols-2 gap-3">
            <a href="#schedule" className="mc-btn w-full">
              Schedule
            </a>
            <a href="#sponsors" className="mc-btn w-full">
              Sponsor us
            </a>
          </div>
        </nav>
        <div
          className="hero-in mt-5 w-full max-w-[440px] border-2 border-white/15 bg-black/55 p-4 backdrop-blur-sm"
          style={{ ["--d" as string]: "900ms" }}
        >
          <p className="mc-font mb-2 flex justify-between text-[12px] tracking-[0.15em] uppercase">
            <span className="text-white/70">{registrationOpen ? "Registrations are open" : "Applications open soon"}</span>
            <span className="text-[#80e030]">● 250 slots</span>
          </p>
          <McCountdown compact />
        </div>
      </div>

      {/* Version and credit strings in the corners, above the ground */}
      <p
        aria-hidden="true"
        className="mc-font absolute bottom-[calc(var(--b)+10px)] left-4 z-20 hidden text-[13px] text-white/80 [text-shadow:2px_2px_0_rgb(0_0_0/0.7)] lg:block"
      >
        Hack the Fashion 2026
      </p>
      <p
        aria-hidden="true"
        className="mc-font absolute right-4 bottom-[calc(var(--b)+10px)] z-20 hidden text-[13px] text-white/80 [text-shadow:2px_2px_0_rgb(0_0_0/0.7)] lg:block"
      >
        AI Skills Lab · KIET · Clothsy AI
      </p>

      <JoinWalker />
    </section>
  );
}

/**
 * The tailor walks in, raises a sign, flips it to "Join now", lowers it and
 * walks off, on a loop, along the bottom of the hero (on desktop it stops
 * left of the menu instead of centre stage). Pure CSS;
 * decorative, since every Register button already leads to the same place.
 */
function JoinWalker() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[250px] overflow-hidden md:h-[300px]"
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

const problem = [
  "Online shoppers still can't see how clothes will look on them before they buy. Brands struggle with product discovery, personalisation, size-related returns, inventory planning and waste from overproduction.",
  "Hack the Fashion brings together developers, designers and fashion minds for 24 hours to build working prototypes that make fashion more personalised, accessible, efficient and sustainable.",
];

/**
 * Enchanted study: the problem on a rune panel whose text decodes out of the
 * enchanting-table alphabet, and the quest log as amethyst crystals that tilt,
 * count up and burst XP orbs. Motion lives in AboutMotion (GSAP).
 */
export function About() {
  return (
    <Section id="about" tx="mc-photo bg-about" wash="wash-40">
      <AboutMotion>
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

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
            <article data-reveal className="mc-runepanel p-7 md:p-10">
              <div className="flex items-center gap-4">
                <span className="relative mc-slot mc-slot-dark size-14 shrink-0">
                  <Item name="book" size={34} className="mc-bob" />
                  {Array.from({ length: 10 }, (_, i) => (
                    <span key={i} aria-hidden="true" className="mc-glyph" />
                  ))}
                </span>
                <div>
                  <p className="mc-font text-[12px] tracking-[0.2em] text-[#d9c2ff] uppercase">Enchanted page · I</p>
                  <h3 className="mc-font text-2xl font-bold uppercase [text-shadow:2px_2px_0_rgb(0_0_0/0.5)]">The problem</h3>
                </div>
              </div>
              {problem.map((t, i) => (
                <p key={i} className={`mt-5 leading-relaxed ${i ? "font-semibold text-white" : "text-white/85"}`}>
                  <span className="sr-only">{t}</span>
                  {/* The invisible copy holds the final size while the glyphs decode on top */}
                  <span aria-hidden="true" className="grid">
                    <span className="invisible [grid-area:1/1]">{t}</span>
                    <span data-scramble className="overflow-hidden [overflow-wrap:anywhere] [grid-area:1/1]">
                      {t}
                    </span>
                  </span>
                </p>
              ))}
              <p className="mt-5 border-t-2 border-dashed border-white/15 pt-5 text-[15px] leading-relaxed text-[#cdbdf5]">
                Organised by the AI Skills Lab CoE at KIET, with supporting partners HP and Intel. Title sponsor Clothsy AI,
                powered by FabricVTON, sets the fashion-AI challenges.
              </p>
            </article>

            <div>
              <h3 data-reveal className="mc-font text-2xl font-bold uppercase [text-shadow:2px_2px_0_rgb(0_0_0/0.5)]">
                Quest log
              </h3>
              <dl className="mt-5 grid grid-cols-2 gap-4 [perspective:900px]">
                {stats.map((st, i) => (
                  <div key={st.label} data-reveal style={delay(i * 80)} className="mc-crystal flex flex-col-reverse p-5">
                    <dt className="mt-1 text-[14px] text-white/80">
                      {st.label}
                      <Tbc when={st.tbc} />
                    </dt>
                    <dd className="flex items-center justify-between gap-2">
                      <span data-count className="mc-font text-[30px] leading-none font-bold text-[var(--gold)] [text-shadow:3px_3px_0_rgb(0_0_0/0.55)] sm:text-4xl">
                        {st.value}
                      </span>
                      <Item name={statIcons[i]} size={32} className="drop-shadow-[0_0_8px_rgb(217_194_255/0.8)]" />
                    </dd>
                  </div>
                ))}
              </dl>
              <p data-reveal className="mc-tooltip mt-5 p-5 text-[15px] leading-relaxed text-white/85">
                <span className="mc-tooltip-title mr-2 text-[#ffff7f]">Objective:</span>
                build something real for how the world shops, styles and dresses. Reward: cash, internships and a room full
                of people who get it.
              </p>
            </div>
          </div>
        </div>
      </AboutMotion>
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

/**
 * Rune card under a crystal ledge. Starts sealed (an amethyst face) and
 * turns over to show the track; TracksMotion decides when.
 */
function RuneCard({ index, children }: { index: string; children: ReactNode }) {
  return (
    <>
      <div aria-hidden="true" className="mc-ledge" />
      <div className="mc-rune mt-5 h-[calc(100%-36px)]">
        <span aria-hidden="true" className="mc-rune-flash" />
        <div className="mc-rune-inner h-full">
          <div className="mc-rune-face mc-rune-front h-full p-6">{children}</div>
          <div aria-hidden="true" className="mc-rune-face mc-rune-back">
            <span className="mc-font text-5xl text-white/90 [text-shadow:4px_4px_0_rgb(40_10_80/0.6)]">ᔑ⍊ℸ</span>
            <span className="mc-font text-[13px] tracking-[0.25em] text-white/80 uppercase">Track {index} · Sealed</span>
          </div>
        </div>
      </div>
    </>
  );
}

export function Tracks() {
  return (
    <Section id="tracks" tx="mc-photo bg-tracks" wash="wash-40">
      <TracksMotion>
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

          <ul className="mc-runes relative mt-16 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:mt-36 lg:grid-cols-3 lg:gap-y-28">
            {tracks.map((t, i) => {
              const n = String(i + 1).padStart(2, "0");
              return (
                <li key={t.title} className="mc-rune-slot">
                  <RuneCard index={n}>
                    <div className="flex items-start justify-between">
                      <span className="mc-rune-item">
                        <Item name={trackItems[t.icon]} size={40} />
                      </span>
                      <span className="mc-font text-[40px] leading-none font-bold text-transparent [-webkit-text-stroke:2px_rgb(217_194_255/0.55)]">
                        {n}
                      </span>
                    </div>
                    <h3 className="mc-font mt-5 text-[21px] leading-tight font-bold uppercase [text-shadow:2px_2px_0_rgb(0_0_0/0.5)]">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-white/80">{t.description}</p>
                    <ul className="mt-4 space-y-1.5 text-[15px] text-white/90">
                      {t.ideas.map((idea) => (
                        <li key={idea} className="flex gap-2.5">
                          <span aria-hidden="true" className="text-[#d9c2ff]">
                            ✦
                          </span>
                          {idea}
                        </li>
                      ))}
                    </ul>
                  </RuneCard>
                </li>
              );
            })}
            {/* Unicorn rider, steered by TracksMotion on desktop */}
            <li aria-hidden="true" className="mc-rider" />
          </ul>

          <div className="mc-rune-slot mc-rune-extra mt-12">
            <RuneCard index="07">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <span className="mc-rune-item shrink-0">
                    <Item name="star" size={40} />
                  </span>
                  <div>
                    <p className="mc-font text-[13px] tracking-[0.15em] text-[#d9c2ff] uppercase">Track 07 · Open innovation</p>
                    <p className="mt-1 text-lg font-semibold">
                      Have an idea that doesn&apos;t fit a track? Any original solution to a real fashion problem is welcome.
                    </p>
                  </div>
                </div>
                <McRegister className="shrink-0">Pitch your idea</McRegister>
              </div>
            </RuneCard>
          </div>
        </div>
      </TracksMotion>
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
