"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/data";
import {
  ExternalLink,
  Star,
  ArrowUpRight,
  Package,
  GitFork,
  Globe,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);



function TiltCard({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(card, {
        rotationY: (x / rect.width) * 10,
        rotationX: -(y / rect.height) * 10,
        duration: 0.45,
        ease: "power2.out",
        transformPerspective: 900,
      });
      gsap.to(card.querySelector(".card-glow"), {
        x: (x / rect.width) * 40 + rect.width / 2,
        y: (y / rect.height) * 40 + rect.height / 2,
        opacity: 1,
        duration: 0.4,
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.35)",
        transformPerspective: 900,
      });
      gsap.to(card.querySelector(".card-glow"), { opacity: 0, duration: 0.4 });
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card h-full "
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {/* Radial cursor glow */}
      <div
        className="card-glow absolute w-32 h-32 rounded-full pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(circle, ${color}25, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          zIndex: 0,
        }}
      />
      {children}
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);


  // Get all open source featured projects for spotlight
  const ossProjects = projects.filter(
    (p) => p.category === "Open Source" && p.featured,
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".reveal-item") ?? [],
        { opacity: 0, y: 35, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
      if (spotlightRef.current) {
        gsap.fromTo(
          spotlightRef.current.querySelectorAll(".oss-spotlight-card"),
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: spotlightRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);



  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-spacing relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[90px]" />
        <div className="absolute top-1/4 left-0 w-[280px] h-[280px] rounded-full bg-cyan-500/5 blur-[80px]" />
      </div>

      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className="section-header">
          <p className="reveal-item opacity-0 section-label mb-4 tracking-[0.3em] font-bold">Portfolio</p>
          <h2 className="reveal-item opacity-0 text-3xl sm:text-5xl md:text-6xl font-black gradient-text-2 mb-6 tracking-tighter leading-tight">
            Featured Projects
          </h2>
          <p className="reveal-item opacity-0 text-slate-400/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            A selection of enterprise solutions, open-source contributions, and
            personal projects I&apos;ve built throughout my career.
          </p>
        </div>

        {/* ── Open Source Spotlights ── */}
        {ossProjects.length > 0 && (
          <div
            ref={spotlightRef}
            className="mb-20  sm:mb-28 grid md:grid-cols-2 gap-8 lg:gap-12"
          >
            {ossProjects.map((oss) => (
              <div key={oss.id} className="oss-spotlight-card opacity-0">
                <div
                  className="relative  rounded-2xl overflow-hidden border border-purple-500/25 hover:border-purple-500/50 transition-all duration-500 group h-full"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(168,85,247,0.06) 0%, rgba(99,102,241,0.04) 50%, rgba(6,182,212,0.04) 100%)",
                  }}
                >
                  {/* Animated top gradient bar */}
                  <div
                    className="h-[2px] w-full"
                    style={{
                      background: `linear-gradient(90deg, ${oss.color}, #6366f1, #06b6d4, ${oss.color})`,
                      backgroundSize: "200% 100%",
                      animation: "shimmer-bar 3s linear infinite",
                    }}
                  />

                  {/* Background glow */}
                  <div
                    className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[60px] pointer-events-none group-hover:opacity-100 opacity-60 transition-all duration-700"
                    style={{ background: `${oss.color}12` }}
                  />

                  <div
                    className="p-6 sm:p-10 lg:p-12 p-4"
                    style={{ padding: `12px` }}
                  >
                    {/* Top: icon + badge */}
                    <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                      <div
                        className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-2xl sm:text-4xl shrink-0"
                        style={{
                          background: `${oss.color}18`,
                          border: `1px solid ${oss.color}35`,
                        }}
                      >
                        {oss.title.includes("Barcode") ? "📦" : "🌐"}
                      </div>
                      <div>
                        <span
                          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold"
                          style={{
                            background: `${oss.color}18`,
                            color: oss.color,
                            border: `1px solid ${oss.color}35`,
                          }}
                        >
                          <Star
                            size={10}
                            className="fill-current sm:size-[14px]"
                          />{" "}
                          Open Source
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-100 mb-4 sm:mb-5 group-hover:text-purple-300 transition-colors duration-300 leading-tight">
                      {oss.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-base leading-relaxed mb-6 sm:mb-8 line-clamp-3">
                      {oss.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                      {oss.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold"
                          style={{
                            background: `${oss.color}15`,
                            color: oss.color,
                            border: `1px solid ${oss.color}25`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-wrap gap-4 sm:gap-6 text-[10px] sm:text-sm text-slate-500 mb-8 sm:mb-10">
                      {oss.title.includes("Barcode") ? (
                        <>
                          <div className="flex items-center gap-1.5">
                            <Package
                              size={12}
                              className="text-purple-400 sm:size-[14px]"
                            />
                            <span>Composer Package</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-1.5">
                            <Package
                              size={12}
                              style={{ color: oss.color }}
                              className="sm:size-[14px]"
                            />
                            <span>NPM Package</span>
                          </div>
                        </>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Star
                          size={12}
                          style={{ color: oss.color }}
                          className="sm:size-[14px]"
                        />
                        <span>Featured</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 sm:gap-4">
                      {oss.github && (
                        <MagneticButton strength={0.3}>
                          <a
                            href={oss.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm cursor-none transition-all duration-300"
                            style={{
                              background: `${oss.color}15`,
                              color: oss.color,
                              border: `1px solid ${oss.color}30`,
                            }}
                          >
                            <GithubIcon size={14} />
                            GitHub
                          </a>
                        </MagneticButton>
                      )}
                      {oss.link && (
                        <MagneticButton strength={0.3}>
                          <a
                            href={oss.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm cursor-none text-white shadow-lg"
                            style={{
                              background: `${oss.color}cc`,
                              boxShadow: `0 8px 20px ${oss.color}25`,
                            }}
                          >
                            <ExternalLink size={14} />
                            Package
                          </a>
                        </MagneticButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

<br></br>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative"
              style={{ perspective: "900px" }}
            >
              <TiltCard color={project.color}>
                <div
                  className="glass-card rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-opacity-60"
                  style={{ borderColor: `${project.color}30` }}
                >
                  {/* Top accent */}
                  <div
                    className="h-[3px] w-full shrink-0"
                    style={{
                      background: `linear-gradient(90deg, ${project.color}, ${project.color}20)`,
                    }}
                  />

                  <div className="p-6 flex flex-col flex-1 relative z-10">
                    {/* Card header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-base shrink-0 transition-transform group-hover:scale-110"
                          style={{
                            background: `${project.color}18`,
                            border: `1px solid ${project.color}35`,
                          }}
                        >
                          {project.category === "Open Source"
                            ? "📦"
                            : project.category === "DevOps"
                              ? "🚀"
                              : "🏢"}
                        </div>
                        <div className="min-w-0">
                          <span
                            className="text-xs font-bold block"
                            style={{ color: project.color }}
                          >
                            {project.category}
                          </span>
                          {project.featured && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star
                                size={9}
                                className="text-yellow-400 fill-yellow-400"
                              />
                              <span className="text-[10px] text-yellow-400 font-semibold">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {project.github && (
                          <MagneticButton strength={0.5} className="-m-5">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg btn-icon cursor-none"
                            >
                              <GithubIcon size={13} />
                            </a>
                          </MagneticButton>
                        )}
                        {project.link && (
                          <MagneticButton strength={0.5} className="-m-5">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg btn-icon cursor-none"
                            >
                              <ExternalLink size={13} />
                            </a>
                          </MagneticButton>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-base sm:text-lg font-bold text-slate-100 mb-3 leading-snug transition-colors duration-200"
                      style={{ color: undefined }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = project.color)
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                    >
                      {project.title}
                    </h3>

                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <MagneticButton>
            <a
              href="https://github.com/isahaq1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-outline text-slate-200 font-semibold cursor-none text-sm sm:text-base"
            >
              <GithubIcon size={17} />
              View All on GitHub
              <ArrowUpRight size={15} />
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
