import type { Metadata } from "next";
import XparSite from "../xpar-site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore XPAR PAR sensors and portable spectrometers, including the X200 spectrometer for growers, lighting engineers, and agricultural researchers."
};

export default function Page() {
  return <XparSite path="/products" />;
}
