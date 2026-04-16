import type { Metadata } from "next";
import XparSite from "../../xpar-site";

export const metadata: Metadata = {
  title: "XPAR X200",
  description:
    "Advanced spectral analyzer with 1 nm spectral resolution for professional horticulture lighting teams."
};

export default function Page() {
  return <XparSite path="/products/x200" />;
}
