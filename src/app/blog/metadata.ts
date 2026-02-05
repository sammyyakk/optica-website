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
    "Read the latest articles from BVP Optica — stories, tutorials, event recaps, research highlights, and insights from the world of optics and photonics.",
  keywords: [
    "BVP Optica blog",
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
      "Read the latest articles from BVP Optica — stories, tutorials, event recaps, research highlights, and insights from the world of optics and photonics.",
    url: `${siteUrl}/blog`,
    siteName: "BVP Optica",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | BVP Optica",
    description:
      "Read the latest articles from BVP Optica — stories, tutorials, event recaps, and insights from the world of optics and photonics.",
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};
