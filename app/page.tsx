import { Navbar } from "./components/Navbar";
import { RevealObserver } from "./components/RevealObserver";
import { event, faqs, HACK_END, HACK_START } from "./lib/event";
import { Judges, Judging, Mentors, Schedule, TimelineSection } from "./sections/Event";
import { Faq, FinalCta, Footer, PoweredBy, Rules, Submission, Venue } from "./sections/Info";
import { About, Hero, PartnerStrip, Prizes, Tracks } from "./sections/Intro";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Hack the Fashion 2026",
    description: event.theme,
    startDate: HACK_START,
    endDate: HACK_END,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    isAccessibleForFree: true,
    location: {
      "@type": "Place",
      name: event.venue,
      address: event.address,
    },
    organizer: { "@type": "Organization", name: event.organiser, email: event.contact.email },
    sponsor: [
      { "@type": "Organization", name: "Clothsy AI", url: event.clothsyUrl },
      { "@type": "Organization", name: "FabricVTON", url: event.fabricvtonUrl },
      { "@type": "Organization", name: "HP" },
      { "@type": "Organization", name: "Intel" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-violet focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <PartnerStrip />
        <About />
        <Tracks />
        <Prizes />
        <TimelineSection />
        <Schedule />
        <Judging />
        <Judges />
        <Mentors />
        <PoweredBy />
        <Rules />
        <Submission />
        <Venue />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
