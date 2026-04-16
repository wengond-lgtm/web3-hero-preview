import type { Metadata } from "next";
import XparSite from "../xpar-site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact XPAR Instruments for product questions, spectral measurement workflows, and horticulture lighting support."
};

export default function Page() {
  return <XparSite path="/contact" />;
}
