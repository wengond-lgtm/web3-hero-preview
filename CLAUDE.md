# XPAR Website Engineering Handbook

Auto-loaded by Claude Code each session. Keep this file accurate after every feature delivery.

## Project Identity

- **Root:** `E:\xpar-claude`
- **Dev port:** 4000 (`npm.cmd run dev` → `http://localhost:4000`)
- **Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, custom CSS, Framer Motion, React Hook Form, Zod
- **Language:** English (site copy and code)
- **Brand:** XPAR Instruments — dark precision-tech spectral gradients, horticulture lighting industry

## Architecture: Single-File Router

All UI lives in **one file**: `app/xpar-site.tsx` (~900 lines, `"use client"`).

Every `app/*/page.tsx` is a thin wrapper:
```tsx
import XparSite from "../xpar-site";
export default function Page() { return <XparSite path="/products" />; }
```

Inside `xpar-site.tsx`, `function RouteContent({ path })` switches on `path` to return the matching page component. Navbar and Footer are rendered inside `XparSite`, NOT in `app/layout.tsx`.

`app/layout.tsx` contains only: global metadata + Google Fonts `<link>` tags + `{children}`. No Navbar, no Footer.

## Authoritative Files

| File | Role |
|------|------|
| `app/xpar-site.tsx` | ALL UI — Navbar, Footer, every page section, all data arrays, forms, canvas charts |
| `app/globals.css` | ALL styling — CSS variables, component classes, responsive breakpoints, animations |
| `app/layout.tsx` | Root metadata + fonts only |
| `app/*/page.tsx` | Thin wrappers: export metadata + `<XparSite path="..." />` |
| `app/api/certificate/route.ts` | Mock certificate lookup API |
| `app/api/contact/route.ts` | Mock contact form API |
| `public/xpar-logo.svg` | Official logo — do not replace with gradient square |

**Do not treat `components/` or `hooks/` as active** — they are prototype leftovers not wired into the current build.

## Active Route Map

| Route | Page Component in xpar-site.tsx |
|-------|----------------------------------|
| `/` | `HomePage` (Hero, Technology, Products, Calibration, Industry) |
| `/products` | `ProductsPage` |
| `/products/x100` | `ProductDetailPage` (X100) |
| `/products/x200` | `ProductDetailPage` (X200) |
| `/about` | `AboutPage` |
| `/contact` | `ContactPage` (React Hook Form + Zod) |
| `/support/certificate` | `CertificatePage` |
| `/support/downloads` | `DownloadsPage` |
| `/resources` | `ResourcesPage` |
| `/resources/ppfd-explained` | `ArticlePage` |
| `/resources/understanding-par` | `ArticlePage` |
| `/resources/spectrum-and-plant-growth` | `ArticlePage` |
| `/resources/how-to-measure-grow-lights` | `ArticlePage` |

## How To Edit

- **Page copy / product specs / article content / download rows:** edit the data arrays near the top of `app/xpar-site.tsx`
- **Page layout or sections:** edit the matching component function in `app/xpar-site.tsx`
- **Colors, spacing, responsive behavior, card styles, animations:** edit `app/globals.css`
- **New page route:**
  1. Create `app/<route>/page.tsx` (thin wrapper)
  2. Add a branch in `RouteContent` in `app/xpar-site.tsx`
  3. Write the page component in `app/xpar-site.tsx`
- **New static asset:** place in `public/`, reference as `/asset-name.ext`

## Design Tokens

**Fonts:**
- Headings / brand → `Orbitron` (高识别度 × 未来感)
- Body / content → `Rajdhani` (可读性佳 × 有个性, weight 500+)
- Data / labels / mono / pills → `Share Tech Mono` (技术氛围 × 数据感)

**Core colors (CSS variables in `:root`):**
```
--bg-base:    #060B18   (main background)
--bg-alt:     #070D1A   (alternate sections)
--bg-footer:  #040810
--indigo:     #6366F1
--cyan:       #06B6D4
--green:      #10B981
--yellow:     #EAB308
--pink:       #EC4899
--amber:      #F59E0B
```

**Gradient text classes:** `.gradient-text` + modifier `.grad-hero`, `.grad-green`, `.grad-cyan`, `.grad-products`, `.grad-calibration`, `.grad-industry`

**Easing:** `--ease: cubic-bezier(0.16, 1, 0.3, 1)`

**Responsive breakpoints:** 1024px (tablet), 768px (mobile nav collapse), 480px (single column)

**Design rules:**
- Keep the dark spectral look. Do not use generic white SaaS sections.
- Do not replace brand fonts with Inter/Arial/Roboto.
- Hero video opacity stays ~`0.75` unless user requests a change.
- Mobile: hamburger nav, Hero video hidden, cards stack single column.

## Hero Video

URL: `https://ik.imagekit.io/fus8k8qbu/3%E6%9C%8827%E6%97%A5(1).mp4?updatedAt=1774573345766`
Opacity: `0.56` (0.75 × 0.75)

## API & Mock Data

**Certificate lookup** `GET /api/certificate?sn=xxx`
- `XPAR-X200-2026` → X200 certificate data
- `XPAR-X100-2026` → X100 certificate data
- Any other SN → `{ found: false }`

**Contact form** `POST /api/contact` → console.log + `{ ok: true }`. Future: wire Resend or SendGrid.

## Windows Dev Commands

```bash
npm.cmd run dev        # start dev server on port 4000
npm.cmd run build      # production build
npm.cmd run typecheck  # TypeScript check (no emit)
npm.cmd install        # install / update dependencies
```

Use `npm.cmd`, not `npm` — PowerShell may block `npm.ps1`.

Local preview: `http://localhost:4000`

## Dev Server Gotchas

- **`missing required error components, refreshing...`**: caused by duplicate `next dev` processes or stale `.next` cache.
  Fix: `taskkill /F /IM node.exe`, delete `.next`, start one clean server.
- **Stale module errors after route moves**: delete `.next` and rerun `npm.cmd run build`.
- **Port 3000 is used by Codex** (working in `E:\xpar web\xpar-website`). This project is isolated on port 4000.

## Verification Policy

- Code changes → run `npm.cmd run typecheck`
- Route / style / build-sensitive changes → run `npm.cmd run build`
- Docs-only changes → no build required
- Do NOT run `npm audit fix --force` without explicit user approval

## Current Placeholders

| Area | Status |
|------|--------|
| Product imagery | CSS/device mockups |
| App screenshots | Phone mockup CSS |
| About lab imagery | Placeholder panels |
| Download links | `href="#"` |
| Contact backend | Mock console.log |
| OG image | Not implemented |

## Workspace Isolation

- **This repo** (`E:\xpar-claude`): Claude Code sessions, port 4000
- **Codex repo** (`E:\xpar web\xpar-website`): Codex sessions, port 3000
- These are independent copies. Do not cross-reference or copy between them without the user's explicit instruction.
