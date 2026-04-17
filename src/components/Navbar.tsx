"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { navLinks, personalInfo } from "@/lib/data";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const navRef    = useRef<HTMLElement>(null);
  const logoRef   = useRef<HTMLDivElement>(null);
  const linksRef  = useRef<HTMLDivElement>(null);
  const [scrolled,       setScrolled]       = useState(false);
  const [activeSection,  setActiveSection]  = useState("home");
  const [menuOpen,       setMenuOpen]       = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });
    tl.fromTo(logoRef.current,
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      linksRef.current?.querySelectorAll(".nav-item") ?? [],
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" },
      "-=0.4"
    );
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 160) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#050510]/92 backdrop-blur-2xl border-b border-indigo-500/10 shadow-lg shadow-black/30"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="section-container flex items-center justify-between">

          {/* Logo */}
          <div ref={logoRef} className="opacity-0">
            <MagneticButton strength={0.3}>
              <button onClick={() => go("#home")} className="flex items-center gap-2.5 group cursor-none">
                <div className="w-8 h-8 rounded-lg border-animated p-[1px] transition-transform group-hover:scale-105">
                  <div className="w-full h-full bg-[#050510] rounded-[6px] flex items-center justify-center">
                    <span className="text-sm font-black gradient-text">IS</span>
                  </div>
                </div>
                <span className="font-bold text-sm text-slate-200 group-hover:gradient-text transition-all duration-300">
                  {personalInfo.name}
                </span>
              </button>
            </MagneticButton>
          </div>

          {/* Desktop links */}
          <div ref={linksRef} className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <MagneticButton key={link.href} strength={0.2} className="nav-item opacity-0">
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); go(link.href); }}
                    className={`text-sm font-medium relative group cursor-none transition-colors duration-300 ${
                      isActive ? "text-indigo-400" : "text-slate-400 hover:text-slate-100"
                    }`}
                  >
                    {link.label}
                    {/* Animated underline */}
                    <span
                      className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                      style={{ width: isActive ? "100%" : "0%" }}
                    />
                    {/* Hover underline via CSS since we can't use group-hover with dynamic width */}
                    <span className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-indigo-400/50 to-purple-400/50 w-0 group-hover:w-full transition-all duration-300"
                      style={{ display: isActive ? "none" : undefined }}
                    />
                  </a>
                </MagneticButton>
              );
            })}

            <div className="nav-item opacity-0">
              <MagneticButton strength={0.3} className="-m-5">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="px-6 py-2.5 rounded-full btn-primary text-sm font-semibold cursor-none inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300"
                >
                  <span>Let&apos;s Talk</span>
                  <span className="text-base">↗</span>
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-[5px] p-2 cursor-none group"
          >
            <span className={`block w-6 h-0.5 rounded-full bg-slate-300 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-0.5 rounded-full bg-slate-300 transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-6 h-0.5 rounded-full bg-slate-300 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-400 ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div className="absolute inset-0 bg-[#050510]/96 backdrop-blur-2xl" onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-[72px] left-4 right-4 glass-card rounded-2xl p-6 border border-indigo-500/15 transition-all duration-400 ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        }`}>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); go(link.href); }}
                className={`flex items-center justify-between py-3.5 px-3 text-sm font-medium rounded-xl transition-all cursor-none ${
                  activeSection === link.href.replace("#", "")
                    ? "text-indigo-400 bg-indigo-500/8"
                    : "text-slate-400 hover:text-slate-100 hover:bg-white/4"
                }`}
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                )}
              </a>
            ))}
          </div>
          <div className="mt-5 pt-5 border-t border-indigo-500/10">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl btn-primary text-sm font-semibold cursor-none"
            >
              <span>Let&apos;s Talk</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
