"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/lib/data";
import SkillsSolarSystem from "./SkillsSolarSystem";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const solarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".reveal-item") ?? [],
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true } }
      );

      gsap.fromTo(
        solarRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: solarRef.current, start: "top 80%", once: true } }
      );

      gsap.fromTo(
        gridRef.current?.querySelectorAll(".skill-card") ?? [],
        { opacity: 0, y: 50, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.13, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 75%", once: true } }
      );

      const bars = gridRef.current?.querySelectorAll(".skill-bar-fill") ?? [];
      bars.forEach((bar) => {
        const target = (bar as HTMLElement).dataset.level ?? "0";
        gsap.fromTo(bar, { scaleX: 0 }, {
          scaleX: parseFloat(target) / 100,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: bar, start: "top 90%", once: true },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-spacing relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-16 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[90px]" />
        <div className="absolute bottom-1/4 -right-16 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[90px]" />
      </div>

      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-24 lg:mb-32">
          <p className="reveal-item opacity-0 section-label mb-6">What I work with</p>
          <h2 className="reveal-item opacity-0 text-3xl sm:text-4xl md:text-5xl font-bold gradient-text-2 mb-8">
            Skills &amp; Technologies
            </h2>
          <p className="reveal-item opacity-0 text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            A comprehensive toolkit built over 5+ years of professional development across multiple
            domains and industries.
            </p>
          </div>
          
        {/* Solar system orbit animation */}
        <div ref={solarRef} className="opacity-0 mb-20 sm:mb-32 lg:mb-40 scale-75 sm:scale-100 origin-center transition-transform">
              <SkillsSolarSystem />
            </div>

        {/* Skill categories grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {skills.map((category, ci) => (
            <div key={ci} className="skill-card opacity-0 glass-card rounded-2xl p-6 lg:p-8 hover:border-indigo-500/30 transition-colors">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl sm:text-2xl">{category.icon}</span>
                <h3 className="text-base sm:text-lg font-bold" style={{ color: category.color }}>
                  {category.category}
                </h3>
                <div className="ml-auto px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{ background: `${category.color}15`, border: `1px solid ${category.color}30`, color: category.color }}>
                  {category.items.length} skills
          </div>
        </div>

              {/* Skills */}
              <div className="space-y-4">
                {category.items.map((skill, si) => (
                  <div key={si}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs sm:text-sm text-slate-300 font-medium">{skill.name}</span>
                      <span className="text-xs font-mono" style={{ color: category.color }}>{skill.level}%</span>
                      </div>
                    <div className="h-[3px] bg-slate-800/80 rounded-full overflow-hidden">
                      <div
                        className="skill-bar-fill h-full rounded-full origin-left"
                        data-level={skill.level}
                        style={{
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                          boxShadow: `0 0 8px ${category.color}50`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-slate-600">
          {[
            { label: "Expert (90%+)", color: "#6366f1" },
            { label: "Advanced (75–90%)", color: "#a855f7" },
            { label: "Proficient (60–75%)", color: "#06b6d4" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-8 h-[3px] rounded-full" style={{ background: color }} />
              <span>{label}</span>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
