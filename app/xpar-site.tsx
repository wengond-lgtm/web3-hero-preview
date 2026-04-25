"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

type SpecGroup = { category: string; items: { label: string; value: string }[] };
type Product = {
  slug: "x100" | "x200";
  model: string;
  badge?: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  listTitle: string;
  detailTitle: string;
  description: string;
  features: string[];
  advantages: { title: string; description: string }[];
  appFeatures: { title: string; description: string }[];
  specs: SpecGroup[];
};
type Article = {
  slug: string;
  title: string;
  summary: string;
  readTime: string;
  tag: string;
  content: { heading: string; body: string }[];
};

const products: Product[] = [
  {
    slug: "x100",
    model: "X-100",
    accent: "#06B6D4",
    accentBg: "rgba(6, 182, 212, 0.06)",
    accentBorder: "rgba(6, 182, 212, 0.28)",
    listTitle: "Professional standard portable spectrometer for plant lighting",
    detailTitle: "Reliable Spectral Measurement for Everyday Field Work",
    description: "The X-100 is a professional portable spectrometer for growers, lighting consultants, and facility teams who need dependable spectral measurement without a complex lab workflow.",
    features: ["Professional spectral measurement", "PPFD and PAR analysis", "Portable instrument design"],
    advantages: [
      { title: "Fast field capture", description: "Compare fixtures, recipes, and canopy positions with a streamlined measurement workflow." },
      { title: "PAR-ready reporting", description: "Core horticulture indicators are organized for quick fixture checks and light recipe validation." },
      { title: "Portable reliability", description: "A rugged workflow keeps daily quality checks consistent across growing zones." }
    ],
    appFeatures: [
      { title: "General Mode", description: "Real-time PPFD, TPFD, PFD of different wavelength, illumination, and fundamental light data." },
      { title: "PAR Map Mode", description: "Detailed maps to visualize light distribution and uniformity." },
      { title: "Custom Waveband Analysis", description: "Define specific wavelength ranges for tailored monitoring." },
      { title: "Auto Mode", description: "Long-term tracking of key metrics to help you identify and respond to light variations." }
    ],
    specs: [
      { category: "Optical", items: [{ label: "Spectral Range", value: "350-1050 nm" }, { label: "Spectral Resolution", value: "1 nm" }, { label: "Measurement Mode", value: "PAR, PPFD, spectral power" }] },
      { category: "Physical", items: [{ label: "Use Case", value: "Portable field measurement" }, { label: "Display", value: "Mobile app assisted" }, { label: "Data Export", value: "CSV placeholder" }] },
      { category: "Electrical", items: [{ label: "Connectivity", value: "Bluetooth placeholder" }, { label: "Power", value: "Rechargeable battery placeholder" }, { label: "Charging", value: "USB-C placeholder" }] }
    ]
  },
  {
    slug: "x200",
    model: "X-200",
    badge: "FLAGSHIP",
    accent: "#818CF8",
    accentBg: "rgba(129, 140, 248, 0.06)",
    accentBorder: "rgba(129, 140, 248, 0.32)",
    listTitle: "Advanced spectral analyzer for professional users",
    detailTitle: "Unrivaled Accuracy in a Compact Form Factor",
    description: "The X-200 is the ultimate diagnostic tool for modern growers. Driven by an enhanced micro spectro-chip with 1 nm spectral resolution, it provides critical data to fine-tune lighting and maximize plant performance.",
    features: ["Advanced spectral analysis tools", "Compact instrument design", "Extended data processing", "Research-level measurement workflow"],
    advantages: [
      { title: "20+ Indicator Reporting", description: "SPD, DLI, R/B and R/FR ratios, Chlorophyll-A/B weighting, and other horticulture-ready outputs." },
      { title: "Precision Cosine Correction", description: "Directional response error within +/-5% at 75 degree zenith angle for dependable field readings." },
      { title: "Total Source Compatibility", description: "Validate LED, HPS, fluorescent, and natural sunlight with consistent 1 nm resolution data." }
    ],
    appFeatures: [
      { title: "General Mode", description: "Real-time PPFD, TPFD, PFD of different wavelength, illumination, and fundamental light data." },
      { title: "PAR Map Mode", description: "Detailed maps to visualize light distribution and uniformity." },
      { title: "Custom Waveband Analysis", description: "Define specific wavelength ranges for tailored monitoring." },
      { title: "Auto Mode", description: "Long-term tracking of key metrics to help you identify and respond to light variations." }
    ],
    specs: [
      { category: "Optical", items: [{ label: "Spectral Range", value: "350-1050 nm" }, { label: "Spectral Resolution", value: "1 nm" }, { label: "Cosine Response", value: "+/-5% at 75 degree zenith" }, { label: "Source Compatibility", value: "LED, HPS, fluorescent, sunlight" }] },
      { category: "Physical", items: [{ label: "Instrument Type", value: "Compact portable spectrometer" }, { label: "Workflow", value: "XPAR Analyzer App" }, { label: "Data Export", value: "CSV" }] },
      { category: "Electrical", items: [{ label: "Connectivity", value: "Bluetooth placeholder" }, { label: "Power", value: "Rechargeable battery placeholder" }, { label: "Charging", value: "USB-C placeholder" }] }
    ]
  }
];

