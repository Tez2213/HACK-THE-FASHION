import { LinkedIn, Mail } from "../components/Icons";
import { SectionHeading } from "../components/SectionHeading";
import { Tbc } from "../components/Tbc";
import { Timeline } from "../components/Timeline";
import { criteria, event, judges, mentorAreas, schedule, type SlotKind } from "../lib/event";
import { container, section } from "./Intro";

export function TimelineSection() {
  return (
    <section id="timeline" className={`${section} bg-linen-dark/60`}>
      <div className={container}>
        <SectionHeading
          index="04"
          label="Timeline"
          title={
            <>
              Key <span className="accent">dates</span>
            </>
          }
        />
        <Timeline />
      </div>
    </section>
  );
}

const kindStyle: Record<SlotKind, { label: string; swatch: string }> = {
  milestone: { label: "Milestone", swatch: "bg-violet" },
  meal: { label: "Food", swatch: "bg-sage" },
  mentor: { label: "Mentors", swatch: "bg-forest" },
  checkpoint: { label: "Checkpoint", swatch: "bg-terracotta" },
  judging: { label: "Judging", swatch: "bg-moss" },
  fun: { label: "Fun", swatch: "bg-linen-dark border border-forest/40" },
};

export function Schedule() {
  return (
    <section id="schedule" className={section}>
      <div className={container}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="05"
            label="Schedule"
            title={
              <>
                24 hours, <span className="accent">mapped</span>
                <Tbc />
              </>
            }
          />
          <ul data-reveal aria-label="Legend" className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-moss">
            {Object.values(kindStyle).map((k) => (
              <li key={k.label} className="flex items-center gap-1.5">
                <span aria-hidden="true" className={`size-2.5 ${k.swatch}`} />
                {k.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {schedule.map((day, d) => (
            <article
              key={day.day}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${d * 90}ms` }}
              className="cut-md bg-white p-6 md:p-8"
            >
              <header className="flex items-baseline justify-between border-b border-forest pb-4">
                <h3 className="font-display text-3xl font-semibold">{day.day}</h3>
                <p className="label text-moss">{day.date}</p>
              </header>
              <ol>
                {day.slots.map((s) => {
                  const k = s.kind ? kindStyle[s.kind] : null;
                  const strong = s.kind === "milestone";
                  return (
                    <li
                      key={s.time + s.activity}
                      className="grid grid-cols-[88px_1fr] items-baseline gap-4 border-b border-forest/10 py-3 last:border-b-0"
                    >
                      <time className="font-mono text-[15px] font-semibold tabular-nums">{s.time}</time>
                      <span className={`flex items-center gap-2.5 ${strong ? "font-semibold" : ""}`}>
                        <span
                          aria-hidden="true"
                          className={`size-2.5 shrink-0 ${k ? k.swatch : "border border-forest/30"}`}
                        />
                        {s.activity}
                        {k && <span className="sr-only">({k.label})</span>}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Judging() {
  return (
    <section id="judging" className={`${section} bg-linen-dark/60`}>
      <div className={container}>
        <SectionHeading
          index="06"
          label="Judging"
          title={
            <>
              How we <span className="accent">judge</span>
            </>
          }
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div data-reveal>
            {/* Segmented overview — the whole score at a glance */}
            <div className="flex h-3 gap-[3px]" aria-hidden="true">
              {criteria.map((c, i) => (
                <div
                  key={c.name}
                  className={`bar-fill h-full ${i % 2 ? "bg-sage" : "bg-forest"}`}
                  style={{ width: `${c.weight}%`, ["--reveal-delay" as string]: `${i * 80}ms` }}
                />
              ))}
            </div>

            <ul className="mt-8 space-y-6">
              {criteria.map((c, i) => (
                <li key={c.name}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[17px] font-semibold">{c.name}</h3>
                    <span className="font-mono text-xl font-semibold text-terracotta">{c.weight}%</span>
                  </div>
                  <div className="mt-2 h-2 bg-linen-dark" role="presentation">
                    <div
                      className="bar-fill h-full bg-forest"
                      style={{ width: `${(c.weight / 25) * 100}%`, ["--reveal-delay" as string]: `${200 + i * 80}ms` }}
                    />
                  </div>
                  <p className="mt-2 text-[15px] text-moss">{c.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal style={{ ["--reveal-delay" as string]: "100ms" }}>
            <h3 className="h3">Judging process</h3>
            <ol className="mt-6 space-y-4">
              <li className="cut-md bg-white p-6">
                <p className="label text-terracotta">Round 1 · Table demos</p>
                <p className="mt-3 font-mono text-3xl font-semibold">
                  5<span className="text-lg text-moss">min</span> + 2<span className="text-lg text-moss">min</span>
                </p>
                <p className="mt-2 text-[15px] text-moss">
                  Judges visit each table for a 5-minute demo and a 2-minute Q&amp;A.
                </p>
              </li>
              <li className="on-dark cut-md bg-forest p-6 text-linen">
                <p className="label text-terracotta-light">
                  Final round · Top 8 teams
                  <Tbc />
                </p>
                <p className="mt-3 font-mono text-3xl font-semibold">
                  4<span className="text-lg text-linen/70">min</span> + 3<span className="text-lg text-linen/70">min</span>
                </p>
                <p className="mt-2 text-[15px] text-linen/80">
                  Finalists pitch on stage: a 4-minute pitch and 3 minutes of Q&amp;A.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
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

export function Judges() {
  return (
    <section id="judges" className={section}>
      <div className={container}>
        <SectionHeading
          index="07"
          label="Judges"
          title={
            <>
              Meet the <span className="accent">judges</span>
            </>
          }
          intro="A balanced panel across technology, fashion business and design."
        />

        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {judges.map((j, i) => {
            const announced = j.name !== "To be announced";
            return (
              <li key={`${j.name}-${i}`} data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <div
                  className={`cut-md pattern-grid relative grid aspect-square place-items-center ${announced ? "bg-sage" : "bg-linen-dark"}`}
                >
                  {announced ? (
                    <span className="font-display text-5xl font-semibold text-forest">{initials(j.name)}</span>
                  ) : (
                    <span className="font-display text-6xl text-forest/30 italic" aria-hidden="true">?</span>
                  )}
                  {j.linkedin && (
                    <a
                      href={j.linkedin}
                      className="cut-sm absolute right-3 bottom-3 grid size-9 place-items-center bg-white text-forest hover:text-violet"
                      aria-label={`${j.name} on LinkedIn`}
                    >
                      <LinkedIn className="size-4" />
                    </a>
                  )}
                </div>
                <h3 className={`mt-4 text-[17px] font-semibold ${announced ? "" : "text-moss"}`}>
                  {j.name}
                  <Tbc when={!j.confirmed} />
                </h3>
                <p className="text-[14px] text-moss">
                  {j.role} · {j.org}
                </p>
              </li>
            );
          })}
        </ul>
        <p data-reveal className="label mt-10 text-moss">More judges to be announced</p>
      </div>
    </section>
  );
}

export function Mentors() {
  return (
    <section id="mentors" className={`${section} pt-0`}>
      <div className={container}>
        <div className="seam mb-[var(--section-pad)]" />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <SectionHeading
              index="08"
              label="Mentors"
              title={
                <>
                  Unstuck, <span className="accent">on call</span>
                </>
              }
              intro="Mentors circulate through the night across five areas of expertise. Book them during mentor rounds or flag them down any time."
            />
            <a
              data-reveal
              href={`mailto:${event.contact.email}?subject=Mentoring%20at%20Hack%20the%20Fashion`}
              className="mt-6 inline-flex items-center gap-2 font-medium text-violet underline decoration-violet/40 underline-offset-4 hover:decoration-violet"
            >
              <Mail className="size-4" /> Want to mentor? Write to us
            </a>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {mentorAreas.map((m, i) => (
              <li
                key={m.area}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                className="cut-md flex flex-col justify-between gap-6 bg-white p-6"
              >
                <span className="font-mono text-sm font-semibold text-moss">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="chip">{m.area}</span>
                  <p className="mt-3 text-[15px] leading-snug text-moss">{m.hint}</p>
                </div>
              </li>
            ))}
            <li data-reveal className="cut-md flex items-end bg-forest p-6 text-linen" style={{ ["--reveal-delay" as string]: "300ms" }}>
              <p className="text-[15px]">
                Mentor line-up revealed soon
                <Tbc />
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
