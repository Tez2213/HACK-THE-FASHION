import { RevealObserver } from "../components/RevealObserver";
import { Judges, Judging, Schedule, TimelineSection } from "./Event";
import { Faq, FinalCta, Footer, Rules, Sponsors, Submission, Venue } from "./Info";
import { About, Hero, Prizes, Tracks } from "./Intro";
import { McNav } from "./McNav";
import { PageFx } from "./Motion";

/** Block-world redesign preview. Same content as the homepage, from app/lib/event.ts. */
export default function McHome() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-violet focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <McNav />
      <main>
        <Hero />
        <About />
        <Tracks />
        <Prizes />
        <TimelineSection />
        <Schedule />
        <Judging />
        <Judges />
        <Sponsors />
        <Rules />
        <Submission />
        <Venue />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <RevealObserver />
      <PageFx />
    </>
  );
}