const articles: Article[] = [
  {
    slug: "ppfd-explained",
    title: "PPFD Explained",
    summary: "A practical guide to photosynthetic photon flux density and why growers use it at canopy level.",
    readTime: "7 min read",
    tag: "Metrics",
    content: [
      { heading: "What PPFD measures", body: "PPFD describes the number of photosynthetically active photons landing on a square meter each second. It is useful because it focuses on light that actually reaches the canopy instead of the light leaving a fixture." },
      { heading: "Why canopy position matters", body: "The center of a bench, the edge of a tray, and lower leaves can all receive different photon densities. Measuring a grid reveals hot spots, shadowed zones, and spacing problems." },
      { heading: "How teams use PPFD", body: "Production teams tune recipes by crop stage. Seedlings may need gentle light, while later stages can support more photons when climate, irrigation, and nutrition are balanced." },
      { heading: "Measurement discipline", body: "Good PPFD practice records fixture output, mounting height, sensor angle, time, and canopy condition. Repeating the method makes comparisons trustworthy." }
    ]
  },
  {
    slug: "understanding-par",
    title: "Understanding PAR",
    summary: "PAR is a biological window that helps growers reason about plant-useful photons.",
    readTime: "8 min read",
    tag: "Basics",
    content: [
      { heading: "The PAR window", body: "PAR usually refers to photons between 400 and 700 nm. It gives lighting teams a shared baseline for evaluating plant-useful energy." },
      { heading: "PAR and spectrum differ", body: "Two sources can produce the same total PAR with different spectral shapes. Blue, green, red, and far-red balance can change crop response." },
      { heading: "From fixture data to crop data", body: "Fixture specifications are measured under controlled conditions. Field measurement accounts for distance, reflection, dimming, age, and canopy geometry." },
      { heading: "Practical next step", body: "A robust PAR workflow combines repeated measurements, consistent placement, and spectral capture to support purchasing and production decisions." }
    ]
  },
  {
    slug: "spectrum-and-plant-growth",
    title: "Spectrum and Plant Growth",
    summary: "How blue, green, red, and far-red bands influence morphology, biomass, and decisions.",
    readTime: "9 min read",
    tag: "Spectrum",
    content: [
      { heading: "Spectrum as a crop signal", body: "Plants respond to light as both energy and information. Total photons influence photosynthesis, while spectral balance can influence shape, flowering, and pigment." },
      { heading: "Blue and red balance", body: "Blue light is often linked to compact growth and stomatal behavior. Red light is efficient for photosynthesis, but the right balance depends on crop and stage." },
      { heading: "Green and far-red roles", body: "Green photons can penetrate deeper into canopies, while far-red can influence shade responses and flowering when used carefully." },
      { heading: "Continuous improvement", body: "Facilities improve recipes by connecting spectrum data with crop observations, quality, yield, and energy use over time." }
    ]
  },
  {
    slug: "how-to-measure-grow-lights",
    title: "How to Measure Grow Lights",
    summary: "A field checklist for reliable spectral readings in greenhouses and vertical farms.",
    readTime: "10 min read",
    tag: "Workflow",
    content: [
      { heading: "Start with a plan", body: "Decide whether the goal is commissioning, troubleshooting, or routine quality checks. Define fixture settings, grid size, sensor height, and crop stage." },
      { heading: "Control the geometry", body: "Keep the sensor level unless testing angle response. Measure at canopy plane and repeat the same grid on each tier or bench." },
      { heading: "Capture spectrum and totals", body: "Record PPFD, key ratios, and spectral power distribution together. Totals help with DLI, while spectrum explains recipe quality." },
      { heading: "Turn readings into action", body: "Use measurements to adjust spacing, dimming, cleaning schedules, or recipe settings, and store notes so future teams understand what changed." }
    ]
  }
];

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Support", href: "/support/certificate" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" }
];

const downloads = [
  { type: "Datasheet", name: "X-200_User Documentation_ V1.0_202604", size: "288 KB", href: "/X-200_User Documentation_ V1.0_202604.pdf" },
  { type: "Datasheet", name: "X-100 Datasheet", size: "1.9 MB", href: "#" },
  { type: "Manual", name: "User Manual", size: "5.8 MB", href: "#" },
  { type: "Manual", name: "Calibration Guide", size: "3.1 MB", href: "#" },
  { type: "Software", name: "XPAR Analyzer App for Android", size: "5.9 MB", href: "/X200-AnalyzerPRO.apk" }
];

function XparLogo({ full = false }: { full?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="XPAR Instruments home">
      <img className="brand-logo" src="/xpar-logo.svg" alt="XPAR" />
      {full ? <span className="brand-suffix">Instruments</span> : null}
    </Link>
  );
}

