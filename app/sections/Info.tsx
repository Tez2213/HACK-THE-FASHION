import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { logos } from "../lib/logos";
import { ClothsyMark, PoweredBadge } from "../components/ClothsyMark";
import { ArrowRight, ArrowUpRight, Check, Instagram, LinkedIn, Mail, Phone, Pin } from "../components/Icons";
import { SectionHeading } from "../components/SectionHeading";
import { Tbc } from "../components/Tbc";
import { RegisterButton } from "../components/RegisterButton";
import { bring, eligibility, event, faqs, registrationOpen, rules, submission } from "../lib/event";
import { container, section } from "./Intro";

export function PoweredBy() {
  const gets = [
    "Demo access to Clothsy AI",
    "Mentorship from the Clothsy AI team",
    "Internship interviews for top teams",
  ];
  const tiers: {
    tier: string;
    note: string;
    span: string;
    items: { name: string; logo?: StaticImageData; href?: string; violet?: boolean; round?: boolean }[];
  }[] = [
    {
      tier: "Organised by",
      note: "AI Skills Lab CoE, part of KIET",
      span: "lg:col-span-2",
      items: [
        { name: "AI Skills Lab CoE", logo: logos.aiSkillsLab, round: true },
        { name: "KIET Deemed to be University", logo: logos.kiet },
      ],
    },
    {
      tier: "Title sponsor",
      note: "Clothsy AI",
      span: "",
      items: [{ name: "Clothsy AI", logo: logos.clothsy, href: event.clothsyUrl, violet: true }],
    },
    {
      tier: "Powered by",
      note: "FabricVTON",
      span: "",
      items: [{ name: "FabricVTON", logo: logos.fabricvton, href: event.fabricvtonUrl }],
    },
    {
      tier: "Supporting partners",
      note: "Supporting the AI Skills Lab CoE",
      span: "lg:col-span-2",
      items: [
        { name: "HP", logo: logos.hp, round: true },
        { name: "Intel", logo: logos.intel },
      ],
    },
  ];



  return (
    <section id="sponsors" className={`on-dark ${section} pattern-grid-dark bg-forest text-linen`}>
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              dark
              index="09"
              label="Title sponsor"
              title={
                <>
                  Meet <span className="accent">Clothsy AI</span>
                </>
              }
            />
            <div data-reveal className="mt-6 space-y-4 text-linen/85" style={{ ["--reveal-delay" as string]: "80ms" }}>
              <p>
                Clothsy AI, by FabricVTON, builds AI-powered virtual try-on that lets shoppers see
                themselves in clothes before they buy, helping brands boost buyer confidence and
                reduce returns. Available on Shopify and WooCommerce.
              </p>
              <p>
                At Hack the Fashion, participants can explore virtual try-on and AI-driven fashion
                experiences, get mentorship from the Clothsy AI team, and compete for internship
                opportunities.
              </p>
            </div>
            <div data-reveal className="mt-8 flex flex-wrap gap-3" style={{ ["--reveal-delay" as string]: "140ms" }}>
              <a href={event.clothsyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-ghost-light">
                Visit Clothsy AI <ArrowUpRight className="size-4" />
              </a>
              <a href={event.fabricvtonUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-ghost-light">
                Visit FabricVTON <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          <div data-reveal style={{ ["--reveal-delay" as string]: "120ms" }} className="lg:pt-10">
            {/* The one place violet is allowed to be big */}
            <div className="cut-lg bg-violet p-8 text-white md:p-10">
              <Image src={logos.clothsy} alt="Clothsy AI" className="-ml-4 h-auto w-48" sizes="192px" />
              <p className="mt-6 font-display text-3xl leading-tight font-semibold">
                See it on you,
                <br />
                before you buy.
              </p>
              <p className="label mt-8 text-white/80">
                What participants get
                <Tbc />
              </p>
              <ul className="mt-4 space-y-2.5">
                {gets.map((g) => (
                  <li key={g} className="flex gap-2.5">
                    <Check className="mt-0.5 size-5 shrink-0" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <p data-reveal className="label text-sage">
            Sponsors &amp; partners
            <Tbc />
          </p>
          <div className="mt-6 grid gap-8 lg:grid-cols-6 lg:gap-6">
            {tiers.map((t, ti) => (
              <div key={t.tier} data-reveal className={t.span} style={{ ["--reveal-delay" as string]: `${ti * 80}ms` }}>
                <p className="text-[14px] font-medium text-linen/70">{t.tier}</p>
                <ul className="mt-3 grid gap-3" style={{ gridTemplateColumns: `repeat(${t.items.length}, minmax(0, 1fr))` }}>
                  {t.items.map((it) => {
                    const inner = it.logo ? (
                      <Image
                        src={it.logo}
                        alt={it.name}
                        className={it.round ? "size-20" : "h-auto max-h-14 w-auto max-w-full object-contain"}
                        sizes={it.round ? "80px" : "200px"}
                      />
                    ) : (
                      <span className="text-[14px] font-medium text-moss/70">{it.name}</span>
                    );
                    const box = `cut-md grid h-28 place-items-center px-5 ${it.violet ? "bg-violet" : "bg-white"}`;
                    return (
                      <li key={it.name}>
                        {it.href ? (
                          <a href={it.href} target="_blank" rel="noopener noreferrer" className={`${box} transition-transform hover:-translate-y-0.5`}>
                            {inner}
                          </a>
                        ) : (
                          <div className={box}>{inner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-2 text-[13px] text-linen/60">{t.note}</p>
              </div>
            ))}
          </div>
          <div data-reveal className="cut-md mt-10 flex flex-col gap-5 border-l-2 border-terracotta-light bg-forest-deep/60 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-2xl font-semibold">Put your brand in the room.</p>
              <p className="mt-1 text-[15px] text-linen/75">
                250 builders, 24 hours, one jury that hires. Sponsorship tiers start at ₹5,000.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={event.brochureUrl} target="_blank" rel="noopener" className="btn btn-ghost btn-ghost-light">
                Sponsor brochure (PDF) <ArrowUpRight className="size-4" />
              </a>
              <a
                href={`mailto:${event.contact.email}?subject=Partnering%20with%20Hack%20the%20Fashion`}
                className="btn btn-ghost btn-ghost-light"
              >
                Become a partner <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Rules() {
  return (
    <section id="rules" className={section}>
      <div className={container}>
        <SectionHeading
          index="10"
          label="Rules"
          title={
            <>
              Play it <span className="accent">fair</span>
            </>
          }
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.6fr]">
          <div className="flex flex-col gap-4">
            <div data-reveal className="cut-md bg-white p-8">
              <h3 className="h3">
                Eligibility
                <Tbc />
              </h3>
              <ul className="mt-5 space-y-3 text-moss">
                {eligibility.map((e) => (
                  <li key={e} className="flex gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-forest" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div id="code-of-conduct" data-reveal className="on-dark cut-md bg-forest p-8 text-linen" style={{ ["--reveal-delay" as string]: "80ms" }}>
              <h3 className="h3">Code of Conduct</h3>
              <p className="mt-4 text-linen/85">
                Be respectful and inclusive. Harassment of any kind is not tolerated. Look after the
                venue and equipment. Organisers may remove anyone who breaks these rules.
              </p>
            </div>
          </div>

          <div data-reveal className="cut-md bg-white p-8" style={{ ["--reveal-delay" as string]: "120ms" }}>
            <h3 className="h3">Rules</h3>
            <ol className="mt-5 grid gap-x-10 md:grid-cols-2">
              {rules.map((r, i) => (
                <li key={r} className="flex gap-4 border-b border-forest/10 py-4">
                  <span className="font-mono text-sm font-semibold text-terracotta">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px]">
                    {r}
                    {i === 5 && <Tbc />}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Submission() {
  return (
    <section id="submission" className={`${section} bg-linen-dark/60`}>
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <SectionHeading
              index="11"
              label="Submission"
              title={
                <>
                  Ship it before the <span className="accent">freeze</span>
                </>
              }
              intro="Each team must submit all five items before code freeze."
            />
            <div data-reveal className="cut-md mt-8 inline-block bg-forest px-6 py-5 text-linen">
              <p className="label text-sage">Code freeze</p>
              <p className="mt-1 font-mono text-2xl font-semibold">3 Nov · 10:00 AM IST</p>
            </div>
            <p data-reveal className="mt-6 text-[15px] text-moss">
              Submission platform: Devfolio / Unstop / Google Form
              <Tbc />
            </p>
          </div>

          <ol className="space-y-3">
            {submission.map((s, i) => (
              <li
                key={s.title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                className="cut-md flex items-center gap-5 bg-white p-5 md:p-6"
              >
                <span className="cut-sm grid size-12 shrink-0 place-items-center bg-sage font-mono text-lg font-semibold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold">{s.title}</h3>
                  <p className="text-[15px] text-moss">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Venue() {
  const mapQuery = encodeURIComponent("KIET Group of Institutions, Ghaziabad");
  return (
    <section id="venue" className={section}>
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading
              index="12"
              label="Venue"
              title={
                <>
                  AI Skills Lab, <span className="accent">KIET</span>
                </>
              }
            />
            <div data-reveal className="cut-md mt-8 inline-block bg-white px-5 py-4">
              <Image src={logos.kiet} alt="KIET Group of Institutions" className="h-14 w-auto" sizes="140px" />
            </div>
            <p data-reveal className="mt-6 flex gap-3">
              <Pin className="mt-1 size-5 shrink-0 text-terracotta" />
              <span>
                {event.address}
                <Tbc />
              </span>
            </p>
            <div data-reveal className="mt-8">
              <h3 className="label text-moss">
                How to reach
                <Tbc />
              </h3>
              <p className="mt-2 text-[15px] text-moss">
                Metro, bus and parking details will be shared with shortlisted teams. Use the map
                for directions in the meantime.
              </p>
            </div>
            <div data-reveal className="mt-8">
              <h3 className="label text-moss">What to bring</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {bring.map((b) => (
                  <li key={b} className="chip">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <a
              data-reveal
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost mt-8"
            >
              Open in Google Maps <ArrowUpRight className="size-4" />
            </a>
          </div>

          <div data-reveal style={{ ["--reveal-delay" as string]: "100ms" }} className="cut-md min-h-[360px] bg-linen-dark">
            <iframe
              title="Map showing KIET Group of Institutions, Ghaziabad"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[360px] w-full border-0 [filter:sepia(0.25)_saturate(0.8)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className={`${section} bg-linen-dark/60`}>
      <div className={`${container} grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            index="13"
            label="FAQ"
            title={
              <>
                Questions, <span className="accent">answered</span>
              </>
            }
            intro={
              <>
                Still curious?{" "}
                <a href={`mailto:${event.contact.email}`} className="font-medium text-violet underline underline-offset-4">
                  Email us
                </a>
                .
              </>
            }
          />
        </div>
        <div className="faq space-y-2">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              name="faq"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${Math.min(i, 6) * 40}ms` }}
              className="cut-md bg-white"
            >
              <summary className="flex items-center justify-between gap-6 px-6 py-5 text-[17px] font-semibold">
                {f.q}
                <svg viewBox="0 0 20 20" className="size-5 shrink-0 text-violet" aria-hidden="true">
                  <path d="M3 10h14" stroke="currentColor" strokeWidth="2" />
                  <path className="faq-icon-v origin-center" d="M10 3v14" stroke="currentColor" strokeWidth="2" />
                </svg>
              </summary>
              <p className="px-6 pb-6 text-moss">
                {f.a}
                <Tbc when={f.tbc} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="register" className="px-4 py-[var(--section-pad)] sm:px-6">
      <div
        data-reveal
        className="on-dark cut-lg pattern-grid-dark relative mx-auto max-w-[var(--container)] overflow-hidden bg-forest px-6 py-20 text-center text-linen md:px-16 md:py-28"
      >
        <p className="label text-sage">{event.dates} · {event.venueShort}</p>
        <h2 className="display-xl mx-auto mt-6 max-w-4xl text-balance">
          Don&apos;t just imagine the future of fashion. <span className="accent">Build it.</span>
        </h2>
        {registrationOpen ? (
          <>
            <p className="mx-auto mt-6 max-w-xl text-linen/80">
              Applications are open on Unstop. Registrations close on {event.registrationDeadline}.
              <Tbc />
            </p>
            <RegisterButton className="mt-10 min-h-14 px-8 text-base">
              Register on Unstop <ArrowUpRight className="size-4" />
            </RegisterButton>
          </>
        ) : (
          <>
            <p className="mx-auto mt-6 max-w-xl text-linen/80">
              Applications open soon on Unstop. Registrations close on{" "}
              {event.registrationDeadline}.
              <Tbc />
            </p>
            <p className="cut-sm mt-10 inline-flex min-h-14 items-center gap-3 bg-linen/10 px-6 py-3 font-semibold text-balance sm:px-8">
              <span className="pulse-dot size-2 shrink-0 bg-terracotta-light" aria-hidden="true" />
              Applications opening soon on Unstop
            </p>
            <p className="mt-4 text-[14px] text-linen/70">
              Questions in the meantime?{" "}
              <a href={`mailto:${event.contact.email}`} className="underline underline-offset-4 hover:text-linen">
                {event.contact.email}
              </a>
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    {
      title: "Event",
      links: [
        { href: "/#about", label: "About" },
        { href: "/#tracks", label: "Tracks" },
        { href: "/#prizes", label: "Prizes" },
        { href: "/#timeline", label: "Timeline" },
      ],
    },
    {
      title: "Info",
      links: [
        { href: "/#rules", label: "Rules" },
        { href: "/#code-of-conduct", label: "Code of Conduct" },
        { href: "/#faq", label: "FAQ" },
        { href: "/terms", label: "Terms & Conditions" },
      ],
    },
  ];
  const c = event.contact;

  return (
    <footer className="on-dark bg-forest-deep text-linen">
      <div className={`${container} py-16`}>
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div>
            <Link href="/#top" className="flex items-center gap-2.5">
              <span className="cut-sm grid size-9 place-items-center bg-linen text-forest">
                <ClothsyMark className="size-5" />
              </span>
              <span className="font-display text-2xl font-semibold">Hack the Fashion</span>
            </Link>
            <p className="mt-4 max-w-xs text-[15px] text-linen/70">{event.theme}.</p>
            <PoweredBadge className="mt-6" />
            <p className="mt-3 text-[13px] text-linen/60">
              Powered by FabricVTON · Supporting partners HP and Intel
            </p>
          </div>

          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="label text-sage">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-linen/80 hover:text-linen">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="label text-sage">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-linen/80">
              <li>
                <a href={`mailto:${c.email}`} className="flex items-center gap-2.5 hover:text-linen">
                  <Mail className="size-4" /> {c.email}
                </a>
              </li>
              <li>
                <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 hover:text-linen">
                  <Phone className="size-4" /> {c.phone}
                </a>
                <Tbc when={c.tbc} />
              </li>
              <li>
                <a href={c.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-linen">
                  <Instagram className="size-4" /> Instagram
                </a>
              </li>
              <li>
                <a href={c.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-linen">
                  <LinkedIn className="size-4" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-linen/15 pt-6 text-[13px] text-linen/60 sm:flex-row sm:justify-between">
          <p>Organised by the {event.organiser}</p>
          <p>© 2026 Hack the Fashion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
