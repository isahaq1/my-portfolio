"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  as?: "div" | "span";
}

export default function MagneticButton({
  children,
  strength = 0.35,
  className = "",
  as: Tag = "div",
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(wrap, { x: x * strength, y: y * strength, duration: 0.4, ease: "power2.out" });
      gsap.to(inner, { x: x * strength * 0.4, y: y * strength * 0.4, duration: 0.4, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(wrap, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.35)" });
      gsap.to(inner, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.35)" });
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={wrapRef} className={`inline-block will-change-transform ${className}`}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
