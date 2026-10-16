"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin);

// Enchanting-table alphabet (Standard Galactic), used for scrambles and glyphs.
const GLYPHS = "ᔑʖᓵ↸ᒷ⎓⊣⍑╎⋮ꖌꖎᒲリᑑ∷ᓭℸ⚍⍊∴⨅";
const MOTION = "(prefers-reduced-motion: no-preference)";

/** Section heading letters drop in like falling blocks. */
function dropHeading(scope: HTMLElement) {
  const h2 = scope.querySelector<HTMLElement>(".mc-h2");
  if (!h2) return;
  const split = SplitText.create(h2, { type: "words,chars" });
  gsap.from(split.chars, {
    yPercent: -140,
    rotation: () => gsap.utils.random(-25, 25),
    opacity: 0,
    duration: 0.7,
    ease: "bounce.out",
    stagger: 0.025,
    scrollTrigger: { trigger: h2, start: "top 85%", once: true },
  });
}

/**
 * About: heading drop, the problem text decoding out of enchanting glyphs,
 * glyphs drifting into the book, and quest-log crystals that tilt, count up
 * and burst XP orbs.
 */
export function AboutMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = ref.current!;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        dropHeading(scope);

        // Start as glyphs (spaces kept so lines wrap alike), decode on scroll.
        const scrambles = [...scope.querySelectorAll<HTMLElement>("[data-scramble]")];
        const texts = scrambles.map((el) => el.textContent ?? "");
        scrambles.forEach((el, i) => {
          const text = texts[i];
          el.textContent = text.replace(/\S/g, () => GLYPHS[gsap.utils.random(0, GLYPHS.length - 1, 1)]);
          gsap.to(el, {
            duration: Math.min(3.2, 0.9 + text.length / 90),
            delay: i * 0.25,
            ease: "none",
            scrambleText: { text, chars: GLYPHS, revealDelay: 0.3, speed: 0.6 },
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

        // Glyphs float in from around the panel and vanish into the book icon.
        scope.querySelectorAll<HTMLElement>(".mc-glyph").forEach((g) => {
          g.textContent = GLYPHS[gsap.utils.random(0, GLYPHS.length - 1, 1)];
          gsap.fromTo(
            g,
            { x: () => gsap.utils.random(-220, 220), y: () => gsap.utils.random(40, 200), opacity: 0, scale: 1.4 },
            {
              x: 0,
              y: 0,
              scale: 0.4,
              keyframes: { opacity: [0, 1, 1, 0] },
              duration: () => gsap.utils.random(2.2, 3.6),
              delay: () => gsap.utils.random(0, 3),
              repeat: -1,
              repeatRefresh: true,
              ease: "power1.in",
            },
          );
        });

        scope.querySelectorAll<HTMLElement>("[data-count]").forEach((el, i) => {
          const m = (el.textContent ?? "").match(/^(\D*)(\d+)(.*)$/);
          if (!m) return;
          const [, pre, num, post] = m;
          const card = el.closest<HTMLElement>(".mc-crystal");
          const v = { n: 0 };
          gsap.to(v, {
            n: Number(num),
            duration: 1.4,
            delay: i * 0.15,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${pre}${Math.round(v.n)}${post}`;
            },
            onComplete: () => card && burstOrbs(card),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
        return () => scrambles.forEach((el, i) => (el.textContent = texts[i]));
      });

      // Crystals lean towards the pointer (fine pointers only).
      mm.add(`${MOTION} and (pointer: fine)`, () => {
        const off: (() => void)[] = [];
        scope.querySelectorAll<HTMLElement>(".mc-crystal").forEach((card) => {
          const rx = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3" });
          const ry = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3" });
          const move = (e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 22);
            rx(((e.clientY - r.top) / r.height - 0.5) * -22);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerleave", leave);
          off.push(() => {
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerleave", leave);
          });
        });
        return () => off.forEach((f) => f());
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}

/** Green XP orbs pop out of a card and fall away. */
function burstOrbs(card: HTMLElement) {
  for (let i = 0; i < 8; i++) {
    const orb = document.createElement("span");
    orb.className = "mc-orb";
    card.appendChild(orb);
    gsap.fromTo(
      orb,
      { x: 0, y: 0, scale: 1, opacity: 1 },
      {
        x: gsap.utils.random(-90, 90),
        y: gsap.utils.random(-110, -40),
        scale: 0.3,
        opacity: 0,
        duration: gsap.utils.random(0.7, 1.1),
        ease: "power2.out",
        onComplete: () => orb.remove(),
      },
    );
  }
}

/**
 * Tracks: cards start sealed. On desktop the unicorn rider trots along the
 * crystal ledges (row 1 left to right, hop down, row 2 back), stopping on each
 * card to break its seal; positions come from the real layout. Elsewhere each
 * card unseals as it scrolls in.
 */
export function TracksMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = ref.current!;
      const list = scope.querySelector<HTMLElement>(".mc-runes")!;
      const slots = [...list.querySelectorAll<HTMLElement>(":scope > .mc-rune-slot")];
      const extra = scope.querySelector<HTMLElement>(".mc-rune-extra .mc-rune-inner");
      const rider = list.querySelector<HTMLElement>(".mc-rider")!;
      const inners = [...slots.map((s) => s.querySelector<HTMLElement>(".mc-rune-inner")!), ...(extra ? [extra] : [])];

      const unseal = (inner: HTMLElement) =>
        gsap
          .timeline()
          .to(inner, { rotationY: 0, duration: 0.8, ease: "back.out(1.7)" })
          .fromTo(
            inner.parentElement!.querySelector(".mc-rune-flash"),
            { opacity: 0.9, scale: 0.6 },
            { opacity: 0, scale: 1.6, duration: 0.6, ease: "power2.out" },
            0.15,
          );

      const mm = gsap.matchMedia();
      mm.add(
        {
          desk: `(min-width: 1024px) and ${MOTION}`,
          small: `(max-width: 1023.98px) and ${MOTION}`,
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desk, small } = ctx.conditions!;
          if (!desk && !small) {
            gsap.set(inners, { rotationY: 0 });
            return;
          }
          dropHeading(scope);
          gsap.set(inners, { rotationY: 180 });

          if (small || slots.length < 6) {
            inners.forEach((inner) =>
              ScrollTrigger.create({ trigger: inner, start: "top 80%", once: true, onEnter: () => unseal(inner) }),
            );
            return;
          }

          // Rider stands on the ledge above a slot, centred on it.
          const at = (s: HTMLElement) => s.offsetLeft + s.offsetWidth / 2 - rider.offsetWidth / 2;
          const top = (s: HTMLElement) => s.offsetTop - rider.offsetHeight + 6;
          const offLeft = () => -list.getBoundingClientRect().left - rider.offsetWidth - 40;
          const [r1, r2] = [slots[0], slots[3]];

          const tl = gsap.timeline({
            scrollTrigger: { trigger: list, start: "top 60%", once: true },
            defaults: { ease: "none" },
          });
          tl.set(rider, { autoAlpha: 1, scaleX: 1, x: offLeft, y: () => top(r1) });
          [0, 1, 2].forEach((i) => {
            tl.to(rider, { x: () => at(slots[i]), duration: i ? 1.1 : 1.4 }).add(unseal(inners[i]), "+=0.1").to({}, { duration: 0.35 });
          });
          // Off the end of row 1, turn round and hop down to row 2.
          tl.to(rider, { x: () => at(slots[2]) + 150, duration: 0.6 })
            .set(rider, { scaleX: -1 })
            .to(rider, { y: () => top(r2), duration: 0.6, ease: "bounce.out" });
          [5, 4, 3].forEach((i) => {
            tl.to(rider, { x: () => at(slots[i]), duration: 1.1 }).add(unseal(inners[i]), "+=0.1").to({}, { duration: 0.35 });
          });
          tl.to(rider, { x: offLeft, duration: 1.4 });
          if (extra) tl.add(unseal(extra), "-=0.6");
        },
      );
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}

/** Rules: requirement ticks stamp in, chat lines arrive one by one, notes get pinned. */
export function RulesMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = ref.current!;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        dropHeading(scope);
        const once = (trigger: Element) => ({ trigger, start: "top 80%", once: true });
        const ticks = scope.querySelectorAll(".mc-tick");
        if (ticks.length)
          gsap.from(ticks, { scale: 0, rotation: -45, duration: 0.45, stagger: 0.35, ease: "back.out(3)", scrollTrigger: once(ticks[0]) });
        const lines = scope.querySelectorAll(".mc-chat-line");
        if (lines.length)
          gsap.from(lines, { autoAlpha: 0, x: -24, duration: 0.35, stagger: 0.6, ease: "steps(4)", scrollTrigger: once(lines[0]) });
        const notes = scope.querySelectorAll(".mc-note");
        if (notes.length)
          gsap.from(notes, {
            y: -80,
            rotation: () => gsap.utils.random(-25, 25),
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.09,
            ease: "back.out(1.6)",
            scrollTrigger: once(notes[0]),
          });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}

/**
 * Submission: the redstone signal travels the wire (across on desktop, down
 * on phones), each lamp switches on as it arrives and its item pops in, then
 * the crafted output appears with an XP burst.
 */
export function SubmissionMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = ref.current!;
      const wire = scope.querySelector<HTMLElement>(".mc-wire-on")!;
      const cards = [...scope.querySelectorAll<HTMLElement>(".mc-lamp-card")];
      const output = scope.querySelector<HTMLElement>(".mc-crafted")!;
      const mm = gsap.matchMedia();
      mm.add({ desk: `(min-width: 1024px) and ${MOTION}`, small: `(max-width: 1023.98px) and ${MOTION}` }, (ctx) => {
        dropHeading(scope);
        const axis = ctx.conditions!.desk ? "scaleX" : "scaleY";
        cards.forEach((c) => c.removeAttribute("data-on"));
        gsap.set(wire, { [axis]: 0 });
        gsap.set(output, { autoAlpha: 0, scale: 0.7 });

        const run = 3.2;
        const tl = gsap.timeline({ scrollTrigger: { trigger: scope.querySelector(".mc-circuit"), start: "top 70%", once: true } });
        tl.to(wire, { [axis]: 1, duration: run, ease: "none" }, 0);
        cards.forEach((c, i) => {
          const t = ((i + 0.5) / cards.length) * run;
          tl.call(() => c.setAttribute("data-on", ""), [], t);
          tl.fromTo(c.querySelector(".mc-lamp-item"), { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2.2)" }, t);
        });
        tl.to(output, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(1.8)", onComplete: () => burstOrbs(output) }, run + 0.1);

        return () => cards.forEach((c) => c.setAttribute("data-on", ""));
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}

/**
 * Mentors: trade offers slide in, then each trade completes in turn (the
 * arrow loads, the result pops, happy-villager sparkles); hover replays one.
 */
export function MentorsMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = ref.current!;
      const rows = [...scope.querySelectorAll<HTMLElement>(".mc-trade-row:not(.mc-trade-locked)")];
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        dropHeading(scope);
        const trade = (row: HTMLElement) =>
          gsap
            .timeline()
            .fromTo(row.querySelector(".mc-trade-fill"), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "steps(6)" })
            .fromTo(
              row.querySelector(".mc-trade-result img"),
              { scale: 0, rotation: -30 },
              { scale: 1, rotation: 0, duration: 0.45, ease: "back.out(2.5)", onComplete: () => sparkle(row) },
            );

        gsap.set(scope.querySelectorAll(".mc-trade-fill"), { scaleX: 0 });
        gsap.set(scope.querySelectorAll(".mc-trade-result img"), { scale: 0 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: scope.querySelector(".mc-trade"), start: "top 70%", once: true } });
        tl.from(scope.querySelectorAll(".mc-trade-row"), { x: 50, autoAlpha: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" });
        rows.forEach((row) => tl.add(trade(row), "-=0.2"));

        const off = rows.map((row) => {
          const replay = () => !tl.isActive() && trade(row);
          row.addEventListener("pointerenter", replay);
          return () => row.removeEventListener("pointerenter", replay);
        });
        return () => off.forEach((f) => f());
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}

/** Green happy-villager sparkles rising off a trade's result slot. */
function sparkle(row: HTMLElement) {
  const slot = row.querySelector<HTMLElement>(".mc-trade-result");
  if (!slot) return;
  for (let i = 0; i < 6; i++) {
    const p = document.createElement("span");
    p.className = "mc-happy";
    slot.appendChild(p);
    gsap.fromTo(
      p,
      { x: gsap.utils.random(-14, 14), y: 0, opacity: 1 },
      { y: gsap.utils.random(-46, -24), opacity: 0, duration: gsap.utils.random(0.6, 1), ease: "power1.out", onComplete: () => p.remove() },
    );
  }
}

const PARTICLE_COLORS = ["#b9a9ff", "#7a4cff", "#fcdc5f", "#e6d6ff", "#5ff2f2"];
const BREAK_COLORS = ["#8a5a32", "#6e6e78", "#5aa83a", "#7a4cff", "#fcdc5f", "#b9a9ff"];

/**
 * Page-wide effects. Scroll: an XP bar fills along the bottom with the level
 * counting sections. Pointer (fine
 * pointers only): a trail of pixel particles, a block-break burst on click,
 * buttons that lean towards the cursor, and a hero backdrop that follows it.
 */
export function PageFx() {
  const bar = useRef<HTMLDivElement>(null);
  const level = useRef<HTMLSpanElement>(null);
  const fx = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("main section")];
    // XP bar runs in every mode: it reports position, it isn't decoration.
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (st) => {
        bar.current!.style.setProperty("--xp", st.progress.toFixed(4));
        const mid = innerHeight / 2;
        const lv = sections.filter((s) => s.getBoundingClientRect().top < mid).length - 1;
        level.current!.textContent = String(Math.max(0, lv));
      },
    });

    const mm = gsap.matchMedia();
    mm.add(`${MOTION} and (pointer: fine)`, () => {
      const layer = fx.current!;
      let alive = 0;
      let last = 0;
      const spawn = (x: number, y: number, colors: string[], burst: boolean) => {
        if (alive > 70) return;
        alive++;
        const p = document.createElement("span");
        p.className = "mc-particle";
        p.style.background = colors[(Math.random() * colors.length) | 0];
        const size = burst ? gsap.utils.random(8, 14, 1) : gsap.utils.random(6, 10, 1);
        gsap.set(p, { x, y, width: size, height: size });
        layer.appendChild(p);
        gsap.to(p, {
          x: x + gsap.utils.random(burst ? -70 : -14, burst ? 70 : 14),
          y: y + (burst ? gsap.utils.random(-70, 40) : gsap.utils.random(10, 40)),
          opacity: 0,
          scale: 0.3,
          duration: burst ? gsap.utils.random(0.6, 1) : gsap.utils.random(0.8, 1.2),
          ease: burst ? "power2.out" : "power1.in",
          onComplete: () => {
            p.remove();
            alive--;
          },
        });
        // Burst pieces fall like broken block bits.
        if (burst) gsap.to(p, { y: `+=${gsap.utils.random(60, 120)}`, duration: 0.9, ease: "power2.in", delay: 0.15 });
      };
      const move = (e: PointerEvent) => {
        const now = performance.now();
        if (now - last < 28) return;
        last = now;
        spawn(e.clientX, e.clientY, PARTICLE_COLORS, false);
      };
      const down = (e: PointerEvent) => {
        for (let i = 0; i < 12; i++) spawn(e.clientX, e.clientY, BREAK_COLORS, true);
      };

      // Buttons lean a little towards the cursor.
      const offs: (() => void)[] = [];
      document.querySelectorAll<HTMLElement>(".mc-btn").forEach((btn) => {
        const x = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power3" });
        const y = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power3" });
        const over = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          x((e.clientX - r.left - r.width / 2) * 0.18);
          y((e.clientY - r.top - r.height / 2) * 0.3);
        };
        const out = () => {
          x(0);
          y(0);
        };
        btn.addEventListener("pointermove", over);
        btn.addEventListener("pointerleave", out);
        offs.push(() => {
          btn.removeEventListener("pointermove", over);
          btn.removeEventListener("pointerleave", out);
        });
      });

      // Hero backdrop follows the mouse for depth.
      const depth = document.querySelector<HTMLElement>(".mc-hero-depth");
      const hx = depth && gsap.quickTo(depth, "x", { duration: 1.2, ease: "power2" });
      const hy = depth && gsap.quickTo(depth, "y", { duration: 1.2, ease: "power2" });
      const look = (e: PointerEvent) => {
        if (!hx || !hy || scrollY > innerHeight) return;
        hx((e.clientX / innerWidth - 0.5) * -40);
        hy((e.clientY / innerHeight - 0.5) * -24);
      };

      addEventListener("pointermove", move, { passive: true });
      addEventListener("pointermove", look, { passive: true });
      addEventListener("pointerdown", down, { passive: true });
      return () => {
        removeEventListener("pointermove", move);
        removeEventListener("pointermove", look);
        removeEventListener("pointerdown", down);
        offs.forEach((f) => f());
        layer.replaceChildren();
      };
    });
    return () => mm.revert();
  });

  return (
    <>
      <div ref={bar} aria-hidden="true" className="mc-xpbar">
        <span ref={level} className="mc-xplevel mc-font">
          0
        </span>
        <div className="mc-xp">
          <span />
        </div>
      </div>
      <div ref={fx} aria-hidden="true" className="mc-fx" />
    </>
  );
}
