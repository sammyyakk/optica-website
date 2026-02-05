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
  title: "AI Conclave - The AI Hackathon | BVP Optica",
  description:
    "Join AI Conclave, a multidisciplinary AI hackathon by BVP Optica. Solve real-world challenges in Environment, Healthcare, and Fintech. Win prizes up to ₹5,000!",
  keywords: [
    "AI Hackathon",
    "AI Conclave",
    "BVP Optica",
    "BVCOE hackathon",
    "artificial intelligence competition",
    "machine learning hackathon",
    "Delhi hackathon 2026",
    "environment AI",
    "healthcare AI",
    "fintech AI",
  ],
  openGraph: {
    title: "AI Conclave - The AI Hackathon | BVP Optica",
    description:
      "A multidisciplinary AI hackathon solving real-world challenges in Environment, Healthcare, and Fintech. Feb 14-18, 2026.",
    url: `${siteUrl}/events/ai-conclave`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/events/ai-conclave-og.jpg`,
        width: 1200,
        height: 630,
        alt: "AI Conclave - BVP Optica AI Hackathon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Conclave - The AI Hackathon | BVP Optica",
    description:
      "Join AI Conclave by BVP Optica. Solve challenges in Environment, Healthcare & Fintech. Win ₹5,000!",
    images: [`${siteUrl}/events/ai-conclave-og.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/events/ai-conclave`,
  },
};
