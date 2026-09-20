"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences, personalInfo } from "@/lib/data";
import { Briefcase, Calendar, MapPin, Sparkles, ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import MagneticButton from "./MagneticButton";
import { revealOnScroll, prefersReducedMotion, EASE } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll(headerRef.current?.querySelectorAll(".reveal-item") ?? [], {
        trigger: headerRef.current,
      });

      // Timeline line draws as you scroll
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          ".timeline-line-path",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              end: "bottom 75%",
              scrub: 0.6,
            },
          },
        );
      } else {
        gsap.set(".timeline-line-path", { scaleY: 1 });
      }

      // Cards slide in from their side of the timeline
      const cards = timelineRef.current?.querySelectorAll(".exp-card") ?? [];
      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        if (prefersReducedMotion()) {
          gsap.set(card, { opacity: 1, x: 0 });
          return;
        }
        gsap.fromTo(
          card,
          { opacity: 0, x: fromLeft ? -48 : 48, y: 24 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            ease: EASE.expo,
            scrollTrigger: { trigger: card, start: "top 82%", once: true },
          },
        );
      });

      // Year watermarks
      revealOnScroll(".exp-year", {
        trigger: timelineRef.current,
        y: 16,
        blur: 0,
        stagger: 0.2,
      });

      // Nodes pop in
      gsap.fromTo(
        ".timeline-node",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: EASE.back,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );

      revealOnScroll(ctaRef.current, { trigger: ctaRef.current, y: 40 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-spacing relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-indigo-500/[0.06] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-purple-500/[0.05] blur-[110px]" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeader
          ref={headerRef}
          eyebrow="Career Path"
          title={
            <>
              Professional <span className="gradient-text">Milestones</span>
            </>
          }
          lead="A journey of technical leadership, architectural decisions, and constant innovation across high-stakes enterprise projects."
        />

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-6xl mx-auto">
          {/* Backbone */}
          <div className="absolute left-5 lg:left-1/2 top-2 bottom-2 w-px bg-white/[0.06] lg:-translate-x-1/2 overflow-hidden rounded-full">
            <div className="timeline-line-path w-full h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500/40 origin-top" />
          </div>

          <ol className="space-y-12 lg:space-y-20">
            {experiences.map((exp, i) => {
              const startYear = exp.period.split("–")[0].trim();
              const isLeft = i % 2 === 0;
              const isCurrent = exp.type === "Current";

              return (
                <li
                  key={exp.id}
                  className="relative flex flex-col lg:flex-row lg:items-start group"
                >
                  {/* Node */}
                  <div className="timeline-node absolute left-5 lg:left-1/2 top-8 -translate-x-1/2 z-20">
                    <div className="relative w-4 h-4">
                      {isCurrent && (
                        <span className="absolute -inset-1.5 rounded-full bg-indigo-400/25 animate-ping" />
                      )}
                      <span className="absolute inset-0 rounded-full bg-indigo-500 shadow-[0_0_14px_rgba(99,102,241,0.9)] group-hover:shadow-[0_0_22px_rgba(99,102,241,1)] transition-shadow duration-500" />
                      <span className="absolute inset-[4px] rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Year watermark (desktop, opposite side) */}
                  <div
                    className={`hidden lg:flex lg:w-1/2 pt-5 ${
                      isLeft
                        ? "order-2 justify-start pl-14"
                        : "order-1 justify-end pr-14"
                    }`}
                  >
                    <div className="exp-year opacity-0 flex flex-col gap-1 group-hover:-translate-y-1 transition-transform duration-500">
                      <span className="text-6xl xl:text-7xl font-black leading-none tracking-tighter text-white/[0.06] group-hover:text-indigo-400/20 transition-colors duration-500">
                        {startYear}
                      </span>
                      <span className="chip-muted self-start">
                        {exp.company}
                      </span>
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`w-full pl-14 lg:pl-0 lg:w-1/2 ${
                      isLeft ? "order-1 lg:pr-14" : "order-2 lg:pl-14"
                    }`}
                  >
                    <article className="exp-card opacity-0 glass-card glass-card-lift rounded-3xl p-6 sm:p-8 lg:p-9 relative overflow-hidden">
                      {/* Accent edge */}
                      <div
                        className={`absolute top-0 ${isLeft ? "right-0" : "left-0"} h-full w-[3px] bg-gradient-to-b ${
                          isCurrent
                            ? "from-emerald-400 via-indigo-500 to-transparent"
                            : "from-indigo-500 via-purple-500 to-transparent"
                        } opacity-70`}
                      />
                      <Sparkles
                        size={72}
                        className="absolute -top-2 -right-2 text-white opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500"
                      />

                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-2 mb-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-[0.16em] border ${
                            isCurrent
                              ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/25"
                              : "bg-indigo-500/10 text-indigo-300 border-indigo-500/25"
                          }`}
                        >
                          {isCurrent && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          )}
                          {exp.type}
                        </span>
                        <span className="chip-muted">
                          <Calendar size={11} className="text-indigo-400" />
                          {exp.period}
                        </span>
                      </div>

                      {/* Title block */}
                      <h3 className="heading-3 text-white mb-3 group-hover:text-indigo-200 transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6 text-sm">
                        <span className="inline-flex items-center gap-2 text-indigo-300 font-semibold">
                          <Briefcase size={15} />
                          {exp.company}
                        </span>
                        <span className="inline-flex items-center gap-2 text-slate-500">
                          <MapPin size={15} />
                          {personalInfo.location}
                        </span>
                      </div>

                      <p className="body-copy mb-6">{exp.description}</p>

                      {/* Highlights */}
                      <ul className="space-y-2.5 mb-7">
                        {exp.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-3 group/hi hover:translate-x-1 transition-transform duration-300"
                          >
                            <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-indigo-400/60 group-hover/hi:bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.6)] shrink-0 transition-colors" />
                            <span className="text-sm sm:text-[15px] text-slate-400 group-hover/hi:text-slate-200 transition-colors leading-relaxed">
                              {h}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Stack */}
                      <div className="flex flex-wrap gap-2 pt-6 border-t border-white/[0.06]">
                        {exp.tech.map((t) => (
                          <span key={t} className="tech-badge">
                            {t}
                          </span>
                        ))}
                      </div>
                    </article>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="opacity-0 mt-16 lg:mt-24 relative overflow-hidden rounded-3xl border border-indigo-500/15 bg-gradient-to-br from-indigo-600/[0.08] via-transparent to-purple-600/[0.06] p-8 sm:p-12 lg:p-16 text-center group"
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[240px] rounded-full bg-indigo-500/15 blur-[90px] pointer-events-none group-hover:bg-indigo-500/25 transition-colors duration-700" />

          <div className="relative flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-7 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
              <Sparkles size={28} className="text-indigo-300" />
            </div>
            <h3 className="display-2 text-white mb-4 max-w-2xl">
              Let&apos;s build the{" "}
              <span className="gradient-text">next big thing.</span>
            </h3>
            <p className="section-lead mx-auto mb-9">
              My timeline continues here. I&apos;m ready to bring my expertise
              in high-concurrency systems and technical leadership to your next
              breakthrough project.
            </p>
            <MagneticButton className="-m-5">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 rounded-full btn-primary text-sm cursor-none"
              >
                Start a Conversation
                <ArrowRight size={16} />
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
