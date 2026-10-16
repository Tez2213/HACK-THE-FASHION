/**
 * Single source of truth for all Hack the Fashion content.
 *
 * Anything with `tbc: true` is a placeholder from the build guide that must be
 * confirmed before launch. In `next dev` those items show a small dashed "TBC"
 * marker on the page; in production builds the marker is not rendered.
 */

/**
 * Applications are taken on Unstop. Paste the Unstop listing URL here (or set
 * NEXT_PUBLIC_UNSTOP_URL) once it is live. While it is empty, every
 * "Register now" button scrolls to the closing section, which shows an
 * "opening soon on Unstop" state instead of a dead link.
 */
export const UNSTOP_URL: string = process.env.NEXT_PUBLIC_UNSTOP_URL || "";

export const REGISTER_URL = UNSTOP_URL || "#register";
export const registrationOpen = UNSTOP_URL !== "";

/** Hacking starts 2 Nov 2026, 10:00 AM IST. */
export const HACK_START = "2026-11-02T10:00:00+05:30";
/** Code freeze 3 Nov 2026, 10:00 AM IST. */
export const HACK_END = "2026-11-03T10:00:00+05:30";

export const event = {
  name: "Hack the Fashion",
  tagline: "Don't just imagine the future of fashion. Build it.",
  theme: "Reimagining Fashion Through AI, Technology & Innovation",
  dates: "2–3 November 2026",
  venueShort: "AI Skills Lab, KIET",
  venue: "AI Skills Lab, KIET Group of Institutions, Ghaziabad",
  address:
    "KIET Group of Institutions, Delhi-NCR, Meerut Road (NH-58), Ghaziabad, Uttar Pradesh",
  prizePool: "₹50,000+",
  /** Organiser: the AI Skills Lab CoE, part of KIET. */
  organiser: "AI Skills Lab CoE, KIET",
  titleSponsor: "Clothsy AI",
  poweredBy: "FabricVTON",
  supportingPartners: "HP and Intel",
  brochureUrl: "/sponsor-brochure.pdf",
  registrationDeadline: "28 October 2026",
  contact: {
    email: "hackthefashion@fabricvton.com",
    // Phone and socials are still placeholders.
    phone: "+91 00000 00000",
    instagram: "https://instagram.com/coeaiskills",
    linkedin: "https://linkedin.com/company/hackthefashion",
    tbc: true,
  },
  clothsyUrl: "https://clothsyai.fabricvton.com",
  fabricvtonUrl: "https://fabricvton.com",
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#tracks", label: "Tracks" },
  { href: "#prizes", label: "Prizes" },
  { href: "#timeline", label: "Timeline" },
  { href: "#judges", label: "Judges" },
  { href: "#faq", label: "FAQ" },
];

export const stats = [
  { value: "24", label: "Hours of building" },
  { value: "6", label: "Challenge tracks" },
  { value: "₹50K+", label: "Prize pool", tbc: true },
  { value: "250", label: "Students building" },
];

export type TrackIcon = "tryon" | "discovery" | "design" | "fit" | "sustain" | "brands";

export const tracks: {
  title: string;
  description: string;
  ideas: string[];
  icon: TrackIcon;
}[] = [
  {
    title: "Virtual try-on",
    description: "Help shoppers see clothes on themselves before buying.",
    ideas: ["Photo-based try-on", "Try-on for accessories", "Mirror-style AR try-on"],
    icon: "tryon",
  },
  {
    title: "Smart discovery and styling",
    description: "Make finding the right outfit effortless and personal.",
    ideas: ["AI stylist chatbot", "“Shop the look” from a photo", "Mood-based search"],
    icon: "discovery",
  },
  {
    title: "AI fashion design",
    description: "Use AI to create, remix or generate fashion.",
    ideas: ["Outfit generators", "Print and pattern creators", "Mood-board-to-design tools"],
    icon: "design",
  },
  {
    title: "Fit and returns",
    description: "Reduce size confusion and costly returns.",
    ideas: ["Size recommendation engines", "Body measurement from photos", "Fit prediction"],
    icon: "fit",
  },
  {
    title: "Sustainable fashion",
    description: "Cut waste across the fashion life cycle.",
    ideas: ["Resale and rental tools", "Demand forecasting", "Garment care and repair guides"],
    icon: "sustain",
  },
  {
    title: "Tools for brands and marketplaces",
    description: "Help fashion businesses work smarter.",
    ideas: ["Catalogue auto-tagging", "Trend analytics dashboards", "Inventory planning"],
    icon: "brands",
  },
];

