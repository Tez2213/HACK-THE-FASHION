import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const description =
  "Build the future of fashion with AI. A 24-hour hackathon at the AI Skills Lab, KIET on 2–3 November 2026. Powered by Clothsy AI. ₹50,000+ in prizes.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Hack the Fashion 2026 | 24-Hour AI × Fashion Hackathon at KIET",
  description,
  openGraph: {
    title: "Hack the Fashion 2026",
    description: "Don't just imagine the future of fashion. Build it.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hack the Fashion 2026",
    description: "Don't just imagine the future of fashion. Build it.",
  },
};

export const viewport: Viewport = {
  themeColor: "#2F4A3A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Flags JS support before first paint so scroll reveals never flash. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
