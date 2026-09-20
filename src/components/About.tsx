"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { personalInfo } from "@/lib/data";
import { Mail, Code2, Server, Cloud } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import MagneticButton from "./MagneticButton";
import { revealOnScroll } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: <Code2 size={24} />,
    title: "Full Stack Mastery",
    desc: "Architecting seamless digital experiences from intuitive UIs to high-performance modular backends.",
    color: "#6366f1",
  },
  {
    icon: <Server size={24} />,
    title: "Systems Architect",
    desc: "Deeply experienced in building scalable microservices, secure ERPs, and resilient API infrastructures.",
    color: "#a855f7",
  },
  {
    icon: <Cloud size={24} />,
    title: "Cloud & DevOps",
    desc: "Optimizing the full deployment lifecycle with automated CI/CD, Docker, and cloud-native solutions.",
    color: "#06b6d4",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll(labelRef.current, { trigger: labelRef.current, y: 16 });

      revealOnScroll(contentRef.current?.querySelectorAll(".reveal-item") ?? [], {
        trigger: contentRef.current,
        start: "top 80%",
        y: 36,
      });

      revealOnScroll(cardsRef.current?.querySelectorAll(".highlight-card") ?? [], {
        trigger: cardsRef.current,
        start: "top 85%",
        y: 32,
        scale: 0.97,
        stagger: 0.14,
      });

      revealOnScroll(imageRef.current, {
        trigger: imageRef.current,
        start: "top 78%",
        y: 0,
        scale: 0.92,
        blur: 0,
        duration: 1.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Professional 3D Tilt Effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotationY: x * 15,
        rotationX: -y * 15,
        duration: 0.6,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      gsap.to(card.querySelector(".card-shine"), {
        opacity: 0.15,
        x: x * 40,
        y: y * 40,
        duration: 0.3,
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.4)",
      });
      gsap.to(card.querySelector(".card-shine"), {
        opacity: 0,
        duration: 0.5,
      });
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-spacing relative overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[100px]" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent" />
      </div>

      <div className="section-container relative z-10">
        {/* Section label */}
        <div ref={labelRef} className="opacity-0 mb-10 sm:mb-14">
          <span className="eyebrow">
            <span className="eyebrow-dash" aria-hidden />
            About Me
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 lg:mb-24">
          {/* ── Visual Side ── */}
          <div ref={imageRef} className="opacity-0 relative group min-w-0">
            {/* Multi-layered Glass Effect */}
            <div className="absolute -inset-6 rounded-[4rem] bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/10 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative pt-8 pb-10 px-4 sm:px-10">
              {/* 3D Glass Surface */}
              <div
                ref={cardRef}
                className="relative glass-card rounded-[2rem] p-7 sm:p-9 border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="card-shine absolute inset-0 opacity-0 pointer-events-none bg-gradient-to-br from-white/20 to-transparent blur-3xl transition-opacity duration-300" />

                {/* Avatar */}
                <div className="relative w-52 h-52 sm:w-64 sm:h-64 mx-auto mb-10 group/img">
                  <div className="absolute -inset-4 rounded-[2rem] bg-indigo-500/15 blur-2xl opacity-0 group-hover/img:opacity-100 transition-all duration-700" />
                  <div className="relative h-full w-full rounded-[1.75rem] p-2.5 border border-white/10 bg-white/5 backdrop-blur-xl">
                    <div className="relative h-full w-full rounded-[1.25rem] overflow-hidden border border-indigo-500/30">
                      <Image
                        src="/isahaq.jpeg"
                        alt={personalInfo.name}
                        fill
                        sizes="(max-width: 640px) 208px, 256px"
                        className="object-cover scale-105 group-hover/img:scale-100 transition-transform duration-1000"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center relative z-10">
                  <h3 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
                    {personalInfo.name}
                  </h3>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
                    <span className="text-[10px] text-indigo-300 font-extrabold uppercase tracking-[0.18em]">
                      {personalInfo.title}
                    </span>
                  </div>

                  {/* Social Integration */}
                  <div className="flex justify-center gap-5">
                    {[
                      {
                        href: personalInfo.github,
                        icon: <GithubIcon size={22} />,
                      },
                      {
                        href: personalInfo.linkedin,
                        icon: <LinkedinIcon size={22} />,
                      },
                      {
                        href: `mailto:${personalInfo.email}`,
                        icon: <Mail size={22} />,
                      },
                    ].map((btn, i) => (
                      <MagneticButton key={i} strength={0.4}>
                        <a
                          href={btn.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-13 h-13 rounded-2xl btn-icon cursor-none"
                        >
                          {btn.icon}
                        </a>
                      </MagneticButton>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Indicator Badge */}
              <div className="absolute -top-3 right-2 sm:top-4 sm:right-2 glass-card px-5 py-3 rounded-2xl border-green-500/30 flex items-center gap-2.5 shadow-2xl shadow-green-500/10 floating">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-[0_0_12px_rgba(74,222,128,1)]" />
                <span className="text-xs text-green-400 font-extrabold uppercase tracking-[0.12em]">
                  Available
                </span>
              </div>

              {/* Stats Module */}
              <div
                className="absolute -bottom-2 -left-1 sm:-bottom-1 sm:-left-3 glass-card px-6 py-4 rounded-2xl border-indigo-500/30 flex flex-col items-center shadow-2xl shadow-indigo-500/10 floating"
                style={{ animationDelay: "1s" }}
              >
                <span className="text-3xl font-black gradient-text mb-0.5 leading-none">
                  6+
                </span>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-[0.2em]">
                  Years Experience
                </span>
              </div>
            </div>
          </div>

          {/* ── Narrative Side ── */}
          <div ref={contentRef} className="min-w-0">
            <h2 className="reveal-item opacity-0 display-2 text-white mb-6">
              Engineering the <br />
              <span className="gradient-text">Unimaginable.</span>
            </h2>

            <p className="reveal-item opacity-0 text-lg sm:text-xl text-slate-300 leading-relaxed mb-5 font-medium">
              I transform complex logic into{" "}
              <span className="text-white font-bold underline decoration-indigo-500/40 decoration-[3px] underline-offset-[6px] transition-colors hover:decoration-indigo-400">
                seamless architectures.
              </span>
            </p>

            <p className="reveal-item opacity-0 body-copy mb-10 max-w-2xl">
              Specializing in the full lifecycle of high-stakes product
              development. Currently spearheading technical innovation and
              building next-gen systems at{" "}
              <a href="#contact" className="link-glow">
                {personalInfo.company}
              </a>
              .
            </p>

            {/* Attribute grid */}
            <div className="reveal-item opacity-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Core Expertise", value: "PHP / Node.js Ecosystems" },
                {
                  label: "Backend",
                  value: "Microservices & Distributed Systems",
                },
                {
                  label: "Performance",
                  value: "High-Concurrency Optimization",
                },
                { label: "Global Status", value: "Remote / On-site Available" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group surface-soft rounded-2xl p-5 hover:border-indigo-500/25 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-[0.16em] mb-2 group-hover:text-indigo-300 transition-colors leading-none">
                    {item.label}
                  </p>
                  <p className="text-[15px] text-slate-200 font-semibold group-hover:text-white transition-colors leading-snug">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ── Performance Pillars ── */}
        <div ref={cardsRef} className="relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {highlights.map((item, i) => (
              <article
                key={i}
                className="highlight-card opacity-0 glass-card glass-card-lift p-7 sm:p-8 rounded-3xl group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                  style={{
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>
                <h3 className="heading-3 text-white mb-3 group-hover:text-indigo-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
