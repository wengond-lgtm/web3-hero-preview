"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

const SPECTRUM_COLORS = [
  "#8B5CF6", "#6366F1", "#3B82F6", "#06B6D4",
  "#10B981", "#84CC16", "#EAB308", "#F97316", "#EF4444",
];

function SpectralWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let frame: number;
    const W = 400, H = 200;
    c.width = W;
    c.height = H;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const colors = ["#6366F1", "#06B6D4", "#10B981", "#EAB308", "#EF4444"];
      colors.forEach((col, i) => {
        ctx.beginPath();
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.6;
        for (let x = 0; x < W; x++) {
          const freq = 0.015 + i * 0.005;
          const amp = 20 + i * 8;
          const phase = t * 0.001 + i * 1.2;
          const y =
            H / 2 +
            Math.sin(x * freq + phase) *
              amp *
              Math.exp(-Math.pow((x - W / 2) / (W / 3), 2));
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "200px",
        opacity: 0.9,
        borderRadius: "8px",
      }}
    />
  );
}

const FEATURES = [
  {
    num: "01",
    title: "No optical path",
    desc: "No traditional slit, grating, or optical alignment needed. Simplified architecture for field reliability.",
    color: "#818CF8",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 16h8m8 0h8" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="16" r="4" stroke="#818CF8" strokeWidth="1.5" />
        <path d="M12 16l-4-6M12 16l-4 6M20 16l4-6M20 16l4 6" stroke="#818CF8" strokeWidth="0.8" opacity="0.4" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Semiconductor chip",
    desc: "Built on advanced semiconductor spectral sensing technology. Compact, mass-producible, and cost-effective.",
    color: "#06B6D4",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="8" y="8" width="16" height="16" rx="2" stroke="#06B6D4" strokeWidth="1.5" />
        <rect x="12" y="12" width="8" height="8" rx="1" fill="#06B6D4" opacity="0.2" stroke="#06B6D4" strokeWidth="1" />
        <path d="M12 4v4M20 4v4M12 24v4M20 24v4M4 12h4M24 12h4M4 20h4M24 20h4" stroke="#06B6D4" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Extremely stable",
    desc: "High environmental tolerance with no drift over time. Maintains calibration integrity across temperature and humidity changes.",
    color: "#10B981",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 20 Q8 12, 12 16 T20 16 T28 16" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M4 20 Q8 18, 12 20 T20 20 T28 20" stroke="#10B981" strokeWidth="1" strokeLinecap="round" opacity="0.3" fill="none" />
        <line x1="2" y1="24" x2="30" y2="24" stroke="#10B981" strokeWidth="0.8" opacity="0.2" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "AI reconstruction",
    desc: "Advanced spectral reconstruction algorithm ensures reliable, repeatable measurement across varying light sources.",
    color: "#F59E0B",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="8" cy="8" r="2" fill="#F59E0B" opacity="0.5" />
        <circle cx="24" cy="8" r="2" fill="#F59E0B" opacity="0.5" />
        <circle cx="8" cy="24" r="2" fill="#F59E0B" opacity="0.5" />
        <circle cx="24" cy="24" r="2" fill="#F59E0B" opacity="0.5" />
        <circle cx="16" cy="16" r="3" stroke="#F59E0B" strokeWidth="1.5" />
        <path d="M8 8l5.5 5.5M24 8l-5.5 5.5M8 24l5.5-5.5M24 24l-5.5-5.5" stroke="#F59E0B" strokeWidth="0.8" opacity="0.4" />
      </svg>
    ),
  },
];

function FeatureCard({
  feature,
  index,
  visible,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? `${feature.color}55` : "rgba(148,163,184,0.1)"}`,
        borderRadius: "12px",
        padding: "28px 24px",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: visible
          ? hovered
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(24px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.12}s`,
        cursor: "default",
        boxShadow: hovered ? `0 0 30px ${feature.color}14` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "10px",
            background: `${feature.color}10`,
            border: `1px solid ${feature.color}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {feature.icon}
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            color: "#4B5563",
            fontWeight: 500,
          }}
        >
          {feature.num}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "18px",
          fontWeight: 600,
          color: "#E2E8F0",
          margin: "0 0 10px",
          letterSpacing: "-0.3px",
        }}
      >
        {feature.title}
      </h3>

      <p
        style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: "14px",
          lineHeight: 1.65,
          color: "#64748B",
          margin: 0,
        }}
      >
        {feature.desc}
      </p>
    </div>
  );
}

export default function TechSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visible = useInView(sectionRef, 0.15);

  return (
    <div
      id="tech-section"
      ref={sectionRef}
      style={{
        background: "#060B18",
        padding: "100px 1.5rem",
        position: "relative",
      }}
    >
      {/* Subtle grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        {/* Section header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "64px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "5px 14px",
              borderRadius: "20px",
              marginBottom: "20px",
              border: "1px solid rgba(6,182,212,0.25)",
              background: "rgba(6,182,212,0.06)",
              fontSize: "11px",
              fontFamily: "'JetBrains Mono', monospace",
              color: "#67E8F9",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Core technology
          </div>

          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              color: "#F1F5F9",
              margin: "0 0 16px",
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}
          >
            New Spectral{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #06B6D4, #818CF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Technology
            </span>
          </h2>

          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "#64748B",
              maxWidth: "600px",
              margin: 0,
            }}
          >
            Unlike traditional spectrometers, XPAR uses a spectral sensing chip
            combined with advanced spectral reconstruction algorithms.
          </p>
        </div>

        {/* Two-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
            gap: "48px",
            alignItems: "center",
          }}
          className="tech-grid"
        >
          {/* Left: wave visualization */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(148,163,184,0.08)",
                borderRadius: "16px",
                padding: "32px 24px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <SpectralWave />
              {/* Spectrum bar */}
              <div
                style={{
                  width: "100%",
                  height: "3px",
                  background: `linear-gradient(90deg, ${SPECTRUM_COLORS.join(", ")})`,
                  borderRadius: "2px",
                }}
              />
              {/* Wavelength labels */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: "#4B5563",
                }}
              >
                <span>350 nm</span>
                <span>700 nm</span>
                <span>1050 nm</span>
              </div>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                width: "100%",
              }}
            >
              {[
                { val: "1 nm", label: "Resolution" },
                { val: "700 nm", label: "Range span" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(148,163,184,0.08)",
                    borderRadius: "10px",
                    padding: "16px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#C7D2FE",
                      marginBottom: "4px",
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: "12px",
                      color: "#4B5563",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: feature cards 2×2 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            {FEATURES.map((f, i) => (
              <FeatureCard key={i} feature={f} index={i} visible={visible} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
