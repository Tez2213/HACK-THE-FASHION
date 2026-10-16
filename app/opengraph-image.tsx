import { ImageResponse } from "next/og";

export const alt = "Hack the Fashion 2026 — 24-hour AI × fashion hackathon at KIET, 2–3 November 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#F3EEE3",
          backgroundImage:
            "linear-gradient(to right, rgba(47,74,58,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(47,74,58,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "#2F4A3A",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Cut-corner forest block, top right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 120,
            height: 630,
            background: "#2F4A3A",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 120,
            height: 120,
            background: "#F3EEE3",
            transform: "rotate(45deg)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "sans-serif", fontSize: 22, letterSpacing: 3 }}>
          <div style={{ display: "flex", background: "#5F25FF", padding: "10px 18px", color: "white", fontSize: 20 }}>
            TITLE SPONSOR · CLOTHSY AI
          </div>
          <span style={{ color: "#5E6B5A" }}>POWERED BY FABRICVTON</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>
            Hack the&nbsp;<span style={{ color: "#B5583A", fontStyle: "italic" }}>fashion</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 34, color: "#5E6B5A", fontFamily: "sans-serif" }}>
            2–3 November 2026 · AI Skills Lab, KIET · 24 hours
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, fontFamily: "sans-serif", fontWeight: 600 }}>
          Don&apos;t just imagine the future of fashion. Build it.
        </div>
      </div>
    ),
    size,
  );
}
