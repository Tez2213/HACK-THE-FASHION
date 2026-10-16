import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ClothsyMark } from "../components/ClothsyMark";
import { ArrowRight } from "../components/Icons";
import { RegisterButton } from "../components/RegisterButton";
import { Tbc } from "../components/Tbc";
import { event } from "../lib/event";
import { Footer } from "../sections/Info";

export const metadata: Metadata = {
  title: "Terms & Conditions | Hack the Fashion 2026",
  description:
    "Terms and conditions for participating in Hack the Fashion 2026, a 24-hour AI × fashion hackathon at the AI Skills Lab, KIET.",
};

const LAST_UPDATED = "16 October 2026";
const email = event.contact.email;

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "about",
    title: "About these terms",
    body: (
      <>
        <p>
          These Terms &amp; Conditions (&ldquo;Terms&rdquo;) apply to everyone who registers for or
          takes part in Hack the Fashion 2026 (the &ldquo;Event&rdquo;), held on {event.dates} at the{" "}
          {event.venue}. The Event is organised by the AI Skills Lab CoE, KIET (the
          &ldquo;Organisers&rdquo;), with title sponsor Clothsy AI, powered by FabricVTON, and
          supporting partners HP and Intel.
        </p>
        <p>
          By registering, including through our application listing on Unstop, you confirm that
          you have read and agree to these Terms, the Rules and the Code of Conduct. If you
          register on behalf of a team, you confirm that every team member has agreed to them too.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    body: (
      <ul>
        <li>
          The Event is open to undergraduate and postgraduate students with a valid college ID,
          which must be shown at check-in.
          <Tbc />
        </li>
        <li>Teams must have 2 to 4 members. Each participant may belong to only one team.</li>
        <li>
          Participants under 18 must have consent from a parent or guardian to attend, including
          for the overnight portion of the Event.
        </li>
        <li>
          Organisers, judges and their immediate team members may not compete for prizes.
        </li>
      </ul>
    ),
  },
  {
    id: "registration",
    title: "Registration and selection",
    body: (
      <ul>
        <li>
          Applications are accepted only through the official Unstop listing linked from this
          website. Registrations close on {event.registrationDeadline}.
          <Tbc />
        </li>
        <li>
          Registration does not guarantee a place. The Organisers will shortlist teams and confirm
          selected teams by email. Selection decisions are final.
        </li>
        <li>
          You must provide accurate information. Places may be withdrawn if details are false or
          incomplete.
        </li>
        <li>Participation is free of charge.<Tbc /></li>
        <li>
          Places are not transferable. Team changes after shortlisting need written approval from
          the Organisers at <a href={`mailto:${email}`}>{email}</a>.
        </li>
      </ul>
    ),
  },
  {
    id: "conduct",
    title: "Conduct at the event",
    body: (
      <>
        <p>
          All participants, mentors, judges, volunteers and guests must follow the{" "}
          <Link href="/#code-of-conduct">Code of Conduct</Link>. Be respectful and inclusive. Harassment,
          discrimination or intimidation of any kind will not be tolerated.
        </p>
        <ul>
          <li>Follow all venue rules and instructions from KIET staff and the Organisers.</li>
          <li>
            Take care of the venue, equipment and network. You are responsible for any damage you
            cause.
          </li>
          <li>
            Alcohol, illegal substances and any dangerous items are not allowed at the venue.
          </li>
          <li>
            The Organisers may remove or disqualify anyone who breaches these Terms or the Code of
            Conduct, without prior warning.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "projects",
    title: "Projects and originality",
    body: (
      <ul>
        <li>
          All code must be written during the hackathon. You may plan ideas, research and designs
          in advance.
        </li>
        <li>
          You may use pre-trained models, open-source libraries, public APIs and frameworks, as
          long as you follow their licences and credit them in your submission.
        </li>
        <li>
          Projects must fit the theme of fashion and technology and must be submitted before code
          freeze (3 November 2026, 10:00 AM IST).
        </li>
        <li>
          Plagiarism, or submitting a previous or pre-built project, leads to disqualification.
        </li>
      </ul>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <>
        <p>
          <strong>Your team keeps full ownership of everything it builds.</strong> The Organisers
          do not claim any rights to your code, designs or ideas.
        </p>
        <p>
          By submitting, you give the Organisers a non-exclusive, royalty-free permission to show
          your project name, description, screenshots and demo video to promote the Event and
          showcase participants. This does not let anyone else use or sell your project.
        </p>
        <p>
          Demo access to Clothsy AI or other sponsor tools is governed by that provider&apos;s own
          terms. Access is for building your hackathon project only and may end after the Event.
        </p>
      </>
    ),
  },
  {
    id: "judging",
    title: "Judging and prizes",
    body: (
      <ul>
        <li>
          Projects are judged on the published criteria: innovation, technical execution, problem
          relevance, user experience and impact. The judges&apos; decision is final.
        </li>
        <li>
          Prize amounts and awards are listed on the website and may change before the Event.
          <Tbc />
        </li>
        <li>
          Cash prizes are paid by bank transfer to the team leader after the Event. Prize winners
          may need to provide identity and bank details. Splitting prizes within the team is the
          team&apos;s responsibility.
        </li>
        <li>Prizes are subject to any taxes that apply under Indian law.</li>
        <li>
          Internship interviews are opportunities to interview, not guaranteed offers.
        </li>
        <li>
          The Organisers may withhold or reclaim a prize if a team is found to have broken these
          Terms.
        </li>
      </ul>
    ),
  },
  {
    id: "media",
    title: "Photos and videos",
    body: (
      <p>
        Photos and videos will be taken during the Event. By attending, you agree that the
        Organisers, KIET and sponsors may use footage that includes you to report on and promote
        the Event. If you do not want to appear in featured photos, tell the registration desk at
        check-in.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Your data",
    body: (
      <>
        <p>
          We collect the details you give at registration (such as name, email, phone, college,
          course and dietary preference) to run the Event: selecting teams, contacting you,
          arranging meals and swag, and issuing certificates.
        </p>
        <p>
          We share your details only with the parties who need them to run the Event, such as the
          venue and, for prize winners and internship candidates, our title sponsor Clothsy AI and FabricVTON. We do
          not sell your data. Your application on Unstop is also covered by Unstop&apos;s own
          privacy policy.
        </p>
        <p>
          You can ask us to access, correct or delete your data at any time by writing to{" "}
          <a href={`mailto:${email}`}>{email}</a>.
        </p>
      </>
    ),
  },
  {
    id: "safety",
    title: "Health, safety and liability",
    body: (
      <ul>
        <li>
          You take part at your own risk. Look after your own belongings, including laptops and
          chargers. The Organisers and the venue are not responsible for lost, stolen or damaged
          items.
        </li>
        <li>
          Tell the Organisers about any medical condition or allergy that may need attention
          during the Event.
        </li>
        <li>
          To the extent permitted by law, the Organisers are not liable for any indirect loss
          arising from your participation.
        </li>
      </ul>
    ),
  },
  {
    id: "changes",
    title: "Changes and cancellation",
    body: (
      <p>
        The Organisers may change the schedule, venue, format, prizes or these Terms, or postpone
        or cancel the Event, if circumstances require it. We will tell registered participants by
        email and update this page. Because participation is free, no compensation is payable for
        changes or cancellation.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These Terms are governed by the laws of India. Any disputes will be handled by the courts
        of Ghaziabad, Uttar Pradesh.
        <Tbc />
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these Terms or the Event? Email us at{" "}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-forest/80 bg-linen/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[68px] max-w-[var(--container)] items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Hack the Fashion — home">
            <span className="cut-sm grid size-8 place-items-center bg-forest text-linen">
              <ClothsyMark className="size-[18px]" />
            </span>
            <span className="font-display text-[19px] leading-none font-semibold tracking-tight">
              Hack the <span className="accent">Fashion</span>
            </span>
          </Link>
          <RegisterButton className="btn-sm" />
        </div>
      </header>

      <main id="top" className="pattern-grid">
        <div className="mx-auto max-w-[var(--container)] px-4 pt-14 pb-[var(--section-pad)] sm:px-6 md:pt-20">
          <p className="label text-terracotta">Legal</p>
          <h1 className="display-xl mt-4 max-w-3xl">
            Terms &amp; <span className="accent">conditions</span>
          </h1>
          <p className="mt-5 text-moss">
            Hack the Fashion 2026 · Last updated {LAST_UPDATED}
          </p>

          <div className="mt-12 grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
            <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
              <p className="label text-moss">On this page</p>
              <ol className="mt-4 space-y-2 text-[15px]">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="flex gap-3 text-forest/75 hover:text-forest">
                      <span className="font-mono text-[13px] text-moss">{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="cut-lg bg-white p-6 sm:p-10 md:p-14">
              {sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  className="border-b border-forest/10 py-8 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <h2 className="flex items-baseline gap-4 font-display text-2xl font-semibold md:text-3xl">
                    <span className="font-mono text-sm font-semibold text-terracotta">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-moss [&_a]:font-medium [&_a]:text-violet [&_a]:underline [&_a]:underline-offset-4 [&_li]:relative [&_li]:pl-5 [&_li]:before:absolute [&_li]:before:top-[0.65em] [&_li]:before:left-0 [&_li]:before:size-1.5 [&_li]:before:bg-terracotta [&_strong]:text-forest [&_ul]:space-y-2.5">
                    {s.body}
                  </div>
                </section>
              ))}
            </article>
          </div>

          <Link href="/" className="btn btn-ghost mt-12">
            Back to the event <ArrowRight className="size-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
