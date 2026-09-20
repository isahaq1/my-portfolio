"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { seededRandom } from "@/lib/random";

interface Star {
  id: number;
  cx: number;
  cy: number;
  r: number;
  opacity: number;
}

const SATELLITES = [
  {
    id: "laravel",
    label: "Laravel",
    color: "#f87171",
    orbit: "o1",
    rx: 232,
    ry: 66,
    dur: "14s",
    delay: "0s",
    details: "Backend Architecture & ERPs",
  },
  {
    id: "nodejs",
    label: "Node.js",
    color: "#4ade80",
    orbit: "o2",
    rx: 188,
    ry: 108,
    dur: "20s",
    delay: "-5s",
    details: "Real-time Apps & Scalability",
  },
  {
    id: "postgres",
    label: "Postgres",
    color: "#60a5fa",
    orbit: "o3",
    rx: 148,
    ry: 148,
    dur: "28s",
    delay: "-10s",
    details: "Advanced Data Integrity",
  },
  {
    id: "nextjs",
    label: "Next.js",
    color: "#e2e8f0",
    orbit: "o4",
    rx: 108,
    ry: 108,
    dur: "17s",
    delay: "-3s",
    details: "Full-Stack React Framework",
  },
  {
    id: "react",
    label: "React",
    color: "#67e8f9",
    orbit: "o5",
    rx: 255,
    ry: 126,
    dur: "23s",
    delay: "-8s",
    details: "UI Components & State Mgmt",
  },
  {
    id: "typescript",
    label: "TypeScript",
    color: "#c084fc",
    orbit: "o6",
    rx: 170,
    ry: 80,
    dur: "16s",
    delay: "-2s",
    details: "Type-safe Development",
  },
  {
    id: "odoo",
    label: "Odoo",
    color: "#e879c7",
    orbit: "o7",
    rx: 212,
    ry: 150,
    dur: "25s",
    delay: "-6s",
    details: "Custom ERP Modules & Automation",
  },
];

const CX = 300;
const CY = 300;

