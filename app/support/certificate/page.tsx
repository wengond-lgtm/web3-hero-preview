import type { Metadata } from "next";
import XparSite from "../../xpar-site";

export const metadata: Metadata = {
  title: "Certificate Verification",
  description: "Verify XPAR device calibration certificates by serial number."
};

export default function Page() {
  return <XparSite path="/support/certificate" />;
}
