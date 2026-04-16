import type { Metadata } from "next";
import XparSite from "../xpar-site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore XPAR portable spectrometers for growers, lighting engineers, and agricultural researchers."
};

export default function Page() {
  return <XparSite path="/products" />;
}
