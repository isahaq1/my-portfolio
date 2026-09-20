"use server";

import { headers } from "next/headers";
import { personalInfo } from "@/lib/data";
import { CONTACT_LIMITS as LIMITS } from "@/lib/contact";
import type { ContactField, ContactState } from "@/lib/contact";

// Deliberately simple: catches obvious typos without rejecting valid addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ------------------------------------------------------------------ */
/*  Best-effort rate limit                                             */
/*  In-memory, so it resets on cold start and is per-instance. It is   */
/*  a speed bump for naive floods, not a security boundary.            */
/* ------------------------------------------------------------------ */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on long-lived instances.
  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return false;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip CR/LF so user input can never inject extra email headers. */
function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real people never fill this hidden field. Pretend success so
  // bots do not learn they were caught.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success", message: "Thanks — your message was sent." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: Partial<Record<ContactField, string>> = {};

  if (name.length < LIMITS.name.min) {
    fieldErrors.name = "Please enter your name.";
  } else if (name.length > LIMITS.name.max) {
    fieldErrors.name = `Please keep this under ${LIMITS.name.max} characters.`;
  }

  if (!EMAIL_RE.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  } else if (email.length > LIMITS.email.max) {
    fieldErrors.email = "That email address is too long.";
  }

  if (subject.length < LIMITS.subject.min) {
    fieldErrors.subject = "Please add a short subject.";
  } else if (subject.length > LIMITS.subject.max) {
    fieldErrors.subject = `Please keep this under ${LIMITS.subject.max} characters.`;
  }

  if (message.length < LIMITS.message.min) {
    fieldErrors.message = "Please write at least a sentence or two.";
  } else if (message.length > LIMITS.message.max) {
    fieldErrors.message = `Please keep this under ${LIMITS.message.max} characters.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      code: "INVALID",
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return {
      status: "error",
      code: "RATE_LIMITED",
      message:
        "You have sent a few messages already. Please try again in a little while, or email me directly.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || personalInfo.email;
  // Resend's shared sender works without a verified domain, which keeps
  // first-time setup to a single environment variable.
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    return {
      status: "error",
      code: "NOT_CONFIGURED",
      message:
        "The mail service is not configured yet, so this message was not sent.",
    };
  }

  const safeSubject = oneLine(subject).slice(0, LIMITS.subject.max);
  const safeName = oneLine(name);

  const text = [
    `New message from your portfolio contact form`,
    ``,
    `Name:    ${safeName}`,
    `Email:   ${email}`,
    `Subject: ${safeSubject}`,
    ``,
    message,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.6;color:#0f172a">
      <h2 style="margin:0 0 4px;font-size:18px">New portfolio message</h2>
      <p style="margin:0 0 16px;color:#64748b;font-size:13px">
        Sent from the contact form on your portfolio.
      </p>
      <table style="border-collapse:collapse;font-size:14px;margin-bottom:16px">
        <tr><td style="padding:2px 12px 2px 0;color:#64748b">Name</td><td><strong>${escapeHtml(safeName)}</strong></td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#64748b">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#64748b">Subject</td><td>${escapeHtml(safeSubject)}</td></tr>
      </table>
      <div style="white-space:pre-wrap;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;font-size:14px">${escapeHtml(
        message,
      )}</div>
    </div>
  `.trim();

  try {
    // Overridable so the form can be exercised against a local mock.
    const endpoint = process.env.RESEND_API_URL || "https://api.resend.com/emails";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio — ${safeSubject}`,
        text,
        html,
      }),
      // Never let a hung provider hold the request open indefinitely.
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("Contact form: provider rejected the request", {
        status: response.status,
        detail: detail.slice(0, 500),
      });
      return {
        status: "error",
        code: "SEND_FAILED",
        message:
          "Something went wrong while sending. Please try again, or email me directly.",
      };
    }
  } catch (error) {
    console.error("Contact form: request failed", error);
    return {
      status: "error",
      code: "SEND_FAILED",
      message:
        "Something went wrong while sending. Please try again, or email me directly.",
    };
  }

  return {
    status: "success",
    message: "Thanks for reaching out — I'll get back to you soon.",
  };
}
