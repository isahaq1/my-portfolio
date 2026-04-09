"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/lib/data";
import { Mail, MapPin, Send, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "hmisahaq01@gmail.com",
    href: "mailto:hmisahaq01@gmail.com",
    color: "#6366f1",
  },
  {
    icon: <GithubIcon size={18} />,
    label: "GitHub",
    value: "github.com/isahaq1",
    href: "https://github.com/isahaq1",
    color: "#a855f7",
  },
  {
    icon: <LinkedinIcon size={18} />,
    label: "LinkedIn",
    value: "hm-isahaq",
    href: "https://www.linkedin.com/in/hm-isahaq-6b1593132/",
    color: "#06b6d4",
  },
  {
    icon: <MapPin size={18} />,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: null,
    color: "#10b981",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".reveal-item") ?? [],
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true } }
      );
      gsap.fromTo(
        contentRef.current?.querySelectorAll(".reveal-block") ?? [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 75%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-slate-900/80 transition-all";

  return (
    <section id="contact" ref={sectionRef} className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] rounded-full bg-indigo-500/6 blur-[110px]" />
      </div>

      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className="section-header mb-24 lg:mb-32">
          <p className="reveal-item opacity-0 section-label mb-6">Get in touch</p>
          <h2 className="reveal-item opacity-0 text-3xl sm:text-4xl md:text-5xl font-bold gradient-text-2 mb-8">
            Let&apos;s Work Together
          </h2>
          <p className="reveal-item opacity-0 text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or an opportunity to discuss? I&apos;m always open to new challenges.
            Let&apos;s build something great together.
          </p>
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-5 gap-12 lg:gap-20 xl:gap-24">
          {/* Left — contact info */}
          <div className="lg:col-span-2 space-y-8">
            {/* CTA card */}
            <div className="reveal-block opacity-0 glass-card rounded-2xl p-7 sm:p-8 border border-indigo-500/20">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5 text-indigo-400">
                <MessageSquare size={22} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-3">Open to Opportunities</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Whether it&apos;s a freelance project, full-time role, or just a quick consultation — feel free to reach out!
              </p>
              <MagneticButton>
                <a href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full btn-primary text-sm font-semibold cursor-none">
                  <span>Send Email</span>
                  <Mail size={13} />
                </a>
              </MagneticButton>
            </div>

            {/* Contact links */}
            <div className="reveal-block opacity-0 space-y-3">
              {contactItems.map((item, i) => (
                <div key={i}>
                  {item.href ? (
                    <a href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 glass-card rounded-xl p-4 hover:border-indigo-500/40 transition-all group cursor-none">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${item.color}15`, color: item.color }}>
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-600 mb-0.5">{item.label}</p>
                        <p className="text-sm text-slate-300 font-medium group-hover:text-indigo-400 transition-colors truncate">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 glass-card rounded-xl p-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${item.color}15`, color: item.color }}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-0.5">{item.label}</p>
                        <p className="text-sm text-slate-300 font-medium">{item.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3 reveal-block opacity-0">
            <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10">
              <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-6 sm:mb-8">Send a Message</h3>

              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <span className="text-3xl">✓</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-100">Message Sent!</p>
                  <p className="text-slate-400 text-sm text-center max-w-xs">
                    Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-slate-500 mb-2 uppercase tracking-wider">
                        Your Name
                      </label>
                      <input type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-2 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input type="email" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 mb-2 uppercase tracking-wider">
                      Subject
                    </label>
                    <input type="text" required value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Project inquiry / Collaboration / etc." className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea required rows={5} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project or opportunity..."
                      className={`${inputClass} resize-none`} />
                  </div>

                  <button type="submit" disabled={status === "sending"}
                    className="w-full py-3.5 rounded-xl btn-primary font-semibold cursor-none inline-flex items-center justify-center gap-2 disabled:opacity-60 text-sm sm:text-base">
                    {status === "sending" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
