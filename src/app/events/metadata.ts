import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bvpoptica.in";

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
        url: "/og-events.png",
        width: 1200,
        height: 630,
        alt: "BVP Optica Events",
      },
    ],
  },
  twitter: {
    title: "Events | BVP Optica - Workshops, Seminars & More",
    description:
      "Discover exciting events by BVP Optica - workshops, seminars, hackathons, and networking opportunities.",
    images: ["/og-events.png"],
  },
  alternates: {
    canonical: `${siteUrl}/events`,
  },
};
