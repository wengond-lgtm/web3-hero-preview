"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

const PRODUCTS = [
  {
    model: "X100",
    href: "/products/x100",
    title: "Professional standard portable spectrometer for plant lighting",
    features: [
      "Professional spectral measurement",
      "PPFD & PAR analysis",
      "Portable instrument design",
    ],
    accent: "#06B6D4",
    accentBg: "rgba(6,182,212,0.06)",
    accentBorder: "rgba(6,182,212,0.2)",
  },
  {
    model: "X200",
    href: "/products/x200",
    title: "Advanced spectral analyzer for professional users",
    features: [
      "Advanced spectral analysis tools",
      "Compact instrument design",
      "Extended data processing",
      "Research-level measurement workflow",
    ],
    accent: "#818CF8",
    accentBg: "rgba(129,140,248,0.06)",
    accentBorder: "rgba(129,140,248,0.2)",
    badge: "FLAGSHIP",
  },
];

function ProductCard({
  product,
  index,
  visible,
}: {
  product: (typeof PRODUCTS)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.015)",
        border: `1px solid ${hovered ? product.accentBorder : "rgba(148,163,184,0.08)"}`,
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: visible
          ? hovered
            ? "translateY(-6px)"
            : "translateY(0)"
          : "translateY(30px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${0.15 + index * 0.15}s`,
        cursor: "default",
        boxShadow: hovered
          ? `0 8px 40px rgba(0,0,0,0.3), 0 0 30px ${product.accentBg}`
          : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Product image area */}
      <div
        style={{
          height: "260px",
          position: "relative",
          background: `radial-gradient(ellipse at 50% 80%, ${product.accentBg}, transparent 70%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid rgba(148,163,184,0.06)",
        }}
      >
        {"badge" in product && product.badge && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              padding: "4px 12px",
              borderRadius: "20px",
              background: product.accentBg,
              border: `1px solid ${product.accentBorder}`,
              fontSize: "10px",
              fontFamily: "'JetBrains Mono', monospace",
              color: product.accent,
              letterSpacing: "1.5px",
              fontWeight: 500,
            }}
          >
            {product.badge}
          </div>
        )}
        {/* Device silhouette placeholder */}
        <div
          style={{
            width: "120px",
            height: "160px",
            borderRadius: "16px",
            border: `1.5px solid ${hovered ? product.accent : "rgba(148,163,184,0.15)"}`,
            transition: "border-color 0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "28px",
              fontWeight: 700,
              color: product.accent,
              opacity: hovered ? 1 : 0.5,
              transition: "opacity 0.3s",
            }}
          >
            {product.model}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div
        style={{
          padding: "28px 28px 32px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            color: product.accent,
            letterSpacing: "1px",
            marginBottom: "10px",
            fontWeight: 500,
          }}
        >
          XPAR {product.model}
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "20px",
            fontWeight: 600,
            color: "#E2E8F0",
            lineHeight: 1.3,
            margin: "0 0 20px",
            letterSpacing: "-0.3px",
          }}
        >
          {product.title}
        </h3>

        <div style={{ flex: 1, marginBottom: "24px" }}>
          {product.features.map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 0",
                borderBottom:
                  i < product.features.length - 1
                    ? "1px solid rgba(148,163,184,0.06)"
                    : "none",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: product.accent,
                  opacity: 0.6,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "14px",
                  color: "#94A3B8",
                }}
              >
                {f}
              </span>
            </div>
          ))}
        </div>

        <Link href={product.href} style={{ textDecoration: "none" }}>
          <button
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: "8px",
              cursor: "pointer",
              background: hovered ? product.accent : "transparent",
              border: `1px solid ${product.accent}`,
              color: hovered ? "#fff" : product.accent,
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "0.3px",
              transition: "all 0.3s",
            }}
          >
            View Product →
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.1);

  return (
    <div
      ref={ref}
      style={{
        background: "#060B18",
        padding: "100px 1.5rem",
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
              border: "1px solid rgba(16,185,129,0.25)",
              background: "rgba(16,185,129,0.06)",
              fontSize: "11px",
              fontFamily: "'JetBrains Mono', monospace",
              color: "#6EE7B7",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Our instruments
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
            Precision Tools for{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #10B981, #6EE7B7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Every Stage
            </span>
          </h2>

          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "#64748B",
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            From daily light checks to advanced research workflows, XPAR
            spectrometers deliver the data you need.
          </p>
        </div>

        {/* Product cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "24px",
          }}
          className="products-grid"
        >
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.model} product={p} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </div>
  );
}
