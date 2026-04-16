import type { Metadata } from "next";
import XparSite from "../xpar-site";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Practical spectral measurement resources for growers, lighting engineers, and researchers."
};

export default function Page() {
  return <XparSite path="/resources" />;
}
