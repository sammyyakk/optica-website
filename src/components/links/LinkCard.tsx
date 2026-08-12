"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { LinkItem } from "@/lib/links/types";

interface LinkCardProps {
  link: LinkItem;
  index: number;
}

export default function LinkCard({ link, index }: LinkCardProps) {
  const Icon = link.icon;
  const isExternal = !link.url.startsWith("mailto:") && !link.url.startsWith("tel:");

  return (
    <motion.a
      href={link.url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className="group relative block"
    >
      {/* Hover glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 blur-lg transition-all duration-300 -z-10 group-hover:from-purple-500/20 group-hover:to-pink-500/20" />

      {/* Throbbing glow */}
      {link.pulse && (
        <motion.div
          animate={{ opacity: [0.35, 0.85, 0.35], scale: [1, 1.04, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 blur-xl -z-10"
        />
      )}

      <div
        className={`relative flex items-center gap-4 rounded-2xl border backdrop-blur-sm transition-all duration-300 min-h-[68px] sm:min-h-[72px] px-4 sm:px-5 ${
          link.featured
            ? "border-purple-400/40 bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-purple-600/30 shadow-lg shadow-purple-500/20"
            : "border-purple-500/20 bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 hover:border-purple-400/40"
        }`}
      >
        {Icon && (
          <span
            className={`flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full ${
              link.featured
                ? "bg-white/15 text-white"
                : "bg-purple-500/10 text-purple-300 group-hover:text-white group-hover:bg-purple-500/20"
            } transition-colors duration-300`}
          >
            <Icon className="h-5 w-5" />
          </span>
        )}

        <span className="min-w-0 flex-1">
          <span
            className={`block font-heading text-sm sm:text-base font-bold ${
              link.featured
                ? "bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                : "text-white"
            }`}
          >
            {link.label}
          </span>
          {link.description && (
            <span className="mt-0.5 block truncate text-xs sm:text-sm text-gray-400">
              {link.description}
            </span>
          )}
        </span>

        <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-purple-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.a>
  );
}
