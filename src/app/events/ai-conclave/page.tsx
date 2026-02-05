"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { FooterSection } from "@/components/home/FooterSection";

// SVG Icons
const Icons = {
  // Track icons
  Globe: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Hospital: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
      <path d="M9 9h1" />
      <path d="M9 13h1" />
      <path d="M9 17h1" />
    </svg>
  ),
  Wallet: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  ),
  // Timeline icons
  ClipboardPen: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  ),
  Laptop: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  ),
  Megaphone: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 18-5v12L3 13v-2z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  ),
  Trophy: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  // Social icons
  Instagram: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  LinkedIn: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Twitter: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  // Medal icons
  Medal1: ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
      <path d="M11 12 5.12 2.2" />
      <path d="m13 12 5.88-9.8" />
      <path d="M8 7h8" />
      <circle cx="12" cy="17" r="5" />
      <path d="M12 18v-2h-.5" />
    </svg>
  ),
  Medal2: ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
      <path d="M11 12 5.12 2.2" />
      <path d="m13 12 5.88-9.8" />
      <path d="M8 7h8" />
      <circle cx="12" cy="17" r="5" />
      <path d="M10 19h4" />
      <path d="M10 15l2 2 2-2" />
    </svg>
  ),
  Medal3: ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
      <path d="M11 12 5.12 2.2" />
      <path d="m13 12 5.88-9.8" />
      <path d="M8 7h8" />
      <circle cx="12" cy="17" r="5" />
      <path d="M10.5 15a2.5 2.5 0 0 1 3 0" />
      <path d="M10.5 19a2.5 2.5 0 0 0 3 0" />
    </svg>
  ),
  // UI icons
  Zap: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  ),
  Target: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Sparkles: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  ),
  MapPin: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Lightbulb: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  ),
  CheckCircle: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Layers: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  ),
  Mail: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  ChevronDown: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  ArrowRight: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  ArrowLeft: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  ),
  // Problem statement icons
  Eye: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Cloud: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  ),
  Recycle: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
      <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 12.013 3a1.784 1.784 0 0 1 1.575.887l4.596 7.957" />
      <path d="M20.9 13.402 16.803 12.3l-1.097 4.096" />
    </svg>
  ),
  Users: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Mic: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  ),
  HeartPulse: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </svg>
  ),
  CreditCard: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  ),
  FileCheck: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="m9 15 2 2 4-4" />
    </svg>
  ),
  ShieldAlert: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  ),
  X: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
};

// Optimized background
function CrazyBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030014]">
      {/* Static grid */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Static gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  );
}

// Glitch text effect
function GlitchText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <span className="relative inline-block">
        {children}
        <motion.span
          className="absolute top-0 left-0 text-cyan-400 opacity-70"
          style={{ clipPath: "inset(0 0 50% 0)" }}
          animate={{ x: [-2, 2, -2], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
          aria-hidden="true"
        >
          {children}
        </motion.span>
        <motion.span
          className="absolute top-0 left-0 text-pink-400 opacity-70"
          style={{ clipPath: "inset(50% 0 0 0)" }}
          animate={{ x: [2, -2, 2], opacity: [0.7, 0, 0.7] }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 3,
            delay: 0.1,
          }}
          aria-hidden="true"
        >
          {children}
        </motion.span>
      </span>
    </div>
  );
}

// Neon card with hover effects
function NeonCard({
  children,
  className = "",
  glowColor = "purple",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: "purple" | "pink" | "cyan" | "green" | "amber";
  delay?: number;
}) {
  const colors = {
    purple: { border: "border-purple-500/30", bg: "from-purple-900/20" },
    pink: { border: "border-pink-500/30", bg: "from-pink-900/20" },
    cyan: { border: "border-cyan-500/30", bg: "from-cyan-900/20" },
    green: { border: "border-green-500/30", bg: "from-green-900/20" },
    amber: { border: "border-amber-500/30", bg: "from-amber-900/20" },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`relative group ${className}`}
    >
      <div
        className={`relative rounded-2xl bg-gradient-to-br ${colors[glowColor].bg} via-black/60 to-black/40 border ${colors[glowColor].border} overflow-hidden hover:border-opacity-60 transition-colors`}
      >
        {children}
      </div>
    </motion.div>
  );
}

