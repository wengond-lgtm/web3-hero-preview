import type { Metadata } from "next";
import XparSite from "../../xpar-site";

export const metadata: Metadata = {
  title: "XPAR X100",
  description:
    "Reliable portable spectral measurement for everyday horticulture field work."
};

export default function Page() {
  return <XparSite path="/products/x100" />;
}