export default function OrbitSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Deterministic stars: identical on server and client.
  const stars = useMemo<Star[]>(() => {
    const rand = seededRandom(7331);
    return Array.from({ length: 75 }, (_, i) => ({
      id: i,
      cx: rand() * 600,
      cy: rand() * 600,
      r: rand() * 1.7 + 0.25,
      opacity: rand() * 0.45 + 0.06,
    }));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.82 },
        { opacity: 1, scale: 1, duration: 1.8, ease: "expo.out" },
      );

      gsap.to(".planet-core", {
        scale: 1.06,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: `${CX}px ${CY}px`,
      });

      gsap.to(".planet-atmo", {
        scale: 1.11,
        opacity: 0.55,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: `${CX}px ${CY}px`,
      });

      gsap.fromTo(
        ".scan-beam",
        { y: -52 },
        { y: 52, duration: 3.5, repeat: -1, yoyo: true, ease: "power1.inOut" },
      );

      gsap.to(".pulse-ring", {
        scale: 2.4,
        opacity: 0,
        duration: 3.2,
        repeat: -1,
        ease: "power2.out",
        transformOrigin: `${CX}px ${CY}px`,
        stagger: 1.07,
      });

      gsap.to(".ring-accent", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        transformOrigin: `${CX}px ${CY}px`,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const tween = gsap.to(".star-dot", {
      opacity: 0.04,
      duration: "random(1.5,4)",
      repeat: -1,
      yoyo: true,
      stagger: { amount: 3.5, from: "random" },
    });
    return () => {
      tween.kill();
    };
  }, []);

  const hovData = SATELLITES.find((s) => s.id === hovered);

  return (
    <div
      ref={containerRef}
      className="opacity-0 relative w-full h-full flex items-center justify-center select-none cursor-crosshair"
    >
      {/* Tooltip */}
      <div
        className={`absolute top-4 right-4 z-10 p-4 rounded-2xl w-52 transition-all duration-500 ${
          hovered
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-3 scale-95 pointer-events-none"
        }`}
        style={{
          background: "rgba(10,10,26,0.82)",
          backdropFilter: "blur(18px)",
          border: `1px solid ${hovData?.color ?? "#6366f1"}38`,
          boxShadow: `0 0 35px ${hovData?.color ?? "#6366f1"}14, inset 0 1px 0 rgba(255,255,255,0.04)`,
        }}
      >
        <p
          className="text-[9px] font-bold tracking-[0.22em] uppercase mb-2"
          style={{ color: hovData?.color ?? "#818cf8" }}
        >
          ◈ System Node
        </p>
        <h4 className="text-sm font-black text-white mb-1.5">
          {hovData?.label}
        </h4>
        <p className="text-[11px] leading-relaxed" style={{ color: "#94a3b8" }}>
          {hovData?.details}
        </p>
        <div
          className="mt-3 h-px rounded-full"
          style={{
            background: `linear-gradient(90deg, ${hovData?.color ?? "#6366f1"}, transparent)`,
          }}
        />
      </div>

      <svg
        viewBox="0 0 600 600"
        className="w-full h-full max-w-[560px]"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Planet gradient */}
          <radialGradient id="pg" cx="33%" cy="27%" r="74%">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="28%" stopColor="#818cf8" />
            <stop offset="62%" stopColor="#4338ca" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </radialGradient>

          {/* Atmosphere */}
          <radialGradient id="ag" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="78%" stopColor="#818cf8" stopOpacity="0.2" />
            <stop offset="92%" stopColor="#a855f7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Saturn ring */}
          <radialGradient id="rg" cx="50%" cy="50%" r="50%">
            <stop offset="48%" stopColor="transparent" />
            <stop offset="63%" stopColor="#818cf8" stopOpacity="0.5" />
            <stop offset="78%" stopColor="#6366f1" stopOpacity="0.7" />
            <stop offset="94%" stopColor="#4f46e5" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Nebula blobs */}
          <radialGradient id="nb1" cx="25%" cy="25%" r="60%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.10" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="nb2" cx="75%" cy="75%" r="60%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="nb3" cx="80%" cy="20%" r="55%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Filters */}
          <filter id="fpl" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="18" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <filter id="fnd" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <filter id="ftr" x="-80%" y="-200%" width="260%" height="500%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="fcr" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <filter id="forb" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>

          {/* Planet clip */}
          <clipPath id="planetClip">
            <circle cx={CX} cy={CY} r="60" />
          </clipPath>

          {/* Orbit paths */}
          {SATELLITES.map((s) => (
            <path
              key={`p_${s.id}`}
              id={`p_${s.id}`}
              d={`M ${CX - s.rx},${CY} a ${s.rx},${s.ry} 0 1,0 ${s.rx * 2},0 a ${s.rx},${s.ry} 0 1,0 -${s.rx * 2},0`}
              fill="none"
            />
          ))}

          {/* Per-satellite gradients */}
          {SATELLITES.map((s) => (
            <radialGradient
              key={`sg_${s.id}`}
              id={`sg_${s.id}`}
              cx="35%"
              cy="33%"
              r="65%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
              <stop offset="45%" stopColor={s.color} />
              <stop offset="100%" stopColor={s.color} stopOpacity="0.5" />
            </radialGradient>
          ))}

          {/* Comet trail gradients */}
          {SATELLITES.map((s) => (
            <linearGradient
              key={`tg_${s.id}`}
              id={`tg_${s.id}`}
              gradientUnits="userSpaceOnUse"
              x1="-38"
              y1="0"
              x2="0"
              y2="0"
            >
              <stop offset="0%" stopColor={s.color} stopOpacity="0" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0.55" />
            </linearGradient>
          ))}
        </defs>

        {/* ── Nebula clouds ── */}
        <ellipse cx="130" cy="130" rx="210" ry="190" fill="url(#nb1)" />
        <ellipse cx="470" cy="470" rx="175" ry="160" fill="url(#nb2)" />
        <ellipse cx="480" cy="110" rx="150" ry="140" fill="url(#nb3)" />

        {/* ── Stars ── */}
        {stars.map((s) => (
          <circle
            key={s.id}
            className="star-dot"
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="#c7d2fe"
            opacity={s.opacity}
          />
        ))}

        {/* ── Saturn ring (behind planet) ── */}
        <ellipse
          cx={CX}
          cy={CY}
          rx="118"
          ry="33"
          fill="none"
          stroke="url(#rg)"
          strokeWidth="13"
          transform={`rotate(-22,${CX},${CY})`}
          opacity="0.72"
        />
        <ellipse
          cx={CX}
          cy={CY}
          rx="118"
          ry="33"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="0.7"
          strokeDasharray="4 9"
          transform={`rotate(-22,${CX},${CY})`}
          opacity="0.22"
        />

        {/* ── Rotating accent ring ── */}
        <ellipse
          className="ring-accent"
          cx={CX}
          cy={CY}
          rx="92"
          ry="92"
          fill="none"
          stroke="url(#ag)"
          strokeWidth="1"
          strokeDasharray="8 18 3 18"
          opacity="0.35"
        />

        {/* ── Orbit paths ── */}
        {SATELLITES.map((s) => (
          <g key={`orb_${s.id}`}>
            {/* Glow layer on hover */}
            {hovered === s.id && (
              <ellipse
                cx={CX}
                cy={CY}
                rx={s.rx}
                ry={s.ry}
                fill="none"
                stroke={s.color}
                strokeWidth="5"
                opacity="0.1"
                filter="url(#forb)"
              />
            )}
            <ellipse
              cx={CX}
              cy={CY}
              rx={s.rx}
              ry={s.ry}
              fill="none"
              stroke={s.color}
              strokeWidth={hovered === s.id ? 1.4 : 0.5}
              strokeDasharray={hovered === s.id ? "6 5" : "3 9"}
              opacity={
                hovered && hovered !== s.id
                  ? 0.04
                  : hovered === s.id
                    ? 0.6
                    : 0.17
              }
              style={{ transition: "all 0.4s ease" }}
            />
          </g>
        ))}

        {/* ── Satellites ── */}
        {SATELLITES.map((s) => (
          <g
            key={s.id}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              opacity: hovered && hovered !== s.id ? 0.18 : 1,
              transition: "opacity 0.4s ease",
              cursor: "pointer",
            }}
          >
            <g>
              <animateMotion
                dur={s.dur}
                repeatCount="indefinite"
                begin={s.delay}
              >
                <mpath href={`#p_${s.id}`} />
              </animateMotion>

              {/* Comet tail */}
              <ellipse
                rx="34"
                ry="4.5"
                cx="-20"
                cy="0"
                fill={`url(#tg_${s.id})`}
                filter="url(#ftr)"
                opacity="0.65"
              />
              <ellipse
                rx="18"
                ry="2.5"
                cx="-10"
                cy="0"
                fill={s.color}
                opacity="0.18"
                filter="url(#ftr)"
              />

              {/* Outer aura */}
              <circle r="17" fill={s.color} opacity="0.06" filter="url(#fnd)" />
              <circle r="12" fill={s.color} opacity="0.11" />

              {/* Main body */}
              <circle r="7.5" fill={`url(#sg_${s.id})`} filter="url(#fnd)" />

              {/* Glint */}
              <circle r="2.6" cx="-2.4" cy="-2.4" fill="white" opacity="0.7" />

              {/* Micro-moon */}
              <circle r="1.8" fill={s.color} opacity="0.8">
                <animate
                  attributeName="cx"
                  values="-14;14;-14"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values="0;9;0"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Label */}
              <text
                fontSize="9.5"
                fill={s.color}
                fontFamily="monospace"
                fontWeight="700"
                textAnchor="middle"
                dy="-18"
                letterSpacing="0.07em"
                opacity="0.88"
              >
                {s.label}
              </text>
            </g>
          </g>
        ))}

        {/* ── Planet core ── */}
        <g>
          {/* Energy pulse rings */}
          <circle
            className="pulse-ring"
            cx={CX}
            cy={CY}
            r="64"
            fill="none"
            stroke="#818cf8"
            strokeWidth="1.5"
            opacity="0.38"
          />
          <circle
            className="pulse-ring"
            cx={CX}
            cy={CY}
            r="64"
            fill="none"
            stroke="#a855f7"
            strokeWidth="1.5"
            opacity="0.38"
          />
          <circle
            className="pulse-ring"
            cx={CX}
            cy={CY}
            r="64"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1.5"
            opacity="0.28"
          />

          {/* Atmosphere halo */}
          <circle
            cx={CX}
            cy={CY}
            r="92"
            fill="url(#ag)"
            className="planet-atmo"
            opacity="0.65"
          />

          {/* Corona */}
          <circle
            cx={CX}
            cy={CY}
            r="70"
            fill="rgba(99,102,241,0.06)"
            filter="url(#fcr)"
          />

          {/* Planet body */}
          <circle
            cx={CX}
            cy={CY}
            r="60"
            fill="url(#pg)"
            className="planet-core"
            filter="url(#fpl)"
          />

          {/* Surface grid + rings */}
          <g clipPath="url(#planetClip)" opacity="0.16">
            <line
              x1={CX - 60}
              y1={CY - 24}
              x2={CX + 60}
              y2={CY - 24}
              stroke="white"
              strokeWidth="0.5"
            />
            <line
              x1={CX - 60}
              y1={CY + 24}
              x2={CX + 60}
              y2={CY + 24}
              stroke="white"
              strokeWidth="0.5"
            />
            <line
              x1={CX - 24}
              y1={CY - 60}
              x2={CX - 24}
              y2={CY + 60}
              stroke="white"
              strokeWidth="0.5"
            />
            <line
              x1={CX + 24}
              y1={CY - 60}
              x2={CX + 24}
              y2={CY + 60}
              stroke="white"
              strokeWidth="0.5"
            />
            <circle
              cx={CX}
              cy={CY}
              r="34"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
            <circle
              cx={CX}
              cy={CY}
              r="18"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </g>

          {/* Scanning beam */}
          <rect
            className="scan-beam"
            x={CX - 52}
            y={CY}
            width="104"
            height="1.5"
            fill="white"
            opacity="0.22"
            clipPath="url(#planetClip)"
          />

          {/* Specular highlight */}
          <ellipse
            cx={CX - 20}
            cy={CY - 18}
            rx="22"
            ry="14"
            fill="white"
            opacity="0.065"
            transform={`rotate(-30,${CX - 20},${CY - 18})`}
          />
        </g>

        {/* ── Saturn ring (front half) ── */}
        <path
          d={`M ${CX - 110} ${CY - 40} A 118 33 -22 0 0 ${CX + 110} ${CY + 40}`}
          fill="none"
          stroke="url(#rg)"
          strokeWidth="13"
          opacity="0.85"
          className="pointer-events-none"
        />
        <path
          d={`M ${CX - 110} ${CY - 40} A 118 33 -22 0 0 ${CX + 110} ${CY + 40}`}
          fill="none"
          stroke="#c4b5fd"
          strokeWidth="0.7"
          strokeDasharray="4 10"
          opacity="0.24"
          className="pointer-events-none"
        />
      </svg>
    </div>
  );
}
