import type { Viewport } from "next";
import type { ReactNode } from "react";
import { Pixelify_Sans } from "next/font/google";
import "./mc.css";

const pixel = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0d0a16",
};

/** Block-world design for the homepage (route group, so it serves "/"). */
export default function McLayout({ children }: { children: ReactNode }) {
  return <div className={`mc ${pixel.variable}`}>{children}</div>;
}
