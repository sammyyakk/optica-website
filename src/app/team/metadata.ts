import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bvpoptica.com";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the passionate team behind BVP Optica - our core team, department heads, and dedicated members driving innovation in optics and photonics at BVCOE Delhi.",
  keywords: [
    "BVP Optica team",
    "student leaders",
    "BVCOE students",
    "optics club members",
    "photonics society team",
    "engineering student leaders",
    "Delhi college students",
  ],
  openGraph: {
    title: "Our Team | BVP Optica - Meet the Innovators",
    description:
      "Meet the passionate team behind BVP Optica - dedicated students driving innovation in optics and photonics at BVCOE Delhi.",
    url: `${siteUrl}/team`,
    images: [
      {
        url: `${siteUrl}/glow_accent_logo.png`,
        width: 800,
        height: 800,
        alt: "BVP Optica Logo",
      },
    ],
  },
  twitter: {
    title: "Our Team | BVP Optica - Meet the Innovators",
    description:
      "Meet the passionate team behind BVP Optica - dedicated students driving innovation in optics and photonics.",
    images: [
      {
        url: `${siteUrl}/glow_accent_logo.png`,
        alt: "BVP Optica Logo",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/team`,
  },
};
