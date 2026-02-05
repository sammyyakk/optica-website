"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { FixedParticleBackground } from "@/components/ui/FixedParticleBackground";
import { FooterSection } from "@/components/home/FooterSection";

interface Maintainer {
  name: string;
  role: string;
  title: string;
  image?: string;
  linkedin: string;
  instagram?: string;
  github?: string;
  twitter?: string;
  website?: string;
  isLead?: boolean;
}

const leadMaintainer: Maintainer = {
  name: "Samyak Jain",
  role: "Lead Developer",
  title: "Creator",
  image: "/team/samyak.png",
  linkedin: "https://www.linkedin.com/in/sammyyakk/",
  instagram: "https://www.instagram.com/sammyyakk/",
  github: "https://github.com/sammyyakk",
  isLead: true,
};

const designMaintainers: Maintainer[] = [
  {
    name: "Design Member 1",
    role: "Design & Creative",
    title: "UI/UX Contributor",
    image: undefined,
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Gaurangi Chawla",
    role: "Design & Creative",
    title: "Visual Designer",
    image: "/maintainers/gaurangi.jpeg",
    linkedin: "https://www.linkedin.com/in/gaurangi-chawla-339708366/",
    instagram: "https://www.instagram.com/gaurangi_chawla_/",
  },
];

const contentMaintainers: Maintainer[] = [
  {
    name: "Prateek Sharma",
    role: "Content & Documentation",
    title: "Content Writer",
    image: "/maintainers/prateek.jpeg",
    linkedin: "https://www.linkedin.com/in/prateek-sharma-b35b96347/",
    instagram: "https://www.instagram.com/_prateeksharma._/",
  },
  {
    name: "Content Member 2",
    role: "Content & Documentation",
    title: "Documentation Lead",
    image: undefined,
    linkedin: "#",
    instagram: "#",
  },
];

const roleColors: Record<string, string> = {
  "Lead Developer": "from-amber-400 via-yellow-400 to-orange-400",
  "Design & Creative": "from-purple-400 to-blue-400",
  "Content & Documentation": "from-orange-400 to-pink-400",
};

