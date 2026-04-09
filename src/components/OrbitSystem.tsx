"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Particle {
  id: number;
  cx: number;
  cy: number;
  r: number;
  opacity: number;
}

const satellites = [
  { id: "laravel",  label: "Laravel",  color: "#6366f1", orbit: "orbit1", dur: "12s",  details: "Backend Architecture & ERPs" },
  { id: "nodejs",   label: "NodeJS",   color: "#a855f7", orbit: "orbit2", dur: "18s",  details: "Real-time Apps & Scalability" },
  { id: "postgres", label: "Postgres", color: "#06b6d4", orbit: "orbit3", dur: "25s",  details: "Advanced Data Integrity" },
  { id: "nextjs", label: "Nextjs", color: "#f59e0b", orbit: "orbit4", dur: "25s",  details: "Nextjs" },
];

export default function OrbitSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hoveredSat, setHoveredSat] = useState<string | null>(null);

  useEffect(() => {
    setParticles(
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        cx: Math.random() * 600,
        cy: Math.random() * 600,
        r: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      }))
    );

    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.75, rotateY: -20 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1.5, ease: "expo.out" }
      );

      gsap.to(".planet-core", {
        scale: 1.05,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center",
      });

      // Scanning beam
      gsap.fromTo(".scanner-beam", 
        { y: -80 },
        { y: 80, duration: 4, repeat: -1, yoyo: true, ease: "power1.inOut" }
      );

      gsap.to(".data-particle", {
        opacity: 0.05,
        duration: "random(1, 4)",
        repeat: -1,
        yoyo: true,
        stagger: { amount: 2, from: "random" },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const size = 600;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div 
      ref={containerRef} 
      className="group opacity-0 relative w-full h-full flex items-center justify-center select-none cursor-crosshair transition-all duration-700"
      style={{ perspective: "1200px" }}
    >
      {/* Informative Tooltip Overlay */}
      <div className={`absolute top-10 right-10 p-5 glass-card border border-indigo-500/20 rounded-2xl w-48 transition-all duration-500 transform ${hoveredSat ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        <p className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase mb-1">System Node</p>
        <h4 className="text-lg font-black text-slate-100 mb-2">
          {satellites.find(s => s.id === hoveredSat)?.label}
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          {satellites.find(s => s.id === hoveredSat)?.details}
        </p>
      </div>

      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="main-svg-orbit w-full h-full max-w-[550px]"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id="planetGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="40%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </radialGradient>

          <radialGradient id="ringGrad" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="transparent" stopOpacity="0" />
            <stop offset="70%" stopColor="#818cf8" stopOpacity="0.4" />
            <stop offset="85%" stopColor="#4f46e5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          <filter id="planetGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Standard Paths for animateMotion (more compatible than ellipse) */}
          <path id="orbit1_path" d={`M ${cx - 240},${cy} a 240,70 0 1,0 480,0 a 240,70 0 1,0 -480,0`} fill="none" />
          <path id="orbit2_path" d={`M ${cx - 180},${cy} a 180,110 0 1,0 360,0 a 180,110 0 1,0 -360,0`} fill="none" />
          <path id="orbit3_path" d={`M ${cx - 140},${cy} a 140,140 0 1,0 280,0 a 140,140 0 1,0 -280,0`} fill="none" />
          <path id="orbit4_path" d={`M ${cx - 100},${cy} a 100,100 0 1,0 200,0 a 100,100 0 1,0 -200,0`} fill="none" />
        </defs>

        {/* ── Background Particles ── */}
        {particles.map((p) => (
          <circle key={p.id} className="data-particle" cx={p.cx} cy={p.cy} r={p.r} fill="#818cf8" opacity={p.opacity} />
        ))}

        {/* ── SATURN RING (Behind) ── */}
        <ellipse cx={cx} cy={cy} rx="110" ry="32" fill="none" stroke="url(#ringGrad)" strokeWidth="12" transform={`rotate(-20, ${cx}, ${cy})`} />

        {/* ── Orbits & Satellites ── */}
        {satellites.map((sat, idx) => {
          const rx = idx === 0 ? 240 : idx === 1 ? 180 : idx === 2 ? 140 : 100;
          const ry = idx === 0 ? 70 : idx === 1 ? 110 : idx === 2 ? 140 : 100;
          
          return (
            <g key={sat.id}>
              {/* Visual Orbit Line */}
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={`${sat.color}18`} strokeWidth="1" strokeDasharray="4 4" />
              
              <g 
                className="cursor-pointer transition-opacity duration-300" 
                onMouseEnter={() => setHoveredSat(sat.id)}
                onMouseLeave={() => setHoveredSat(null)}
                style={{ opacity: hoveredSat && hoveredSat !== sat.id ? 0.3 : 1 }}
              >
                {/* Satellite Node Group */}
                <g>
                   <animateMotion dur={sat.dur} repeatCount="indefinite" rotate="auto" begin={idx * -2 + "s"}>
                    <mpath href={`#${sat.orbit}_path`} />
                  </animateMotion>

                  {/* Dot */}
                  <circle r="8" fill={sat.color} className="sat-node shadow-lg" />

                  {/* Sub-moon */}
                  <circle r="2.5" fill="white" opacity="0.6">
                    <animate attributeName="cx" values="-15;15;-15" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="0;12;0" dur="3s" repeatCount="indefinite" />
                  </circle>

                  {/* Label */}
                  <text fontSize="11" fill="white" className="font-mono font-bold" textAnchor="middle" dy="-18">
                    {sat.label}
                  </text>
                </g>
              </g>
            </g>
          );
        })}

        {/* ── PLANET CORE ── */}
        <g filter="url(#planetGlow)">
          <circle cx={cx} cy={cy} r="75" fill="rgba(99,102,241,0.05)" />
          <circle cx={cx} cy={cy} r="60" fill="url(#planetGrad)" className="planet-core" />
          
          {/* Internal Scanning Beam */}
          <rect className="scanner-beam" x={cx - 50} y={cy} width="100" height="2" fill="white" opacity="0.4" clipPath="circle(60px at 300px 300px)" />
          
          {/* Surface Detail Grid */}
          <g opacity="0.2" clipPath="circle(60px at 300px 300px)">
            <line x1={cx - 60} y1={cy - 20} x2={cx + 60} y2={cy - 20} stroke="white" strokeWidth="0.5" />
            <line x1={cx - 60} y1={cy + 20} x2={cx + 60} y2={cy + 20} stroke="white" strokeWidth="0.5" />
            <line x1={cx - 20} y1={cy - 60} x2={cx - 20} y2={cy + 60} stroke="white" strokeWidth="0.5" />
            <line x1={cx + 20} y1={cy - 60} x2={cx + 20} y2={cy + 60} stroke="white" strokeWidth="0.5" />
          </g>
        </g>

        {/* ── SATURN RING (Front) ── */}
        <path d={`M ${cx - 103} ${cy - 37} A 110 32 -20 0 0 ${cx + 103} ${cy + 37}`} fill="none" stroke="url(#ringGrad)" strokeWidth="12" strokeDasharray="180 120" className="pointer-events-none" />
      </svg>
    </div>
  );
}

