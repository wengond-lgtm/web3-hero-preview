import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://xpar-instruments.example"),
  title: {
    default: "XPAR Instruments | Wide Spectrum Intelligence",
    template: "%s | XPAR Instruments"
  },
  description:
    "Professional spectral measurement instruments for high-performance horticulture, plant lighting validation, and optical calibration.",
  openGraph: {
    title: "XPAR Instruments",
    description:
      "Next-generation spectral measurement tools for the global horticulture lighting industry.",
    url: "https://xpar-instruments.example",
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
      <body>{children}</body>
    </html>
  );
}
