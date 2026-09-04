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
  title: "Our Team",
  description:
    "Meet the passionate team behind BVP Optica - our core team, department heads, and dedicated members driving innovation across AI, ML, MLOps, cybersecurity, robotics, blockchain, cloud, AR/VR, IoT, and optics at BVCOE Delhi.",
  keywords: [
    "BVP Optica team",
    "student leaders",
    "BVCOE students",
    "tech club members",
    "AI ML team",
    "MLOps team",
    "cybersecurity team",
    "robotics team",
    "blockchain team",
    "optics club members",
    "photonics society team",
    "engineering student leaders",
    "Delhi college students",
  ],
  openGraph: {
    title: "Our Team | BVP Optica - Meet the Innovators",
    description:
      "Meet the passionate team behind BVP Optica - dedicated students driving innovation across AI, ML, MLOps, cybersecurity, robotics, blockchain, cloud, AR/VR, IoT, and optics at BVCOE Delhi.",
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
      "Meet the passionate team behind BVP Optica - dedicated students driving innovation across AI, ML, MLOps, cybersecurity, robotics, blockchain, cloud, AR/VR, IoT, and optics.",
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
