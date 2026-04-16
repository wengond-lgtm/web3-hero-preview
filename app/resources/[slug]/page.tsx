import type { Metadata } from "next";
import { notFound } from "next/navigation";
import XparSite from "../../xpar-site";

const articleTitles: Record<string, string> = {
  "ppfd-explained": "PPFD Explained",
  "understanding-par": "Understanding PAR",
  "spectrum-and-plant-growth": "Spectrum and Plant Growth",
  "how-to-measure-grow-lights": "How to Measure Grow Lights"
};

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return Object.keys(articleTitles).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  return {
    title: articleTitles[params.slug] ?? "XPAR Resource",
    description:
      "XPAR horticulture lighting and spectral measurement knowledge resource."
  };
}

export default function Page({ params }: PageProps) {
  if (!articleTitles[params.slug]) {
    notFound();
  }

  return <XparSite path={`/resources/${params.slug}`} />;
}
