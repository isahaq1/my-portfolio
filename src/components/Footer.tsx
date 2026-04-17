"use client";

import { personalInfo, navLinks } from "@/lib/data";
import { Mail, Heart, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import MagneticButton from "./MagneticButton";

export default function Footer() {


  return (
    <footer className="relative border-t border-indigo-500/10 py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-indigo-500/25 to-transparent pointer-events-none" />

      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">

          {/* Logo & tagline */}
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2.5 justify-center sm:justify-start mb-2 group">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-animated p-[1px] shrink-0 transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-[#050510] rounded-[5px] flex items-center justify-center">
                  <span className="text-[10px] font-black gradient-text">IS</span>
                </div>
              </div>
              <span className="font-bold text-sm text-slate-300 group-hover:gradient-text transition-all">{personalInfo.name}</span>
            </div>
            <p className="text-xs text-slate-600">Senior Developer @ {personalInfo.company} · {personalInfo.location}</p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-5 sm:gap-7">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(link.href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-2 py-1 text-xs transition-colors cursor-none link-fancy">
                {link.label}
              </a>
            ))}
          </div>

          {/* Social icons + scroll-top */}
          <div className="flex items-center gap-3.5">
            {[
              { href: personalInfo.github,   icon: <GithubIcon size={15} />,   label: "GitHub"   },
              { href: personalInfo.linkedin, icon: <LinkedinIcon size={15} />, label: "LinkedIn" },
              { href: `mailto:${personalInfo.email}`, icon: <Mail size={15} />, label: "Email" },
            ].map(({ href, icon, label }) => (
              <MagneticButton key={label} strength={0.55}>
                <a href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-9 h-9 rounded-full btn-icon cursor-none">
                  {icon}
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-slate-800/50 text-center">
          <p className="text-xs text-slate-700 flex items-center justify-center gap-1.5 flex-wrap">
            <span>Crafted with</span>
            <Heart size={10} className="text-red-500 fill-red-500" />
            <span>©</span>
            <span suppressHydrationWarning>{new Date().getFullYear()}</span>
            <span>{personalInfo.name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
