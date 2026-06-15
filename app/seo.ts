export const seoKeywords = [
  "xpar",
  "XPAR Instruments",
  "par sensor",
  "PAR sensor",
  "spectrometer",
  "X200",
  "X-200",
  "X200 spectrometer",
  "X-200 spectrometer",
  "agricultural spectrometer",
  "horticulture spectrometer",
  "plant lighting measurement",
  "PPFD meter",
  "grow light sensor"
];

const defaultSiteUrl = "https://www.xparlab.com";

export function getSiteUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || defaultSiteUrl;

  const url = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

  return url.replace(/\/+$/, "");
}

export const siteUrl = getSiteUrl();

export type SitemapRoute = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
};

export const sitemapRoutes: SitemapRoute[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" },
  { path: "/products/x200", priority: 0.95, changeFrequency: "weekly" },
  { path: "/products/x100", priority: 0.8, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.75, changeFrequency: "weekly" },
  { path: "/resources/ppfd-explained", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/understanding-par", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/spectrum-and-plant-growth", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/how-to-measure-grow-lights", priority: 0.7, changeFrequency: "monthly" },
  { path: "/support/downloads", priority: 0.65, changeFrequency: "monthly" },
  { path: "/support/certificate", priority: 0.55, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" }
];
