import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HM Isahaq | Senior Developer",
  description:
    "Senior Full Stack Developer at Paragon Group. Specializing in PHP, Laravel, Node.js, React, Next.js, and DevOps. Building robust enterprise-level web solutions.",
  keywords: [
    "HM Isahaq",
    "Full Stack Developer",
    "Senior Developer",
    "Laravel",
    "Node.js",
    "React",
    "Next.js",
    "Paragon Group",
    "Bangladesh",
  ],
  authors: [{ name: "HM Isahaq" }],
  openGraph: {
    title: "HM Isahaq | Senior Developer",
    description:
      "Senior Full Stack Developer at Paragon Group. Building robust enterprise-level web solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-[#050510] text-slate-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