export const prizes = [
  {
    place: "1st runner-up",
    medal: "🥈",
    cash: "₹15,000",
    extras: ["Internship interview", "Certificates", "Goodies"],
    winner: false,
  },
  {
    place: "Winner",
    medal: "🥇",
    cash: "₹25,000",
    extras: [
      "Internship interview with Clothsy AI / FabricVTON",
      "Trophy",
      "Certificates",
      "Goodies",
    ],
    winner: true,
  },
  {
    place: "2nd runner-up",
    medal: "🥉",
    cash: "₹10,000",
    extras: ["Certificates", "Goodies"],
    winner: false,
  },
];

export const specialAwards = [
  {
    award: "Best use of virtual try-on",
    by: "by Clothsy AI",
    prize: "₹5,000 + Clothsy AI mentorship session",
  },
  { award: "Best sustainable solution", prize: "₹3,000 + goodies" },
  { award: "Best UI/UX design", prize: "₹3,000 + goodies" },
  { award: "Best all-first-year team", prize: "Goodies + certificates" },
];

export const perks = [
  "Participation certificate",
  "Swag kit",
  "Meals during the event",
  "Networking with industry mentors",
];

export const timeline: {
  date: string;
  /** ISO timestamp the milestone happens at, used to mark progress. */
  at: string;
  title: string;
  description: string;
  tbc?: boolean;
}[] = [
  {
    date: "16 Oct 2026",
    at: "2026-10-16T00:00:00+05:30",
    title: "Registrations open",
    description: "Form your team and register.",
  },
  {
    date: "28 Oct, 11:59 PM",
    at: "2026-10-28T23:59:00+05:30",
    title: "Registrations close",
    description: "Last date to submit team details and idea.",
    tbc: true,
  },
  {
    date: "30 Oct 2026",
    at: "2026-10-30T12:00:00+05:30",
    title: "Shortlist announced",
    description: "Selected teams receive confirmation by email.",
    tbc: true,
  },
  {
    date: "1 Nov 2026",
    at: "2026-11-01T12:00:00+05:30",
    title: "Pre-hackathon briefing",
    description: "Online session on tracks, rules and Clothsy AI tools.",
    tbc: true,
  },
  {
    date: "2 Nov, 10:00 AM",
    at: HACK_START,
    title: "Hacking begins",
    description: "24-hour build sprint starts at the AI Skills Lab.",
  },
  {
    date: "3 Nov, 10:00 AM",
    at: HACK_END,
    title: "Submissions close",
    description: "Code freeze. Final submissions due.",
  },
  {
    date: "3 Nov, 2:00 PM",
    at: "2026-11-03T14:00:00+05:30",
    title: "Results and awards",
    description: "Winners announced at the closing ceremony.",
  },
];

export type SlotKind = "milestone" | "meal" | "mentor" | "checkpoint" | "fun" | "judging";

export const schedule: {
  day: string;
  date: string;
  slots: { time: string; activity: string; kind?: SlotKind }[];
}[] = [
  {
    day: "Day 1",
    date: "Monday, 2 November",
    slots: [
      { time: "8:30 AM", activity: "Check-in and registration desk" },
      { time: "9:30 AM", activity: "Opening ceremony and keynote" },
      { time: "10:00 AM", activity: "Hacking begins", kind: "milestone" },
      { time: "1:00 PM", activity: "Lunch", kind: "meal" },
      { time: "3:00 PM", activity: "Mentor round 1", kind: "mentor" },
      { time: "5:00 PM", activity: "Evening snacks", kind: "meal" },
      { time: "6:00 PM", activity: "Checkpoint 1 — progress check", kind: "checkpoint" },
      { time: "8:30 PM", activity: "Dinner", kind: "meal" },
      { time: "11:00 PM", activity: "Mentor round 2", kind: "mentor" },
      { time: "12:00 AM", activity: "Midnight fun activity / mini challenge", kind: "fun" },
    ],
  },
  {
    day: "Day 2",
    date: "Tuesday, 3 November",
    slots: [
      { time: "2:00 AM", activity: "Midnight snacks", kind: "meal" },
      { time: "6:00 AM", activity: "Checkpoint 2", kind: "checkpoint" },
      { time: "8:00 AM", activity: "Breakfast", kind: "meal" },
      { time: "10:00 AM", activity: "Code freeze — submissions close", kind: "milestone" },
      { time: "10:30 AM", activity: "Judging round 1 (table demos)", kind: "judging" },
      { time: "12:00 PM", activity: "Final pitches (top teams)", kind: "judging" },
      { time: "1:00 PM", activity: "Lunch", kind: "meal" },
      { time: "2:00 PM", activity: "Closing ceremony and prize distribution", kind: "milestone" },
    ],
  },
];

