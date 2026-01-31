import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bvpoptica.com";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about BVP Optica - the student chapter of Optica at Bharati Vidyapeeth's College of Engineering, Delhi. Discover our mission, vision, activities, and journey in advancing optics and photonics.",
  keywords: [
    "about BVP Optica",
    "Optica student chapter",
    "BVCOE Delhi",
    "optics society",
    "photonics club",
    "student organization",
    "technical club Delhi",
    "engineering society",
  ],
  openGraph: {
    title: "About BVP Optica | Our Mission & Vision",
    description:
      "Discover our mission to advance optics and photonics through education, innovation, and global collaboration. Join the premier student chapter at BVCOE Delhi.",
    url: `${siteUrl}/about`,
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
    title: "About BVP Optica | Our Mission & Vision",
    description:
      "Discover our mission to advance optics and photonics through education, innovation, and global collaboration.",
    images: [
      {
        url: `${siteUrl}/glow_accent_logo.png`,
        alt: "BVP Optica Logo",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};
