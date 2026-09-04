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
  title: "Blog",
  description:
    "Read the latest articles from BVP Optica — stories, tutorials, event recaps, research highlights, and insights spanning AI, ML, cybersecurity, robotics, blockchain, and optics.",
  keywords: [
    "BVP Optica blog",
    "tech articles",
    "AI ML tutorials",
    "cybersecurity articles",
    "robotics blog",
    "optics articles",
    "photonics tutorials",
    "student chapter blog",
    "optics research",
    "event recaps",
    "optics education",
    "photonics insights",
  ],
  openGraph: {
    title: "Blog | BVP Optica",
    description:
      "Read the latest articles from BVP Optica — stories, tutorials, event recaps, research highlights, and insights spanning AI, ML, cybersecurity, robotics, blockchain, and optics.",
    url: `${siteUrl}/blog`,
    siteName: "BVP Optica",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | BVP Optica",
    description:
      "Read the latest articles from BVP Optica — stories, tutorials, event recaps, and insights spanning all things tech.",
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};
