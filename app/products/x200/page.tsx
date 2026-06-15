import type { Metadata } from "next";
import XparSite from "../../xpar-site";

export const metadata: Metadata = {
  title: "X200 Spectrometer",
  description:
    "XPAR X200 spectrometer for professional horticulture lighting teams, with 1 nm spectral resolution for PAR, PPFD, and agricultural spectrometer workflows."
};

export default function Page() {
  return <XparSite path="/products/x200" />;
}
