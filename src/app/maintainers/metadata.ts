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
  title: "Website Maintainers",
  description:
    "Meet the dedicated team behind the BVP Optica website - developers, designers, and content creators crafting our digital presence.",
  keywords: [
    "BVP Optica website",
    "website maintainers",
    "web developers",
    "student developers",
    "BVCOE developers",
    "optica website team",
  ],
  openGraph: {
    title: "Website Maintainers | BVP Optica",
    description:
      "Meet the dedicated team behind the BVP Optica website - developers, designers, and content creators.",
    url: `${siteUrl}/maintainers`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-team.jpg`,
        width: 1200,
        height: 630,
        alt: "BVP Optica Website Maintainers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Maintainers | BVP Optica",
    description:
      "Meet the dedicated team behind the BVP Optica website - developers, designers, and content creators.",
    images: [`${siteUrl}/og-team.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/maintainers`,
  },
};
