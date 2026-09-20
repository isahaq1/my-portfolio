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
  Terminal,
  Copy,
  Check,
  ShieldCheck,
  Boxes,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import MagneticButton from "./MagneticButton";
import SectionHeader from "./SectionHeader";
import { revealOnScroll } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Project = (typeof projects)[number];

/* ------------------------------------------------------------------ */
/*  Install command with copy-to-clipboard                             */
/* ------------------------------------------------------------------ */
function InstallCommand({ command, color }: { command: string; color: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the command is still readable on screen */
    }
  };

  return (
    <div className="install-row group/cmd">
      <Terminal size={13} className="shrink-0" style={{ color }} />
      <code className="install-code">{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Command copied" : `Copy: ${command}`}
        className="install-copy cursor-none"
      >
        {copied ? (
          <Check size={13} className="text-emerald-400" />
        ) : (
          <Copy size={13} />
        )}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-heading shared by both project groups                          */
/* ------------------------------------------------------------------ */
function GroupHeading({
  icon,
  title,
  note,
  count,
  accent = false,
}: {
  icon: React.ReactNode;
  title: string;
  note: string;
  count: number;
  accent?: boolean;
}) {
  return (
    <div className="group-heading">
      <span className={`group-heading-icon ${accent ? "is-accent" : ""}`}>
        {icon}
      </span>
      <div className="min-w-0">
        <h3 className="group-heading-title">
          {title}
          <span className="group-heading-count">{count}</span>
        </h3>
        <p className="group-heading-note">{note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tilt wrapper for the standard project cards                        */
/* ------------------------------------------------------------------ */
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
        rotationY: (x / rect.width) * 8,
        rotationX: -(y / rect.height) * 8,
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
      className="project-card h-full"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
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

/* ------------------------------------------------------------------ */
/*  Open source package card — deliberately distinct from the grid     */
/* ------------------------------------------------------------------ */
function PackageCard({ pkg }: { pkg: Project }) {
  const registry = "registry" in pkg ? pkg.registry : undefined;
  const stats = "stats" in pkg ? pkg.stats : undefined;
  const install = "install" in pkg ? pkg.install : undefined;
  const summary = "summary" in pkg ? pkg.summary : undefined;
  const icon = "icon" in pkg ? pkg.icon : undefined;

  return (
    <article className="pkg-card opacity-0 h-full">
      {/* Gradient ring marks these out as published work */}
      <div
        className="pkg-ring h-full"
        style={
          {
            "--pkg-color": pkg.color,
          } as React.CSSProperties
        }
      >
        <div className="pkg-body">
          {/* Header: identity + registry */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-3.5 min-w-0">
              <span
                className="pkg-icon"
                style={{
                  background: `${pkg.color}18`,
                  borderColor: `${pkg.color}38`,
                }}
              >
                {icon ?? "📦"}
              </span>
              <div className="min-w-0">
                <span className="pkg-badge">
                  <Star size={10} className="fill-current" />
                  Open Source
                </span>
                {summary && <p className="pkg-summary">{summary}</p>}
              </div>
            </div>

            {registry && (
              <span
                className="pkg-registry shrink-0"
                style={{ color: pkg.color, borderColor: `${pkg.color}40` }}
              >
                <Package size={11} />
                {registry}
              </span>
            )}
          </div>

          <h4 className="pkg-title">{pkg.title}</h4>
          <p className="pkg-desc">{pkg.description}</p>

          {/* Install command — the clearest signal it is a real package */}
          {install && <InstallCommand command={install} color={pkg.color} />}

          {/* Meta */}
          <div className="pkg-meta">
            {stats?.version && (
              <span className="pkg-meta-item">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: pkg.color }}
                />
                {stats.version}
              </span>
            )}
            {stats?.license && (
              <span className="pkg-meta-item">
                <ShieldCheck size={12} style={{ color: pkg.color }} />
                {stats.license} License
              </span>
            )}
            <span className="pkg-meta-item">
              <Boxes size={12} style={{ color: pkg.color }} />
              Free to use
            </span>
          </div>

          {/* Tech */}
          <div className="flex flex-wrap gap-2 mb-6">
            {pkg.tech
              .filter((t) => t !== "Open Source")
              .map((t) => (
                <span
                  key={t}
                  className="pkg-tag"
                  style={{
                    background: `${pkg.color}14`,
                    color: pkg.color,
                    borderColor: `${pkg.color}28`,
                  }}
                >
                  {t}
                </span>
              ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 mt-auto">
            {pkg.link && (
              <a
                href={pkg.link}
                target="_blank"
                rel="noopener noreferrer"
                className="pkg-btn-primary cursor-none"
                style={{
                  background: pkg.color,
                  boxShadow: `0 10px 26px -10px ${pkg.color}`,
                }}
              >
                <ExternalLink size={14} />
                View on {registry ?? "registry"}
              </a>
            )}
            {pkg.github && (
              <a
                href={pkg.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pkg-btn-ghost cursor-none"
              >
                <GithubIcon size={14} />
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ossRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const packages = projects.filter((p) => p.category === "Open Source");
  const work = projects.filter((p) => p.category !== "Open Source");

  const registries = Array.from(
    new Set(
      packages
        .map((p) => ("registry" in p ? p.registry : undefined))
        .filter(Boolean),
    ),
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll(headerRef.current?.querySelectorAll(".reveal-item") ?? [], {
        trigger: headerRef.current,
      });

      revealOnScroll(ossRef.current?.querySelectorAll(".oss-reveal") ?? [], {
        trigger: ossRef.current,
        start: "top 82%",
        y: 32,
        stagger: 0.1,
      });

      revealOnScroll(ossRef.current?.querySelectorAll(".pkg-card") ?? [], {
        trigger: ossRef.current,
        start: "top 76%",
        y: 40,
        scale: 0.97,
        stagger: 0.12,
      });

      revealOnScroll(gridRef.current?.querySelectorAll(".work-reveal") ?? [], {
        trigger: gridRef.current,
        start: "top 84%",
        y: 24,
      });

      revealOnScroll(gridRef.current?.querySelectorAll(".project-cell") ?? [], {
        trigger: gridRef.current,
        start: "top 80%",
        y: 36,
        stagger: 0.07,
      });
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
        <SectionHeader
          ref={headerRef}
          eyebrow="Portfolio"
          title={
            <>
              Featured <span className="gradient-text">Projects</span>
            </>
          }
          lead="Published open-source packages anyone can install, plus the enterprise systems I build and ship day to day."
        />

        {/* ══════════ Open source ══════════ */}
        {packages.length > 0 && (
          <div ref={ossRef} className="mb-16 lg:mb-24">
            <div className="oss-reveal opacity-0">
              <GroupHeading
                accent
                icon={<Package size={18} />}
                title="Open Source Packages"
                note="Published on public registries, MIT licensed, and free for anyone to install."
                count={packages.length}
              />
            </div>

            {/* Quick facts strip */}
            <div className="oss-reveal opacity-0 oss-facts">
              <span className="oss-fact">
                <strong>{packages.length}</strong>{" "}
                <span>published packages</span>
              </span>
              <span className="oss-fact-sep" aria-hidden />
              <span className="oss-fact">
                <strong>{registries.join(" + ")}</strong> <span>registries</span>
              </span>
              <span className="oss-fact-sep" aria-hidden />
              <span className="oss-fact">
                <strong>MIT</strong> <span>licensed &amp; free</span>
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        )}

        {/* ══════════ Client & enterprise work ══════════ */}
        <div ref={gridRef}>
          <div className="work-reveal opacity-0">
            <GroupHeading
              icon={<Boxes size={18} />}
              title="Client &amp; Enterprise Work"
              note="Production systems delivered for companies — internal tools, ERPs, and platforms."
              count={work.length}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {work.map((project) => (
              <div
                key={project.id}
                className="project-cell opacity-0 relative"
                style={{ perspective: "900px" }}
              >
                <TiltCard color={project.color}>
                  <div
                    className="glass-card rounded-3xl overflow-hidden flex flex-col h-full"
                    style={{ borderColor: `${project.color}30` }}
                  >
                    <div
                      className="h-[3px] w-full shrink-0"
                      style={{
                        background: `linear-gradient(90deg, ${project.color}, ${project.color}20)`,
                      }}
                    />

                    <div className="p-6 sm:p-7 flex flex-col flex-1 relative z-10">
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-base shrink-0"
                            style={{
                              background: `${project.color}18`,
                              border: `1px solid ${project.color}35`,
                            }}
                          >
                            {project.category === "DevOps"
                              ? "🚀"
                              : project.category === "ERP"
                                ? "🌾"
                                : "🏢"}
                          </div>
                          <span
                            className="text-xs font-bold"
                            style={{ color: project.color }}
                          >
                            {project.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {project.github && (
                            <MagneticButton strength={0.5} className="-m-5">
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${project.title} on GitHub`}
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
                                aria-label={`${project.title} live link`}
                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg btn-icon cursor-none"
                              >
                                <ExternalLink size={13} />
                              </a>
                            </MagneticButton>
                          )}
                        </div>
                      </div>

                      <h4 className="text-lg font-extrabold tracking-tight text-slate-100 mb-3 leading-snug">
                        {project.title}
                      </h4>

                      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
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
        </div>

        {/* CTA */}
        <div className="text-center mt-12 lg:mt-16">
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
