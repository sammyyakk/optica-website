"use client";

import { motion } from "motion/react";
import { links } from "@/lib/links/links";
import LinkCard from "./LinkCard";
import LinkQrCode from "./LinkQrCode";

interface LinksPageClientProps {
  pageUrl: string;
}

export default function LinksPageClient({ pageUrl }: LinksPageClientProps) {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 pt-24 pb-12 sm:pt-28 sm:pb-16">
      {/* Ambient glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/2 h-72 w-72 translate-x-1/2 rounded-full bg-pink-600/20 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-[480px] flex-col items-center">
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
          {links.map((link, index) => (
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
