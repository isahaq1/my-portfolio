/**
 * Shared contact-form types and constants.
 *
 * These live outside the `"use server"` module on purpose: a Server Actions
 * file may only export async functions, so exporting a plain object from it
 * fails at runtime.
 */

export type ContactField = "name" | "email" | "subject" | "message";

export type ContactErrorCode =
  | "NOT_CONFIGURED"
  | "RATE_LIMITED"
  | "INVALID"
  | "SEND_FAILED";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Machine-readable reason, used by the UI to offer a fallback. */
  code?: ContactErrorCode;
  fieldErrors?: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
};

export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 200 },
  subject: { min: 3, max: 150 },
  message: { min: 10, max: 4000 },
} as const;
