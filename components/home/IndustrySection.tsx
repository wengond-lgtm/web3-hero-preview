"use client";

import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

const INDUSTRIES = [
  {
    title: "Greenhouse growers",
    desc: "Optimize light recipes for each crop stage with real-time spectral feedback.",
    color: "#10B981",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 32V16" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 16c-3-6-10-8-14-6 4-3 9-2 14 6z" fill="#10B981" opacity="0.2" stroke="#10B981" strokeWidth="1" />
        <path d="M18 16c3-6 10-8 14-6-4-3-9-2-14 6z" fill="#10B981" opacity="0.15" stroke="#10B981" strokeWidth="1" />
        <path d="M18 22c-2-5-7-7-11-5 3-2 7-1 11 5z" fill="#10B981" opacity="0.25" stroke="#10B981" strokeWidth="1" />
        <line x1="8" y1="32" x2="28" y2="32" stroke="#10B981" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Vertical farms",
    desc: "Map PAR distribution across multi-tier systems for uniform canopy coverage.",
    color: "#818CF8",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="6" width="24" height="24" rx="3" stroke="#818CF8" strokeWidth="1.5" />
        <line x1="6" y1="14" x2="30" y2="14" stroke="#818CF8" strokeWidth="0.8" opacity="0.4" />
        <line x1="6" y1="22" x2="30" y2="22" stroke="#818CF8" strokeWidth="0.8" opacity="0.4" />
        <rect x="11" y="8" width="4" height="3" rx="1" fill="#818CF8" opacity="0.3" />
        <rect x="17" y="8" width="4" height="3" rx="1" fill="#818CF8" opacity="0.3" />
        <rect x="23" y="8" width="4" height="3" rx="1" fill="#818CF8" opacity="0.2" />
        <rect x="11" y="16" width="4" height="3" rx="1" fill="#818CF8" opacity="0.3" />
        <rect x="17" y="16" width="4" height="3" rx="1" fill="#818CF8" opacity="0.25" />
        <rect x="23" y="16" width="4" height="3" rx="1" fill="#818CF8" opacity="0.3" />
        <rect x="11" y="24" width="4" height="3" rx="1" fill="#818CF8" opacity="0.2" />
        <rect x="17" y="24" width="4" height="3" rx="1" fill="#818CF8" opacity="0.3" />
        <rect x="23" y="24" width="4" height="3" rx="1" fill="#818CF8" opacity="0.25" />
      </svg>
    ),
  },
  {
    title: "Lighting engineers",
    desc: "Validate LED fixture output against target spectra with 1 nm resolution data.",
    color: "#F59E0B",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="14" r="8" stroke="#F59E0B" strokeWidth="1.5" />
        <path d="M14 22h8v3a2 2 0 01-2 2h-4a2 2 0 01-2-2v-3z" stroke="#F59E0B" strokeWidth="1.2" fill="#F59E0B" opacity="0.1" />
        <line x1="16" y1="28" x2="20" y2="28" stroke="#F59E0B" strokeWidth="1" opacity="0.4" />
        <path d="M18 4v2M28 14h2M8 14H6M25.5 6.5l-1.4 1.4M10.5 6.5l1.4 1.4" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
        <circle cx="18" cy="14" r="3" fill="#F59E0B" opacity="0.15" />
      </svg>
    ),
  },
  {
    title: "Agricultural researchers",
    desc: "Export high-resolution spectral datasets for photobiology studies and publications.",
    color: "#EC4899",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="3" stroke="#EC4899" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="8" stroke="#EC4899" strokeWidth="0.8" opacity="0.3" />
        <circle cx="18" cy="18" r="13" stroke="#EC4899" strokeWidth="0.5" opacity="0.15" />
        <path d="M18 5v4M18 27v4M5 18h4M27 18h4" stroke="#EC4899" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
        <line x1="18" y1="15" x2="18" y2="10" stroke="#EC4899" strokeWidth="1" strokeLinecap="round" />
        <line x1="21" y1="18" x2="26" y2="18" stroke="#EC4899" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
];

function IndustryCard({
  item,
  index,
  visible,
}: {
  item: (typeof INDUSTRIES)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textAlign: "center",
        padding: "36px 24px",
        background: hovered ? "rgba(255,255,255,0.03)" : "transparent",
        border: `1px solid ${hovered ? `${item.color}33` : "rgba(148,163,184,0.06)"}`,
        borderRadius: "14px",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: visible
          ? hovered
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(24px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${0.1 + index * 0.1}s`,
        cursor: "default",
      }}
    >
      {/* Icon container */}
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: `${item.color}0A`,
          border: `1px solid ${item.color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          transition: "all 0.3s",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          boxShadow: hovered ? `0 0 24px ${item.color}15` : "none",
        }}
      >
        {item.icon}
      </div>

      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "16px",
          fontWeight: 600,
          color: "#E2E8F0",
          margin: "0 0 10px",
          letterSpacing: "-0.2px",
        }}
      >
        {item.title}
      </h3>

      <p
        style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: "13px",
          lineHeight: 1.65,
          color: "#64748B",
          margin: 0,
        }}
      >
        {item.desc}
      </p>
    </div>
  );
}

export default function IndustrySection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.1);

  return (
    <div
      ref={ref}
      style={{
        background: "#060B18",
        padding: "100px 1.5rem 120px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "56px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              padding: "5px 14px",
              borderRadius: "20px",
              marginBottom: "20px",
              border: "1px solid rgba(236,72,153,0.25)",
              background: "rgba(236,72,153,0.06)",
              fontSize: "11px",
              fontFamily: "'JetBrains Mono', monospace",
              color: "#F9A8D4",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Applications
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
            Designed for the{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #EC4899, #F9A8D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Horticulture
            </span>{" "}
            Industry
          </h2>

          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "#64748B",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            Empowering professionals across the entire horticultural ecosystem
            with actionable spectral intelligence.
          </p>
        </div>

        {/* Industry cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "20px",
          }}
          className="industry-grid"
        >
          {INDUSTRIES.map((item, i) => (
            <IndustryCard key={i} item={item} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </div>
  );
}
