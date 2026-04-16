import type { Metadata } from "next";
import XparSite from "./xpar-site";

export const metadata: Metadata = {
  title: "Wide Spectrum Intelligence",
  description:
    "Wide spectrum intelligence for explosive crop performance, from 350-1050 nm with 1 nm spectral resolution."
};

export default function Page() {
  return <XparSite path="/" />;
}
