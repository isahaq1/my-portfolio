import type { ReactNode, Ref } from "react";

interface SectionHeaderProps {
  /** Small uppercase label shown above the title. */
  eyebrow: string;
  /** Main heading. Wrap part of it in <span className="gradient-text"> for emphasis. */
  title: ReactNode;
  /** Supporting sentence shown under the title. */
  lead?: ReactNode;
  align?: "center" | "left";
  ref?: Ref<HTMLDivElement>;
  className?: string;
}

/**
 * Shared section header so every section opens with the same rhythm:
 * eyebrow pill → display heading → lead paragraph.
 * Children carry `.reveal-item` so the parent section can animate them.
 */
export default function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "center",
  ref,
  className = "",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      ref={ref}
      className={`section-header ${centered ? "text-center" : "text-left"} ${className}`}
    >
      <span
        className={`reveal-item opacity-0 eyebrow ${centered ? "" : "justify-start"}`}
      >
        <span className="eyebrow-dash" aria-hidden />
        {eyebrow}
      </span>

      <h2
        className={`reveal-item opacity-0 display-2 text-white ${centered ? "mx-auto" : ""} max-w-4xl`}
      >
        {title}
      </h2>

      {lead && (
        <p
          className={`reveal-item opacity-0 section-lead ${centered ? "mx-auto" : ""}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
