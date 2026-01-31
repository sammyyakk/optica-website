import type { Metadata, Viewport } from "next";
import { Poppins, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { AnimationProvider } from "@/lib/animations/AnimationProvider";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";

const poppins = Poppins({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bvpoptica.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BVP Optica - Student Chapter | Optics & Photonics Society",
    template: "%s | BVP Optica",
  },
  description:
    "Official website of BVP Optica student chapter at Bharati Vidyapeeth's College of Engineering, Delhi. Join us in advancing optics and photonics through education, innovation, workshops, and global collaboration.",
  keywords: [
    "BVP Optica",
    "Optica student chapter",
    "optics",
    "photonics",
    "BVCOE",
    "Bharati Vidyapeeth College of Engineering",
    "Delhi engineering college",
    "student club",
    "technical society",
    "quantum computing",
    "laser technology",
    "optical communication",
    "science club Delhi",
    "engineering events",
    "workshops Delhi",
  ],
  authors: [
    { name: "BVP Optica Team" },
    { name: "Samyak Jain", url: "https://github.com/sammyyakk" },
  ],
  creator: "Samyak Jain",
  publisher: "BVP Optica",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: "/favicon_light.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon_dark.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: "/favicon_dark.ico",
    apple: "/favicon_dark.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "BVP Optica",
    title: "BVP Optica - Student Chapter | Optics & Photonics Society",
    description:
      "Join BVP Optica - the premier student chapter for optics and photonics at BVCOE Delhi. Explore workshops, events, research opportunities, and connect with like-minded innovators.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BVP Optica - Student Chapter",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BVP Optica - Student Chapter",
    description:
      "Advancing optics and photonics through education, innovation, and global collaboration at BVCOE Delhi.",
    images: ["/og-image.png"],
    creator: "@bvpoptica",
    site: "@bvpoptica",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "education",
  classification: "Student Organization",
  referrer: "origin-when-cross-origin",
  other: {
    "google-site-verification": "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#A48FF5" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1A2B" },
  ],
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BVP Optica",
  alternateName: "BVP Optica Student Chapter",
  url: "https://bvpoptica.in",
  logo: "https://bvpoptica.in/glow_accent_logo.png",
  description:
    "Official student chapter of Optica at Bharati Vidyapeeth's College of Engineering, Delhi. Advancing optics and photonics through education, innovation, and global collaboration.",
  email: "bvpoptica@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "A-4, Paschim Vihar",
    addressLocality: "New Delhi",
    postalCode: "110063",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/bvpoptica",
    "https://www.linkedin.com/company/bvpoptica",
    "https://twitter.com/bvpoptica",
  ],
  parentOrganization: {
    "@type": "Organization",
    name: "Optica (formerly OSA)",
    url: "https://www.optica.org",
  },
  memberOf: {
    "@type": "EducationalOrganization",
    name: "Bharati Vidyapeeth's College of Engineering",
    url: "https://bvcoend.ac.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${poppins.variable} ${inter.variable} ${montserrat.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://bvpoptica.in" />
        <meta name="theme-color" content="#0E1A2B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BVP Optica" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-optica-black text-text-primary transition-colors duration-300 md:cursor-none overflow-x-hidden">
        <ThemeProvider>
          <AnimationProvider>
            <CustomCursor />
            <Navbar />
            <main id="main-content">{children}</main>
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
