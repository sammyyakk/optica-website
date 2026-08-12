"use client";

import { motion } from "motion/react";
import { links } from "@/lib/links/links";
import LinkCard from "./LinkCard";
import LinkQrCode from "./LinkQrCode";
import LightTunnel from "./LightTunnel";

interface LinksPageClientProps {
  pageUrl: string;
}

export default function LinksPageClient({ pageUrl }: LinksPageClientProps) {
  // featured entries pin to the top; order is otherwise left as defined in links.ts
  const orderedLinks = [...links].sort(
    (a, b) => Number(!!b.featured) - Number(!!a.featured)
  );

  return (
    <div className="relative min-h-screen overflow-hidden px-4 pt-24 pb-12 sm:pt-28 sm:pb-16">
      {/* Animated tunnel background */}
      <div className="absolute inset-0 -z-10 bg-[#0a0118]">
        <LightTunnel
          cableColor="#A855F7"
          pulseColor="#EC4899"
          tunnelColor="#A855F7"
          tunnelOpacity={0}
          speed={0.1}
          flowDirection="outward"
          pulseSpeed={2}
          pulseLength={0.28}
          pulseBlend={1}
          pulseWidth={1}
          cableCount={20}
          thickness={0.35}
          rimWidth={0.15}
          waviness={0.3}
          sway={0.5}
          size={1.0}
          glow={1.0}
          fadeNear={0.5}
          fadeFar={2}
          brightness={1.0}
          colorVariance
          grain
          grainIntensity={0.05}
          opacity={1.0}
          mouseInteraction
          mouseStrength={0.1}
        />
      </div>

      {/* Acrylic glass layer: frosts the tunnel so content above stays legible */}
      <div className="pointer-events-none absolute inset-0 bg-black/10 backdrop-blur-sm" />

      {/* relative so this paints above the acrylic layer despite coming first in DOM
          (position:absolute always paints over non-positioned content otherwise) */}
      <div className="relative mx-auto flex w-full max-w-[480px] flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <p className="max-w-xs text-sm text-gray-400">
            Everything you need, one tap away.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <LinkQrCode url={pageUrl} />
        </motion.div>

        <div className="mt-8 flex w-full flex-col gap-3 sm:gap-3.5">
          {orderedLinks.map((link, index) => (
            <LinkCard key={link.slug} link={link} index={index} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-gray-500">
          Scan the QR code above to share this page.
        </p>
      </div>
    </div>
  );
}