function Navbar() {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header className="navbar">
      <XparLogo />
      <nav className="desktop-links" aria-label="Main navigation">
        {navItems.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          if (item.label === "Products") {
            return (
              <div className="nav-dropdown" key={item.href} onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
                <Link className={active ? "nav-link active" : "nav-link"} href={item.href}>{item.label}</Link>
                <AnimatePresence>
                  {productsOpen ? (
                    <motion.div className="products-menu" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.18 }}>
                      {products.map((product) => (
                        <Link className="products-menu-card" href={`/products/${product.slug}`} key={product.slug} style={{ "--accent": product.accent } as CSSProperties}>
                          <span className="menu-model">{product.model}</span>
                          <span>{product.listTitle}</span>
                        </Link>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          }
          return <Link className={active ? "nav-link active" : "nav-link"} href={item.href} key={item.href}>{item.label}</Link>;
        })}
      </nav>
      <Link className="nav-cta desktop-cta" href="/contact">Contact</Link>
      <button className="mobile-toggle" type="button" aria-label="Toggle mobile navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
        <span /><span /><span />
      </button>
      <AnimatePresence>
        {mobileOpen ? (
          <motion.aside className="mobile-drawer" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} transition={{ duration: 0.2 }}>
            {navItems.map((item) => <Link className="mobile-link" href={item.href} key={item.href}>{item.label}</Link>)}
            <Link className="nav-cta" href="/contact">Contact</Link>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  const columns = [
    { title: "Products", links: [{ label: "X-100", href: "/products/x100" }, { label: "X-200", href: "/products/x200" }] },
    { title: "Support", links: [{ label: "Certificate verification", href: "/support/certificate" }, { label: "Downloads", href: "/support/downloads" }] },
    { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Resources", href: "/resources" }, { label: "Contact", href: "/contact" }] }
  ];
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <XparLogo />
          <p className="footer-tagline">Next-generation spectral measurement tools for high-performance horticulture. To master the light is to master the harvest.</p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="footer-title">{column.title}</h2>
            <div className="footer-links">
              {column.links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
            </div>
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>&copy; 2026 XPAR. All rights reserved.</span>
        <div><a href="#">Privacy</a><a href="#">Terms</a></div>
      </div>
    </footer>
  );
}

function Reveal({ children, className = "", delay = 0, amount = 0.16 }: { children: ReactNode; className?: string; delay?: number; amount?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount }} transition={{ duration: 0.8, delay, ease }}>
      {children}
    </motion.div>
  );
}

function GradientText({ children, className }: { children: ReactNode; className: string }) {
  return <span className={`gradient-text ${className}`}>{children}</span>;
}

function SectionHeader({ label, title, description, tone = "indigo" }: { label: string; title: ReactNode; description?: string; tone?: "indigo" | "cyan" | "green" | "yellow" | "pink" }) {
  return (
    <Reveal className="section-header">
      <span className={`section-pill ${tone}`}>{label}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </Reveal>
  );
}

function SpectrumLine() {
  return <span className="spectrum-line" aria-hidden="true" />;
}

function HeroSection() {
  return (
    <section className="hero-section">
      <video className="hero-video" autoPlay muted loop playsInline src="https://ik.imagekit.io/fus8k8qbu/3%E6%9C%8827%E6%97%A5(1).mp4?updatedAt=1774573345766" />
      <div className="mobile-hero-fallback" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-spectrum" aria-hidden="true" />
      <motion.div className="hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease }}>
        <span className="hero-pill"><span />350-1050 nm &middot; 1 nm resolution</span>
        <h1><GradientText className="grad-hero">Master The Light</GradientText></h1>
        <h1><GradientText className="grad-hero">Master The Harvest</GradientText></h1>
        <p>Full-spectrum visibility from 350–1050 nm with 1 nm spectral resolution optimizes lighting strategy across every growth stage.</p>
        <div className="hero-actions">
          <Link className="button primary" href="/products">Explore Products</Link>
          <a className="button ghost" href="#technology">Learn More <span aria-hidden="true">v</span></a>
        </div>
      </motion.div>
      <div className="scroll-indicator" aria-hidden="true"><span /><span><i /></span></div>
    </section>
  );
}

function SpectralWave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let frame: number;

    // cursor.x is pixel offset from pad.l; -1 = not hovering
    const cursor = { x: -1 };
    const pad = { l: 6, r: 6, t: 18, b: 26 };

    // Spectral peaks: [nm, intensity, sigma, r, g, b]
    const peaks: [number, number, number, number, number, number][] = [
      [405,  0.30, 14,  168,  85, 247],
      [440,  0.78, 18,   99, 102, 241],
      [480,  0.22, 12,   59, 130, 246],
      [530,  0.42, 17,   34, 197,  94],
      [590,  0.18, 11,  234, 179,   8],
      [630,  0.50, 13,  249, 115,  22],
      [660,  0.98, 20,  239,  68,  68],
      [700,  0.12,  8,  220,  38,  38],
      [730,  0.72, 18,  185,  28,  28],
      [780,  0.28, 14,  153,  27,  27],
      [850,  0.15, 20,  120,  20,  20],
      [940,  0.08, 16,   90,  15,  15],
    ];

    const gauss = (nm: number, c: number, s: number) =>
      Math.exp(-0.5 * ((nm - c) / s) ** 2);
    const nmToX = (nm: number, cw: number) => ((nm - 350) / 700) * cw;

    // Box-blur smoothing pass
    const smooth = (arr: number[], r: number): number[] => {
      const out = new Array(arr.length);
      for (let i = 0; i < arr.length; i++) {
        let sum = 0, n = 0;
        for (let j = Math.max(0, i - r); j <= Math.min(arr.length - 1, i + r); j++) {
          sum += arr[j]; n++;
        }
        out[i] = sum / n;
      }
      return out;
    };

    const colorZones: [number, number, number, number, number][] = [
      [350, 400,  168,  85, 247],
      [400, 455,   99, 102, 241],
      [455, 510,   59, 130, 246],
      [510, 565,   34, 197,  94],
      [565, 615,  234, 179,   8],
      [615, 650,  249, 115,  22],
      [650, 710,  239,  68,  68],
      [710, 780,  185,  28,  28],
      [780, 1050, 110,  18,  18],
    ];

    // Smooth path via cardinal spline (sample every 4px → bezier)
    const drawSmooth = (points: number[], offsetX: number, offsetY: (v: number) => number) => {
      if (points.length < 2) return;
      ctx.moveTo(offsetX, offsetY(points[0]));
      for (let i = 0; i < points.length - 1; i++) {
        const x0 = offsetX + i;
        const x1 = offsetX + i + 1;
        const y0 = offsetY(points[i]);
        const y1 = offsetY(points[i + 1]);
        const cpx = (x0 + x1) / 2;
        ctx.bezierCurveTo(cpx, y0, cpx, y1, x1, y1);
      }
    };

    const draw = (time: number) => {
      const W = canvas.clientWidth  || 500;
      const H = canvas.clientHeight || 260;
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const cw = W - pad.l - pad.r;
      const ch = H - pad.t - pad.b;

      // ── Grid ────────────────────────────────────────────────
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(99,102,241,0.07)";
      for (let i = 1; i <= 4; i++) {
        const y = pad.t + (ch / 4) * i;
        ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cw, y); ctx.stroke();
      }
      [400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000].forEach(nm => {
        const x = pad.l + nmToX(nm, cw);
        ctx.strokeStyle = nm % 100 === 0 ? "rgba(99,102,241,0.13)" : "rgba(99,102,241,0.05)";
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, pad.t + ch); ctx.stroke();
      });

      // ── Axis labels ─────────────────────────────────────────
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      [400, 500, 600, 700, 800, 900, 1000].forEach(nm => {
        ctx.fillStyle = nm % 200 === 0 ? "rgba(148,163,184,0.7)" : "rgba(148,163,184,0.38)";
        ctx.fillText(`${nm}`, pad.l + nmToX(nm, cw), H - 6);
      });
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(148,163,184,0.35)";
      ctx.fillText("nm", pad.l, H - 6);

      // ── Build & smooth spectrum ──────────────────────────────
      // Global slow breath shared by all peaks
      const globalBreath = 1 + 0.038 * Math.sin(time * 0.00028);
      const raw: number[] = new Array(cw);
      for (let px = 0; px < cw; px++) {
        const nm = 350 + (px / cw) * 700;
        let v = 0.04 * gauss(nm, 660, 280);
        peaks.forEach(([c, amp, sig], i) => {
          // Each peak breathes with its own 3-harmonic rhythm
          const pulse = globalBreath * (
            1
            + 0.10 * Math.sin(time * 0.00085 + i * 0.74)
            + 0.045 * Math.sin(time * 0.0025  + i * 1.61)
            + 0.018 * Math.sin(time * 0.0062   + i * 3.07)
          );
          v += amp * pulse * gauss(nm, c, sig);
        });
        // Ripple wave propagating outward from 660nm red peak
        const ripple = 0.020 * Math.sin((nm - 660) * 0.09 + time * 0.004)
                     * Math.exp(-(((nm - 660) / 150) ** 2));
        v += ripple;
        raw[px] = Math.max(0, Math.min(1, v));
      }
      // Two-pass smooth for silky curve
      const spec = smooth(smooth(raw, 3), 2);
      const toY = (v: number) => pad.t + ch - v * ch * 0.88;
      const specY = spec.map(toY);

      // ── Filled area ─────────────────────────────────────────
      const fillGrad = ctx.createLinearGradient(pad.l, 0, pad.l + cw, 0);
      fillGrad.addColorStop(0,    "rgba(168, 85,247,0.13)");
      fillGrad.addColorStop(0.14, "rgba( 99,102,241,0.19)");
      fillGrad.addColorStop(0.26, "rgba( 34,197, 94,0.10)");
      fillGrad.addColorStop(0.44, "rgba(239, 68, 68,0.24)");
      fillGrad.addColorStop(0.54, "rgba(185, 28, 28,0.17)");
      fillGrad.addColorStop(1,    "rgba(100, 15, 15,0.04)");
      ctx.beginPath();
      ctx.moveTo(pad.l, pad.t + ch);
      drawSmooth(spec, pad.l, toY);
      ctx.lineTo(pad.l + cw - 1, pad.t + ch);
      ctx.closePath();
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // ── Sweep shimmer over fill ──────────────────────────────
      const sweepPos = ((Math.sin(time * 0.00018) * 0.5 + 0.5)) * cw;
      const sweepGrad = ctx.createLinearGradient(
        pad.l + sweepPos - 90, 0, pad.l + sweepPos + 90, 0
      );
      sweepGrad.addColorStop(0,   "rgba(255,255,255,0)");
      sweepGrad.addColorStop(0.5, "rgba(255,255,255,0.055)");
      sweepGrad.addColorStop(1,   "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.moveTo(pad.l, pad.t + ch);
      drawSmooth(spec, pad.l, toY);
      ctx.lineTo(pad.l + cw - 1, pad.t + ch);
      ctx.closePath();
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      // ── Spectrum line per color zone ─────────────────────────
      colorZones.forEach(([s, e, r, g, b]) => {
        const x0 = Math.max(0, Math.round(nmToX(s, cw)));
        const x1 = Math.min(cw - 1, Math.round(nmToX(e, cw)));
        if (x0 >= x1) return;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${r},${g},${b},0.92)`;
        ctx.lineWidth = 1.5;
        ctx.lineJoin = "round";
        ctx.moveTo(pad.l + x0, specY[x0]);
        for (let px = x0 + 1; px <= x1; px++) {
          const cpx = pad.l + px - 0.5;
          ctx.bezierCurveTo(cpx, specY[px - 1], cpx, specY[px], pad.l + px, specY[px]);
        }
        ctx.stroke();
      });

      // ── Peak glow dots ───────────────────────────────────────
      peaks.forEach(([nm, amp, , r, g, b]) => {
        if (amp < 0.4) return;
        const px = Math.round(nmToX(nm, cw));
        if (px < 0 || px >= cw) return;
        const x = pad.l + px, y = specY[px];
        const a = 0.20 + 0.14 * Math.sin(time * 0.0018 + nm * 0.012);
        const glowR = 13 + 7 * Math.abs(Math.sin(time * 0.0013 + nm * 0.009));
        const glow = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        glow.addColorStop(0, `rgba(${r},${g},${b},${Math.min(0.9, a * 2.2).toFixed(2)})`);
        glow.addColorStop(0.5, `rgba(${r},${g},${b},${(a * 0.6).toFixed(2)})`);
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(x, y, glowR, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(${r},${g},${b},0.9)`;
        ctx.beginPath(); ctx.arc(x, y, 1.8, 0, Math.PI * 2); ctx.fill();
      });

      // ── Interactive cursor ───────────────────────────────────
      if (cursor.x >= 0 && cursor.x <= cw) {
        const sx = pad.l + cursor.x;
        const pxi = Math.min(cw - 1, Math.max(0, Math.round(cursor.x)));
        const curY = specY[pxi];
        const scanNm = Math.round(350 + (cursor.x / cw) * 700);
        const intensity = (spec[pxi] * 100).toFixed(1);

        // glow band
        const sg = ctx.createLinearGradient(sx - 12, 0, sx + 12, 0);
        sg.addColorStop(0,   "rgba(6,182,212,0)");
        sg.addColorStop(0.5, "rgba(6,182,212,0.14)");
        sg.addColorStop(1,   "rgba(6,182,212,0)");
        ctx.fillStyle = sg;
        ctx.fillRect(sx - 12, pad.t, 24, ch);

        // vertical line
        ctx.beginPath();
        ctx.strokeStyle = "rgba(6,182,212,0.85)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 3]);
        ctx.moveTo(sx, pad.t); ctx.lineTo(sx, pad.t + ch);
        ctx.stroke();
        ctx.setLineDash([]);

        // intersection dot on spectrum
        ctx.fillStyle = "rgba(6,182,212,1)";
        ctx.beginPath(); ctx.arc(sx, curY, 3.5, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(sx, curY, 3.5, 0, Math.PI * 2); ctx.stroke();

        // readout tag (wavelength + intensity)
        const tagX = Math.min(Math.max(sx, pad.l + 36), pad.l + cw - 36);
        const label = `${scanNm} nm  ${intensity}%`;
        ctx.font = "bold 13px 'JetBrains Mono', monospace";
        const tw = ctx.measureText(label).width;
        ctx.fillStyle = "rgba(6,11,36,0.82)";
        ctx.beginPath();
        ctx.roundRect(tagX - tw / 2 - 7, pad.t - 20, tw + 14, 18, 4);
        ctx.fill();
        ctx.strokeStyle = "rgba(6,182,212,0.5)";
        ctx.lineWidth = 0.7;
        ctx.stroke();
        ctx.fillStyle = "rgba(6,182,212,0.95)";
        ctx.textAlign = "center";
        ctx.fillText(label, tagX, pad.t - 6);
      }

      frame = requestAnimationFrame(draw);
    };

    // ── Mouse events ─────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.clientWidth / rect.width;
      cursor.x = (e.clientX - rect.left) * scaleX - pad.l;
    };
    const onLeave = () => { cursor.x = -1; };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.style.cursor = "crosshair";

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return <canvas className="spectral-canvas" ref={canvasRef} aria-label="Spectral measurement visualization — hover to inspect wavelength" />;
}

