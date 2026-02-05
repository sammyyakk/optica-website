import type { ReactNode } from "react";

interface IconProps {
  className?: string;
}

// ── Category Icons ──────────────────────────────────────────────────────────

export function MicroscopeIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="2" className="stroke-violet-400" />
      <path d="M12 11v4" className="stroke-violet-400" />
      <path d="M7 19h10" className="stroke-purple-300" />
      <path d="M9 15h6" className="stroke-purple-400" />
      <path d="M10 15v4" className="stroke-purple-300" />
      <path d="M14 15v4" className="stroke-purple-300" />
      <path d="M14 9l3-3" className="stroke-violet-300" />
      <circle cx="18" cy="5" r="1" className="stroke-violet-300 fill-violet-400/30" />
    </svg>
  );
}

export function PartyIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.8 11.3L2 22l10.7-3.8" className="stroke-pink-400" />
      <path d="M4 3h.01" className="stroke-rose-300" />
      <path d="M22 8h.01" className="stroke-pink-300" />
      <path d="M15 2h.01" className="stroke-rose-400" />
      <path d="M22 20h.01" className="stroke-pink-400" />
      <path d="M22 2l-2.24.75a1 1 0 00-.64.64L18.38 5.6a1 1 0 01-.64.64L15.5 7" className="stroke-rose-300" />
      <path d="M8.56 2.75a1 1 0 01.64-.64L12 1l.75 2.24a1 1 0 01-.64.64L9.87 4.63" className="stroke-pink-300" />
      <path d="M19.13 12l2.24.75a1 1 0 01.64.64L22.75 16l-2.24.75" className="stroke-rose-400" />
    </svg>
  );
}

export function BookOpenIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" className="stroke-blue-400" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" className="stroke-cyan-400" />
      <path d="M6 8h2" className="stroke-blue-300" />
      <path d="M6 12h2" className="stroke-blue-300" />
      <path d="M16 8h2" className="stroke-cyan-300" />
      <path d="M16 12h2" className="stroke-cyan-300" />
    </svg>
  );
}

export function FlaskIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6" className="stroke-green-300" />
      <path d="M10 3v7.4a2 2 0 01-.6 1.4L4 17.2a2 2 0 00-.6 1.4V20a2 2 0 002 2h13.2a2 2 0 002-2v-1.4a2 2 0 00-.6-1.4L14.6 11.8a2 2 0 01-.6-1.4V3" className="stroke-emerald-400" />
      <circle cx="8" cy="18" r="0.5" className="fill-green-400 stroke-green-400" />
      <circle cx="12" cy="17" r="0.5" className="fill-emerald-300 stroke-emerald-300" />
      <circle cx="15" cy="19" r="0.5" className="fill-green-300 stroke-green-300" />
    </svg>
  );
}

export function MegaphoneIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l18-5v12L3 13v-2z" className="stroke-amber-400" />
      <path d="M11.6 16.8a3 3 0 11-5.8-1.6" className="stroke-orange-400" />
      <line x1="21" y1="6" x2="21" y2="18" className="stroke-amber-300" />
    </svg>
  );
}

export function GraduationCapIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" className="stroke-rose-400" />
      <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" className="stroke-pink-400" />
    </svg>
  );
}

export function LightbulbIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 006 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" className="stroke-teal-400" />
      <path d="M9 18h6" className="stroke-cyan-400" />
      <path d="M10 22h4" className="stroke-cyan-300" />
      <line x1="12" y1="2" x2="12" y2="3" className="stroke-teal-300" />
      <line x1="4.2" y1="4.2" x2="5" y2="5" className="stroke-teal-300" />
      <line x1="19.8" y1="4.2" x2="19" y2="5" className="stroke-teal-300" />
    </svg>
  );
}

export function PenLineIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" className="stroke-gray-400" />
      <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" className="stroke-slate-400" />
    </svg>
  );
}

// ── UI Icons (replacing standalone emojis) ──────────────────────────────────

export function PinIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="17" x2="12" y2="22" className="stroke-current" />
      <path d="M5 17h14v-1.76a2 2 0 00-1.11-1.79l-1.78-.89A2 2 0 0115 10.76V6h1a2 2 0 000-4H8a2 2 0 000 4h1v4.76a2 2 0 01-1.11 1.79l-1.78.89A2 2 0 005 15.24z" className="stroke-current" />
    </svg>
  );
}

export function StarIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" className="fill-current stroke-current" />
    </svg>
  );
}

export function SearchIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" className="stroke-purple-400" />
      <path d="M21 21l-4.35-4.35" className="stroke-pink-400" />
    </svg>
  );
}

export function FileTextIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" className="stroke-purple-400" />
      <polyline points="14 2 14 8 20 8" className="stroke-pink-400" />
      <line x1="16" y1="13" x2="8" y2="13" className="stroke-purple-300" />
      <line x1="16" y1="17" x2="8" y2="17" className="stroke-purple-300" />
      <polyline points="10 9 9 9 8 9" className="stroke-purple-300" />
    </svg>
  );
}

export function CodeIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" className="stroke-purple-400" />
      <polyline points="8 6 2 12 8 18" className="stroke-pink-400" />
    </svg>
  );
}

export function QuillIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4c-1 1-3.5 1.5-5 1l-1 1c3 2 4 6 3 10l-2-1c0-3-1-5-3-7l-1 1c1.5 2 2 4 1.5 6L10 14c.5-2.5 0-5-2-7L7 8c1 3 .5 6-1 8l-2-1c.5-2 .5-4 0-6L3 11" className="stroke-purple-400" />
      <path d="M4.5 16.5c-1.5 1.5-2 4-2 4s2.5-.5 4-2" className="stroke-pink-400" />
    </svg>
  );
}

// ── Category Icon Map ───────────────────────────────────────────────────────

import type { BlogCategory } from "@/lib/blog/types";

const ICON_MAP: Record<BlogCategory, (props: IconProps) => ReactNode> = {
  "Optics & Photonics": MicroscopeIcon,
  "Events & Recaps": PartyIcon,
  Tutorials: BookOpenIcon,
  Research: FlaskIcon,
  Announcements: MegaphoneIcon,
  "Student Life": GraduationCapIcon,
  "Industry Insights": LightbulbIcon,
  General: PenLineIcon,
};

export function CategoryIcon({
  category,
  className = "w-5 h-5",
}: {
  category: BlogCategory;
  className?: string;
}) {
  const Icon = ICON_MAP[category];
  return <Icon className={className} />;
}
