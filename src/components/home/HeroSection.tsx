"use client";

import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("@/components/three/Hero3D"), {
  ssr: false,
  loading: () => (
    <section className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-gradient-to-br from-optica-purple/40 via-transparent to-transparent" />
    </section>
  ),
});

import { motion } from "motion/react";

export function HeroSection() {
  return (
    <div className="relative flex min-h-[100svh] w-full items-center justify-center">
      <Hero3D />

      {/* Scroll indicator - offset slightly left to account for nav rail */}
      <motion.div
        className="pointer-events-none absolute bottom-2 sm:bottom-4 left-0 right-0 z-20 mx-auto flex w-fit flex-col items-center gap-1 sm:gap-1.5 pr-8 sm:pr-12 md:pr-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-white/70 text-[0.4rem] sm:text-[0.5rem] font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase">
          Scroll to explore
        </span>
        <motion.div
          className="flex h-8 w-5 sm:h-9 sm:w-5 items-start justify-center rounded-full border border-white/40 bg-white/5 p-1 sm:p-1.5"
          animate={{
            borderColor: [
              "rgba(255,255,255,0.35)",
              "rgba(168,85,247,0.65)",
              "rgba(255,255,255,0.35)",
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-white"
            animate={{ y: [0, 12, 0], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
