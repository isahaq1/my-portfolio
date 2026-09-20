import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import ResumeDocument from "@/lib/resume-document";

// The resume is derived entirely from src/lib/data.ts, so it is deterministic
// and can be prerendered at build time and served as a static asset.
export const dynamic = "force-static";
export const runtime = "nodejs";

export async function GET() {
  const buffer = await renderToBuffer(React.createElement(ResumeDocument));

  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="HM-Isahaq-Resume.pdf"',
      "Content-Length": String(buffer.byteLength),
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
