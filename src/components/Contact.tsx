"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/lib/data";
import {
  Mail,
  MapPin,
  Send,
  MessageSquare,
  Download,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import MagneticButton from "./MagneticButton";
import SectionHeader from "./SectionHeader";
import { revealOnScroll } from "@/lib/motion";
import { sendContactMessage } from "@/app/actions/contact";
import { initialContactState } from "@/lib/contact";

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

const INPUT_CLASS = "glass-input";

/**
 * The form owns its own action state. Resetting it after a successful send is
 * done by remounting via `key`, which avoids clearing state inside an effect.
 */
function ContactForm({ onSendAnother }: { onSendAnother: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialContactState,
  );

  const set = (field: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  if (state.status === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 gap-4"
        role="status"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
          <CheckCircle2 size={30} />
        </div>
        <p className="text-lg font-semibold text-slate-100">Message sent</p>
        <p className="text-slate-400 text-sm text-center max-w-xs">
          {state.message}
        </p>
        <button
          type="button"
          onClick={onSendAnother}
          className="mt-2 px-6 py-3 rounded-full btn-outline text-slate-200 text-sm cursor-none"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Honeypot — hidden from people, tempting to bots */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.status === "error" && (
        <div className="form-alert" role="alert">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div>
            <p>{state.message}</p>
            {state.code !== "INVALID" && (
              <a
                href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(
                  form.subject || "Portfolio enquiry",
                )}&body=${encodeURIComponent(form.message)}`}
                className="form-alert-link cursor-none"
              >
                Email me directly instead
              </a>
            )}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="form-label">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={80}
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="John Doe"
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
            className={INPUT_CLASS}
          />
          {state.fieldErrors?.name && (
            <p id="name-error" className="field-error">
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={200}
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="john@example.com"
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={
              state.fieldErrors?.email ? "email-error" : undefined
            }
            className={INPUT_CLASS}
          />
          {state.fieldErrors?.email && (
            <p id="email-error" className="field-error">
              {state.fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="form-label">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          maxLength={150}
          value={form.subject}
          onChange={(e) => set("subject")(e.target.value)}
          placeholder="Project inquiry / Collaboration / etc."
          aria-invalid={Boolean(state.fieldErrors?.subject)}
          aria-describedby={
            state.fieldErrors?.subject ? "subject-error" : undefined
          }
          className={INPUT_CLASS}
        />
        {state.fieldErrors?.subject && (
          <p id="subject-error" className="field-error">
            {state.fieldErrors.subject}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <span className="form-counter">{form.message.length}/4000</span>
        </div>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          value={form.message}
          onChange={(e) => set("message")(e.target.value)}
          placeholder="Tell me about your project or opportunity..."
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={
            state.fieldErrors?.message ? "message-error" : undefined
          }
          className={`${INPUT_CLASS} resize-none`}
        />
        {state.fieldErrors?.message && (
          <p id="message-error" className="field-error">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-4 rounded-xl btn-primary cursor-none disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
      >
        {pending ? (
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

      <p className="text-[11px] text-slate-600 text-center">
        Your message goes straight to my inbox. No newsletter, no sharing.
      </p>
    </form>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll(headerRef.current?.querySelectorAll(".reveal-item") ?? [], {
        trigger: headerRef.current,
      });
      revealOnScroll(
        contentRef.current?.querySelectorAll(".reveal-block") ?? [],
        {
          trigger: contentRef.current,
          start: "top 78%",
          y: 40,
          stagger: 0.15,
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-spacing relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] rounded-full bg-indigo-500/6 blur-[110px]" />
      </div>

      <div className="section-container">
        <SectionHeader
          ref={headerRef}
          eyebrow="Get in touch"
          title={
            <>
              Let&apos;s Work <span className="gradient-text">Together</span>
            </>
          }
          lead="Have a project in mind or an opportunity to discuss? I'm always open to new challenges. Let's build something great together."
        />

        <div
          ref={contentRef}
          className="grid lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16"
        >
          {/* Left — contact info */}
          <div className="lg:col-span-2 space-y-8">
            {/* CTA card */}
            <div className="reveal-block opacity-0 glass-card rounded-3xl p-7 sm:p-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5 text-indigo-400">
                <MessageSquare size={22} />
              </div>
              <h3 className="heading-3 text-white mb-3">
                Open to Opportunities
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-7">
                Whether it&apos;s a freelance project, full-time role, or just a
                quick consultation — feel free to reach out!
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton className="-m-5">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-primary text-sm font-semibold cursor-none hover:scale-105 transition-transform"
                  >
                    <span>Send Email</span>
                    <Mail size={14} />
                  </a>
                </MagneticButton>
                <MagneticButton className="-m-5">
                  <a
                    href={personalInfo.resumeUrl}
                    download="HM-Isahaq-Resume.pdf"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-outline text-slate-200 text-sm font-semibold cursor-none"
                  >
                    <Download size={14} className="text-indigo-400" />
                    <span>Resume (PDF)</span>
                  </a>
                </MagneticButton>
              </div>
            </div>

            {/* Contact links */}
            <div className="reveal-block opacity-0 space-y-3">
              {contactItems.map((item, i) => (
                <div key={i}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center gap-4 glass-card glass-card-lift rounded-2xl p-4 group cursor-none"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: `${item.color}15`,
                          color: item.color,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-semibold mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm text-slate-200 font-medium group-hover:text-indigo-300 transition-colors truncate">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 glass-card rounded-2xl p-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: `${item.color}15`,
                          color: item.color,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-semibold mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm text-slate-200 font-medium">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3 reveal-block opacity-0">
            <div className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10">
              <h3 className="heading-3 text-white mb-2">Send a Message</h3>
              <p className="text-sm text-slate-500 mb-7">
                I usually reply within one business day.
              </p>

              <ContactForm
                key={formKey}
                onSendAnother={() => setFormKey((k) => k + 1)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
