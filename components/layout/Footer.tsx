"use client";

import Link from "next/link";

const FOOTER_COLS = [
  {
    title: "Products",
    links: [
      { label: "X100", href: "/products/x100" },
      { label: "X200", href: "/products/x200" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Certificate verification", href: "/support/certificate" },
      { label: "Downloads", href: "/support/downloads" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#040810",
        padding: "60px 1.5rem 32px",
        borderTop: "1px solid rgba(148,163,184,0.06)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "48px",
            marginBottom: "48px",
          }}
          className="grid-cols-footer"
        >
          {/* Brand column */}
          <div>
            <Link href="/" style={{ textDecoration: "none" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    background: "linear-gradient(135deg, #6366F1, #06B6D4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  X
                </div>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#F1F5F9",
                    letterSpacing: "-0.5px",
                  }}
                >
                  XPAR Instruments
                </span>
              </div>
            </Link>
            <p
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "13px",
                lineHeight: 1.7,
                color: "#4B5563",
                maxWidth: "280px",
                margin: 0,
              }}
            >
              Next-generation spectral measurement tools for high-performance
              horticulture. To master the light is to master the harvest.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#64748B",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: "14px",
                      color: "#4B5563",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#94A3B8";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#4B5563";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(148,163,184,0.06)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "12px",
              color: "#334155",
            }}
          >
            © 2026 XPAR Instruments. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy", "Terms"].map((t) => (
              <Link
                key={t}
                href={`/${t.toLowerCase()}`}
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "12px",
                  color: "#334155",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#64748B";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#334155";
                }}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