export const criteria = [
  {
    name: "Innovation and originality",
    weight: 25,
    detail: "Is the idea fresh? Does it approach the problem in a new way?",
  },
  {
    name: "Technical execution",
    weight: 25,
    detail: "Does the prototype work? How well is it built?",
  },
  {
    name: "Problem relevance",
    weight: 20,
    detail: "Does it solve a real, meaningful fashion problem?",
  },
  {
    name: "User experience and design",
    weight: 15,
    detail: "Is it easy and pleasant to use?",
  },
  {
    name: "Impact and feasibility",
    weight: 15,
    detail: "Could it scale or be used by real shoppers or brands?",
  },
];

export const judges: {
  name: string;
  role: string;
  org: string;
  linkedin?: string;
  confirmed: boolean;
}[] = [
  { name: "Aaditya Singhal", role: "CEO", org: "Clothsy AI", confirmed: false },
  { name: "To be announced", role: "Faculty", org: "KIET Group of Institutions", confirmed: false },
  { name: "To be announced", role: "Industry", org: "Fashion brand / retailer", confirmed: false },
  { name: "To be announced", role: "Fashion expert", org: "NIFT / fashion industry", confirmed: false },
  { name: "To be announced", role: "Engineering", org: "Tech company", confirmed: false },
];

export const mentorAreas = [
  { area: "AI/ML", hint: "Models, fine-tuning, prompting" },
  { area: "Computer vision", hint: "Pose, segmentation, try-on" },
  { area: "Web dev", hint: "Full-stack, APIs, deploys" },
  { area: "UI/UX", hint: "Flows, prototyping, polish" },
  { area: "Fashion business", hint: "Retail, D2C, merchandising" },
];

export const eligibility = [
  "Open to all undergraduate and postgraduate students with a valid college ID.",
  "Teams of 2–4 members. Cross-college and cross-discipline teams are encouraged.",
  "Each participant can be in only one team.",
];

export const rules = [
  "All code must be written during the hackathon. Planning, ideas and designs may be prepared in advance.",
  "Pre-trained models, open-source libraries, public APIs and frameworks are allowed and must be credited.",
  "Teams keep full ownership of everything they build.",
  "Projects must fit the theme of fashion and technology.",
  "Plagiarism or submitting a previous project leads to disqualification.",
  "Teams must be present at the venue for the full event.",
  "The judges' decision is final.",
  "All participants must follow the Code of Conduct.",
];

export const submission = [
  { title: "Working prototype", detail: "Live link, APK, or local demo." },
  { title: "GitHub repository", detail: "Public, with a README explaining the project and setup." },
  { title: "Demo video", detail: "2–3 minutes, uploaded to YouTube or Drive." },
  { title: "Pitch deck", detail: "Max 8 slides, PDF." },
  { title: "Project form", detail: "Team name, track, problem, solution and tech stack." },
];

export const bring = [
  "Laptop",
  "Charger",
  "Extension board",
  "College ID",
  "Toiletries for the overnight stay",
];

export const faqs: { q: string; a: string; tbc?: boolean }[] = [
  {
    q: "Who can participate?",
    a: "Any undergraduate or postgraduate student with a valid college ID.",
    tbc: true,
  },
  { q: "Is there a registration fee?", a: "No, participation is free.", tbc: true },
  { q: "What is the team size?", a: "2 to 4 members." },
  {
    q: "I don't know how to code. Can I join?",
    a: "Yes! Teams need designers, researchers and fashion thinkers too.",
  },
  {
    q: "Can I participate solo?",
    a: "Solo registration isn't allowed, but we'll help you find a team on our community group.",
    tbc: true,
  },
  {
    q: "Do I need a fashion background?",
    a: "Not at all. Curiosity and problem-solving matter more.",
  },
  {
    q: "Will food be provided?",
    a: "Yes, all meals and snacks during the 24 hours are covered.",
  },
  {
    q: "Can I use AI tools and pre-trained models?",
    a: "Yes, as long as you credit them. Judges focus on your idea and how you built on top of them.",
  },
  {
    q: "Who owns the project?",
    a: "Your team keeps full ownership of everything you build.",
  },
  {
    q: "Will there be accommodation?",
    a: "The venue stays open overnight for hacking. Details on separate accommodation will be shared with shortlisted teams.",
    tbc: true,
  },
  {
    q: "How will we receive prize money?",
    a: "Via bank transfer to the team leader after the event.",
    tbc: true,
  },
  {
    q: "Who do I contact for help?",
    a: "Email us or reach out on Instagram — details are in the footer below.",
  },
];
