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
  title: "Events",
  description:
    "Explore upcoming and past events by BVP Optica - workshops, seminars, hackathons, and more. Join us for exciting learning opportunities across AI, ML, MLOps, cybersecurity, robotics, blockchain, cloud, AR/VR, IoT, optics, and cutting-edge technology.",
  keywords: [
    "BVP Optica events",
    "tech workshops",
    "AI ML events",
    "MLOps events",
    "cybersecurity workshops",
    "robotics events",
    "blockchain events",
    "cloud computing events",
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
      "Discover exciting events by BVP Optica - workshops, seminars, hackathons, and networking opportunities across AI, ML, MLOps, cybersecurity, robotics, blockchain, cloud, AR/VR, IoT, and optics.",
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
      "Discover exciting events by BVP Optica - workshops, seminars, hackathons, and networking opportunities across all things tech.",
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
