"use client";

import { useEffect, useRef, useState } from "react";

interface Planet {
  name: string;
  color: string;
  size: number;
  orbit: number;
  angle: number;
  speed: number;
}

const SKILL_ITEMS = [
  { name: "Laravel", color: "#ef4444", size: 20, orbit: 1 },
  { name: "Node.js", color: "#22c55e", size: 18, orbit: 1 },
  { name: "React", color: "#61dafb", size: 18, orbit: 1 },
  { name: "Next.js", color: "#f8fafc", size: 16, orbit: 1 },
  { name: "PHP", color: "#8b5cf6", size: 17, orbit: 1 },
  { name: "TypeScript", color: "#3178c6", size: 16, orbit: 2 },
  { name: "Docker", color: "#0ea5e9", size: 15, orbit: 2 },
  { name: "PostgreSQL", color: "#6366f1", size: 16, orbit: 2 },
  { name: "MySQL", color: "#f59e0b", size: 14, orbit: 2 },
  { name: "Linux", color: "#facc15", size: 14, orbit: 2 },
  { name: "Tailwind", color: "#06b6d4", size: 14, orbit: 2 },
  { name: "Redis", color: "#ef4444", size: 13, orbit: 3 },
  { name: "MongoDB", color: "#22c55e", size: 13, orbit: 3 },
  { name: "AWS", color: "#f97316", size: 13, orbit: 3 },
  { name: "GraphQL", color: "#ec4899", size: 12, orbit: 3 },
  { name: "Jenkins", color: "#d946ef", size: 12, orbit: 3 },
  { name: "NestJS", color: "#e11d48", size: 12, orbit: 3 },
  { name: "Kafka", color: "#a3a3a3", size: 11, orbit: 3 },
  { name: "K8s", color: "#326ce5", size: 12, orbit: 3 },
  { name: "Vue", color: "#10b981", size: 12, orbit: 3 },
];

const ORBIT_RADII = [130, 200, 270];
const ORBIT_SPEEDS = [0.0006, 0.0004, 0.00025];

export default function SkillsSolarSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const planetsRef = useRef<Planet[]>([]);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    // Initialize planets with evenly distributed angles
    const orbitCounts = [0, 0, 0];
    const orbitTotals = [0, 0, 0];
    SKILL_ITEMS.forEach((s) => orbitTotals[s.orbit - 1]++);

    planetsRef.current = SKILL_ITEMS.map((item) => {
      const orbitIdx = item.orbit - 1;
      const angle =
        (orbitCounts[orbitIdx] / orbitTotals[orbitIdx]) * Math.PI * 2;
      orbitCounts[orbitIdx]++;
      return {
        ...item,
        angle,
        speed:
          ORBIT_SPEEDS[orbitIdx] *
          (0.85 + Math.random() * 0.3) *
          (Math.random() > 0.5 ? 1 : 1), // all same direction
      };
    });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

      const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;
      const scale = w / 600;

      ctx.clearRect(0, 0, w, h);

      // Draw orbit rings
      ORBIT_RADII.forEach((baseR, i) => {
        const r = baseR * scale;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 - i * 0.03})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw sun/core glow
      const sunSize = 45 * scale;
      const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunSize);
      sunGrad.addColorStop(0, "rgba(99, 102, 241, 0.9)");
      sunGrad.addColorStop(0.4, "rgba(139, 92, 246, 0.6)");
      sunGrad.addColorStop(0.7, "rgba(168, 85, 247, 0.2)");
      sunGrad.addColorStop(1, "rgba(168, 85, 247, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, sunSize, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      // Inner core
      const coreSize = 22 * scale;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize);
      coreGrad.addColorStop(0, "rgba(199, 210, 254, 0.95)");
      coreGrad.addColorStop(0.5, "rgba(129, 140, 248, 0.85)");
      coreGrad.addColorStop(1, "rgba(99, 102, 241, 0.7)");
      ctx.beginPath();
      ctx.arc(cx, cy, coreSize, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Core specular
      ctx.beginPath();
      ctx.arc(cx - (6 * scale), cy - (6 * scale), 7 * scale, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.2)";
      ctx.fill();

      // "Skills" text
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.font = `bold ${Math.max(6, 9 * scale)}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SKILLS", cx, cy);

      // Sort planets by Y for 3D depth illusion
      const planets = planetsRef.current;
      const sorted = [...planets].sort((a, b) => {
        const ay = Math.sin(a.angle) * ORBIT_RADII[a.orbit - 1];
        const by = Math.sin(b.angle) * ORBIT_RADII[b.orbit - 1];
        return ay - by;
      });

      let foundHover = false;

      sorted.forEach((p) => {
        const r = ORBIT_RADII[p.orbit - 1] * scale;
        // Elliptical orbit for 3D effect
        const px = cx + Math.cos(p.angle) * r;
        const py = cy + Math.sin(p.angle) * r * 0.4;

        // Depth-based scale and opacity
        const depthFactor = 0.6 + 0.4 * ((Math.sin(p.angle) + 1) / 2);
        const scaledSize = p.size * depthFactor * scale;
        const opacity = 0.5 + 0.5 * depthFactor;

        // Check hover
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const dist = Math.sqrt((px - mx) ** 2 + (py - my) ** 2);
        const isHovered = dist < scaledSize + 6;

        if (isHovered) {
          foundHover = true;
          if (hoveredPlanet !== p.name) {
            setHoveredPlanet(p.name);
            setTooltipPos({
              x: px + rect.left,
              y: py + rect.top - scaledSize - 12,
            });
          }
        }

        // Planet glow
        const glowGrad = ctx.createRadialGradient(
          px,
          py,
          0,
          px,
          py,
          scaledSize * 2.5
        );
        glowGrad.addColorStop(0, p.color + "40");
        glowGrad.addColorStop(1, p.color + "00");
        ctx.beginPath();
        ctx.arc(px, py, scaledSize * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Planet body
        const planetGrad = ctx.createRadialGradient(
          px - scaledSize * 0.3,
          py - scaledSize * 0.3,
          0,
          px,
          py,
          scaledSize
        );
        planetGrad.addColorStop(0, p.color + "ff");
        planetGrad.addColorStop(0.7, p.color + "cc");
        planetGrad.addColorStop(1, p.color + "80");
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(px, py, isHovered ? scaledSize * 1.3 : scaledSize, 0, Math.PI * 2);
        ctx.fillStyle = planetGrad;
        ctx.fill();

        // Planet text label
        if (scaledSize > 10 * scale || isHovered) {
          ctx.fillStyle = "rgba(255,255,255,0.9)";
          ctx.font = `${isHovered ? "bold " : ""}${Math.max(7 * scale, Math.round(scaledSize * 0.55))}px system-ui, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(p.name, px, py);
        }

        ctx.globalAlpha = 1;

        // Update angle
        p.angle += p.speed;
      });

      if (!foundHover && hoveredPlanet) {
        setHoveredPlanet(null);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    canvas.addEventListener("mousemove", onMouseMove);

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
      setHoveredPlanet(null);
    };
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [hoveredPlanet]);

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: hoveredPlanet ? "pointer" : "default" }}
      />
      {/* Tooltip that follows hovered planet */}
      {hoveredPlanet && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: "translate(-50%, -100%)",
            background: "rgba(13, 13, 32, 0.9)",
            border: "1px solid rgba(99, 102, 241, 0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          {hoveredPlanet}
        </div>
      )}
    </div>
  );
}
