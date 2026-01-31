import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bvpoptica.in";

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
        url: "/og-about.png",
        width: 1200,
        height: 630,
        alt: "About BVP Optica",
      },
    ],
  },
  twitter: {
    title: "About BVP Optica | Our Mission & Vision",
    description:
      "Discover our mission to advance optics and photonics through education, innovation, and global collaboration.",
    images: ["/og-about.png"],
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};
