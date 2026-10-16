# HACK THE FASHION — Website Build Guide

> Everything needed to design and build the official Hack the Fashion website: brand and colour system, page structure, and ready-to-use copy for every section.
>
> Items marked **[TBC]** are placeholders or suggestions. Confirm them before going live.

---

## 0. Quick facts

| Item | Details |
|---|---|
| Event name | Hack the Fashion |
| Tagline | Don't just imagine the future of fashion. Build it. |
| Theme | Reimagining Fashion Through AI, Technology & Innovation |
| Powered by | Clothsy AI · FabricVTON |
| Format | 24-hour, in-person hackathon |
| Dates | 2–3 November 2026 |
| Venue | AI Skills Lab, KIET Group of Institutions, Ghaziabad |
| Team size | 2–4 members [TBC] |
| Entry fee | Free [TBC] |
| Total prize pool | ₹50,000+ in cash, plus internships and goodies [TBC] |
| Registration deadline | 28 October 2026, 11:59 PM [TBC] |

---

## 1. Brand and design system

### 1.1 Colour palette — "Earthy × Clothsy"

| Name | Hex | Role | Usage share |
|---|---|---|---|
| Linen | `#F3EEE3` | Page background, light surfaces | ~55% |
| Forest | `#2F4A3A` | Headings, body text, dark sections, footer | ~20% |
| Sage | `#A8B89A` | Tags, chips, dividers, secondary buttons | ~10% |
| Terracotta | `#B5583A` | One highlighted word per heading, key numbers | ~5% |
| Clothsy violet | `#5F25FF` | Primary CTA (Register), sponsor badge, links, focus states | ~10% |

Supporting neutrals:

| Name | Hex | Role |
|---|---|---|
| Moss grey | `#5E6B5A` | Secondary / muted text |
| Linen dark | `#E7DFCF` | Card background on linen, hover states |
| White | `#FFFFFF` | Text on violet, cards |
| Forest deep | `#1F3227` | Footer background, hover on forest buttons |
| Violet deep | `#4A16D9` | Hover state for violet buttons |

**Colour rules**

1. Violet is the "tech spark". Use it only for the main CTA, the sponsor badge, links, and small accents. Never use it as a large background block.
2. Never place violet and terracotta directly side by side in large areas. Separate them with linen or forest.
3. Only one terracotta word per heading (for example, "Hack the **fashion**").
4. Text on linen = forest. Text on forest = linen. Text on violet = white.
5. All text must meet WCAG AA contrast (4.5:1 for body text).

### 1.2 Signature shape — the Clothsy cut corner

The Clothsy "C" logo has a 45° chamfered (cut) top-right corner. This is the core visual motif of the site.

Apply it to buttons, cards, images, badges, the hero section, and section dividers.

```css
/* Small (buttons, chips) */
.cut-sm { clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%); }

/* Medium (cards, images) */
.cut-md { clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%); }

/* Large (hero, big sections) */
.cut-lg { clip-path: polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 0 100%); }
```

Rules:
- Cut corner is always **top-right**, matching the logo.
- No rounded corners anywhere else. The site uses sharp edges plus the cut corner.
- Borders do not follow `clip-path`. For outlined cut-corner elements, use a wrapper with the border colour as background and 1–2px padding.

### 1.3 Typography

| Use | Font | Weight | Size (desktop / mobile) |
|---|---|---|---|
| Display (hero title) | Fraunces or Playfair Display | 600 | 72px / 44px |
| H2 (section titles) | Fraunces or Playfair Display | 600 | 44px / 32px |
| H3 (card titles) | Inter | 600 | 22px / 20px |
| Body | Inter | 400 | 17px / 16px |
| Small / labels | Inter | 500, letter-spacing 0.08em, uppercase | 13px |
| Countdown numbers | Space Grotesk or JetBrains Mono | 600 | 56px / 36px |

