import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tabs, Tab } from "./MDXClientComponents";

// ============================================================
// CUSTOM MDX COMPONENTS
// ============================================================
// These components are available in all .mdx blog posts.
// Authors can use them directly: <Callout>, <Note>, etc.
// Standard markdown elements (h1, h2, p, a, etc.) are also
// overridden here with custom styling matching the site theme.
//
// NOTE: This file does NOT have "use client" — it's a shared
// module imported by the server-side BlogPostMDXContent.
// Interactive components (Tabs) are imported from a separate
// client component file.
// ============================================================

// ---- Callout / Alert Boxes ----

type CalloutVariant = "info" | "warning" | "success" | "danger" | "tip";

const CALLOUT_STYLES: Record<
  CalloutVariant,
  { bg: string; border: string; icon: string; title: string }
> = {
  info: {
    bg: "bg-blue-500/5",
    border: "border-blue-500/30",
    icon: "💡",
    title: "text-blue-400",
  },
  warning: {
    bg: "bg-amber-500/5",
    border: "border-amber-500/30",
    icon: "⚠️",
    title: "text-amber-400",
  },
  success: {
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/30",
    icon: "✅",
    title: "text-emerald-400",
  },
  danger: {
    bg: "bg-red-500/5",
    border: "border-red-500/30",
    icon: "🚨",
    title: "text-red-400",
  },
  tip: {
    bg: "bg-purple-500/5",
    border: "border-purple-500/30",
    icon: "✨",
    title: "text-purple-400",
  },
};

function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}) {
  const style = CALLOUT_STYLES[type];
  return (
    <div
      className={`my-6 rounded-xl border ${style.border} ${style.bg} p-4 sm:p-5 backdrop-blur-sm`}
    >
      {title && (
        <div
          className={`flex items-center gap-2 font-heading font-semibold text-sm mb-2 ${style.title}`}
        >
          <span>{style.icon}</span>
          <span>{title}</span>
        </div>
      )}
      <div className="text-gray-300 text-sm leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

// ---- Step-by-step sections ----

function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 space-y-4 border-l-2 border-purple-500/30 pl-6">
      {children}
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="absolute -left-[33px] top-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
        {number}
      </div>
      <h4 className="font-heading font-semibold text-white text-base mb-1.5">
        {title}
      </h4>
      <div className="text-gray-300 text-sm leading-relaxed [&>p]:mb-2">
        {children}
      </div>
    </div>
  );
}

// ---- Key-value / Stats cards ----

function StatGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 grid grid-cols-2 sm:grid-cols-3 gap-3">{children}</div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 border border-purple-500/20">
      <div className="font-heading font-bold text-2xl bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-gray-400 text-xs mt-1">{label}</div>
    </div>
  );
}

// ---- Highlight / Badge ----

function Badge({
  children,
  color = "purple",
}: {
  children: React.ReactNode;
  color?: "purple" | "pink" | "blue" | "amber" | "green";
}) {
  const colors: Record<string, string> = {
    purple: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    pink: "bg-pink-500/15 text-pink-300 border-pink-500/30",
    blue: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  };
  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border ${colors[color]}`}
    >
      {children}
    </span>
  );
}

// ---- YouTube Embed ----

function YouTube({ id }: { id: string }) {
  return (
    <div className="my-6 relative w-full aspect-video rounded-xl overflow-hidden border border-purple-500/20">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

// ---- Blog Image with caption ----

function BlogImage({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-6">
      <div className="relative rounded-xl overflow-hidden border border-purple-500/20">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-xs text-gray-500 mt-2 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ---- Link Card (for referencing other pages) ----

function LinkCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description?: string;
}) {
  const isExternal = href.startsWith("http");

  const inner = (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
      <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
        {isExternal ? (
          <svg
            className="w-5 h-5 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        )}
      </div>
      <div className="min-w-0">
        <div className="font-heading font-semibold text-sm text-white group-hover:text-purple-300 transition-colors truncate">
          {title}
        </div>
        {description && (
          <div className="text-xs text-gray-400 truncate">{description}</div>
        )}
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="my-4 block group no-underline"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className="my-4 block group no-underline">
      {inner}
    </Link>
  );
}

// ---- Divider ----

function Divider() {
  return (
    <div className="my-8 flex items-center gap-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </div>
  );
}

// ============================================================
// Component mapping for MDXRemote
// ============================================================

export const mdxComponents = {
  // --- Custom Components (available in .mdx files) ---
  Callout,
  Steps,
  Step,
  StatGrid,
  Stat,
  Badge,
  YouTube,
  BlogImage,
  LinkCard,
  Tabs,
  Tab,
  Divider,

  // --- Standard Markdown Element Overrides ---
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      {...props}
      className="group font-heading font-bold text-3xl sm:text-4xl mt-12 mb-6 scroll-mt-24 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent"
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className="group font-heading font-bold text-2xl sm:text-3xl mt-10 mb-4 pb-2 scroll-mt-24 border-b border-purple-500/20 bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent"
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      className="group font-heading font-semibold text-xl sm:text-2xl mt-8 mb-3 scroll-mt-24 text-pink-300"
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      {...props}
      className="group font-heading font-semibold text-lg mt-6 mb-2 scroll-mt-24 text-purple-300"
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className="font-body text-gray-300 leading-relaxed mb-4 text-base"
    />
  ),
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 underline underline-offset-2 decoration-purple-500/30 hover:decoration-purple-400/60 transition-all"
          {...props}
        >
          {children}
          <svg
            className="inline-block w-3 h-3 ml-0.5 -mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      );
    }
    return (
      <a
        href={href || "#"}
        className="text-purple-400 hover:text-purple-300 underline underline-offset-2 decoration-purple-500/30 hover:decoration-purple-400/60 transition-all"
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      {...props}
      className="font-body text-gray-300 mb-4 space-y-1.5 list-disc pl-6 marker:text-purple-400"
    />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      {...props}
      className="font-body text-gray-300 mb-4 space-y-1.5 list-decimal pl-6 marker:text-purple-400 marker:font-bold"
    />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="text-gray-300 leading-relaxed" />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="my-6 border-l-4 border-purple-500 bg-purple-500/5 rounded-r-xl py-3 px-5 italic text-gray-400 font-accent [&>p]:mb-0"
    />
  ),
  code: ({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    // Inline code (not inside a <pre>)
    if (!className) {
      return (
        <code
          className="text-pink-400 bg-pink-500/10 rounded px-1.5 py-0.5 text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    // Code blocks (inside <pre>) — styled by rehype-pretty-code
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="my-6 bg-[#0d1117] border border-purple-500/20 rounded-xl p-4 overflow-x-auto text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0"
    />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt || ""}
      className="my-6 rounded-xl border border-purple-500/20 max-w-full h-auto"
    />
  ),
  hr: () => <Divider />,
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-purple-500/20">
      <table
        {...props}
        className="w-full text-sm text-gray-300 [&_th]:font-heading [&_th]:font-semibold [&_th]:text-purple-300 [&_th]:bg-purple-500/10 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_td]:px-4 [&_td]:py-3 [&_td]:border-t [&_td]:border-purple-500/10 [&_tr:hover]:bg-purple-500/5"
      />
    </div>
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="font-semibold text-white" />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="italic text-gray-200" />
  ),
};
