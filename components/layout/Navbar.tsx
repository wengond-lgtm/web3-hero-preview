"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Support", href: "/support" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

const PRODUCT_LINKS = [
  { label: "X100", sub: "Portable Spectrometer", href: "/products/x100", color: "#06B6D4" },
  { label: "X200", sub: "Advanced Analyzer", href: "/products/x200", color: "#818CF8" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "0 32px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(6,11,24,0.85)" : "rgba(6,11,24,0.7)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(148,163,184,0.06)",
          transition: "background 0.3s",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
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
              flexShrink: 0,
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
            XPAR
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: "32px", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "14px" }}
        >
          {NAV_LINKS.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.label}
                style={{ position: "relative" }}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <span
                  style={{
                    color: isActive(link.href) ? "#E2E8F0" : "#64748B",
                    fontWeight: isActive(link.href) ? 500 : 400,
                    cursor: "pointer",
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#E2E8F0";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = isActive(link.href) ? "#E2E8F0" : "#64748B";
                  }}
                >
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </span>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      minWidth: "240px",
                      background: "#0D1425",
                      border: "1px solid rgba(148,163,184,0.1)",
                      borderRadius: "12px",
                      padding: "8px",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
                    }}
                  >
                    {PRODUCT_LINKS.map((p) => (
                      <Link
                        key={p.label}
                        href={p.href}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "10px 12px",
                          borderRadius: "8px",
                          textDecoration: "none",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            background: `${p.color}15`,
                            border: `1px solid ${p.color}30`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontSize: "11px",
                              fontWeight: 700,
                              color: p.color,
                            }}
                          >
                            {p.label}
                          </span>
                        </div>
                        <div>
                          <div
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#E2E8F0",
                            }}
                          >
                            XPAR {p.label}
                          </div>
                          <div
                            style={{
                              fontFamily: "'IBM Plex Sans', sans-serif",
                              fontSize: "12px",
                              color: "#64748B",
                            }}
                          >
                            {p.sub}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  color: isActive(link.href) ? "#E2E8F0" : "#64748B",
                  fontWeight: isActive(link.href) ? 500 : 400,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#E2E8F0";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = isActive(link.href) ? "#E2E8F0" : "#64748B";
                }}
              >
                {link.label}
              </Link>
            )
          )}

          <Link href="/contact" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "8px 20px",
                borderRadius: "6px",
                border: "none",
                background: "linear-gradient(135deg, #6366F1, #818CF8)",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.9";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              Contact
            </button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            color: "#94A3B8",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <>
                <line x1="3" y1="8" x2="21" y2="8" strokeLinecap="round" />
                <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                <line x1="3" y1="16" x2="21" y2="16" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(6,11,24,0.95)",
            backdropFilter: "blur(16px)",
            display: "flex",
            flexDirection: "column",
            padding: "80px 32px 32px",
            gap: "8px",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "22px",
                fontWeight: 600,
                color: isActive(link.href) ? "#F1F5F9" : "#64748B",
                textDecoration: "none",
                padding: "12px 0",
                borderBottom: "1px solid rgba(148,163,184,0.06)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none", marginTop: "24px" }}>
            <button
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(135deg, #6366F1, #818CF8)",
                color: "#fff",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Contact
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
