"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/lib/data";
import SkillsSolarSystem from "./SkillsSolarSystem";
import SectionHeader from "./SectionHeader";
import { revealOnScroll, prefersReducedMotion, EASE } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const LEGEND = [
  { label: "Expert · 90%+", color: "#6366f1" },
  { label: "Advanced · 75–90%", color: "#a855f7" },
  { label: "Proficient · 60–75%", color: "#06b6d4" },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const solarRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll(headerRef.current?.querySelectorAll(".reveal-item") ?? [], {
        trigger: headerRef.current,
      });

      revealOnScroll(solarRef.current, {
        trigger: solarRef.current,
        y: 0,
        scale: 0.9,
        blur: 0,
        duration: 1.2,
      });

      revealOnScroll(gridRef.current?.querySelectorAll(".skill-card") ?? [], {
        trigger: gridRef.current,
        start: "top 78%",
        y: 40,
        scale: 0.97,
        stagger: 0.12,
      });

      const bars = gridRef.current?.querySelectorAll(".skill-bar-fill") ?? [];
      bars.forEach((bar) => {
        const target = parseFloat((bar as HTMLElement).dataset.level ?? "0");
        if (prefersReducedMotion()) {
          gsap.set(bar, { scaleX: target / 100 });
          return;
        }
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: target / 100,
            duration: 1.3,
            ease: EASE.expo,
            scrollTrigger: { trigger: bar, start: "top 90%", once: true },
          },
        );
      });

      revealOnScroll(legendRef.current, {
        trigger: legendRef.current,
        y: 16,
        blur: 0,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-spacing relative overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-16 w-[340px] h-[340px] rounded-full bg-indigo-500/[0.06] blur-[100px]" />
        <div className="absolute bottom-1/4 -right-16 w-[340px] h-[340px] rounded-full bg-cyan-500/[0.05] blur-[100px]" />
      </div>

      <div className="section-container">
        <SectionHeader
          ref={headerRef}
          eyebrow="What I work with"
          title={
            <>
              Skills &amp; <span className="gradient-text">Technologies</span>
            </>
          }
          lead="A comprehensive toolkit built over 6+ years of professional development across multiple domains and industries."
        />

        {/* Solar system orbit animation */}
        <div
          ref={solarRef}
          className="opacity-0 mb-14 sm:mb-20 lg:mb-24 scale-75 sm:scale-100 origin-center"
        >
          <SkillsSolarSystem />
        </div>

        {/* Skill categories grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
        >
          {skills.map((category) => (
            <article
              key={category.category}
              className="skill-card opacity-0 glass-card glass-card-lift rounded-3xl p-6 sm:p-7 lg:p-8"
            >
              {/* Category header */}
              <header className="flex items-center gap-3.5 mb-6 pb-5 border-b border-white/[0.06]">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{
                    background: `${category.color}14`,
                    border: `1px solid ${category.color}30`,
                    boxShadow: `0 0 24px -8px ${category.color}80`,
                  }}
                >
                  {category.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-tight">
                    {category.category}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 font-semibold mt-0.5">
                    {category.items.length} technologies
                  </p>
                </div>
                <span
                  className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-bold tabular-nums"
                  style={{
                    background: `${category.color}14`,
                    border: `1px solid ${category.color}30`,
                    color: category.color,
                  }}
                >
                  {Math.round(
                    category.items.reduce((a, s) => a + s.level, 0) /
                      category.items.length,
                  )}
                  % avg
                </span>
              </header>

              {/* Skills */}
              <ul className="space-y-4">
                {category.items.map((skill) => (
                  <li key={skill.name}>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-sm text-slate-200 font-medium">
                        {skill.name}
                      </span>
                      <span
                        className="text-xs font-mono tabular-nums"
                        style={{ color: category.color }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                      <div
                        className="skill-bar-fill h-full rounded-full origin-left"
                        data-level={skill.level}
                        style={{
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}99)`,
                          boxShadow: `0 0 10px ${category.color}66`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Legend */}
        <div
          ref={legendRef}
          className="opacity-0 mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-slate-500"
        >
          {LEGEND.map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span
                className="w-8 h-1 rounded-full"
                style={{
                  background: color,
                  boxShadow: `0 0 10px ${color}80`,
                }}
              />
              <span className="font-medium tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