// Countdown Timer Component with crazy styling
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null;

  const timeUnits = [
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HRS" },
    { value: timeLeft.minutes, label: "MIN" },
    { value: timeLeft.seconds, label: "SEC" },
  ];

  return (
    <div className="flex gap-2 sm:gap-4 md:gap-5">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
          className="flex flex-col items-center"
        >
          <div className="relative group">
            {/* Outer glow ring */}
            <motion.div
              className="absolute -inset-1 sm:-inset-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-50 blur-md sm:blur-lg"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-black/80 border border-purple-500/50 flex items-center justify-center overflow-hidden">
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-transparent to-pink-600/30"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              {/* Number with flip animation */}
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ y: -50, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: 50, opacity: 0, rotateX: 90 }}
                  transition={{ duration: 0.3 }}
                  className="font-heading text-2xl sm:text-3xl md:text-5xl font-black text-white relative z-10"
                  style={{ textShadow: "0 0 30px rgba(168,85,247,0.8)" }}
                >
                  {String(unit.value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 sm:w-3 sm:h-3 border-l-2 border-t-2 border-cyan-400" />
              <div className="absolute top-0 right-0 w-2 h-2 sm:w-3 sm:h-3 border-r-2 border-t-2 border-cyan-400" />
              <div className="absolute bottom-0 left-0 w-2 h-2 sm:w-3 sm:h-3 border-l-2 border-b-2 border-pink-400" />
              <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 border-r-2 border-b-2 border-pink-400" />
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-400 mt-2 sm:mt-3 tracking-[0.2em] sm:tracking-[0.3em]">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// Hexagon Component with glow
function Hexagon({
  className = "",
  children,
  color = "purple",
  active = false,
}: {
  className?: string;
  children?: React.ReactNode;
  color?: string;
  active?: boolean;
}) {
  const colors: Record<string, string> = {
    purple: "from-purple-500 to-violet-600",
    pink: "from-pink-500 to-rose-600",
    cyan: "from-cyan-500 to-blue-600",
    green: "from-green-500 to-emerald-600",
    amber: "from-amber-500 to-orange-600",
  };

  return (
    <div className={`relative ${className}`}>
      {active && (
        <motion.div
          className={`absolute -inset-4 bg-gradient-to-r ${colors[color]} opacity-40 blur-2xl`}
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <div
        className={`w-full h-full bg-gradient-to-br ${active ? colors[color] : "from-gray-800 to-gray-900"} relative overflow-hidden`}
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        <div
          className="absolute inset-[2px] bg-black/80 backdrop-blur-sm flex items-center justify-center"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

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
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface Problem {
  title: string;
  shortDescription: string;
  problemStatement: string;
  objective: string;
  expectedOutcome?: string;
  approachLevels?: {
    beginner: string;
    advanced: string;
  };
  deliverables?: string[];
  icon: keyof typeof Icons;
}

interface Track {
  title: string;
  icon: string;
  color: string;
  hexColor: string;
  problems: Problem[];
}

const tracks: Track[] = [
  {
    title: "Environment",
    icon: "globe",
    color: "from-green-400 to-emerald-500",
    hexColor: "green",
    problems: [
      {
        title: "AI-Based Visibility Estimator",
        shortDescription:
          "Estimate visibility in fog, dust, or smog conditions",
        problemStatement:
          "Reduced visibility due to atmospheric conditions poses risks to transportation and public safety.",
        objective:
          "Develop an AI system that estimates visibility quality using limited inputs such as light source type, approximate particle density, and distance.",
        expectedOutcome:
          "Classification of visibility conditions as Safe, Risky, or Unreliable.",
        icon: "Eye",
      },
      {
        title: "Hyper-Local Pollution Forecaster",
        shortDescription: "Predict pollution hotspots at hyper-local level",
        problemStatement:
          "City-level AQI data lacks sufficient granularity for localized decision-making.",
        objective:
          "Build a predictive model to forecast pollution hotspots at a hyper-local level using historical climate data and satellite imagery.",
        approachLevels: {
          beginner: "Time-series forecasting of AQI using open datasets.",
          advanced:
            "Correlating traffic density with pollution spikes and suggesting emission-reducing traffic strategies.",
        },
        icon: "Cloud",
      },
      {
        title: "Zero-Waste Vision",
        shortDescription: "AI-powered waste classification system",
        problemStatement:
          "Inefficient waste segregation remains a major barrier to effective recycling.",
        objective:
          "Design an AI-powered computer vision system to classify waste items (E-waste, Organic, Plastic, Metal, Glass) and suggest correct disposal or reuse methods.",
        approachLevels: {
          beginner: "Static image classification using pre-trained models.",
          advanced:
            "Real-time waste detection with carbon footprint estimation.",
        },
        icon: "Recycle",
      },
    ],
  },
  {
    title: "Healthcare",
    icon: "hospital",
    color: "from-blue-400 to-cyan-500",
    hexColor: "cyan",
    problems: [
      {
        title: "CareQueue",
        shortDescription: "AI-Assisted Hospital Queue Optimization",
        problemStatement:
          "Inefficient scheduling and resource allocation increase patient waiting times.",
        objective:
          "Optimize outpatient scheduling and hospital resource usage to reduce average wait times.",
        deliverables: [
          "Simulation or dashboard demonstrating scheduling improvements and predicted wait-time reduction.",
        ],
        icon: "Users",
      },
      {
        title: "MedAssist",
        shortDescription: "Voice-Driven Medication Adherence Helper",
        problemStatement:
          "Elderly patients frequently miss medication doses due to complex regimens.",
        objective:
          "Develop a privacy-first voice-based assistant for medication reminders, adherence logging, basic queries, and caregiver notifications.",
        icon: "Mic",
      },
      {
        title: "Post-Operative Remote Monitoring",
        shortDescription: "Track recovery trends and flag health risks",
        problemStatement:
          "Post-surgical patients lack continuous monitoring after discharge.",
        objective:
          "Design an analytics system using wearable-device data to track recovery trends and flag potential health risks.",
        approachLevels: {
          beginner: "Dashboard-based visualization and alerts.",
          advanced: "Predictive modeling to forecast deterioration trends.",
        },
        icon: "HeartPulse",
      },
    ],
  },
  {
    title: "Fintech",
    icon: "wallet",
    color: "from-amber-400 to-orange-500",
    hexColor: "amber",
    problems: [
      {
        title: "MicroCreditScore",
        shortDescription: "Inclusive Credit Scoring",
        problemStatement:
          "Individuals without formal credit histories are excluded from financial systems.",
        objective:
          "Build an explainable credit scoring model using non-traditional, anonymized data sources while ensuring fairness and privacy.",
        icon: "CreditCard",
      },
      {
        title: "InvoiceVerify",
        shortDescription: "AI-Based Invoice Reconciliation",
        problemStatement:
          "Small businesses struggle to reconcile physical invoices with digital records.",
        objective:
          "Develop a computer-vision-based system to extract invoice data, reconcile records, and flag discrepancies.",
        icon: "FileCheck",
      },
      {
        title: "Invisible Fraud Detector",
        shortDescription: "Real-time behavioral fraud detection",
        problemStatement:
          "Traditional fraud detection systems generate high false-positive rates.",
        objective:
          "Create a real-time fraud detection engine using behavioral and contextual data.",
        approachLevels: {
          beginner: "Transaction classification using traditional ML models.",
          advanced: "Graph-based fraud detection with explainable outputs.",
        },
        icon: "ShieldAlert",
      },
    ],
  },
];

const faqs = [
  {
    q: "Who can participate?",
    a: "Students from any recognized engineering or technical institute. Inter-college teams are allowed.",
  },
  {
    q: "What is the team size?",
    a: "Teams can have 1-4 members. Each team needs a designated Team Leader.",
  },
  {
    q: "What should we submit in Round 1?",
    a: "A presentation (max 10 slides) with problem definition, AI approach, and a working prototype or demo.",
  },
  {
    q: "Are there any restrictions on datasets?",
    a: "Public or synthetic datasets are encouraged. Sensitive data must be anonymized.",
  },
];

export default function AIConclaveEvent() {
  const [activeTrack, setActiveTrack] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const registrationDeadline = new Date("2026-02-14T12:00:00+05:30");

  return (
    <main className="min-h-screen text-white overflow-hidden">
      <CrazyBackground />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 relative">
          <div className="text-center max-w-5xl mx-auto">
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-purple-500/50 bg-purple-500/10 mb-4 sm:mb-6"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-purple-400"
              >
                <Icons.Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.span>
              <span className="text-xs sm:text-sm font-medium text-purple-300 tracking-[0.15em] sm:tracking-[0.2em]">
                BVP OPTICA
              </span>
            </motion.div>

            {/* Presents text with reveal */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.3em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-2 sm:mb-4"
            >
              PRESENTS
            </motion.p>

            {/* Main Title with Glitch */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              className="mb-4 sm:mb-6"
            >
              <GlitchText className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black leading-none">
                <span
                  className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                  style={{
                    textShadow:
                      "0 0 80px rgba(168,85,247,0.5), 0 0 120px rgba(236,72,153,0.3)",
                    WebkitTextStroke: "1px rgba(168,85,247,0.3)",
                  }}
                >
                  AI CONCLAVE
                </span>
              </GlitchText>
            </motion.div>

            {/* Tagline with typing effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center gap-2 sm:gap-4 text-gray-400 mb-8 sm:mb-12"
            >
              {["INNOVATE", "BUILD", "IMPACT"].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.2 }}
                  className="flex items-center gap-2 sm:gap-4"
                >
                  {i > 0 && (
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                  )}
                  <span className="text-[10px] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.3em]">
                    {word}
                  </span>
                </motion.span>
              ))}
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex justify-center mb-8 sm:mb-12 md:mb-16 px-2"
            >
              <CountdownTimer targetDate={registrationDeadline} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
            >
              <motion.a
                href="https://unstop.com/hackathons/ai-conclave-bvcoe-1632921"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg overflow-hidden group"
              >
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #a855f7, #ec4899, #06b6d4, #a855f7)",
                    padding: "2px",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-[2px] rounded-2xl bg-black" />

                {/* Pulse effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-purple-500/20 opacity-0 group-hover:opacity-100"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Glow particles */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-purple-400"
                      style={{
                        left: `${20 + i * 12}%`,
                        top: "50%",
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>

                <span className="relative z-10 flex items-center gap-2 text-white">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Icons.Zap className="w-5 h-5 text-purple-400" />
                  </motion.span>
                  Register Now
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    <Icons.ArrowRight className="w-5 h-5" />
                  </motion.span>
                </span>
              </motion.a>
              <motion.a
                href="#tracks"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(168,85,247,0.8)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg border-2 border-white/20 hover:bg-white/5 transition-all text-center"
              >
                Explore Tracks
              </motion.a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex justify-center gap-4 mt-12"
            >
              {[
                { icon: Icons.Instagram, label: "Instagram", href: "https://instagram.com/bvpoptica" },
                { icon: Icons.LinkedIn, label: "LinkedIn", href: "https://www.linkedin.com/company/bvp-optica/" },
                { icon: Icons.Twitter, label: "Twitter", href: "https://twitter.com/bvpoptica" },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Event Section */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <span className="inline-block px-4 py-1 rounded-full border border-purple-500/30 text-purple-400 text-sm mb-4">
                ABOUT THE EVENT
              </span>
            </AnimatedSection>

            {/* Main description card */}
            <NeonCard className="mb-6" glowColor="purple" delay={0}>
              <div className="p-6 sm:p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1">
                    <h3 className="font-heading text-2xl sm:text-3xl font-black text-white mb-4">
                      AI CONCLAVE 2026
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                      A multidisciplinary AI hackathon focused on applying
                      Artificial Intelligence to solve real-world challenges
                      across Environment, Healthcare, and Fintech domains.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["AI/ML", "Hackathon", "₹10K+ Prizes"].map((tag, i) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            i === 0
                              ? "bg-purple-500/20 border border-purple-500/40 text-purple-300"
                              : i === 1
                                ? "bg-pink-500/20 border border-pink-500/40 text-pink-300"
                                : "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </NeonCard>

            {/* Info cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Date */}
              <NeonCard glowColor="cyan" delay={0.1}>
                <div className="p-5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <Icons.ClipboardPen className="w-5 h-5 text-cyan-400" />
                    </div>
                    <p className="text-cyan-400 text-xs font-medium tracking-wider">
                      DATE
                    </p>
                  </div>
                  <h4 className="font-heading text-xl font-bold text-white mb-1">
                    Feb 14-18, 2026
                  </h4>
                  <p className="text-gray-500 text-sm">5 days of innovation</p>
                </div>
              </NeonCard>

              {/* Venue */}
              <NeonCard glowColor="pink" delay={0.2}>
                <div className="p-5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                      <Icons.MapPin className="w-5 h-5 text-pink-400" />
                    </div>
                    <p className="text-pink-400 text-xs font-medium tracking-wider">
                      VENUE
                    </p>
                  </div>
                  <h4 className="font-heading text-lg font-bold text-white mb-1">
                    BVCOE Campus
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Paschim Vihar, New Delhi
                  </p>
                </div>
              </NeonCard>

              {/* Eligibility */}
              <NeonCard glowColor="green" delay={0.3}>
                <div className="p-5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Icons.Users className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-green-400 text-xs font-medium tracking-wider">
                      TEAM SIZE
                    </p>
                  </div>
                  <h4 className="font-heading text-lg font-bold text-white mb-1">
                    1-4 Members
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Open to all college students
                  </p>
                </div>
              </NeonCard>
            </div>
          </div>
        </section>

        {/* Timeline Section - Sticky Scroll with Line and Dots */}
        <section className="py-24 px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <GlitchText className="font-heading text-5xl sm:text-6xl md:text-7xl font-black italic">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  timeline
                </span>
              </GlitchText>
            </AnimatedSection>

            {/* Timeline with vertical line */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 md:-translate-x-1/2" />

              <div className="space-y-12 md:space-y-16">
                {[
                  {
                    date: "Feb 14, 2026",
                    time: "12:00 PM IST",
                    label: "Registration Deadline",
                    description:
                      "Last date to register your team on Unstop. Make sure all team members are added.",
                    venue: "Online - Unstop Platform",
                    icon: Icons.ClipboardPen,
                    color: "purple",
                  },
                  {
                    date: "Feb 16, 2026",
                    time: "10:00 AM - 6:00 PM IST",
                    label: "Online Round",
                    description:
                      "Submit your presentation (max 10 slides) with problem definition, AI approach, and working prototype/demo.",
                    venue: "Online Submission",
                    icon: Icons.Laptop,
                    color: "pink",
                  },
                  {
                    date: "Feb 17, 2026",
                    time: "8:00 PM IST",
                    label: "Results Announced",
                    description:
                      "Shortlisted teams for the offline finals will be announced via email and on the Unstop platform.",
                    venue: "Unstop Platform",
                    icon: Icons.Megaphone,
                    color: "cyan",
                  },
                  {
                    date: "Feb 18, 2026",
                    time: "9:00 AM - 5:00 PM IST",
                    label: "Offline Finals",
                    description:
                      "Present your solution to the jury panel. Top 3 teams will be awarded prizes and certificates.",
                    venue: "BVCOE, Paschim Vihar, New Delhi",
                    icon: Icons.Trophy,
                    color: "amber",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.1 }}
                    className={`relative flex items-start gap-6 md:gap-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Dot on the line with glow */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 z-10">
                      <motion.div
                        className={`w-full h-full rounded-full border-2 border-${item.color}-400`}
                        style={{
                          background: `radial-gradient(circle, var(--tw-gradient-stops))`,
                          boxShadow: `0 0 20px var(--${item.color}-glow, rgba(168, 85, 247, 0.6))`,
                        }}
                        whileInView={{ scale: [0, 1.2, 1] }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <div
                          className={`w-full h-full rounded-full bg-gradient-to-br from-${item.color}-400 to-${item.color}-600`}
                        />
                      </motion.div>
                      {/* Pulsing ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-full border-2 border-${item.color}-400`}
                        animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>

                    {/* Animated connecting line from dot to card */}
                    <div
                      className={`absolute top-2 h-[2px] hidden md:block ${
                        index % 2 === 0
                          ? "left-[calc(50%+8px)] right-[calc(50%+40px)]"
                          : "right-[calc(50%+8px)] left-[calc(50%+40px)]"
                      }`}
                      style={{
                        width: "calc(50% - 48px)",
                        left: index % 2 === 0 ? "auto" : "calc(50% + 8px)",
                        right: index % 2 === 0 ? "calc(50% + 8px)" : "auto",
                      }}
                    >
                      {/* Line background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-${index % 2 === 0 ? "l" : "r"} from-${item.color}-500/80 via-${item.color}-400/60 to-transparent`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        style={{
                          transformOrigin: index % 2 === 0 ? "right" : "left",
                        }}
                      />
                      {/* Animated glow traveling along line */}
                      <motion.div
                        className={`absolute top-1/2 -translate-y-1/2 w-8 h-1 rounded-full bg-${item.color}-300 blur-sm`}
                        initial={{
                          x: index % 2 === 0 ? "100%" : "-100%",
                          opacity: 0,
                        }}
                        whileInView={{
                          x: index % 2 === 0 ? "-100%" : "100%",
                          opacity: [0, 1, 1, 0],
                        }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.5,
                          duration: 0.8,
                          ease: "easeInOut",
                        }}
                      />
                    </div>

                    {/* Mobile connecting line */}
                    <div className="absolute left-[22px] top-2 w-6 h-[2px] md:hidden">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r from-${item.color}-500 to-transparent`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        style={{ transformOrigin: "left" }}
                      />
                    </div>

                    {/* Content */}
                    <div
                      className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"}`}
                    >
                      <NeonCard
                        glowColor={
                          item.color as "purple" | "pink" | "cyan" | "amber"
                        }
                      >
                        <div className="p-6">
                          <div
                            className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}
                          >
                            <item.icon
                              className={`w-8 h-8 text-${item.color}-400`}
                            />
                            <div
                              className={
                                index % 2 === 0
                                  ? "md:text-right"
                                  : "md:text-left"
                              }
                            >
                              <p className="font-heading text-lg font-bold text-white">
                                {item.date}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {item.time}
                              </p>
                            </div>
                          </div>
                          <h4 className="font-heading text-xl font-bold text-white mb-2">
                            {item.label}
                          </h4>
                          <p className="text-gray-400 text-sm leading-relaxed mb-3">
                            {item.description}
                          </p>
                          <div
                            className={`flex items-center gap-1.5 text-gray-500 text-xs ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}
                          >
                            <Icons.MapPin className="w-3 h-3" />
                            <span>{item.venue}</span>
                          </div>
                        </div>
                      </NeonCard>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block md:w-[calc(50%-40px)]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Themes/Tracks Section */}
        <section id="tracks" className="py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <GlitchText className="font-heading text-5xl sm:text-6xl md:text-7xl font-black italic mb-4">
                <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  themes
                </span>
              </GlitchText>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Choose your domain and tackle real-world challenges
              </p>
            </AnimatedSection>

            {/* Hexagonal Track Selector */}
            <div className="flex justify-center gap-8 sm:gap-12 mb-16">
              {tracks.map((track, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTrack(index)}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Hexagon
                    className="w-20 h-24 sm:w-28 sm:h-32"
                    color={track.hexColor}
                    active={activeTrack === index}
                  >
                    <span className="text-white">
                      {track.icon === "globe" && (
                        <Icons.Globe className="w-8 h-8 sm:w-10 sm:h-10" />
                      )}
                      {track.icon === "hospital" && (
                        <Icons.Hospital className="w-8 h-8 sm:w-10 sm:h-10" />
                      )}
                      {track.icon === "wallet" && (
                        <Icons.Wallet className="w-8 h-8 sm:w-10 sm:h-10" />
                      )}
                    </span>
                  </Hexagon>
                  <motion.p
                    className={`mt-3 text-xs sm:text-sm font-medium transition-colors ${activeTrack === index ? "text-white" : "text-gray-500"}`}
                  >
                    {track.title}
                  </motion.p>
                </motion.button>
              ))}
            </div>

            {/* Problem Cards Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrack}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {tracks[activeTrack].problems.map((problem, index) => {
                  const IconComponent = Icons[problem.icon];
                  return (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedProblem(problem)}
                      className="text-left w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <NeonCard
                        glowColor={
                          tracks[activeTrack].hexColor as
                            | "purple"
                            | "pink"
                            | "cyan"
                            | "green"
                            | "amber"
                        }
                        delay={index * 0.1}
                      >
                        <div className="p-6 h-full">
                          <div className="relative z-10">
                            <div
                              className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${tracks[activeTrack].hexColor}-500/20 to-${tracks[activeTrack].hexColor}-600/20 flex items-center justify-center mb-4`}
                            >
                              <IconComponent
                                className={`w-6 h-6 text-${tracks[activeTrack].hexColor}-400`}
                              />
                            </div>
                            <h4 className="font-heading text-lg font-bold text-white mb-3">
                              {problem.title}
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                              {problem.shortDescription}
                            </p>
                            <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                              <span>View Details</span>
                              <Icons.ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </NeonCard>
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Problem Detail Modal */}
        <AnimatePresence>
          {selectedProblem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setSelectedProblem(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto"
              >
                <div className="relative rounded-2xl bg-[#0a0a1a] border border-purple-500/30 overflow-hidden">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProblem(null)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
                  >
                    <Icons.X className="w-5 h-5" />
                  </button>

                  <div className="p-8">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        {(() => {
                          const IconComponent = Icons[selectedProblem.icon];
                          return (
                            <IconComponent className="w-8 h-8 text-purple-400" />
                          );
                        })()}
                      </div>
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-medium mb-2">
                          {tracks[activeTrack].title}
                        </span>
                        <h3 className="font-heading text-2xl font-bold text-white">
                          {selectedProblem.title}
                        </h3>
                      </div>
                    </div>

                    {/* Problem Statement */}
                    <div className="mb-6">
                      <h4 className="text-purple-400 text-sm font-medium mb-2 flex items-center gap-2">
                        <Icons.Lightbulb className="w-4 h-4" />
                        Problem Statement
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedProblem.problemStatement}
                      </p>
                    </div>

                    {/* Objective */}
                    <div className="mb-6">
                      <h4 className="text-cyan-400 text-sm font-medium mb-2 flex items-center gap-2">
                        <Icons.Target className="w-4 h-4" />
                        Objective
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedProblem.objective}
                      </p>
                    </div>

                    {/* Expected Outcome */}
                    {selectedProblem.expectedOutcome && (
                      <div className="mb-6">
                        <h4 className="text-emerald-400 text-sm font-medium mb-2 flex items-center gap-2">
                          <Icons.CheckCircle className="w-4 h-4" />
                          Expected Outcome
                        </h4>
                        <p className="text-gray-300 leading-relaxed">
                          {selectedProblem.expectedOutcome}
                        </p>
                      </div>
                    )}

                    {/* Approach Levels */}
                    {selectedProblem.approachLevels && (
                      <div className="mb-6">
                        <h4 className="text-amber-400 text-sm font-medium mb-3 flex items-center gap-2">
                          <Icons.Layers className="w-4 h-4" />
                          Approach Levels
                        </h4>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                            <span className="text-green-400 text-xs font-bold uppercase tracking-wider">
                              Beginner
                            </span>
                            <p className="text-gray-300 text-sm mt-2">
                              {selectedProblem.approachLevels.beginner}
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                            <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">
                              Advanced
                            </span>
                            <p className="text-gray-300 text-sm mt-2">
                              {selectedProblem.approachLevels.advanced}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Deliverables */}
                    {selectedProblem.deliverables &&
                      selectedProblem.deliverables.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-pink-400 text-sm font-medium mb-3 flex items-center gap-2">
                            <Icons.FileCheck className="w-4 h-4" />
                            Deliverables
                          </h4>
                          <ul className="space-y-2">
                            {selectedProblem.deliverables.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-gray-400 text-sm"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {/* CTA */}
                    <a
                      href="https://unstop.com/hackathons/ai-conclave-bvcoe-1632921"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
                    >
                      Register for this Challenge
                      <Icons.ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prizes Section */}
        <section className="py-24 px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto relative">
            <AnimatedSection className="text-center mb-16">
              <div className="inline-block text-amber-400">
                <Icons.Trophy className="w-16 h-16 sm:w-20 sm:h-20" />
              </div>
              <GlitchText className="font-heading text-5xl sm:text-6xl md:text-7xl font-black mt-4">
                <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                  PRIZES
                </span>
              </GlitchText>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
              {[
                {
                  position: "2nd",
                  amount: "₹3,000",
                  Icon: Icons.Medal2,
                  color: "purple",
                  height: "h-full",
                  iconColor: "text-gray-300",
                },
                {
                  position: "1st",
                  amount: "₹5,000",
                  Icon: Icons.Medal1,
                  color: "amber",
                  height: "h-full md:scale-110",
                  iconColor: "text-yellow-400",
                },
                {
                  position: "3rd",
                  amount: "₹2,000",
                  Icon: Icons.Medal3,
                  color: "pink",
                  height: "h-full",
                  iconColor: "text-amber-600",
                },
              ].map((prize, index) => (
                <motion.div
                  key={prize.position}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index === 1 ? 0 : 0.2 }}
                  whileHover={{ y: -10 }}
                  className={prize.height}
                >
                  <NeonCard
                    glowColor={prize.color as "purple" | "amber" | "pink"}
                    className="h-full"
                  >
                    <div
                      className={`p-8 text-center ${index === 1 ? "py-12" : ""}`}
                    >
                      <div className={`inline-block mb-6 ${prize.iconColor}`}>
                        <prize.Icon className="w-16 h-16 sm:w-20 sm:h-20" />
                      </div>
                      <p className="text-gray-400 text-sm mb-2">
                        {prize.position} Place
                      </p>
                      <p
                        className={`font-heading text-4xl sm:text-5xl font-black ${index === 1 ? "text-yellow-400" : "text-white"}`}
                        style={
                          index === 1
                            ? { textShadow: "0 0 30px rgba(251,191,36,0.5)" }
                            : {}
                        }
                      >
                        {prize.amount}
                      </p>
                      <p className="text-gray-500 text-sm mt-3">
                        + Certificate
                      </p>
                      {/* Sparkles for winner */}
                      {index === 1 && (
                        <div className="absolute top-4 right-4 text-yellow-400">
                          <Icons.Sparkles className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </NeonCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <GlitchText className="font-heading text-5xl sm:text-6xl font-black">
                <span className="text-white">FAQ&apos;s</span>
              </GlitchText>
            </AnimatedSection>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    whileHover={{ x: 5 }}
                    className="w-full"
                  >
                    <NeonCard glowColor={openFaq === index ? "purple" : "cyan"}>
                      <div className="p-6">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-white text-left text-lg">
                            {faq.q}
                          </h4>
                          <motion.div
                            animate={{ rotate: openFaq === index ? 180 : 0 }}
                            className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 ml-4"
                          >
                            <Icons.ChevronDown className="w-5 h-5 text-purple-400" />
                          </motion.div>
                        </div>
                        <AnimatePresence>
                          {openFaq === index && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-gray-400 text-sm mt-4 text-left leading-relaxed"
                            >
                              {faq.a}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </NeonCard>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact/CTA Section */}
        <section className="py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden"
            >
              {/* Animated gradient border */}
              <motion.div
                className="absolute -inset-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-3xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              />

              <div className="relative bg-black/90 backdrop-blur-xl rounded-3xl p-10 sm:p-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="font-heading text-4xl sm:text-6xl font-black text-white leading-tight"
                    >
                      CONNECT
                      <br />
                      <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                        TO WHAT COUNTS
                      </span>
                    </motion.h2>
                  </div>

                  <div className="space-y-6">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30"
                    >
                      <p className="text-purple-400 text-sm mb-1 flex items-center gap-1.5">
                        <Icons.Mail className="w-4 h-4" /> EMAIL
                      </p>
                      <p className="text-white font-medium">
                        bvpoptica@gmail.com
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/30"
                    >
                      <p className="text-pink-400 text-sm mb-1 flex items-center gap-1.5">
                        <Icons.MapPin className="w-4 h-4" /> VENUE
                      </p>
                      <p className="text-white font-medium">
                        BVCOE, Paschim Vihar, Delhi
                      </p>
                    </motion.div>
                    <motion.a
                      href="https://unstop.com/hackathons/ai-conclave-bvcoe-1632921"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative flex items-center justify-center gap-2 w-full py-5 rounded-xl overflow-hidden font-bold text-lg text-white group"
                    >
                      {/* Animated border */}
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background:
                            "conic-gradient(from 0deg, #a855f7, #ec4899, #06b6d4, #a855f7)",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <div className="absolute inset-[2px] rounded-xl bg-black/90" />
                      <span className="relative z-10 flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Icons.Zap className="w-5 h-5 text-purple-400" />
                        </motion.span>
                        Register Now
                        <Icons.ArrowRight className="w-5 h-5" />
                      </span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Back link */}
            <motion.div
              className="text-center mt-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group"
              >
                <motion.span
                  animate={{ x: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Icons.ArrowLeft className="w-4 h-4" />
                </motion.span>
                <span>Back to Events</span>
              </Link>
            </motion.div>
          </div>
        </section>

        <FooterSection />
      </div>
    </main>
  );
}
