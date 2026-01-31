import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bvpoptica.com";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore upcoming and past events by BVP Optica - workshops, seminars, hackathons, and more. Join us for exciting learning opportunities in optics, photonics, and cutting-edge technology.",
  keywords: [
    "BVP Optica events",
    "optics workshops",
    "photonics seminars",
    "Delhi college events",
    "technical workshops",
    "engineering events",
    "student hackathons",
    "BVCOE events",
    "science events Delhi",
  ],
  openGraph: {
    title: "Events | BVP Optica - Workshops, Seminars & More",
    description:
      "Discover exciting events by BVP Optica - workshops, seminars, hackathons, and networking opportunities in optics and photonics.",
    url: `${siteUrl}/events`,
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
    title: "Events | BVP Optica - Workshops, Seminars & More",
    description:
      "Discover exciting events by BVP Optica - workshops, seminars, hackathons, and networking opportunities.",
    images: [
      {
        url: `${siteUrl}/glow_accent_logo.png`,
        alt: "BVP Optica Logo",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/events`,
  },
};
