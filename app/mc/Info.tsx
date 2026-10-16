import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ClothsyMark } from "../components/ClothsyMark";
import { Instagram, LinkedIn, Mail, Phone } from "../components/Icons";
import { Tbc } from "../components/Tbc";
import { bring, eligibility, event, faqs, registrationOpen, rules, submission } from "../lib/event";
import { logos } from "../lib/logos";
import { RulesMotion, SubmissionMotion } from "./Motion";
import { container, delay, Heading, Item, McRegister, Section, Sprite, type ItemName } from "./ui";

/* ------------------------------------------------------------- Sponsors */
export function Sponsors() {
  const gets = ["Demo access to Clothsy AI", "Mentorship from the Clothsy AI team", "Internship interviews for top teams"];
  const tiers: {
    tier: string;
    note: string;
    item: ItemName;
    items: { name: string; logo: StaticImageData; href?: string; violet?: boolean; round?: boolean }[];
  }[] = [
    {
      tier: "Organised by",
      note: "AI Skills Lab CoE, part of KIET",
      item: "book",
      items: [
        { name: "AI Skills Lab CoE", logo: logos.aiSkillsLab, round: true },
        { name: "KIET Deemed to be University", logo: logos.kiet },
      ],
    },
    {
      tier: "Title sponsor",
      note: "Clothsy AI",
      item: "diamond",
      items: [{ name: "Clothsy AI", logo: logos.clothsy, href: event.clothsyUrl, violet: true }],
    },
    {
      tier: "Powered by",
      note: "FabricVTON",
      item: "emerald",
      items: [{ name: "FabricVTON", logo: logos.fabricvton, href: event.fabricvtonUrl }],
    },
    {
      tier: "Supporting partners",
      note: "Supporting the AI Skills Lab CoE",
      item: "star",
      items: [
        { name: "HP", logo: logos.hp, round: true },
        { name: "Intel", logo: logos.intel },
      ],
    },
  ];

  return (
    <Section id="sponsors" tx="mc-photo bg-sponsors" wash="wash-40">
      <div className={container}>
        <Heading
          center
          index="09"
          label="Title sponsor"
          title={
            <>
              Meet <em>Clothsy AI</em>
            </>
          }
        />

        {/* Clothsy hangs as the royal banner over the throne-room stairs */}
        <div data-reveal style={delay(80)} className="mc-banner-wrap mx-auto mt-10 max-w-[460px]">
          <div aria-hidden="true" className="mc-rod" />
          <div className="mc-banner mc-banner-royal px-8 pt-8 pb-20 text-center md:px-10">
            <Item name="diamond" size={40} className="mx-auto" />
            <Image src={logos.clothsy} alt="Clothsy AI" className="mx-auto mt-3 h-auto w-48" sizes="192px" />
            <p className="mc-font mt-5 text-2xl leading-tight font-bold [text-shadow:3px_3px_0_rgb(0_0_0/0.35)]">
              See it on you, before you buy.
            </p>
            <p className="mc-font mt-6 text-[13px] tracking-[0.15em] text-white/85 uppercase">
              What players get
              <Tbc />
            </p>
            <ul className="mt-3 space-y-2 text-left">
              {gets.map((g) => (
                <li key={g} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-[var(--gold)]">
                    ✦
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal style={delay(140)} className="mc-tooltip mx-auto mt-10 max-w-[760px] p-6 text-center md:p-8">
          <div className="mc-lead space-y-4 text-white/90">
            <p>
              Clothsy AI, by FabricVTON, builds AI-powered virtual try-on that lets shoppers see themselves in clothes before
              they buy, helping brands boost buyer confidence and reduce returns. Available on Shopify and WooCommerce.
            </p>
            <p>
              At Hack the Fashion, participants can explore virtual try-on and AI-driven fashion experiences, get mentorship
              from the Clothsy AI team, and compete for internship opportunities.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={event.clothsyUrl} target="_blank" rel="noopener noreferrer" className="mc-btn mc-btn-primary">
              Visit Clothsy AI ↗
            </a>
            <a href={event.fabricvtonUrl} target="_blank" rel="noopener noreferrer" className="mc-btn">
              Visit FabricVTON ↗
            </a>
          </div>
        </div>

        <h3 data-reveal className="mc-eyebrow mt-20 text-center">
          ▸ Sponsors &amp; partners
          <Tbc />
        </h3>
        {/* Every partner gets a stone pedestal on the steps */}
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t, ti) => (
            <div key={t.tier} data-reveal style={delay(ti * 80)} className="mc-pedestal flex flex-col p-4 pt-0">
              <div className="mt-4 flex items-center gap-3">
                <span className="mc-slot mc-slot-dark size-10 shrink-0">
                  <Item name={t.item} size={24} />
                </span>
                <div>
                  <p className="mc-font text-[16px] leading-tight font-bold text-[var(--gold)]">{t.tier}</p>
                  <p className="text-[13px] text-white/70">{t.note}</p>
                </div>
              </div>
              <ul className="mt-4 grid flex-1 gap-3" style={{ gridTemplateColumns: `repeat(${t.items.length}, minmax(0, 1fr))` }}>
                {t.items.map((it) => {
                  const inner = (
                    <Image
                      src={it.logo}
                      alt={it.name}
                      className={it.round ? "size-16" : "h-auto max-h-12 w-auto max-w-full object-contain"}
                      sizes={it.round ? "64px" : "200px"}
                    />
                  );
                  const box = `grid h-24 place-items-center px-3 shadow-[inset_3px_3px_0_#373737,inset_-3px_-3px_0_#fff] ${it.violet ? "bg-violet" : "bg-white"}`;
                  return (
                    <li key={it.name}>
                      {it.href ? (
                        <a href={it.href} target="_blank" rel="noopener noreferrer" className={`${box} transition-[filter] hover:brightness-110`}>
                          {inner}
                        </a>
                      ) : (
                        <div className={box}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div data-reveal className="mc-tooltip mt-10 flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mc-tooltip-title text-2xl text-[#ffff7f]">Put your brand in the room.</p>
            <p className="mt-1 text-[15px] text-white/80">
              250 builders, 24 hours, one jury that hires. Sponsorship tiers start at ₹5,000.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={event.brochureUrl} target="_blank" rel="noopener" className="mc-btn">
              Sponsor brochure (PDF) ↗
            </a>
            <a href={`mailto:${event.contact.email}?subject=Partnering%20with%20Hack%20the%20Fashion`} className="mc-btn mc-btn-grass">
              Become a partner
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- Rules */
const conduct = [
  "Be respectful and inclusive.",
  "Harassment of any kind is not tolerated.",
  "Look after the venue and equipment.",
  "Organisers may remove anyone who breaks these rules.",
];

/**
 * War-room board: eligibility as a checklist that ticks itself, the code of
 * conduct as moderator chat, and the rules as paper notes pinned to an oak
 * board. Motion in RulesMotion (GSAP).
 */
export function Rules() {
  return (
    <Section id="rules" tx="mc-photo bg-rules" wash="wash-55">
      <RulesMotion>
        <div className={container}>
          <Heading
            index="10"
            label="Rules"
            title={
              <>
                Play it <em>fair</em>
              </>
            }
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article data-reveal className="mc-tooltip p-6 md:p-8">
              <h3 className="mc-tooltip-title text-[20px] text-[#ffff7f] uppercase">
                Player requirements
                <Tbc />
              </h3>
              <ul className="mt-5 space-y-4">
                {eligibility.map((e) => (
                  <li key={e} className="flex gap-3.5">
                    <span aria-hidden="true" className="mc-check">
                      <span className="mc-tick">✔</span>
                    </span>
                    <span className="text-white/90">{e}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article id="code-of-conduct" data-reveal style={delay(120)} className="mc-chat p-6 md:p-8">
              <h3 className="mc-font text-[20px] font-bold text-white uppercase [text-shadow:2px_2px_0_rgb(0_0_0/0.6)]">
                Code of conduct
              </h3>
              <ul className="mc-font mt-5 space-y-2.5 text-[15px] leading-snug">
                {conduct.map((c) => (
                  <li key={c} className="mc-chat-line">
                    <span className="text-[#ff5555]">&lt;Moderator&gt;</span> <span className="text-white">{c}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          {/* Notes pinned to the board */}
          <div data-reveal className="mc-board mt-10 p-5 md:p-8">
            <h3 className="mc-font text-[20px] font-bold text-[#fcdc5f] uppercase [text-shadow:2px_2px_0_rgb(0_0_0/0.6)]">
              The rules
            </h3>
            <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {rules.map((r, i) => (
                <li key={r} className="mc-note" style={{ ["--tilt" as string]: `${[-2.5, 1.8, -1.2, 2.6][i % 4]}deg` }}>
                  <span aria-hidden="true" className="mc-pin" />
                  <span className="mc-font text-3xl font-bold text-[#8a3f22]">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2 text-[15px] leading-snug">
                    {r}
                    {i === 5 && <Tbc />}
                  </p>
                </li>
              ))}
            </ol>
            <Link href="/terms" className="mc-btn mc-btn-wood mt-8">
              Read the full Terms &amp; Conditions ▸
            </Link>
          </div>
        </div>
      </RulesMotion>
    </Section>
  );
}

/* ----------------------------------------------------------- Submission */
const submissionItems: ItemName[] = ["diamond", "chest", "painting", "book", "paper"];

/**
 * Redstone circuit through the forge: a signal runs along the wire, lighting
 * each deliverable's lamp in turn, and ends in the crafted project.
 * Motion in SubmissionMotion (GSAP); without it every lamp is simply lit.
 */
export function Submission() {
  return (
    <Section id="submission" tx="mc-photo bg-submission" wash="wash-40">
      <SubmissionMotion>
        <div className={container}>
          <Heading
            center
            index="11"
            label="Submission"
            title={
              <>
                Ship it before the <em>freeze</em>
              </>
            }
            intro="Each team must submit all five items before code freeze. Power every lamp and you've crafted a project."
          />
          <div data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <p className="mc-badge text-[17px]">Code freeze · 3 Nov · 10:00 AM IST</p>
            <p className="mc-lead text-[15px]">
              Platform: Devfolio / Unstop / Google Form
              <Tbc />
            </p>
          </div>

          <div className="mc-circuit relative mt-14">
            <div aria-hidden="true" className="mc-wire">
              <span className="mc-wire-on" />
            </div>
            <ol className="relative grid gap-6 lg:grid-cols-5 lg:gap-4">
              {submission.map((st, i) => (
                <li key={st.title} data-on="" className="mc-lamp-card">
                  <span aria-hidden="true" className="mc-lamp">
                    <Item name={submissionItems[i]} size={36} className="mc-lamp-item" />
                  </span>
                  <div className="flex-1 bg-black/60 px-4 py-3 lg:mt-4 lg:w-full lg:text-center">
                    <p className="mc-font text-[12px] tracking-[0.2em] text-[#ff7a7a] uppercase">Item {i + 1} of 5</p>
                    <h3 className="mc-font mt-1 text-[17px] leading-tight font-bold [text-shadow:2px_2px_0_rgb(0_0_0/0.5)]">
                      {st.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-snug text-white/80">{st.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mc-crafted mx-auto mt-12 flex max-w-[420px] items-center gap-5 p-5">
            <span className="mc-slot size-20 shrink-0">
              <Item name="shirt" size={52} />
            </span>
            <div>
              <p className="mc-font text-[12px] tracking-[0.2em] text-[#80e030] uppercase">Output</p>
              <p className="mc-font text-[22px] font-bold text-[#ffff7f] [text-shadow:2px_2px_0_rgb(0_0_0/0.6)]">Project crafted!</p>
              <p className="text-[14px] text-white/80">All five in by code freeze to enter judging.</p>
            </div>
          </div>
        </div>
      </SubmissionMotion>
    </Section>
  );
}

/* ---------------------------------------------------------------- Venue */
// Hotbar icons for the bring list, in its order.
const bringIcons: ItemName[] = ["laptop", "plug", "socket", "nametag", "soap"];

/**
 * Campus gate at sunset: the map hangs as a map item in an oak item frame
 * with a waypoint pin bobbing over it; beside it a waypoint card and the
 * kit list as a hotbar whose selector steps across the slots.
 */
export function Venue() {
  const mapQuery = encodeURIComponent("KIET Group of Institutions, Ghaziabad");
  return (
    <Section id="venue" tx="mc-photo bg-venue" wash="wash-40">
      <div className={container}>
        <Heading
          center
          index="12"
          label="Venue"
          title={
            <>
              AI Skills Lab, <em>KIET</em>
            </>
          }
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-12">
          <div data-reveal className="relative">
            <Sprite src="pin" w={12} h={16} className="mc-bob absolute -top-12 left-1/2 z-10 h-auto w-12 -translate-x-1/2" />
            <div className="mc-frame">
              <div className="mc-map">
                <iframe
                  title="Map showing KIET Group of Institutions, Ghaziabad"
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-[360px] w-full border-0 bg-[#d9c79a] [filter:sepia(0.35)_saturate(0.85)] md:h-[440px]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div data-reveal style={delay(80)} className="mc-tooltip p-5">
              <p className="mc-tooltip-title text-[13px] tracking-[0.15em] text-[#ffff7f] uppercase">Waypoint · Venue</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="grid h-16 shrink-0 place-items-center bg-white px-3 shadow-[inset_3px_3px_0_#373737,inset_-3px_-3px_0_#fff]">
                  <Image src={logos.kiet} alt="KIET Group of Institutions" className="h-11 w-auto" sizes="120px" />
                </span>
                <p className="text-[15px] leading-snug text-white/90">
                  {event.address}
                  <Tbc />
                </p>
              </div>
              <h3 className="mc-font mt-5 text-[14px] font-bold tracking-[0.12em] text-[var(--gold)] uppercase">
                How to reach
                <Tbc />
              </h3>
              <p className="mt-1.5 text-[15px] text-white/80">
                Metro, bus and parking details will be shared with shortlisted teams. Use the map for directions in the meantime.
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mc-btn mc-btn-primary mt-5"
              >
                Open in Google Maps ↗
              </a>
            </div>

            <div data-reveal style={delay(160)}>
              <h3 className="mc-eyebrow">Pack your inventory</h3>
              <ul className="mc-hotbar mt-3">
                <li aria-hidden="true" className="mc-hotbar-sel" />
                {bring.map((x, i) => (
                  <li key={x} className="mc-hotbar-slot">
                    <Item name={bringIcons[i] ?? "chest"} size={32} />
                    <span className="sr-only">{x}</span>
                  </li>
                ))}
              </ul>
              <ol aria-hidden="true" className="mt-3 grid grid-cols-5 gap-1 text-center text-[12px] leading-tight text-white/85 [text-shadow:1px_1px_0_rgb(0_0_0/0.8)]">
                {bring.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ FAQ */
export function Faq() {
  return (
    <Section id="faq" tx="mc-photo bg-faq" wash="wash-55">
      <div className={`${container} grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14`}>
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Heading
            index="13"
            label="FAQ"
            title={
              <>
                Questions, <em>answered</em>
              </>
            }
            intro={
              <>
                Still curious?{" "}
                <a href={`mailto:${event.contact.email}`} className="font-semibold text-[var(--gold)] underline underline-offset-4">
                  Email us
                </a>
                .
              </>
            }
          />
        </div>
        <div className="mc-faq space-y-2">
          {faqs.map((f, i) => (
            <details key={f.q} name="faq" data-reveal style={delay(Math.min(i, 6) * 40)}>
              <summary className="mc-font flex items-center justify-between gap-6 px-5 py-4 text-[17px] font-semibold [text-shadow:2px_2px_0_rgb(0_0_0/0.5)]">
                {f.q}
                <span aria-hidden="true" className="mc-caret text-[var(--gold)]">
                  ▾
                </span>
              </summary>
              <p className="mc-tx tx-deepslate wash-40 border-3 border-t-0 border-[#1f1f1f] px-5 py-4 text-white/85 shadow-[inset_0_4px_10px_rgb(0_0_0/0.5)] [--b:32px]">
                {f.a}
                <Tbc when={f.tbc} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------- Final CTA */
export function FinalCta() {
  return (
    <>
      <div className="mc-seam" aria-hidden="true" />
      <section id="register" className="mc-night relative overflow-hidden px-4 pt-28 pb-[calc(var(--b)*2+80px)] text-center sm:px-6">
        <div data-reveal className="relative z-10 mx-auto max-w-4xl">
          <p className="mc-eyebrow">
            ▸ {event.dates} · {event.venueShort}
          </p>
          <h2 className="mc-h2 mt-6 text-[clamp(34px,6vw,68px)]">
            Don&apos;t just imagine the future of fashion. <em>Build it.</em>
          </h2>
          {registrationOpen ? (
            <>
              <p className="mc-lead mx-auto mt-6 max-w-xl">
                Applications are open on Unstop. Registrations close on {event.registrationDeadline}.
                <Tbc />
              </p>
              <McRegister className="mc-btn-lg mt-10">Register on Unstop ↗</McRegister>
            </>
          ) : (
            <>
              <p className="mc-lead mx-auto mt-6 max-w-xl">
                Applications open soon on Unstop. Registrations close on {event.registrationDeadline}.
                <Tbc />
              </p>
              <p className="mc-tooltip mc-font mt-10 inline-flex min-h-14 items-center gap-3 px-6 py-3 text-lg text-[#ffff7f]">
                <span className="pulse-dot size-2.5 shrink-0 bg-[var(--gold)]" aria-hidden="true" />
                Applications opening soon on Unstop
              </p>
              <p className="mc-lead mt-4 text-[14px]">
                Questions in the meantime?{" "}
                <a href={`mailto:${event.contact.email}`} className="underline underline-offset-4 hover:text-white">
                  {event.contact.email}
                </a>
              </p>
            </>
          )}
        </div>
        {/* Night meadow: sleeping sheep on a grass strip */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0">
          <div className="relative">
            {[
              ["sheep_white", "12%"],
              ["sheep_violet", "70%"],
              ["sheep_sage", "84%"],
            ].map(([src, left]) => (
              <Sprite key={src} src={src} w={16} h={11} className="absolute bottom-0 brightness-75" style={{ left, width: "calc(var(--b) * 1.25)", height: "auto" }} />
            ))}
          </div>
          <div className="mc-ground brightness-[0.6]" style={{ height: "calc(var(--b) * 2)" }} />
        </div>
      </section>
    </>
  );
}

/* --------------------------------------------------------------- Footer */
export function Footer() {
  const cols = [
    {
      title: "Event",
      links: [
        { href: "#about", label: "About" },
        { href: "#tracks", label: "Tracks" },
        { href: "#prizes", label: "Prizes" },
        { href: "#timeline", label: "Timeline" },
      ],
    },
    {
      title: "Info",
      links: [
        { href: "#rules", label: "Rules" },
        { href: "#code-of-conduct", label: "Code of Conduct" },
        { href: "#faq", label: "FAQ" },
        { href: "/terms", label: "Terms & Conditions" },
      ],
    },
  ];
  const c = event.contact;

  return (
    <footer className="mc-tx tx-bedrock wash-70 overflow-hidden">
      <div className={`${container} py-16`}>
        {/* Advancement toast */}
        <div data-reveal className="mc-toast mb-14 ml-auto flex w-fit max-w-full items-center gap-4 border-3 border-[#111] bg-[#212121] px-4 py-3 shadow-[inset_3px_3px_0_#555,inset_-3px_-3px_0_#0a0a0a]">
          <Item name="shirt" size={32} />
          <div>
            <p className="mc-font text-[15px] text-[#ffff55]">Advancement Made!</p>
            <p className="mc-font text-[15px]">Hack the Fashion 2026</p>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center border-2 border-[#111] bg-violet text-white shadow-[inset_2px_2px_0_rgb(255_255_255/0.3),inset_-2px_-2px_0_rgb(0_0_0/0.35)]">
                <ClothsyMark className="size-5" />
              </span>
              <span className="mc-font text-2xl font-bold uppercase">Hack the Fashion</span>
            </a>
            <p className="mt-4 max-w-xs text-[15px] text-white/70">{event.theme}.</p>
            <p className="mt-4 text-[13px] text-white/60">
              Title sponsor Clothsy AI · Powered by FabricVTON · Supporting partners HP and Intel
            </p>
          </div>

          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mc-eyebrow">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/80 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="mc-eyebrow">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-white/80">
              <li>
                <a href={`mailto:${c.email}`} className="flex items-center gap-2.5 hover:text-white">
                  <Mail className="size-4" /> {c.email}
                </a>
              </li>
              <li>
                <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 hover:text-white">
                  <Phone className="size-4" /> {c.phone}
                </a>
                <Tbc when={c.tbc} />
              </li>
              <li>
                <a href={c.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-white">
                  <Instagram className="size-4" /> Instagram
                </a>
              </li>
              <li>
                <a href={c.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-white">
                  <LinkedIn className="size-4" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t-2 border-white/15 pt-6 text-[13px] text-white/60 sm:flex-row sm:justify-between">
          <p>Organised by the {event.organiser}</p>
          <p>© 2026 Hack the Fashion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
