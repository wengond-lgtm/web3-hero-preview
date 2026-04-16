import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "bg-base": "#060B18",
        "bg-alt": "#070D1A",
        "bg-footer": "#040810",
        "accent-indigo": "#6366F1",
        "accent-cyan": "#06B6D4",
        "accent-green": "#10B981",
        "accent-yellow": "#EAB308",
        "accent-pink": "#EC4899"
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["IBM Plex Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
