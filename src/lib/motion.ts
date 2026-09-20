import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared motion vocabulary so every section reveals with the same rhythm.
 * Durations are in seconds; distances in px.
 */
export const EASE = {
  out: "power3.out",
  expo: "expo.out",
  back: "back.out(1.6)",
  elastic: "elastic.out(1, 0.4)",
} as const;

export const DURATION = {
  fast: 0.45,
  base: 0.8,
  slow: 1.1,
} as const;

export const STAGGER = {
  tight: 0.06,
  base: 0.1,
  loose: 0.15,
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Targets = gsap.TweenTarget;

interface RevealOptions {
  /** Element that triggers the reveal. Defaults to the first target. */
  trigger?: Element | null;
  /** ScrollTrigger start position. */
  start?: string;
  /** Vertical travel distance in px. */
  y?: number;
  /** Optional scale from-value. */
  scale?: number;
  /** Blur amount in px applied at the start of the reveal. */
  blur?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  delay?: number;
}

/**
 * Standard scroll-linked reveal: fade + rise + de-blur.
 * Honors `prefers-reduced-motion` by snapping to the final state.
 */
export function revealOnScroll(targets: Targets, options: RevealOptions = {}) {
  const {
    trigger,
    start = "top 82%",
    y = 32,
    scale,
    blur = 6,
    duration = DURATION.base,
    stagger = STAGGER.base,
    ease = EASE.expo,
    delay = 0,
  } = options;

  const list = gsap.utils.toArray<Element>(targets);
  if (list.length === 0) return null;

  if (prefersReducedMotion()) {
    gsap.set(list, { opacity: 1, y: 0, scale: 1, filter: "none" });
    return null;
  }

  return gsap.fromTo(
    list,
    {
      opacity: 0,
      y,
      ...(scale !== undefined ? { scale } : {}),
      filter: blur ? `blur(${blur}px)` : "none",
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration,
      stagger,
      ease,
      delay,
      clearProps: "filter",
      scrollTrigger: {
        trigger: trigger ?? list[0],
        start,
        once: true,
      },
    },
  );
}
