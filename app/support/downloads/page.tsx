import type { Metadata } from "next";
import XparSite from "../../xpar-site";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Download XPAR datasheets, manuals, calibration guides, and software placeholders."
};

export default function Page() {
  return <XparSite path="/support/downloads" />;
}
