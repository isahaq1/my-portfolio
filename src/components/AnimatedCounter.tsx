"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  value: string; // e.g. "5+" or "30+"
  className?: string;
}

export default function AnimatedCounter({ value, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Parse numeric part and suffix
    const numMatch = value.match(/^(\d+)(\D*)$/);
    if (!numMatch) return;
    const num = parseInt(numMatch[1], 10);
    const suffix = numMatch[2] ?? "";

    const obj = { v: 0 };
    gsap.to(obj, {
      v: num,
      duration: 2.2,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate() {
        el.textContent = Math.round(obj.v) + suffix;
      },
      onComplete() {
        el.textContent = value; // ensure exact final value
      },
    });
  }, [value]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
