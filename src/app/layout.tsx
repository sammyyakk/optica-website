import type { Metadata } from "next";
import { Poppins, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { AnimationProvider } from "@/lib/animations/AnimationProvider";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import { SkipLink } from "@/lib/accessibility/hooks";

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

export const metadata: Metadata = {
  title: "BVP Optica - Student Chapter",
  description:
    "Official website of BVP Optica student chapter at Bharati Vidyapeeth's College of Engineering, Delhi. Advancing optics and photonics through education, innovation, and global collaboration.",
  keywords: [
    "BVP Optica",
    "optics",
    "photonics",
    "student chapter",
    "BVCOE",
    "engineering",
    "quantum computing",
    "Delhi",
  ],
  authors: [{ name: "BVP Optica Team" }],
  openGraph: {
    title: "BVP Optica - Student Chapter",
    description: "Advancing optics and photonics through education, innovation, and global collaboration",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BVP Optica - Student Chapter",
    description: "Advancing optics and photonics through education, innovation, and global collaboration",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
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
      className={`${poppins.variable} ${inter.variable} ${montserrat.variable}`}
    >
      <body className="font-body antialiased bg-background-light dark:bg-background-dark text-text-primary dark:text-white-elements transition-colors duration-300">
        <SkipLink />
        <ThemeProvider>
          <AnimationProvider>
            <Navbar />
            <div id="main-content">
              {children}
            </div>
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
