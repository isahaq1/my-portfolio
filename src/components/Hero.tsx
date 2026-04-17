"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TypeAnimation } from "react-type-animation";
import { personalInfo, stats, techStack } from "@/lib/data";
import { Mail, ArrowDown, MapPin, Briefcase } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import MagneticButton from "./MagneticButton";
import AnimatedCounter from "./AnimatedCounter";
import ParticleCanvas from "./ParticleCanvas";
import OrbitSystem from "./OrbitSystem";

interface Star {
  id: number; width: number; height: number;
  top: number; left: number; opacity: number;
  duration: number; delay: number;
}

export default function Hero() {
  const greetRef  = useRef<HTMLDivElement>(null);
  const nameRef   = useRef<HTMLHeadingElement>(null);
  const typeRef   = useRef<HTMLDivElement>(null);
  const descRef   = useRef<HTMLParagraphElement>(null);
  const ctaRef    = useRef<HTMLDivElement>(null);
  const statsRef  = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineRef   = useRef<HTMLDivElement>(null);

  const [stars, setStars] = useState<Star[]>([]);

  // Generate stars client-only (avoid SSR hydration mismatch)
  useEffect(() => {
    setStars(
      Array.from({ length: 50 }, (_, id) => ({
        id,
        width:    Math.random() * 2 + 0.8,
        height:   Math.random() * 2 + 0.8,
        top:      Math.random() * 100,
        left:     Math.random() * 100,
        opacity:  Math.random() * 0.4 + 0.08,
        duration: Math.random() * 3 + 2,
        delay:    Math.random() * 4,
      }))
    );
  }, []);

  useEffect(() => {
    // Entrance timeline
    const tl = gsap.timeline({ delay: 0.15 });

    // Decorative line
    tl.fromTo(lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.inOut" }
    )
    .fromTo(greetRef.current,
      { opacity: 0, y: 28, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(nameRef.current,
      { opacity: 0, y: 55, skewY: 4 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.0, ease: "power4.out" },
      "-=0.4"
    )
    .fromTo(typeRef.current,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(ctaRef.current?.querySelectorAll(".cta-item") ?? [],
      { opacity: 0, y: 24, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1, ease: "back.out(1.5)" },
      "-=0.3"
    )
    .fromTo(statsRef.current?.querySelectorAll(".stat-item") ?? [],
      { opacity: 0, y: 30, scale: 0.88 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.09, ease: "back.out(2)" },
      "-=0.2"
    )
    .fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.1"
    );

    // Mouse parallax
    const onMove = (e: MouseEvent) => {
      const mx = (e.clientX - window.innerWidth  / 2) / window.innerWidth;
      const my = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      gsap.to(".hero-blob-1", { x: mx * 30,  y: my * 30,  duration: 1.2, ease: "power2.out" });
      gsap.to(".hero-blob-2", { x: mx * -22, y: my * -22, duration: 1.4, ease: "power2.out" });
      gsap.to(".hero-blob-3", { x: mx * 14,  y: my * 14,  duration: 1.7, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-mesh grid-bg"
    >
      {/* Gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-blob-1 absolute -top-48 -left-48 w-[560px] h-[560px] rounded-full bg-indigo-500/10 blur-[110px]" />
        <div className="hero-blob-2 absolute -bottom-48 -right-48 w-[480px] h-[480px] rounded-full bg-purple-500/10 blur-[110px]" />
        <div className="hero-blob-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-cyan-500/5 blur-[80px]" />
      </div>

      {/* Interactive particle canvas */}
      <ParticleCanvas />

      {/* Static star layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {stars.map((s) => (
          <div key={s.id} className="absolute rounded-full bg-white"
            style={{
              width:    s.width  + "px",
              height:   s.height + "px",
              top:      s.top    + "%",
              left:     s.left   + "%",
              opacity:  s.opacity,
              animation:`twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ─── Main content — 2-column on large screens ─── */}
      <div className="relative z-10 w-full section-container pt-24 pb-28 lg:pt-36 lg:pb-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* ── Left column — text content ── */}
          <div className="text-center lg:text-left">
            {/* Decorative top line */}
            <div ref={lineRef} className="opacity-0 origin-left w-20 h-[2.5px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-8 lg:mb-12 mx-auto lg:ml-0" />

            {/* Available badge */}
            <div ref={greetRef} className="opacity-0 mb-8 lg:mb-10">
              <MagneticButton strength={0.25} className="mx-auto lg:ml-0">
                <div className="inline-flex items-center gap-2.5 sm:gap-4 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full glass-card border border-indigo-500/30">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className="text-xs sm:text-base text-slate-300 font-medium">Available for opportunities</span>
                </div>
              </MagneticButton>
            </div>

            {/* Name */}
            <h1
              ref={nameRef}
              className="opacity-0 font-black mb-6 lg:mb-8 tracking-tighter leading-[1.05]"
            >
              <span className="block text-slate-100/90 text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-2 sm:mb-4 tracking-tight">Hi, I&apos;m</span>
              <span className="block gradient-text drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                {personalInfo.name}
              </span>
            </h1>

            {/* Typewriter */}
            <div ref={typeRef} className="opacity-0 mb-6 lg:mb-10">
              <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 text-lg sm:text-xl md:text-2xl font-light text-slate-400">
                <span className="w-8 sm:w-12 h-[2px] bg-indigo-500/60 inline-block rounded-full" />
                <TypeAnimation
                  sequence={[
                    "Senior Full Stack Developer", 2200,
                    "Backend Architecture Expert", 2200,
                    "Enterprise Solutions Builder", 2200,
                  ]}
                  wrapper="span"
                  speed={52}
                  repeat={Infinity}
                  className="text-indigo-400 font-semibold tracking-wide"
                />
              </div>
            </div>

            {/* Bio */}
            <p ref={descRef} className="opacity-0 text-slate-400/90 text-base sm:text-lg lg:text-xl leading-[1.8] font-light tracking-wide mb-12 max-w-2xl mx-auto lg:mx-0">
              {personalInfo.shortBio}
            </p>

            {/* Location & company */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8 mb-10 lg:mb-12 text-sm sm:text-base text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-indigo-400" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="w-px h-4 bg-slate-700 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-indigo-400" />
                <span>{personalInfo.company}</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div ref={ctaRef} className="flex flex-wrap  items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-16 sm:mb-24">
              <MagneticButton className="cta-item opacity-0 -m-5">
                <a
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="px-7 sm:px-9 py-3.5 sm:py-4 rounded-full btn-primary font-bold cursor-none text-sm sm:text-base inline-flex items-center"
                >
                  View My Work <span className="text-base sm:text-lg ml-1">→</span>
                </a>
              </MagneticButton>
            </div>

            {/* Animated stats */}
            <div ref={statsRef} className="grid grid-cols-2 lg:flex justify-center lg:justify-start gap-8 sm:gap-16">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-item opacity-0 group">
                  <div className="text-2xl sm:text-3xl font-black gradient-text">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-600 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column — OrbitSystem ── */}
          <div className="flex items-center justify-center w-full h-full min-h-[320px] lg:min-h-[480px]">
            <OrbitSystem />
          </div>
        </div>
      </div>

      {/* Tech ticker — two rows, opposite directions */}
      <div className="absolute bottom-20 lg:bottom-24 left-0 right-0 overflow-hidden select-none pointer-events-none">
        <div className="py-5 border-t border-b border-indigo-500/10 space-y-4 backdrop-blur-[2px]">
          {/* Row 1 → */}
          <div className="ticker-track flex gap-12 whitespace-nowrap w-max">
            {[...techStack, ...techStack].map((tech, i) => (
              <span key={i} className="text-xs sm:text-sm text-slate-500 font-mono flex items-center gap-3">
                <span className="text-indigo-500/40">◆</span>{tech}
              </span>
            ))}
          </div>
          {/* Row 2 ← */}
          <div className="flex gap-12 whitespace-nowrap w-max" style={{ animation: "ticker 32s linear infinite reverse" }}>
            {[...techStack.slice().reverse(), ...techStack.slice().reverse()].map((tech, i) => (
              <span key={i} className="text-xs sm:text-sm text-slate-500/60 font-mono flex items-center gap-3">
                <span className="text-purple-500/30">◆</span>{tech}
              </span>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}
