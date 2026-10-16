import type { CSSProperties, ReactNode } from "react";
import { REGISTER_URL, registrationOpen } from "../lib/event";

export const container = "mx-auto w-full max-w-[1200px] px-4 sm:px-6";

export type ItemName =
  | "shirt"
  | "spyglass"
  | "shears"
  | "tape"
  | "sapling"
  | "chest"
  | "clock"
  | "book"
  | "emerald"
  | "diamond"
  | "heart"
  | "bread"
  | "nametag"
  | "star"
  | "paper"
  | "painting"
  | "map"
  | "laptop"
  | "plug"
  | "socket"
  | "soap";

/** 16×16 pixel item from public/mc, drawn by scripts/mc-art.mjs. Decorative. */
export function Item({ name, size = 32, className = "" }: { name: ItemName; size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- 200-byte pixel sprites; next/image would smooth them
    <img src={`/mc/item_${name}.png`} alt="" width={size} height={size} className={`px shrink-0 ${className}`} />
  );
}

export function Sprite({
  src,
  w,
  h,
  className = "",
  style,
}: {
  src: string;
  w: number;
  h: number;
  className?: string;
  style?: CSSProperties;
}) {
  // eslint-disable-next-line @next/next/no-img-element -- pixel sprite, see Item
  return <img src={`/mc/${src}.png`} alt="" width={w} height={h} className={`px ${className}`} style={style} aria-hidden="true" />;
}

export type StickerName =
  | "alarm"
  | "brain"
  | "freeze"
  | "monocle"
  | "noodles"
  | "pancakes"
  | "party"
  | "pizza"
  | "popcorn"
  | "popper"
  | "fire"
  | "starstruck"
  | "trophy"
  | "wave";

/**
 * Animated sticker from public/mc/stickers: Google's Noto Animated Emoji
 * (CC BY 4.0), shrunk to 96px. Reduced motion gets the still first frame.
 */
export function Sticker({ name, size = 40, className = "" }: { name: StickerName; size?: number; className?: string }) {
  return (
    <picture>
      <source srcSet={`/mc/stickers/${name}.png`} media="(prefers-reduced-motion: reduce)" />
      <img
        src={`/mc/stickers/${name}.webp`}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className={`shrink-0 ${className}`}
      />
    </picture>
  );
}

/** Textured section. `tx` is a tx-* class, `wash` a wash-* class. */
export function Section({
  id,
  tx,
  wash = "wash-40",
  light = false,
  className = "",
  children,
}: {
  id?: string;
  tx: string;
  wash?: string;
  light?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="mc-seam" aria-hidden="true" />
      <section id={id} className={`mc-section mc-tx ${tx} ${wash} ${light ? "mc-on-light" : ""} ${className}`}>
        {children}
      </section>
    </>
  );
}

export function Heading({
  index,
  label,
  title,
  intro,
  center = false,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
}) {
  return (
    <header data-reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="mc-eyebrow">
        ▸ {index} · {label}
      </p>
      <h2 className="mc-h2 mt-4">{title}</h2>
      {intro && <p className={`mc-lead mt-5 max-w-2xl ${center ? "mx-auto" : ""}`}>{intro}</p>}
    </header>
  );
}

/** Minecraft-style register button. Opens Unstop once the URL is configured. */
export function McRegister({ className = "", children = "Register now" }: { className?: string; children?: ReactNode }) {
  return (
    <a
      href={REGISTER_URL}
      className={`mc-btn mc-btn-primary ${className}`}
      {...(registrationOpen ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {registrationOpen && <span className="sr-only"> on Unstop (opens in a new tab)</span>}
    </a>
  );
}

export const delay = (ms: number) => ({ ["--reveal-delay" as string]: `${ms}ms` }) as CSSProperties;
