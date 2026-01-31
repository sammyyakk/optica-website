import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bvpoptica.in";

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
        url: "/og-team.png",
        width: 1200,
        height: 630,
        alt: "BVP Optica Team",
      },
    ],
  },
  twitter: {
    title: "Our Team | BVP Optica - Meet the Innovators",
    description:
      "Meet the passionate team behind BVP Optica - dedicated students driving innovation in optics and photonics.",
    images: ["/og-team.png"],
  },
  alternates: {
    canonical: `${siteUrl}/team`,
  },
};