function SpectralResponseChart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const draw = () => {
      const W = canvas.clientWidth || 420;
      const H = canvas.clientHeight || 260;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const pad = { left: 48, right: 16, top: 14, bottom: 36 };
      const cw = W - pad.left - pad.right;
      const ch = H - pad.top - pad.bottom;

      const xMin = 300, xMax = 1100, yMin = 0, yMax = 1.1;
      const toX = (nm: number) => pad.left + ((nm - xMin) / (xMax - xMin)) * cw;
      const toY = (v: number)  => pad.top  + ch - ((v - yMin) / (yMax - yMin)) * ch;

      // grid
      for (let v = 0; v <= 1.11; v += 0.1) {
        const y = toY(v);
        ctx.strokeStyle = Math.abs(v % 0.5) < 0.01 ? 'rgba(148,163,184,0.12)' : 'rgba(148,163,184,0.05)';
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + cw, y); ctx.stroke();
      }
      [400,500,600,700,800,900,1000].forEach(nm => {
        ctx.strokeStyle = 'rgba(148,163,184,0.07)'; ctx.lineWidth = 0.5;
        const x = toX(nm);
        ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, pad.top + ch); ctx.stroke();
      });

      // border
      ctx.strokeStyle = 'rgba(148,163,184,0.25)'; ctx.lineWidth = 0.8;
      ctx.strokeRect(pad.left, pad.top, cw, ch);

      // ticks
      ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = 0.7;
      [300,400,500,600,700,800,900,1000,1100].forEach(nm => {
        const x = toX(nm);
        ctx.beginPath(); ctx.moveTo(x, pad.top+ch); ctx.lineTo(x, pad.top+ch+4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, pad.top-3); ctx.stroke();
      });
      for (let v = 0.1; v <= 1.11; v += 0.1) {
        const y = toY(v);
        ctx.beginPath(); ctx.moveTo(pad.left-4, y); ctx.lineTo(pad.left, y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(pad.left+cw, y); ctx.lineTo(pad.left+cw+3, y); ctx.stroke();
      }

      // labels
      ctx.font = "9px 'JetBrains Mono', monospace"; ctx.fillStyle = 'rgba(148,163,184,0.6)';
      ctx.textAlign = 'center';
      [300,400,500,600,700,800,900,1000,1100].forEach(nm => ctx.fillText(nm+'', toX(nm), pad.top+ch+14));
      ctx.textAlign = 'right';
      [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0,1.1].forEach(v => ctx.fillText(v.toFixed(1), pad.left-6, toY(v)+3));
      ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(148,163,184,0.45)';
      ctx.fillText('Wavelength (nm)', pad.left+cw/2, H-4);
      ctx.save();
      ctx.translate(9, pad.top+ch/2); ctx.rotate(-Math.PI/2);
      ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(148,163,184,0.45)';
      ctx.fillText('Relative Response to Photons', 0, 0);
      ctx.restore();

      // response curve
      const pts = [];
      for (let nm = 300; nm <= 1100; nm++) {
        let v = 0;
        if (nm < 350) v = 0;
        else if (nm < 366) v = (nm-350)/16;
        else if (nm <= 1028) v = 0.990 + 0.010*Math.sin((nm-350)*0.017) + 0.006*Math.sin((nm-350)*0.043) + 0.004*Math.cos((nm-420)*0.008);
        else if (nm < 1050) v = 0.990*(1-Math.pow((nm-1028)/22,1.5));
        pts.push([nm, Math.max(0, Math.min(1.05, v))]);
      }

      // fill
      ctx.beginPath();
      ctx.moveTo(toX(300), toY(0));
      pts.forEach(([nm, v]) => ctx.lineTo(toX(nm), toY(v)));
      ctx.lineTo(toX(1100), toY(0));
      ctx.closePath();
      ctx.fillStyle = 'rgba(236,72,153,0.09)'; ctx.fill();

      // line
      ctx.beginPath(); ctx.strokeStyle = '#EC4899'; ctx.lineWidth = 1.8; ctx.lineJoin = 'round';
      pts.forEach(([nm,v],i) => { if(i===0) ctx.moveTo(toX(nm),toY(v)); else ctx.lineTo(toX(nm),toY(v)); });
      ctx.stroke();
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);
  return <canvas className="cosine-canvas" ref={canvasRef} aria-label="Relative spectral response to photons" />;
}
function MiniIcon({ kind, color }: { kind: "optical" | "chip" | "stable" | "ai" | "leaf" | "farm" | "bulb" | "research"; color: string }) {
  if (kind === "chip") return <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="8" y="8" width="16" height="16" rx="2" stroke={color} strokeWidth="1.5" /><rect x="12" y="12" width="8" height="8" rx="1" fill={color} opacity="0.18" /><path d="M12 4v4M20 4v4M12 24v4M20 24v4M4 12h4M24 12h4M4 20h4M24 20h4" stroke={color} strokeWidth="1.2" strokeLinecap="round" /></svg>;
  if (kind === "stable") return <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M4 20 Q8 12, 12 16 T20 16 T28 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" /><path d="M4 20 Q8 18, 12 20 T20 20 T28 20" stroke={color} opacity="0.35" /></svg>;
  if (kind === "ai") return <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="8" cy="8" r="2" fill={color} opacity="0.5" /><circle cx="24" cy="8" r="2" fill={color} opacity="0.5" /><circle cx="8" cy="24" r="2" fill={color} opacity="0.5" /><circle cx="24" cy="24" r="2" fill={color} opacity="0.5" /><circle cx="16" cy="16" r="3" stroke={color} strokeWidth="1.5" /></svg>;
  if (kind === "leaf") return <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M18 32V16" stroke={color} strokeWidth="1.5" /><path d="M18 16c-3-6-10-8-14-6 4-3 9-2 14 6z" fill={color} opacity="0.2" stroke={color} /><path d="M18 16c3-6 10-8 14-6-4-3-9-2-14 6z" fill={color} opacity="0.15" stroke={color} /></svg>;
  if (kind === "farm") return <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect x="6" y="6" width="24" height="24" rx="3" stroke={color} strokeWidth="1.5" /><path d="M6 14h24M6 22h24" stroke={color} opacity="0.45" /></svg>;
  if (kind === "bulb") return <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="14" r="8" stroke={color} strokeWidth="1.5" /><path d="M14 22h8v3a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-3z" stroke={color} fill={color} opacity="0.12" /></svg>;
  if (kind === "research") return <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="3" stroke={color} strokeWidth="1.5" /><circle cx="18" cy="18" r="8" stroke={color} opacity="0.35" /><circle cx="18" cy="18" r="13" stroke={color} opacity="0.16" /></svg>;
  return <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M4 16h8m8 0h8" stroke={color} strokeWidth="1.5" strokeLinecap="round" /><circle cx="16" cy="16" r="4" stroke={color} strokeWidth="1.5" /></svg>;
}

