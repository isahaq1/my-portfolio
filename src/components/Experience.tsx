"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/lib/data";
import {
  ArrowUp,
  Briefcase,
  Calendar,
  ChevronRight,
  MapPin,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveals with blur
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".reveal-item") ?? [],
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      // Timeline line drawing
      gsap.fromTo(
        ".timeline-line-path",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          },
        },
      );

      // Experience cards arrival
      const cards = timelineRef.current?.querySelectorAll(".exp-item") ?? [];
      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: isLeft ? -100 : 100, filter: "blur(10px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      // Dots pop-in
      gsap.fromTo(
        ".timeline-node",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);



  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-36 relative overflow-hidden bg-[#050510] font-sans"
    >
      {/* Structural Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/[0.02] to-transparent" />
      </div>

      <div className="section-container relative z-10">
        {/* Modern Header Section */}
        <div
          ref={headerRef}
          className="mb-12 lg:mb-20 text-center max-w-4xl mx-auto"
        >
          <div className="reveal-item opacity-0 inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <div className="h-px w-10 bg-indigo-500/70" />
            <span className="text-xs font-black text-indigo-300 uppercase tracking-[0.3em]">
              Career Path
            </span>
          </div>
          <h2 className="reveal-item opacity-0 text-3xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
            Professional <br />{" "}
            <span className="gradient-text">Milestones.</span>
          </h2>
          <p className="reveal-item opacity-0 text-slate-400/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            A journey of technical leadership, architectural decisions, and
            constant innovation across high-stakes enterprise projects.
          </p>
        </div>

        {/* Centralized Timeline Component */}
        <div
          ref={timelineRef}
          className="relative mt-20 sm:mt-32 max-w-6xl mx-auto"
        >
          {/* Main Visual Backbone */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-white/5 lg:-translate-x-1/2 overflow-hidden">
            <div className="timeline-line-path w-full h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent origin-top" />
          </div>

          <div className="space-y-20 lg:space-y-32">
            {experiences.map((exp, i) => {
              const dateParts = exp.period.split("–");
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className="exp-item opacity-0 flex flex-col lg:flex-row items-start relative group"
                >
                  {/* Timeline Pulse Node */}
                  <div className="timeline-node absolute left-6 lg:left-1/2 top-10 -translate-x-1/2 z-20">
                    <div className="w-4 h-4 rounded-full bg-white border-4 border-indigo-600 shadow-[0_0_15px_rgba(99,102,241,1)] group-hover:scale-125 transition-transform duration-500" />
                    <div className="absolute inset-0 rounded-full bg-indigo-400/30 animate-ping" />
                  </div>

                  {/* Period Indicator (Opposite Side on Desktop) */}
                  <div
                    className={`hidden lg:flex lg:w-[45%] mt-8 ${isLeft ? "order-2 justify-start pl-10" : "order-1 justify-end pr-10"}`}
                  >
                    <div className="group-hover:translate-y-[-5px] transition-transform duration-500">
                      <span className="text-5xl xl:text-6xl font-black text-white/5 tracking-tighter group-hover:text-indigo-500/20 transition-colors">
                        {dateParts[0].trim()}
                      </span>
                    </div>
                  </div>

                  {/* Main Content Card (Alternating on Desktop) */}
                  <div
                    className={`w-full pl-16 lg:pl-0 lg:w-[45%] ${isLeft ? "order-1 lg:pr-12 xl:pr-20" : "order-2 lg:pl-12 xl:pl-20"}`}
                  >
                    <div className="glass-card rounded-[2.5rem] p-8 lg:p-12 border border-white/5 hover:border-indigo-500/20 transition-all duration-700 bg-white/[0.02] shadow-2xl hover:-translate-y-1 relative overflow-hidden">
                      {/* Subtle Background Mark */}
                      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                        <Sparkles size={80} className="text-white" />
                      </div>

                      {/* Card Header */}
                      <div className="flex flex-col gap-4 mb-10">
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${exp.type === "Current" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"}`}
                          >
                            {exp.type}
                          </span>
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white/5 px-4 py-1.5 rounded-full">
                            <Calendar size={12} className="text-indigo-400" />
                            {exp.period}
                          </div>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight leading-none">
                          {exp.role}
                        </h3>

                        <div className="flex flex-wrap items-center gap-6">
                          <div className="flex items-center gap-2 text-indigo-400 group-hover:text-white transition-colors">
                            <Briefcase size={16} />
                            <span className="text-sm font-bold uppercase tracking-wider">
                              {exp.company}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500">
                            <MapPin size={16} />
                            <span className="text-sm font-medium">
                              Remote / DHAKA
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description & Impact List */}
                      <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10 font-medium">
                        {exp.description}
                      </p>

                      <div className="space-y-4 mb-12">
                        {exp.highlights.map((h, hi) => (
                          <div
                            key={hi}
                            className="flex items-start gap-3 group/hi hover:translate-x-1 transition-transform"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/30 mt-2.5 group-hover/hi:bg-indigo-500 transition-colors shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                            <span className="text-sm sm:text-base text-slate-400 group-hover/hi:text-slate-200 transition-colors leading-relaxed">
                              {h}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* High-Contrast Stack */}
                      <div className="flex flex-wrap gap-2 pt-8 border-t border-white/5">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-indigo-500/30 hover:text-white transition-all duration-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic CTA Footer Section */}
        <div className="mt-24 lg:mt-36 p-10 lg:p-16 rounded-[3rem] bg-indigo-600/[0.03] border border-indigo-500/10 flex flex-col items-center text-center group hover:bg-indigo-600/[0.05] transition-all duration-1000 reveal-item opacity-0">
          <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
            <Sparkles size={40} className="text-indigo-400" />
          </div>
          <h4 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-tighter leading-none">
            Let&apos;s build the <br />{" "}
            <span className="gradient-text">next big thing.</span>
          </h4>
          <p className="text-slate-500 text-lg sm:text-xl font-medium max-w-2xl mb-12">
            My timeline continues here. I&apos;m ready to bring my expertise in
            high-concurrency systems and technical leadership to your next
            breakthrough project.
          </p>
          <a
            href="#contact"
            className="px-8 sm:px-10 py-3.5 sm:py-5 rounded-full btn-primary font-black text-xs sm:text-sm tracking-[0.2em] uppercase transition-all hover:scale-105 shadow-2xl shadow-indigo-500/20 text-center inline-block"
          >
            Initiate Collaboration
          </a>
        </div>
      </div>

    </section>
  );
}
