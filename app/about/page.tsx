import type { Metadata } from "next";
import XparSite from "../xpar-site";

export const metadata: Metadata = {
  title: "About XPAR",
  description:
    "Learn about XPAR Instruments, optical metrology, calibration, and the mission to make spectral analysis standard field practice."
};

export default function Page() {
  return <XparSite path="/about" />;
}