const techFeatures = [
  { num: "01", title: "No optical path", desc: "No traditional slit, grating, or optical alignment needed. Simplified architecture for field reliability.", color: "#818CF8", icon: "optical" },
  { num: "02", title: "Semiconductor chip", desc: "Built on advanced semiconductor spectral sensing technology. Compact, mass-producible, and cost-effective.", color: "#06B6D4", icon: "chip" },
  { num: "03", title: "Extremely stable", desc: "High environmental tolerance with no drift over time. Maintains calibration integrity across temperature and humidity changes.", color: "#10B981", icon: "stable" },
  { num: "04", title: "AI reconstruction", desc: "Advanced spectral reconstruction algorithms ensure reliable, repeatable measurement across varying light sources.", color: "#F59E0B", icon: "ai" }
] as const;

function TechSection() {
  return (
    <section className="section tech-section" id="technology">
      <div className="grid-texture" aria-hidden="true" />
      <div className="container">
        <SectionHeader label="Core technology" tone="cyan" title={<>New Spectral <GradientText className="grad-cyan">Technology</GradientText></>} description="Unlike traditional spectrometers, XPAR uses a spectral sensing chip combined with advanced spectral reconstruction algorithms." />
        <div className="tech-stack">
          <Reveal className="tech-top" delay={0.1}>
            <div className="panel wave-panel">
              <SpectralWave />
              <SpectrumLine />
              <div className="wavelengths"><span>350 nm</span><span>700 nm</span><span>1050 nm</span></div>
            </div>
            <div className="tech-stats">
              <div className="stat-card"><strong>1 nm</strong><span>Spectral Resolution</span></div>
              <div className="stat-card"><strong>350–1050 nm</strong><span>Full Range</span></div>
              <div className="stat-card"><strong>&lt;2% per year</strong><span>Long-term drift</span></div>
              <div className="stat-card"><strong>≥0.999</strong><span>Spectral Repeatability</span></div>
            </div>
          </Reveal>
          <div className="feature-grid-4">
            {techFeatures.map((feature, index) => (
              <Reveal delay={index * 0.1} key={feature.num}>
                <article className="feature-card" style={{ "--accent": feature.color } as CSSProperties}>
                  <span className="feature-accent" aria-hidden="true" />
                  <div className="feature-top">
                    <span className="icon-box"><MiniIcon kind={feature.icon} color={feature.color} /></span>
                    <span className="feature-num">{feature.num}</span>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DeviceMock({ model, badge }: { model: string; badge?: string }) {
  return (
    <div className="device-mock">
      {badge ? <span className="device-badge">{badge}</span> : null}
      <img
        className="device-product-img"
        src={`/${model.replace('-', '')}.png`}
        alt={`XPAR ${model}`}
      />
    </div>
  );
}

function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageCount = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageCount);
    }, 4000);
    return () => clearInterval(interval);
  }, [imageCount]);

  const getProductImage = (imageIndex: number) => {
    const modelPrefix = product.slug === "x100" ? "X-100" : "X-200";
    return `/${modelPrefix}_${imageIndex + 1}.png`;
  };

  return (
    <motion.article className="product-card" style={{ "--accent": product.accent, "--accent-bg": product.accentBg, "--accent-border": product.accentBorder } as CSSProperties} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.75, delay: index * 0.12, ease }}>
      <div className="device-mock">
        {product.badge ? <span className="device-badge">{product.badge}</span> : null}
        <div className="product-carousel">
          <img
            className="device-product-img"
            src={getProductImage(currentImageIndex)}
            alt={`XPAR ${product.model} - Image ${currentImageIndex + 1}`}
          />
          <div className="carousel-dots">
            {Array.from({ length: imageCount }).map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(i)}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="product-body">
        <span className="product-model">{product.model}</span>
        <h3>{product.listTitle}</h3>
        <ul>{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        <Link href={`/products/${product.slug}`} className="outline-link">View Product <span aria-hidden="true">-&gt;</span></Link>
      </div>
    </motion.article>
  );
}

