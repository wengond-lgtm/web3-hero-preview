import type { Metadata } from "next";
import XparSite from "./xpar-site";

export const metadata: Metadata = {
  title: "Wide Spectrum Intelligence",
  description:
    "XPAR PAR sensor and agricultural spectrometer tools for grow light measurement, including the X200 spectrometer with 350-1050 nm coverage and 1 nm resolution."
};

export default function Page() {
  return <XparSite path="/" />;
}
