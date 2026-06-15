import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { seoKeywords, siteUrl } from "./seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "XPAR Instruments",
  title: {
    default: "XPAR Instruments | Wide Spectrum Intelligence",
    template: "%s | XPAR Instruments"
  },
  description:
    "XPAR Instruments builds PAR sensors, X200 spectrometers, and agricultural spectrometer tools for horticulture lighting validation and optical calibration.",
  keywords: seoKeywords,
  category: "horticulture lighting measurement",
  classification: "PAR sensor, spectrometer, agricultural spectrometer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: "XPAR Instruments",
    description:
      "PAR sensors, X200 spectrometers, and agricultural spectrometer tools for the global horticulture lighting industry.",
    url: siteUrl,
    siteName: "XPAR Instruments",
    images: ["/og-image.png"],
    locale: "en_US",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/xpar-favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