function ProductShowcase() {
  return (
    <section className="section product-showcase">
      <div className="container">
        <SectionHeader label="Products" tone="green" title={<>Built for <GradientText className="grad-products">Every Stage</GradientText></>} description="Portable spectral instruments for field validation, crop lighting audits, and professional research workflows." />
        <div className="product-grid">{products.map((product, index) => <ProductCard product={product} index={index} key={product.slug} />)}</div>
      </div>
    </section>
  );
}

function CalibrationSection() {
  const stats = [{ value: "NIST", label: "Traceable accuracy" }, { value: "+/-5%", label: "@ 75 degree zenith angle" }, { value: "SI", label: "Global standards" }];
  return (
    <section className="section calibration-section">
      <div className="container calibration-layout">
        <Reveal>
          <span className="section-pill yellow">Calibration</span>
          <h2 className="section-title compact">Trusted <GradientText className="grad-calibration">Calibration</GradientText> System</h2>
          <p className="large-copy">Measurement reliability requires rigorous calibration.</p>
          <p className="muted-copy">XPAR devices are calibrated using a strict calibration process comparable to industry-standard systems. Every unit is issued a unique certificate mapped to its serial number.</p>
          <div className="calibration-stats">{stats.map((stat) => <div className="stat-card" key={stat.value}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="panel chart-panel">
            <h3>Relative Response to Photons</h3>
            <SpectralResponseChart />
            <p>Flat spectral response from 350–1050 nm, maintaining ≥98% relative sensitivity across the full PAR and far-red range.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function IndustrySection() {
  const industries = [
    { title: "Greenhouse growers", desc: "Optimize light recipes for each crop stage with real-time spectral feedback.", color: "#10B981", icon: "leaf" },
    { title: "Vertical farms", desc: "Map PAR distribution across multi-tier systems for uniform canopy coverage.", color: "#818CF8", icon: "farm" },
    { title: "Lighting engineers", desc: "Validate LED fixture output against target spectra with 1 nm resolution data.", color: "#F59E0B", icon: "bulb" },
    { title: "Agricultural researchers", desc: "Export high-resolution spectral datasets for photobiology studies and publications.", color: "#EC4899", icon: "research" }
  ] as const;
  return (
    <section className="section industry-section">
      <div className="container">
        <SectionHeader label="Applications" tone="pink" title={<>Designed for the <GradientText className="grad-industry">Horticulture</GradientText> Industry</>} description="Empowering professionals across the entire horticultural ecosystem with actionable spectral intelligence." />
        <div className="industry-grid">
          {industries.map((item, index) => (
            <Reveal delay={index * 0.1} key={item.title}>
              <article className="industry-card" style={{ "--accent": item.color } as CSSProperties}>
                <span className="industry-icon"><MiniIcon kind={item.icon} color={item.color} /></span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return <><HeroSection /><TechSection /><ProductShowcase /><CalibrationSection /><IndustrySection /></>;
}

function PageHero({ label, title, description, tone = "indigo" }: { label: string; title: ReactNode; description: string; tone?: "indigo" | "cyan" | "green" | "yellow" | "pink" }) {
  return (
    <section className="page-hero">
      <div className="container">
        <Reveal>
          <span className={`section-pill ${tone}`}>{label}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </Reveal>
      </div>
    </section>
  );
}

function ProductsPage() {
  return (
    <>
      <PageHero label="Products" tone="green" title={<>Our <GradientText className="grad-products">Instruments</GradientText></>} description="Explore portable spectrometers engineered for growers, lighting engineers, and agricultural researchers." />
      <section className="section section-tight"><div className="container product-grid">{products.map((product, index) => <ProductCard product={product} index={index} key={product.slug} />)}</div></section>
    </>
  );
}

function AdvantageCard({ item, index }: { item: Product["advantages"][number]; index: number }) {
  return (
    <Reveal delay={index * 0.1}>
      <article className="feature-card detail-feature">
        <span className="feature-accent" aria-hidden="true" />
        <span className="feature-num">{String(index + 1).padStart(2, "0")}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </article>
    </Reveal>
  );
}

function AppShowcase({ product }: { product: Product }) {
  return (
    <section className="section app-section">
      <div className="container app-layout">
        <Reveal><div className="phone-mock"><img className="phone-product-img" src="/x200phone.png" alt="XPAR Analyzer App on X-200" /></div></Reveal>
        <Reveal delay={0.1}>
          <span className="section-pill cyan">XPAR Analyzer App</span>
          <h2 className="section-title compact">Turn Your Phone Into a Real-Time Sensor Analyzer.</h2>
          <div className="mini-card-grid">{product.appFeatures.map((feature) => <article className="mini-card" key={feature.title}><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div>
        </Reveal>
      </div>
    </section>
  );
}

function SpecTable({ specs }: { specs: SpecGroup[] }) {
  return (
    <div className="spec-table">
      {specs.map((group) => (
        <section className="spec-group" key={group.category}>
          <h3>{group.category}</h3>
          <div>{group.items.map((item) => <dl key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></dl>)}</div>
        </section>
      ))}
    </div>
  );
}

function ProductDetailPage({ product }: { product: Product }) {
  const jsonLd = { "@context": "https://schema.org", "@type": "Product", name: `XPAR ${product.model}`, brand: { "@type": "Brand", name: "XPAR Instruments" }, category: "Portable spectrometer", description: product.description };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="product-detail-hero">
        <div className="container product-detail-grid">
          <Reveal>
            <span className="section-pill green">Portable Spectrometer</span>
            <h1>{product.detailTitle}</h1>
            <p>{product.description}</p>
            <div className="hero-actions left"><Link className="button primary" href="/contact">Request Quote</Link><Link className="button ghost" href="/support/downloads">Download Datasheet</Link></div>
          </Reveal>
          <Reveal delay={0.1}><ProductCard product={product} /></Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeader label="Technical advantages" tone="cyan" title={<>Key Technical <GradientText className="grad-cyan">Advantages</GradientText></>} description="A compact measurement platform for modern horticulture lighting teams." />
          <div className="three-grid">{product.advantages.map((item, index) => <AdvantageCard item={item} index={index} key={item.title} />)}</div>
        </div>
      </section>
      <AppShowcase product={product} />
      <section className="section"><div className="container"><SectionHeader label="Specifications" tone="yellow" title={<>Technical <GradientText className="grad-calibration">Specifications</GradientText></>} /><SpecTable specs={product.specs} /></div></section>
    </>
  );
}

function AboutPage() {
  const blocks = [
    { title: "A Visionary Team of Optical Experts", body: "XPAR brings together optoelectronics, embedded sensing, calibration, and data science talent to build practical measurement tools for Agriculture 4.0.", label: "Team" },
    { title: "The XPAR Optical Metrology Laboratory", body: "Our lab workflow is designed around NIST traceability, SI units, and the CAL-PAR-001 calibration protocol so field teams can trust device-level results.", label: "Laboratory" },
    { title: "Engineering the Future of Horticulture", body: "We believe research-level spectral analysis should become standard field practice, helping growers turn light into a measurable production advantage.", label: "Vision" }
  ];
  return (
    <>
      <PageHero label="About" title={<>About <GradientText className="grad-hero">XPAR Instruments</GradientText></>} description="To master the light is to master the harvest." />
      <section className="section section-tight">
        <div className="container about-stack">
          {blocks.map((block, index) => (
            <Reveal className={index % 2 === 0 ? "about-row" : "about-row reverse"} key={block.title}>
              <div className="about-img-wrap"><img className="about-img" src={`/${block.label}.png`} alt={block.label} /></div>
              <div><span className="section-pill cyan">{block.label}</span><h2 className="section-title compact">{block.title}</h2><p className="muted-copy">{block.body}</p><div className="badge-row"><span>NIST</span><span>SI</span><span>CAL-PAR-001</span></div></div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

const contactSchema = z.object({
  name: z.string().min(2, "Please enter at least 2 characters."),
  company: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),
  country: z.string().min(2, "Please choose a country."),
  message: z.string().min(10, "Please enter at least 10 characters.")
});
type ContactValues = z.infer<typeof contactSchema>;

function Field({ label, error, children, wide = false }: { label: string; error?: string; children: ReactNode; wide?: boolean }) {
  return <label className={wide ? "form-field wide" : "form-field"}><span>{label}</span>{children}{error ? <em>{error}</em> : null}</label>;
}

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactValues>({ resolver: zodResolver(contactSchema), defaultValues: { name: "", company: "", email: "", country: "", message: "" } });
  const onSubmit = async (values: ContactValues) => {
    setStatus("idle");
    console.log("Contact inquiry", values);
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    if (!response.ok) { setStatus("error"); return; }
    reset();
    setStatus("success");
  };
  return (
    <>
      <PageHero label="Contact" title={<>Start a <GradientText className="grad-products">Measurement</GradientText> Conversation</>} description="Tell us about your crop lighting workflow and our team will help you choose the right spectral measurement path." />
      <section className="section section-tight">
        <div className="container contact-layout">
          <Reveal>
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
              <Field label="Name" error={errors.name?.message}><input type="text" {...register("name")} placeholder="Your name" /></Field>
              <Field label="Company" error={errors.company?.message}><input type="text" {...register("company")} placeholder="Company name" /></Field>
              <Field label="Email" error={errors.email?.message}><input type="email" {...register("email")} placeholder="name@company.com" /></Field>
              <Field label="Country" error={errors.country?.message}><select {...register("country")}><option value="">Select country</option><option value="United States">United States</option><option value="Canada">Canada</option><option value="Netherlands">Netherlands</option><option value="China">China</option><option value="Japan">Japan</option><option value="Australia">Australia</option><option value="Other">Other</option></select></Field>
              <Field label="Message" error={errors.message?.message} wide><textarea {...register("message")} placeholder="Tell us about your application, crop, fixture type, or measurement goal." /></Field>
              <button className="button primary form-submit" disabled={isSubmitting} type="submit">{isSubmitting ? "Submitting..." : "Submit Inquiry"}</button>
              {status === "success" ? <p className="form-status success">Inquiry received. We will respond shortly.</p> : null}
              {status === "error" ? <p className="form-status error">Submission failed. Please try again.</p> : null}
            </form>
          </Reveal>
          <Reveal delay={0.1}><aside className="contact-card"><h2>XPAR Instruments</h2><p>Professional spectral measurement tools for greenhouse growers, vertical farms, lighting engineers, and agricultural researchers.</p><dl><dt>Email</dt><dd>contact@xpar-instruments.example</dd><dt>Response time</dt><dd>Within 1-2 business days</dd><dt>Support</dt><dd>Certificate verification and downloads are available online.</dd></dl></aside></Reveal>
        </div>
      </section>
    </>
  );
}

type CertificateResult = { found: boolean; sn?: string };

function CalibrationCertCard({ sn }: { sn: string }) {
  return (
    <div className="cal-cert-container">
      <svg viewBox="0 0 243.91 339.46" className="cal-cert-svg" xmlns="http://www.w3.org/2000/svg">
        <image href="/Certificate of Calibration02.svg" width="243.91" height="339.46" />
      </svg>
      <div className="cal-cert-sn-overlay">{sn}</div>
    </div>
  );
}

function CertificatePage() {
  const [serialNumber, setSerialNumber] = useState("");
  const [result, setResult] = useState<CertificateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const lookup = async (sn = serialNumber) => {
    if (!sn.trim()) return;
    setLoading(true);
    const response = await fetch(`/api/certificate?sn=${encodeURIComponent(sn)}`);
    const data = (await response.json()) as CertificateResult;
    setResult(data);
    setSerialNumber(sn);
    setLoading(false);
  };
  return (
    <>
      <PageHero label="Support" tone="cyan" title={<>Certificate <GradientText className="grad-cyan">Verification</GradientText></>} description="Verify a device calibration certificate by entering the instrument serial number." />
      <section className="section section-tight">
        <div className="container support-layout">
          <Reveal>
            <div className="search-panel">
              <label className="form-field wide"><span>Serial Number</span><input value={serialNumber} onChange={(event) => setSerialNumber(event.target.value)} placeholder="e.g. SP0226030002" /></label>
              <button className="button primary" type="button" disabled={loading} onClick={() => lookup()}>{loading ? "Searching..." : "Search Certificate"}</button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="result-panel">
              {!result ? <p>Enter a serial number and click "Search Certificate" to verify your device's calibration status.</p> : result.found && result.sn ? (
                <CalibrationCertCard sn={result.sn} />
              ) : <><span className="result-badge muted">Not found</span><p>No certificate matched this serial number. Please verify the serial number and try again.</p></>}
            </div>
          </Reveal>
        </div>
      </section>
      <SupportDownloadsSection />
    </>
  );
}

function SupportDownloadsSection() {
  const categories = ["All", "Datasheet", "Manual", "Software"];
  const [active, setActive] = useState("All");
  const visibleDownloads = active === "All" ? downloads : downloads.filter((file) => file.type === active);
  return (
    <section className="section section-tight">
      <div className="container">
        <Reveal><h2 style={{ fontSize: "clamp(32px, 4.5vw, 52px)", color: "var(--text-primary)", letterSpacing: "-1.5px", marginBottom: "16px" }}>Download <GradientText className="grad-cyan">Center</GradientText></h2></Reveal>
        <Reveal delay={0.05}><div className="filter-row">{categories.map((category) => <button className={active === category ? "filter-pill active" : "filter-pill"} key={category} onClick={() => setActive(category)} type="button">{category}</button>)}</div></Reveal>
        <Reveal delay={0.1}><div className="download-list">{visibleDownloads.map((file) => <article className="download-row" key={file.name}><span className="download-type">{file.type}</span><div><h2>{file.name}</h2><p>{file.size}</p></div><a className="outline-link" href={file.href}>Download</a></article>)}</div></Reveal>
      </div>
    </section>
  );
}

function DownloadsPage() {
  const categories = ["All", "Datasheet", "Manual", "Software"];
  const [active, setActive] = useState("All");
  const visibleDownloads = active === "All" ? downloads : downloads.filter((file) => file.type === active);
  return (
    <>
      <PageHero label="Support" tone="cyan" title={<>Download <GradientText className="grad-cyan">Center</GradientText></>} description="Access datasheets, manuals, calibration documentation, and software placeholders." />
      <section className="section section-tight">
        <div className="container">
          <div className="filter-row">{categories.map((category) => <button className={active === category ? "filter-pill active" : "filter-pill"} key={category} onClick={() => setActive(category)} type="button">{category}</button>)}</div>
          <div className="download-list">{visibleDownloads.map((file) => <article className="download-row" key={file.name}><span className="download-type">{file.type}</span><div><h2>{file.name}</h2><p>{file.size}</p></div><a className="outline-link" href={file.href}>Download</a></article>)}</div>
        </div>
      </section>
    </>
  );
}

function ResourcesPage() {
  return (
    <>
      <PageHero label="Resources" tone="pink" title={<>Spectral <GradientText className="grad-industry">Knowledge</GradientText> Library</>} description="Practical guides for growers, lighting engineers, and researchers working with plant light data." />
      <section className="section section-tight">
        <div className="container resource-grid">
          {articles.map((article, index) => (
            <Reveal delay={index * 0.08} key={article.slug}>
              <Link className="article-card" href={`/resources/${article.slug}`}>
                <span className="article-cover"><span>{article.tag}</span><SpectrumLine /></span>
                <span className="article-meta">{article.readTime}</span>
                <h2>{article.title}</h2>
                <p>{article.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function ArticlePage({ slug }: { slug: string }) {
  const article = articles.find((item) => item.slug === slug);
  if (!article) return null;
  return (
    <>
      <PageHero label={article.tag} tone="pink" title={article.title} description={article.summary} />
      <article className="section section-tight article-body">
        <div className="container narrow">
          <span className="article-meta">{article.readTime}</span>
          {article.content.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
          <Link className="outline-link" href="/resources">Back to resources</Link>
        </div>
      </article>
    </>
  );
}

function RouteContent({ path }: { path: string }) {
  if (path === "/") return <HomePage />;
  if (path === "/products") return <ProductsPage />;
  if (path === "/products/x100") return <ProductDetailPage product={products[0]} />;
  if (path === "/products/x200") return <ProductDetailPage product={products[1]} />;
  if (path === "/about") return <AboutPage />;
  if (path === "/contact") return <ContactPage />;
  if (path === "/support/certificate") return <CertificatePage />;
  if (path === "/support/downloads") return <DownloadsPage />;
  if (path === "/resources") return <ResourcesPage />;
  if (path.startsWith("/resources/")) return <ArticlePage slug={path.replace("/resources/", "")} />;
  return null;
}

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const SELECTORS = "a,button,[role='button'],input,textarea,select,label,.feature-card,.product-card,.industry-card,.nav-link,.nav-cta,.mobile-link";

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(SELECTORS)) {
        ringRef.current?.classList.add("cursor-ring--hover");
        dotRef.current?.classList.add("cursor-dot--hover");
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(SELECTORS)) {
        ringRef.current?.classList.remove("cursor-ring--hover");
        dotRef.current?.classList.remove("cursor-dot--hover");
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.11;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.11;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x}px,${mouse.current.y}px) translate(-50%,-50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px,${ring.current.y}px) translate(-50%,-50%)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

export default function XparSite({ path }: { path: string }) {
  return (
    <div className="site-shell">
      <CustomCursor />
      <Navbar />
      <main><RouteContent path={path} /></main>
      <Footer />
    </div>
  );
}