The serif + sans pairing signals "fashion meets tech". All fonts are free on Google Fonts.

### 1.4 CSS design tokens

```css
:root {
  --linen: #F3EEE3;
  --linen-dark: #E7DFCF;
  --forest: #2F4A3A;
  --forest-deep: #1F3227;
  --sage: #A8B89A;
  --terracotta: #B5583A;
  --violet: #5F25FF;
  --violet-deep: #4A16D9;
  --moss: #5E6B5A;
  --white: #FFFFFF;

  --font-display: "Fraunces", "Playfair Display", Georgia, serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "Space Grotesk", "JetBrains Mono", monospace;

  --cut-sm: 10px;
  --cut-md: 20px;
  --cut-lg: 48px;

  --section-pad: clamp(64px, 10vw, 120px);
  --container: 1200px;
}
```

### 1.5 Tailwind config (if using Tailwind)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        linen: { DEFAULT: "#F3EEE3", dark: "#E7DFCF" },
        forest: { DEFAULT: "#2F4A3A", deep: "#1F3227" },
        sage: "#A8B89A",
        terracotta: "#B5583A",
        violet: { DEFAULT: "#5F25FF", deep: "#4A16D9" },
        moss: "#5E6B5A",
      },
      fontFamily: {
        display: ["Fraunces", "Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["Space Grotesk", "monospace"],
      },
    },
  },
};
```

### 1.6 Core components

| Component | Style |
|---|---|
| Primary button | Violet bg, white text, `cut-sm`, hover → violet-deep. Used only for "Register now". |
| Secondary button | Forest bg, linen text, `cut-sm`, hover → forest-deep |
| Ghost button | Transparent, forest text, 1.5px forest border (wrapper method) |
| Chip / tag | Sage bg, forest text, `cut-sm`, 13px uppercase label |
| Card | White or linen-dark bg, `cut-md`, 32px padding, no shadow |
| Highlight card (1st prize) | Forest bg, linen text, terracotta number |
| Sponsor badge | Violet bg, white Clothsy "C" mark + "Powered by Clothsy AI" |
| Section label | Small uppercase label in terracotta above every H2 (e.g. "01 — THE CHALLENGE") |

### 1.7 Imagery and graphics

- Photography: warm-toned fashion and textile shots (fabric close-ups, sustainable clothing, people trying on clothes on phones). Avoid cold, blue tech stock photos.
- Graphic motifs: thin forest lines forming grids or garment patterns (sewing-pattern style), mixed with simple tech lines (nodes, circuits).
- All images in `cut-md` frames.
- Sources: Unsplash, Pexels, or your own event photos.

### 1.8 Motion

- Subtle fade-up on scroll (200–400ms, ease-out).
- Buttons: hover moves 2px up and changes colour.
- Countdown digits flip or fade each second.
- Respect `prefers-reduced-motion`.

---

## 2. Site map

Single-page site with anchor navigation (recommended), plus separate pages for Rules and Code of Conduct if needed.

1. Navbar
2. Hero (with countdown)
3. About the hackathon
4. The challenge and tracks
5. Prizes
6. Timeline
7. Event schedule (24 hours)
8. Judging criteria
9. Judges
10. Mentors
11. Powered by Clothsy AI / Sponsors
12. Rules and eligibility
13. Submission guidelines
14. Venue
15. FAQ
16. Final CTA
17. Footer

---

## 3. Section-by-section content

### 3.1 Navbar

- Left: "Hack the Fashion" wordmark + small Clothsy "C" mark.
- Links: About · Tracks · Prizes · Timeline · Judges · FAQ
- Right: **Register now** (primary violet button).
- Sticky on scroll, linen background with a thin forest bottom border.
- Mobile: hamburger menu, Register button stays visible.

### 3.2 Hero

**Label:** POWERED BY CLOTHSY AI · FABRICVTON

**Title:** Hack the *fashion* (the word "fashion" in terracotta)

**Subtitle:** Reimagining fashion through AI, technology and innovation. A 24-hour hackathon to build the future of how the world shops, styles and dresses.

**Info chips:** 2–3 November 2026 · AI Skills Lab, KIET · 24 hours · ₹50,000+ prize pool [TBC]

**Buttons:** Register now (primary) · View tracks (ghost)

**Countdown:** "Hacking starts in" → Days · Hours · Minutes · Seconds (target: 2 Nov 2026, 10:00 AM IST [TBC])

**Visual:** large `cut-lg` image or illustration on the right (fashion + tech collage), or a full-width linen hero with a pattern-line graphic.

### 3.3 About

**Label:** 01 — ABOUT

**Title:** Fashion is evolving. The *tools* haven't caught up.

**Copy:**
> Online shoppers still can't see how clothes will look on them before they buy. Brands struggle with product discovery, personalisation, size-related returns, inventory planning and waste from overproduction.
>
> Hack the Fashion brings together developers, designers and fashion minds for 24 hours to build working prototypes that make fashion more personalised, accessible, efficient and sustainable.

**Stats row (4 cards):**
| Number | Label |
|---|---|
| 24 | Hours of building |
| 6 | Challenge tracks |
| ₹50K+ | Prize pool [TBC] |
| 150+ | Hackers expected [TBC] |

### 3.4 The challenge and tracks

**Label:** 02 — THE CHALLENGE

**Title:** Build what fashion *needs* next

**Intro:** Use AI, machine learning, computer vision, AR, web or app development, data analytics, or any technology that fits. Pick a track, or bring your own idea.

**Track cards (6):**

| # | Track | Description | Example ideas |
|---|---|---|---|
| 1 | Virtual try-on | Help shoppers see clothes on themselves before buying. | Photo-based try-on, try-on for accessories, mirror-style AR try-on |
| 2 | Smart discovery and styling | Make finding the right outfit effortless and personal. | AI stylist chatbot, "shop the look" from a photo, mood-based search |
| 3 | AI fashion design | Use AI to create, remix or generate fashion. | Outfit generators, print and pattern creators, mood-board-to-design tools |
| 4 | Fit and returns | Reduce size confusion and costly returns. | Size recommendation engines, body measurement from photos, fit prediction |
| 5 | Sustainable fashion | Cut waste across the fashion life cycle. | Resale and rental tools, demand forecasting, garment care and repair guides |
| 6 | Tools for brands and marketplaces | Help fashion businesses work smarter. | Catalogue auto-tagging, trend analytics dashboards, inventory planning |

**Open innovation note:** Have an idea that doesn't fit a track? Any original solution to a real fashion problem is welcome.

### 3.5 Prizes

**Label:** 03 — PRIZES

**Title:** ₹50,000+ in *prizes* and opportunities [TBC]

**Main prizes:**

| Position | Cash | Extras |
|---|---|---|
| 🥇 Winner | ₹25,000 [TBC] | Internship interview with Clothsy AI / FabricVTON, trophy, certificates, goodies |
| 🥈 1st runner-up | ₹15,000 [TBC] | Internship interview, certificates, goodies |
| 🥉 2nd runner-up | ₹10,000 [TBC] | Certificates, goodies |

**Special awards [TBC]:**

| Award | Prize |
|---|---|
| Best use of virtual try-on (by Clothsy AI) | ₹5,000 + Clothsy AI mentorship session |
| Best sustainable solution | ₹3,000 + goodies |
| Best UI/UX design | ₹3,000 + goodies |
| Best all-first-year team | Goodies + certificates |

**For every participant:** participation certificate, swag kit [TBC], meals during the event, networking with industry mentors.

**Design note:** Winner card in forest (highlight card) and centred, taller than the other two. Prize amounts in terracotta, display font.

### 3.6 Timeline

**Label:** 04 — TIMELINE

**Title:** Key *dates*

Vertical timeline on mobile, horizontal on desktop. Each step is a `cut-sm` chip with date + title + one-line description.

| Date | Milestone | Description |
|---|---|---|
| 16 Oct 2026 | Registrations open | Form your team and register. |
| 28 Oct 2026, 11:59 PM | Registrations close | Last date to submit team details and idea. [TBC] |
| 30 Oct 2026 | Shortlist announced | Selected teams receive confirmation by email. [TBC] |
| 1 Nov 2026 | Pre-hackathon briefing | Online session on tracks, rules and Clothsy AI tools. [TBC] |
| 2 Nov 2026, 10:00 AM | Hacking begins | 24-hour build sprint starts at the AI Skills Lab. |
| 3 Nov 2026, 10:00 AM | Submissions close | Code freeze. Final submissions due. |
| 3 Nov 2026, 2:00 PM | Results and awards | Winners announced at the closing ceremony. |

### 3.7 Event schedule (24 hours)

**Label:** 05 — SCHEDULE

**Day 1 — Monday, 2 November [TBC]**

| Time | Activity |
|---|---|
| 8:30 AM | Check-in and registration desk |
| 9:30 AM | Opening ceremony and keynote |
| 10:00 AM | Hacking begins |
| 1:00 PM | Lunch |
| 3:00 PM | Mentor round 1 |
| 5:00 PM | Evening snacks |
| 6:00 PM | Checkpoint 1 — progress check |
| 8:30 PM | Dinner |
| 11:00 PM | Mentor round 2 |
| 12:00 AM | Midnight fun activity / mini challenge |

**Day 2 — Tuesday, 3 November [TBC]**

| Time | Activity |
|---|---|
| 2:00 AM | Midnight snacks |
| 6:00 AM | Checkpoint 2 |
| 8:00 AM | Breakfast |
| 10:00 AM | Code freeze — submissions close |
| 10:30 AM | Judging round 1 (table demos) |
| 12:00 PM | Final pitches (top teams) |
| 1:00 PM | Lunch |
| 2:00 PM | Closing ceremony and prize distribution |

### 3.8 Judging criteria

**Label:** 06 — JUDGING

**Title:** How we *judge*

| Criteria | Weight | What judges look for |
|---|---|---|
| Innovation and originality | 25% | Is the idea fresh? Does it approach the problem in a new way? |
| Technical execution | 25% | Does the prototype work? How well is it built? |
| Problem relevance | 20% | Does it solve a real, meaningful fashion problem? |
| User experience and design | 15% | Is it easy and pleasant to use? |
| Impact and feasibility | 15% | Could it scale or be used by real shoppers or brands? |

**Judging process:**
1. Round 1: judges visit each table for a 5-minute demo + 2-minute Q&A.
2. Final round: top 8 teams [TBC] pitch on stage (4 minutes + 3 minutes Q&A).

**Design note:** show weights as horizontal bars (forest fill on linen-dark track) or a simple segmented bar.

### 3.9 Judges

**Label:** 07 — JUDGES

**Title:** Meet the *judges*

Card layout: photo (`cut-md`, square), name, role, organisation, LinkedIn icon.

| Name | Role | Organisation |
|---|---|---|
| Aaditya Singhal [TBC] | CEO | Clothsy AI |
| [Judge name] | [Faculty role] | KIET Group of Institutions |
| [Judge name] | [Industry role] | [Fashion brand / retailer] |
| [Judge name] | [Role] | NIFT / fashion industry expert |
| [Judge name] | [Role] | [Tech company] |

Tip: a balanced panel has tech, fashion business, and design judges. Show "More judges to be announced" until confirmed.

### 3.10 Mentors

**Label:** 08 — MENTORS

Same card style as judges, smaller. Group by expertise chips: AI/ML · Computer vision · Web dev · UI/UX · Fashion business.

### 3.11 Powered by Clothsy AI

**Label:** 09 — POWERED BY

**Title:** Powered by *Clothsy AI*

**Copy:**
> Clothsy AI, by FabricVTON, builds AI-powered virtual try-on that lets shoppers see themselves in clothes before they buy, helping brands boost buyer confidence and reduce returns. Available on Shopify and WooCommerce.
>
> At Hack the Fashion, participants can explore virtual try-on and AI-driven fashion experiences, get mentorship from the Clothsy AI team, and compete for internship opportunities.

**What participants get [TBC]:** demo access to Clothsy AI · mentorship from the team · internship interviews for top teams

**Buttons:** Visit Clothsy AI (link to clothsyai.fabricvton.com) · Visit FabricVTON (fabricvton.com)

**Design:** this is the one section where violet can be a larger accent, e.g. a violet sponsor badge with the white "C" mark on a forest background.

**Other sponsors / partners:** logo grid on white `cut-md` cards. Tiers: Title partner · Gold · Community partners. [TBC]

### 3.12 Rules and eligibility

**Label:** 10 — RULES

**Eligibility [TBC]**
- Open to all undergraduate and postgraduate students with a valid college ID.
- Teams of 2–4 members. Cross-college and cross-discipline teams are encouraged.
- Each participant can be in only one team.

**Rules**
1. All code must be written during the hackathon. Planning, ideas and designs may be prepared in advance.
2. Pre-trained models, open-source libraries, public APIs and frameworks are allowed and must be credited.
3. Teams keep full ownership of everything they build.
4. Projects must fit the theme of fashion and technology.
5. Plagiarism or submitting a previous project leads to disqualification.
6. Teams must be present at the venue for the full event. [TBC]
7. The judges' decision is final.
8. All participants must follow the Code of Conduct.

**Code of Conduct (summary)**
Be respectful and inclusive. Harassment of any kind is not tolerated. Look after the venue and equipment. Organisers may remove anyone who breaks these rules.

### 3.13 Submission guidelines

**Label:** 11 — SUBMISSION

Each team must submit before code freeze (3 Nov, 10:00 AM):

1. **Working prototype** (live link, APK, or local demo)
2. **GitHub repository** (public, with a README explaining the project and setup)
3. **Demo video** (2–3 minutes, uploaded to YouTube or Drive)
4. **Pitch deck** (max 8 slides, PDF)
5. **Project form** with team name, track, problem, solution and tech stack

Submission platform: [Devfolio / Unstop / Google Form — TBC]

### 3.14 Venue

**Label:** 12 — VENUE

**Title:** AI Skills Lab, *KIET*

KIET Group of Institutions, Delhi-NCR, Meerut Road (NH-58), Ghaziabad, Uttar Pradesh [verify full address]

- Embedded Google Map (`cut-md` frame)
- How to reach: nearest metro, bus and parking info [TBC]
- What to bring: laptop, charger, extension board, college ID, toiletries for overnight stay

### 3.15 FAQ

Accordion style. Plus/minus icon in violet.

| Question | Answer |
|---|---|
| Who can participate? | Any undergraduate or postgraduate student with a valid college ID. [TBC] |
| Is there a registration fee? | No, participation is free. [TBC] |
| What is the team size? | 2 to 4 members. |
| I don't know how to code. Can I join? | Yes! Teams need designers, researchers and fashion thinkers too. |
| Can I participate solo? | Solo registration isn't allowed, but we'll help you find a team on our community group. [TBC] |
| Do I need a fashion background? | Not at all. Curiosity and problem-solving matter more. |
| Will food be provided? | Yes, all meals and snacks during the 24 hours are covered. |
| Can I use AI tools and pre-trained models? | Yes, as long as you credit them. Judges focus on your idea and how you built on top of them. |
| Who owns the project? | Your team keeps full ownership of everything you build. |
| Will there be accommodation? | The venue stays open overnight for hacking. Separate accommodation [TBC]. |
| How will we receive prize money? | Via bank transfer to the team leader within [X] days after the event. [TBC] |
| Who do I contact for help? | Email us or reach out on Instagram (see Contact). |

### 3.16 Final CTA

Full-width forest section with a `cut-lg` corner.

**Title (linen):** Don't just imagine the future of fashion. *Build it.* ("Build it." in terracotta)

**Subtitle:** Registrations close on 28 October 2026. [TBC]

**Button:** Register now (violet)

### 3.17 Footer

Forest-deep background, linen text.

- Columns: Event (About, Tracks, Prizes, Timeline) · Info (Rules, Code of Conduct, FAQ) · Contact (email, phone, Instagram, LinkedIn)
- "Powered by Clothsy AI · FabricVTON" badge
- "Hosted at the AI Skills Lab, KIET"
- © 2026 Hack the Fashion. All rights reserved.

---

## 4. Registration form fields

Use Tally, Google Forms, Devfolio or Unstop. [TBC]

**Team details**
- Team name
- Number of members (2–4)
- Preferred track (dropdown of 6 tracks + Open innovation)
- Idea in brief (max 200 words)

**Per member**
- Full name
- Email
- Phone (WhatsApp)
- College name
- Course and year
- Role in team (Developer / Designer / Researcher / Other)
- GitHub / LinkedIn / portfolio link (optional)
- T-shirt size (for swag)
- Dietary preference (Veg / Non-veg / Jain / Other)

**Consent**
- I agree to the rules and Code of Conduct.
- I agree to photos and videos being taken during the event.

---

## 5. Technical setup

**Recommended stack**
- Next.js (App Router) + Tailwind CSS
- Framer Motion for scroll animations
- Deploy on Vercel
- Domain: e.g. `hackthefashion.in` or `hack.fabricvton.com` [TBC]

**Must-haves**
- Fully responsive (mobile-first; most students will open it on phones)
- Lighthouse score 90+ (compress images, use WebP, lazy-load)
- Accessible: semantic HTML, alt text, keyboard navigation, visible focus ring in violet
- Live countdown in IST
- Analytics: Google Analytics or Vercel Analytics to track registration clicks

**SEO and social**

```html
<title>Hack the Fashion 2026 | 24-Hour AI × Fashion Hackathon at KIET</title>
<meta name="description" content="Build the future of fashion with AI. A 24-hour hackathon at the AI Skills Lab, KIET on 2–3 November 2026. Powered by Clothsy AI. ₹50,000+ in prizes.">
<meta property="og:title" content="Hack the Fashion 2026">
<meta property="og:description" content="Don't just imagine the future of fashion. Build it.">
<meta property="og:image" content="/og-image.png">
<meta name="theme-color" content="#2F4A3A">
```

- OG image: 1200×630, linen background, "Hack the fashion" title, dates, Clothsy badge.
- Favicon: Clothsy-style cut-corner shape in forest or violet.

---

## 6. Asset checklist

- [ ] Hack the Fashion wordmark (SVG)
- [ ] Clothsy AI logo (SVG, white and violet versions)
- [ ] FabricVTON logo (SVG)
- [ ] KIET logo (SVG / PNG)
- [ ] Hero image or illustration
- [ ] Judge and mentor photos (square, min 600×600)
- [ ] Sponsor logos
- [ ] OG image (1200×630)
- [ ] Favicon set
- [ ] Rules and Code of Conduct (full text)
- [ ] Final prize amounts
- [ ] Registration form link
- [ ] Contact details

---

## 7. Final checks before launch

- [ ] All **[TBC]** items confirmed or removed
- [ ] Dates and times correct everywhere (hero, timeline, schedule, countdown, FAQ)
- [ ] Prize totals add up across sections
- [ ] Register button links to the live form
- [ ] Tested on Android, iPhone and desktop
- [ ] Spelling checked (event name always written as "Hack the Fashion")
- [ ] Sponsor and judge names spelled correctly with approval to display

---

**Don't just imagine the future of fashion. Build it.**