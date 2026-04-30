"use client";

import { personalInfo, navLinks } from "@/lib/data";
import { Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import MagneticButton from "./MagneticButton";

export default function Footer() {
  return (
    <footer className="relative border-t border-indigo-500/10 py-14 sm:py-18 lg:py-20 overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-indigo-500/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full bg-indigo-500/[0.03] blur-[80px]" />
      </div>

      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-6">
          {/* Logo & tagline */}
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2.5 justify-center sm:justify-start mb-3 group">
              <div className="w-8 h-8 rounded-lg border-animated p-[1px] shrink-0 transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-[#050510] rounded-[5px] flex items-center justify-center">
                  <span className="text-[10px] font-black gradient-text">IS</span>
                </div>
              </div>
              <span className="font-black text-sm text-slate-200 tracking-tight">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mb-3">
              Senior Full Stack Developer · {personalInfo.location}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/8 border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)] animate-pulse" />
              <span className="text-[10px] text-green-400 font-bold tracking-wide">
                Available for work
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(link.href.replace("#", ""))
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-2 py-1 text-xs transition-colors cursor-none link-fancy"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { href: personalInfo.github,            icon: <GithubIcon size={15} />,   label: "GitHub"   },
              { href: personalInfo.linkedin,           icon: <LinkedinIcon size={15} />, label: "LinkedIn" },
              { href: `mailto:${personalInfo.email}`,  icon: <Mail size={15} />,         label: "Email"    },
            ].map(({ href, icon, label }) => (
              <MagneticButton key={label} strength={0.55}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-9 h-9 rounded-full btn-icon cursor-none"
                >
                  {icon}
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-10 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-700 flex items-center gap-1.5 flex-wrap justify-center">
            <span>Crafted with</span>
            <Heart size={10} className="text-red-500 fill-red-500" />
            <span>·</span>
            <span suppressHydrationWarning>© {new Date().getFullYear()}</span>
            <span className="text-slate-600">{personalInfo.name}</span>
          </p>
          <p className="text-[10px] text-slate-700 font-mono tracking-wider">
            Next.js · GSAP · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
