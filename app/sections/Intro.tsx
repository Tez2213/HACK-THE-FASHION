import Image from "next/image";
import { Countdown } from "../components/Countdown";
import { ClothsyMark } from "../components/ClothsyMark";
import { HeroArt } from "../components/HeroArt";
import { ArrowRight, Check, TrackGlyph } from "../components/Icons";
import { SectionHeading } from "../components/SectionHeading";
import { Tbc } from "../components/Tbc";
import { RegisterButton } from "../components/RegisterButton";
import { logos } from "../lib/logos";
import { event, perks, prizes, specialAwards, stats, tracks } from "../lib/event";

export const container = "mx-auto w-full max-w-[var(--container)] px-4 sm:px-6";
export const section = "py-[var(--section-pad)]";

export function Hero() {
  const chips = [
    { text: event.dates },
    { text: event.venueShort },
    { text: "24 hours" },
    { text: `${event.prizePool} prize pool`, tbc: true },
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden="true" className="pattern-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className={`${container} relative grid items-center gap-12 pt-12 pb-20 md:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pb-28`}>
        <div>
          <p className="hero-in label flex flex-wrap items-center gap-2 text-forest">
            <span className="cut-sm grid size-6 place-items-center bg-violet text-white">
              <ClothsyMark className="size-3.5" />
            </span>
            Title sponsor Clothsy AI · Powered by FabricVTON
          </p>

          <h1 className="hero-in display-xl mt-6" style={{ ["--d" as string]: "60ms" }}>
            Hack the <span className="accent">fashion</span>
          </h1>

          <p className="hero-in mt-6 max-w-xl text-[17px] text-moss md:text-lg" style={{ ["--d" as string]: "120ms" }}>
            Reimagining fashion through AI, technology and innovation. A 24-hour hackathon to build
            the future of how the world shops, styles and dresses.
          </p>

          <ul className="hero-in mt-7 flex flex-wrap gap-2" style={{ ["--d" as string]: "180ms" }}>
            {chips.map((c) => (
              <li key={c.text} className="chip">
                {c.text}
                <Tbc when={c.tbc} />
              </li>
            ))}
          </ul>

          <div className="hero-in mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: "240ms" }}>
            <RegisterButton>
              Register now <ArrowRight className="size-4" />
            </RegisterButton>
            <a href="#tracks" className="btn btn-ghost">
              View tracks
            </a>
          </div>

          <div className="hero-in mt-10 max-w-xl" style={{ ["--d" as string]: "300ms" }}>
            <Countdown />
          </div>
        </div>

        <div className="hero-in relative mx-auto w-full max-w-[520px]" style={{ ["--d" as string]: "160ms" }}>
          <HeroArt />
          {/* Floating try-on readouts */}
          <div className="cut-sm absolute top-[14%] -left-3 bg-white px-4 py-3 shadow-[0_1px_0_rgb(47_74_58/0.15)] sm:-left-8">
            <p className="label text-moss">Fit match</p>
            <p className="font-mono text-2xl leading-tight font-semibold">
              97<span className="text-terracotta">%</span>
            </p>
          </div>
          <div className="cut-sm absolute -right-2 bottom-[12%] flex items-center gap-3 bg-forest px-4 py-3 text-linen sm:-right-6">
            <span className="pulse-dot size-2 bg-sage" aria-hidden="true" />
            <div>
              <p className="label text-sage">Try-on rendered</p>
              <p className="font-mono text-sm font-semibold">Size M · Regular · 2.4s</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Who's behind the event: organiser, title sponsor, powered by, supporting partners. */
export function PartnerStrip() {
  const tile = "cut-sm flex h-16 items-center justify-center bg-white px-4";
  return (
    <section aria-label="Organiser, sponsors and partners" className="border-y border-forest/10 bg-white/50">
      <div className={`${container} grid grid-cols-2 gap-x-4 gap-y-6 py-8 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr] lg:gap-6`}>
        <div className="col-span-2 lg:col-span-1">
          <p className="label text-moss">Organised by</p>
          <div className="mt-3 flex gap-2">
            <div className={tile}>
              <Image src={logos.aiSkillsLab} alt="AI Skills Lab CoE" className="size-14" sizes="56px" />
            </div>
            <div className={`${tile} flex-1`}>
              <Image src={logos.kiet} alt="KIET Deemed to be University" className="h-10 w-auto" sizes="120px" />
            </div>
          </div>
          <p className="mt-2 text-[13px] text-moss">AI Skills Lab CoE, KIET</p>
        </div>
        <div>
          <p className="label text-moss">Title sponsor</p>
          <a
            href={event.clothsyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cut-sm mt-3 flex h-16 items-center justify-center bg-violet px-4 transition-colors hover:bg-violet-deep"
          >
            <Image src={logos.clothsy} alt="Clothsy AI" className="h-11 w-auto" sizes="130px" />
          </a>
          <p className="mt-2 text-[13px] text-moss">See yourself in every outfit.</p>
        </div>
        <div>
          <p className="label text-moss">Powered by</p>
          <a href={event.fabricvtonUrl} target="_blank" rel="noopener noreferrer" className={`${tile} mt-3`}>
            <Image src={logos.fabricvton} alt="FabricVTON" className="h-8 w-auto" sizes="130px" />
          </a>
          <p className="mt-2 text-[13px] text-moss">Virtual try-on technology</p>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <p className="label text-moss">Supporting partners</p>
          <div className="mt-3 flex gap-2">
            <div className={`${tile} flex-1`}>
              <Image src={logos.hp} alt="HP" className="size-11" sizes="44px" />
            </div>
            <div className={`${tile} flex-1`}>
              <Image src={logos.intel} alt="Intel" className="h-8 w-auto" sizes="90px" />
            </div>
          </div>
          <p className="mt-2 text-[13px] text-moss">Supporting the AI Skills Lab CoE</p>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className={`${section} border-t border-forest/10`}>
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            index="01"
            label="About"
            title={
              <>
                Fashion is evolving. The <span className="accent">tools</span> haven&apos;t caught up.
              </>
            }
          />
          <div data-reveal className="space-y-5 text-moss lg:pt-12" style={{ ["--reveal-delay" as string]: "80ms" }}>
            <p>
              Online shoppers still can&apos;t see how clothes will look on them before they buy.
              Brands struggle with product discovery, personalisation, size-related returns,
              inventory planning and waste from overproduction.
            </p>
            <p className="text-forest">
              Hack the Fashion brings together developers, designers and fashion minds for 24 hours
              to build working prototypes that make fashion more personalised, accessible, efficient
              and sustainable.
            </p>
            <p className="text-[15px]">
              Organised by the AI Skills Lab CoE at KIET, with supporting partners HP and Intel.
              Title sponsor Clothsy AI, powered by FabricVTON, sets the fashion-AI challenges.
            </p>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-3 md:mt-20 lg:grid-cols-4 lg:gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              className="cut-md flex flex-col-reverse bg-white p-6 md:p-8"
            >
              <dt className="mt-2 text-[15px] text-moss">
                {s.label}
                <Tbc when={s.tbc} />
              </dt>
              <dd className="font-display text-5xl leading-none font-semibold text-terracotta md:text-6xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Tracks() {
  return (
    <section id="tracks" className={`${section} bg-linen-dark/60`}>
      <div className={container}>
        <SectionHeading
          index="02"
          label="The challenge"
          title={
            <>
              Build what fashion <span className="accent">needs</span> next
            </>
          }
          intro="Use AI, machine learning, computer vision, AR, web or app development, data analytics, or any technology that fits. Pick a track, or bring your own idea."
        />

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t, i) => (
            <li
              key={t.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}
              className="group cut-md flex flex-col bg-white p-8 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <span className="cut-sm grid size-12 place-items-center bg-linen text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-linen">
                  <TrackGlyph icon={t.icon} className="size-6" />
                </span>
                <span className="font-mono text-sm font-semibold text-moss">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="h3 mt-6">{t.title}</h3>
              <p className="mt-2 text-moss">{t.description}</p>
              <div className="seam mt-6 mb-4" />
              <p className="label text-moss">Example ideas</p>
              <ul className="mt-3 space-y-1.5 text-[15px]">
                {t.ideas.map((idea) => (
                  <li key={idea} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 bg-terracotta" />
                    {idea}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-4 bg-forest p-[1.5px] cut-md">
          <div className="cut-md flex flex-col gap-4 bg-linen px-8 py-7 md:flex-row md:items-center md:justify-between" style={{ ["--cut-md" as string]: "19px" }}>
            <div>
              <p className="label text-terracotta">07 · Open innovation</p>
              <p className="mt-2 text-lg font-medium">
                Have an idea that doesn&apos;t fit a track? Any original solution to a real fashion
                problem is welcome.
              </p>
            </div>
            <RegisterButton variant="secondary" className="shrink-0">
              Pitch your idea <ArrowRight className="size-4" />
            </RegisterButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Prizes() {
  return (
    <section id="prizes" className={section}>
      <div className={container}>
        <SectionHeading
          index="03"
          label="Prizes"
          title={
            <>
              {event.prizePool} in <span className="accent">prizes</span> and opportunities
              <Tbc />
            </>
          }
        />

        <ol className="mt-12 grid gap-4 md:grid-cols-3 md:items-end">
          {prizes.map((p, i) => (
            <li
              key={p.place}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              className={`cut-md p-8 ${
                p.winner
                  ? "on-dark order-first bg-forest text-linen md:order-none md:pt-14 md:pb-14"
                  : "bg-white"
              }`}
            >
              <p className={`label flex items-center gap-2 ${p.winner ? "text-sage" : "text-moss"}`}>
                <span aria-hidden="true" className="text-xl not-italic">{p.medal}</span>
                {p.place}
              </p>
              <p
                className={`mt-4 font-display font-semibold leading-none ${
                  p.winner ? "text-6xl text-terracotta-light md:text-7xl" : "text-5xl text-terracotta"
                }`}
              >
                {p.cash}
                <Tbc />
              </p>
              <ul className={`mt-6 space-y-2 text-[15px] ${p.winner ? "text-linen/90" : "text-moss"}`}>
                {p.extras.map((x) => (
                  <li key={x} className="flex gap-2">
                    <Check className={`mt-0.5 size-4 shrink-0 ${p.winner ? "text-sage" : "text-forest"}`} />
                    {x}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div data-reveal>
            <h3 className="h3">
              Special awards
              <Tbc />
            </h3>
            <ul className="mt-4 divide-y divide-forest/15 border-y border-forest/15">
              {specialAwards.map((a) => (
                <li key={a.award} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="font-medium">
                    {a.award}
                    {a.by && <span className="ml-2 text-sm text-violet">{a.by}</span>}
                  </span>
                  <span className="text-[15px] text-moss sm:text-right">{a.prize}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
            <h3 className="h3">For every participant</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {perks.map((p) => (
                <li key={p} className="chip">
                  {p}
                  {p === "Swag kit" && <Tbc />}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
