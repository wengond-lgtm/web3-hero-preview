import type { Metadata } from "next";
import XparSite from "../../xpar-site";

export const metadata: Metadata = {
  title: "Support",
  description: "Watch the XPAR product usage video and verify device calibration certificates by serial number."
};

export default function Page() {
  return <XparSite path="/support/certificate" />;
}