// All maintainers combined for horizontal row (lead in center)
const allMaintainers: Maintainer[] = [
  ...designMaintainers,
  leadMaintainer,
  ...contentMaintainers,
];

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MaintainerCard({
  maintainer,
  index,
}: {
  maintainer: Maintainer;
  index: number;
}) {
  const goldenGradient = "from-yellow-400 via-amber-400 to-yellow-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative"
    >
      {/* Golden glow effect for all maintainers */}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-yellow-500/30 via-amber-400/20 to-yellow-500/30 rounded-2xl blur-xl -z-10"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative h-full bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 backdrop-blur-sm rounded-xl border border-yellow-500/40 hover:border-yellow-400/60 p-4 sm:p-5 transition-all duration-300">
        {/* Subtle glow on hover */}
        <div className="absolute -inset-1 bg-gradient-to-br from-yellow-500/0 to-amber-500/0 group-hover:from-yellow-500/15 group-hover:to-amber-500/15 rounded-xl blur-lg transition-all duration-300 -z-10" />

        {/* Avatar */}
        <div className="relative mx-auto mb-3 sm:mb-4">
          <motion.div
            className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto rounded-full bg-gradient-to-br ${goldenGradient} p-1 overflow-hidden`}
            animate={{
              boxShadow: [
                "0 0 20px rgba(251, 191, 36, 0.3)",
                "0 0 40px rgba(251, 191, 36, 0.5)",
                "0 0 20px rgba(251, 191, 36, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {maintainer.image ? (
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src={maintainer.image}
                  alt={maintainer.name}
                  width={200}
                  height={200}
                  quality={90}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-[#0E1A2B] flex items-center justify-center">
                <span
                  className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-br ${goldenGradient} bg-clip-text text-transparent`}
                >
                  {maintainer.name.charAt(0)}
                </span>
              </div>
            )}
          </motion.div>
          {/* Glow behind avatar */}
          <div
            className={`absolute inset-0 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto rounded-full bg-gradient-to-br ${goldenGradient} opacity-30 blur-xl -z-10`}
          />
        </div>

        {/* Maintainer Info */}
        <h3 className="font-heading text-sm sm:text-base lg:text-lg font-bold text-center mb-1 bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">
          {maintainer.name}
        </h3>
        <p className="font-accent text-xs sm:text-sm text-center bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent font-medium mb-1">
          {maintainer.title}
        </p>
        <p className="font-accent text-xs text-center text-gray-400 mb-3 sm:mb-4">
          {maintainer.role}
        </p>

        {/* Social Links */}
        <div className="flex gap-2 justify-center flex-wrap">
          {/* LinkedIn */}
          <motion.a
            href={maintainer.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-900/50 border border-yellow-500/30 flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-500/50 hover:border-blue-400/50 transition-all duration-300"
          >
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </motion.a>

          {/* Instagram */}
          {maintainer.instagram && (
            <motion.a
              href={maintainer.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-900/50 border border-yellow-500/30 flex items-center justify-center text-gray-300 hover:text-white hover:bg-pink-500/50 hover:border-pink-400/50 transition-all duration-300"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </motion.a>
          )}

          {/* GitHub */}
          {maintainer.github && (
            <motion.a
              href={maintainer.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-500/50 hover:border-gray-400/50 transition-all duration-300"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
          )}

          {/* Website */}
          {maintainer.website && (
            <motion.a
              href={maintainer.website}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-gray-300 hover:text-white hover:bg-purple-500/50 hover:border-purple-400/50 transition-all duration-300"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </motion.a>
          )}
        </div>

        {/* Bottom Accent */}
        <div className="mt-3 sm:mt-4 h-0.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
      </div>
    </motion.div>
  );
}

export default function MaintainersPage() {
  return (
    <main className="min-h-screen bg-transparent text-white overflow-hidden">
      {/* Fixed particle background */}
      <FixedParticleBackground />

      <div className="relative z-10 pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          {/* Header */}
          <AnimatedSection className="text-center mb-4 sm:mb-6">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Website Maintainers
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="text-center mb-10 sm:mb-16">
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-2">
              The dedicated team behind the BVP Optica website, crafting digital
              experiences and maintaining our online presence.
            </p>
          </AnimatedSection>

          {/* All maintainers in a single row on desktop, grid on mobile */}
          <AnimatedSection delay={0.25}>
            {/* Desktop: Single horizontal row */}
            <div className="hidden lg:flex justify-center gap-4 xl:gap-6">
              {allMaintainers.map((maintainer, index) => (
                <div
                  key={maintainer.name}
                  className="w-48 xl:w-56 flex-shrink-0"
                >
                  <MaintainerCard maintainer={maintainer} index={index} />
                </div>
              ))}
            </div>

            {/* Mobile/Tablet: Grid layout */}
            <div className="lg:hidden space-y-8">
              {/* Lead Maintainer */}
              <div>
                <h2 className="font-heading text-lg sm:text-xl font-bold text-center bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
                  Creator & Lead Maintainer
                </h2>
                <div className="max-w-xs mx-auto">
                  <MaintainerCard maintainer={leadMaintainer} index={0} />
                </div>
              </div>

              {/* Design & Creative */}
              <div>
                <h2 className="font-heading text-lg sm:text-xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  Design & Creative
                </h2>
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                  {designMaintainers.map((maintainer, index) => (
                    <MaintainerCard
                      key={maintainer.name}
                      maintainer={maintainer}
                      index={index}
                    />
                  ))}
                </div>
              </div>

              {/* Content & Documentation */}
              <div>
                <h2 className="font-heading text-lg sm:text-xl font-bold text-center bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  Content & Documentation
                </h2>
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                  {contentMaintainers.map((maintainer, index) => (
                    <MaintainerCard
                      key={maintainer.name}
                      maintainer={maintainer}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <FooterSection />
      </div>
    </main>
  );
}
