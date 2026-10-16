import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./mc.css";

const pixel = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hack the Fashion 2026 | Block World preview",
  // Preview route: keep it out of search until it replaces the homepage.
  robots: { index: false, follow: false },
};

export default function McLayout({ children }: LayoutProps<"/mc">) {
  return <div className={`mc ${pixel.variable}`}>{children}</div>;
}
