# HACK-THE-FASHION

Official website for **Hack the Fashion 2026**, a 24-hour AI × fashion hackathon at the AI Skills Lab, KIET Group of Institutions (2–3 November 2026). Powered by Clothsy AI · FabricVTON.

Built with Next.js 16 (App Router, Cache Components) and Tailwind CSS v4. Every page is prerendered as static HTML.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Editing content

All event content lives in [`app/lib/event.ts`](app/lib/event.ts): dates, tracks, prizes, timeline, schedule, judges, rules, FAQ and contact details.

Items still to be confirmed are flagged with `tbc: true`. In `npm run dev` they show a small dashed **TBC** marker on the page. Production builds hide the marker.

## Opening registrations (Unstop)

Applications are taken on Unstop. Until a URL is set, every "Register now" button scrolls to the closing section, which reads "Applications opening soon on Unstop". To go live, do one of these:

- set the environment variable `NEXT_PUBLIC_UNSTOP_URL=https://unstop.com/...` (for example in Vercel → Settings → Environment Variables) and redeploy, or
- paste the URL into `UNSTOP_URL` in `app/lib/event.ts`.

All register buttons then open the Unstop listing in a new tab.

Also set `NEXT_PUBLIC_SITE_URL` to the production domain so the Open Graph image URLs are absolute.

## Structure

| Path | What it is |
|---|---|
| `app/page.tsx` | Home page: assembles all sections, plus Event and FAQ JSON-LD |
| `app/sections/` | Section components (Intro, Event, Info) |
| `app/components/` | Navbar, countdown, timeline, hero illustration, icons, buttons |
| `app/terms/page.tsx` | Terms & Conditions page (`/terms`) |
| `app/globals.css` | Design tokens, cut-corner utilities, buttons, motion |
| `app/opengraph-image.tsx` | Generated 1200×630 social preview |
| `app/icon.svg` | Cut-corner favicon |

## Support

hackthefashion@fabricvton.com
