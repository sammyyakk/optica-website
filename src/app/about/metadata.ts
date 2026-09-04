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
  title: "About Us",
  description:
    "Learn about BVP Optica - the coolest tech chapter at Bharati Vidyapeeth's College of Engineering, Delhi. Discover our mission, vision, activities, and journey across AI, ML, cybersecurity, robotics, blockchain, and optics.",
  keywords: [
    "about BVP Optica",
    "Optica student chapter",
    "BVCOE Delhi",
    "tech club Delhi",
    "AI ML club",
    "cybersecurity club",
    "robotics club",
    "optics society",
    "photonics club",
    "student organization",
    "technical club Delhi",
    "engineering society",
  ],
  openGraph: {
    title: "About BVP Optica | Our Mission & Vision",
    description:
      "Discover our mission to build and innovate across AI, ML, cybersecurity, robotics, blockchain, and optics through education, innovation, and global collaboration. Join the coolest tech chapter at BVCOE Delhi.",
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
      "Discover our mission to build and innovate across AI, ML, cybersecurity, robotics, blockchain, and optics through education, innovation, and global collaboration.",
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
