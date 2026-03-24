import type { Metadata } from "next";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://www.bvpoptica.com";
};

const siteUrl = getBaseUrl();

export const metadata: Metadata = {
  title: "Quantum Quotient 3.0 - Optics & Photonics Quiz | BVP Optica",
  description:
    "Test your expertise in optics and photonics! Join Quantum Quotient 3.0 - a high-energy quiz competition with 30 MCQs in 30 minutes. Individual participation. Win recognition and rewards!",
  keywords: [
    "Quantum Quotient",
    "Quantum Quotient 3.0",
    "optics quiz",
    "photonics competition",
    "BVP Optica",
    "BVCOE quiz",
    "physics quiz 2026",
    "optics competition",
    "photonics quiz",
    "laser physics quiz",
    "wave optics quiz",
  ],
  openGraph: {
    title: "Quantum Quotient 3.0 - Optics & Photonics Quiz | BVP Optica",
    description:
      "30 MCQs in 30 minutes! Test your knowledge of optics and photonics in this fast-paced quiz competition. March 27, 2026.",
    url: `${siteUrl}/events/quantum-quotient-3`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/events/quantum-quotient-3/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Quantum Quotient 3.0 - BVP Optica Optics & Photonics Quiz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantum Quotient 3.0 - Optics & Photonics Quiz | BVP Optica",
    description:
      "30 MCQs in 30 minutes! Test your optics & photonics knowledge. Individual participation. Win recognition and rewards!",
    images: [`${siteUrl}/events/quantum-quotient-3/twitter-image`],
  },
  alternates: {
    canonical: `${siteUrl}/events/quantum-quotient-3`,
  },
};
