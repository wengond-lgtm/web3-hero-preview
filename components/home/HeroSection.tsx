"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SPECTRUM_COLORS = [
  "#8B5CF6", "#6366F1", "#3B82F6", "#06B6D4",
  "#10B981", "#84CC16", "#EAB308", "#F97316", "#EF4444",
];

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#060B18",
      }}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.75,
          zIndex: 0,
        }}
        src="https://ik.imagekit.io/fus8k8qbu/3%E6%9C%8827%E6%97%A5(1).mp4?updatedAt=1774573345766"
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(6,11,24,0.15) 0%, rgba(6,11,24,0.05) 40%, rgba(6,11,24,0.55) 100%)",
        }}
      />

      {/* Spectrum line at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          zIndex: 3,
          background: `linear-gradient(90deg, transparent 5%, ${SPECTRUM_COLORS.join(", ")}, transparent 95%)`,
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "900px",
          padding: "2rem 1.5rem",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Tag pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "20px",
            marginBottom: "28px",
            border: "1px solid rgba(99,102,241,0.3)",
            background: "rgba(99,102,241,0.08)",
            fontSize: "12px",
            fontFamily: "'JetBrains Mono', monospace",
            color: "#A5B4FC",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#818CF8",
              boxShadow: "0 0 8px #818CF8",
              flexShrink: 0,
            }}
          />
          350–1050 nm · 1 nm resolution
        </div>

        {/* Headline line 1 */}
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 700,
            fontFamily: "'Space Grotesk', sans-serif",
            lineHeight: 1.05,
            margin: "0 0 12px",
            color: "#F1F5F9",
            letterSpacing: "-1.5px",
          }}
        >
          <span
            style={{
              background:
                "linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 30%, #818CF8 60%, #6366F1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Wide Spectrum
          </span>{" "}
          Intelligence
        </h1>

        {/* Headline line 2 */}
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 700,
            fontFamily: "'Space Grotesk', sans-serif",
            lineHeight: 1.05,
            margin: "0 0 32px",
            color: "#F1F5F9",
            letterSpacing: "-1.5px",
          }}
        >
          <span
            style={{
              background:
                "linear-gradient(135deg, #34D399 0%, #6EE7B7 50%, #A7F3D0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Explosive
          </span>{" "}
          Crop Performance
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            lineHeight: 1.7,
            color: "#94A3B8",
            maxWidth: "680px",
            margin: "0 auto 40px",
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}
        >
          Performance Photon delivers full-spectrum visibility from 350–1050 nm
          and 1 nm spectral resolution to optimize lighting strategy across every
          growth stage.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/products" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "14px 36px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(135deg, #6366F1, #818CF8)",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "0.3px",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 0 24px rgba(99,102,241,0.3)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "scale(1.03)";
                el.style.boxShadow = "0 0 32px rgba(99,102,241,0.5)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "scale(1)";
                el.style.boxShadow = "0 0 24px rgba(99,102,241,0.3)";
              }}
            >
              Explore Products
            </button>
          </Link>

          <button
            style={{
              padding: "14px 36px",
              borderRadius: "8px",
              cursor: "pointer",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(148,163,184,0.25)",
              color: "#CBD5E1",
              fontSize: "15px",
              fontWeight: 500,
              fontFamily: "'Space Grotesk', sans-serif",
              transition: "all 0.2s",
            }}
            onClick={() => {
              document.getElementById("tech-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.08)";
              el.style.borderColor = "rgba(148,163,184,0.45)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.04)";
              el.style.borderColor = "rgba(148,163,184,0.25)";
            }}
          >
            Learn More ↓
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(180deg, transparent, rgba(148,163,184,0.4))",
          }}
        />
        <div
          style={{
            width: "20px",
            height: "32px",
            borderRadius: "12px",
            border: "1.5px solid rgba(148,163,184,0.3)",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6px",
          }}
        >
          <div
            className="animate-scroll-pulse"
            style={{
              width: "3px",
              height: "8px",
              borderRadius: "2px",
              background: "rgba(148,163,184,0.5)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
