"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { personalInfo } from "@/lib/data";
import { Mail, Download, Code2, Server, Cloud, CheckCircle2, ChevronRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import MagneticButton from "./MagneticButton";

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
  const imageRef   = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sophisticated reveals
      gsap.fromTo(
        contentRef.current?.querySelectorAll(".reveal-item") ?? [],
        { opacity: 0, y: 40, filter: "blur(10px)" },
        { 
          opacity: 1, y: 0, filter: "blur(0px)", 
          duration: 1.2, stagger: 0.1, ease: "expo.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 85%", once: true } 
        }
      );

      gsap.fromTo(
        cardsRef.current?.querySelectorAll(".highlight-card") ?? [],
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, y: 0, scale: 1, 
          duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 90%", once: true } 
        }
      );

      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.9, rotateY: -10 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1.5, ease: "expo.out",
          scrollTrigger: { trigger: imageRef.current, start: "top 80%", once: true } }
      );
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
        rotationY: 0, rotationX: 0,
        duration: 1.2, ease: "elastic.out(1, 0.4)",
      });
      gsap.to(card.querySelector(".card-shine"), {
        opacity: 0, duration: 0.5,
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
    <section id="about" ref={sectionRef} className="py-24 sm:py-32 lg:py-48 xl:py-56 relative overflow-hidden bg-[#050510]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[100px]" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent" />
      </div>

      <div className="section-container relative z-10">
        {/* Modern Header Concept */}
        <div className="reveal-item opacity-0 flex items-center gap-4 mb-16 sm:mb-24">
           <div className="h-px w-12 bg-indigo-500/40" />
           <span className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em]">Insight & Strategy</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 xl:gap-40 items-start mb-32 lg:mb-48">
          
          {/* ── Visual Side ── */}
          <div ref={imageRef} className="opacity-0 relative group">
            {/* Multi-layered Glass Effect */}
            <div className="absolute -inset-6 rounded-[4rem] bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/10 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative pt-12 pb-12 px-8 sm:px-12">
              {/* 3D Glass Surface */}
              <div ref={cardRef} className="relative glass-card rounded-[3.5rem] p-10 sm:p-14 border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden" 
                style={{ transformStyle: "preserve-3d" }}>
                
                <div className="card-shine absolute inset-0 opacity-0 pointer-events-none bg-gradient-to-br from-white/20 to-transparent blur-3xl transition-opacity animate-pulse" />

                {/* Avatar with Interactive Ring */}
                <div className="relative w-52 h-52 sm:w-72 sm:h-72 mx-auto mb-12 group/img">
                   <div className="absolute -inset-6 rounded-full bg-indigo-500/15 blur-2xl opacity-0 group-hover/img:opacity-100 transition-all duration-700 scale-90 group-hover/img:scale-100" />
                   <div className="relative h-full w-full rounded-full p-3 border border-white/10 bg-white/5 backdrop-blur-xl shadow-inner">
                      <div className="h-full w-full rounded-full overflow-hidden border-2 border-indigo-500/30">
                        <Image
                          src="/isahaq.jpeg"
                          alt={personalInfo.name}
                          fill
                          className="object-cover scale-110 group-hover/img:scale-100 transition-transform duration-1000"
                        />
                      </div>
                   </div>
                </div>

                <div className="text-center relative z-10">
                  <h3 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">{personalInfo.name}</h3>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-10">
                     <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">{personalInfo.title}</span>
                  </div>
                  
                  {/* Social Integration */}
                  <div className="flex justify-center gap-5">
                    {[
                      { href: personalInfo.github, icon: <GithubIcon size={22} /> },
                      { href: personalInfo.linkedin, icon: <LinkedinIcon size={22} /> },
                      { href: `mailto:${personalInfo.email}`, icon: <Mail size={22} /> }
                    ].map((btn, i) => (
                      <MagneticButton key={i} strength={0.4}>
                         <a href={btn.href} target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300">
                           {btn.icon}
                         </a>
                      </MagneticButton>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Indicator Badge */}
              <div className="absolute -top-4 -right-2 sm:top-5 sm:right-0 glass-card px-6 py-4 rounded-3xl border border-green-500/30 flex items-center gap-3 shadow-2xl shadow-green-500/10 floating">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-[0_0_12px_rgba(74,222,128,1)]" />
                <span className="text-xs text-green-400 font-black uppercase tracking-tighter">Live & Available</span>
              </div>

              {/* Stats Module */}
              <div className="absolute -bottom-6 -left-2 sm:bottom-6 sm:left-0 glass-card px-8 py-6 rounded-[2rem] border border-indigo-500/30 flex flex-col items-center shadow-2xl shadow-indigo-500/10 floating" style={{ animationDelay: "1s" }}>
                <span className="text-4xl font-black gradient-text mb-1">6+</span>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Years Mastering</span>
              </div>
            </div>
          </div>

          {/* ── Narrative Side ── */}
          <div ref={contentRef} className="lg:pt-12">
            <h2 className="reveal-item opacity-0 text-4xl sm:text-6xl xl:text-7xl font-black text-white mb-10 leading-[0.95] tracking-tighter">
              Engineering the <br /> 
              <span className="gradient-text">Unimaginable.</span>
            </h2>

            <p className="reveal-item opacity-0 text-slate-400 text-xl sm:text-2xl leading-relaxed mb-10 font-medium">
              I transform complex logic into <span className="text-white font-bold tracking-tight underline decoration-indigo-500/30 decoration-4 underline-offset-8 transition-all hover:decoration-indigo-500">seamless architectures.</span>
            </p>

            <p className="reveal-item opacity-0 text-slate-500 text-lg sm:text-xl leading-relaxed mb-14 max-w-2xl">
              Specializing in the full lifecycle of high-stakes product development. Currently spearheading technical innovations as and building next-gen systems at <span className="text-indigo-400 font-bold">{personalInfo.company}</span>.
            </p>

            {/* Tech Attribute Bento Box */}
            <div className="reveal-item opacity-0 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              {[
                { label: "Core Expertise", value: "PHP / Node.js Ecosystems" },
                { label: "Backend", value: "Microservices & Distributed Systems" },
                { label: "Performance", value: "High-Concurrency Optimization" },
                { label: "Global Status", value: "Remote / On-site Available" }
              ].map((item, i) => (
                <div key={i} className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/20 hover:bg-white/[0.07] transition-all duration-300">
                    <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-2 group-hover:text-indigo-400 transition-colors uppercase leading-none">{item.label}</p>
                    <p className="text-base text-slate-300 font-bold group-hover:text-white transition-colors">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Action Group */}
            <div className="reveal-item opacity-0 flex flex-wrap gap-6">
              <MagneticButton>
                <a href={`mailto:${personalInfo.email}`} className="px-12 py-6 rounded-2xl btn-primary font-bold text-sm tracking-widest shadow-2xl shadow-indigo-500/20 inline-flex items-center gap-3 uppercase">
                  Hire My Talent <CheckCircle2 size={20} />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="/resume.pdf" target="_blank" className="px-12 py-6 rounded-2xl btn-outline text-white font-bold text-sm tracking-widest inline-flex items-center gap-3 uppercase">
                  Download CV <Download size={20} />
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* ── Performance Pillars ── */}
        <div ref={cardsRef} className="relative pt-32 lg:pt-48 border-t border-white/5">
           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {highlights.map((item, i) => (
                <div key={i} className="highlight-card opacity-0 glass-card p-12 rounded-[3.5rem] border border-white/5 hover:border-indigo-500/20 transition-all duration-700 group">
                  <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-10 transition-all duration-700 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}>
                    {item.icon}
                  </div>
                  <h4 className="text-2xl font-black text-white mb-5 tracking-tight group-hover:translate-x-1 transition-transform">{item.title}</h4>
                  <p className="text-slate-500 text-base leading-relaxed font-medium">
                    {item.desc}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                    Learn More <ChevronRight size={14} />
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
