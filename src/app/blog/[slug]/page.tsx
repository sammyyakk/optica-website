"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FixedParticleBackground } from "@/components/ui/FixedParticleBackground";
import { FooterSection } from "@/components/home/FooterSection";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog/posts";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/lib/blog/types";

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

function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState("");
  const headings = useMemo(() => {
    const matches = content.match(/<h[23][^>]*>(.*?)<\/h[23]>/gi) || [];
    return matches.map((h, i) => {
      const level = h.startsWith("<h3") ? 3 : 2;
      const text = h.replace(/<[^>]*>/g, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return { id, text, level, index: i };
    });
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -60% 0%" },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav className="hidden xl:block sticky top-28 w-56 shrink-0">
      <h4 className="text-sm font-heading font-semibold text-white mb-3">
        Table of Contents
      </h4>
      <div className="space-y-1.5 border-l border-purple-500/20">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`block text-xs transition-all duration-200 border-l-2 -ml-[1px] ${
              h.level === 3 ? "pl-6" : "pl-3"
            } ${
              activeId === h.id
                ? "border-purple-400 text-purple-300"
                : "border-transparent text-gray-500 hover:text-gray-300 hover:border-purple-500/30"
            }`}
          >
            {h.text}
          </a>
        ))}
      </div>
    </nav>
  );
}

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${slug}`
      : `https://www.bvpoptica.com/blog/${slug}`;

  const shareData = [
    {
      name: "Twitter",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: "WhatsApp",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      url: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 mr-1">Share:</span>
      {shareData.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-white/5 hover:bg-purple-500/20 text-gray-400 hover:text-purple-300 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all"
          title={`Share on ${s.name}`}
        >
          {s.icon}
        </a>
      ))}
      <button
        onClick={copyLink}
        className="p-2 bg-white/5 hover:bg-purple-500/20 text-gray-400 hover:text-purple-300 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all"
        title="Copy link"
      >
        {copied ? (
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )}
      </button>
    </div>
  );
}

function processContent(content: string): string {
  // Add IDs to headings for TOC navigation
  return content.replace(/<(h[23])([^>]*)>(.*?)<\/h[23]>/gi, (match, tag, attrs, text) => {
    const plainText = text.replace(/<[^>]*>/g, "");
    const id = plainText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `<${tag}${attrs} id="${id}">${text}</${tag}>`;
  });
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = useMemo(() => getPostBySlug(slug), [slug]);
  const relatedPosts = useMemo(() => getRelatedPosts(slug), [slug]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return (
      <main className="min-h-screen bg-transparent text-white overflow-hidden">
        <FixedParticleBackground />
        <div className="relative z-10 pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">📄</div>
            <h1 className="text-2xl font-heading text-white mb-2">
              Post Not Found
            </h1>
            <p className="text-gray-400 mb-6">
              The article you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/blog"
              className="px-6 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg border border-purple-500/30 transition-all"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const processedContent = processContent(post.content);

  return (
    <main className="min-h-screen bg-transparent text-white overflow-hidden">
      {/* Fixed particle background */}
      <FixedParticleBackground />

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="relative z-10 pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Back link */}
        <AnimatedSection>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-300 transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </AnimatedSection>

        {/* Article Header */}
        <AnimatedSection className="mb-8" delay={0.05}>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${CATEGORY_COLORS[post.category]} text-white`}
            >
              {CATEGORY_ICONS[post.category]} {post.category}
            </span>
            {post.pinned && (
              <span className="px-2 py-0.5 text-xs font-bold text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/30">
                📌 Pinned
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-gray-400 text-base sm:text-lg mb-6 max-w-3xl">
            {post.excerpt}
          </p>

          {/* Author & Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
            <div className="flex items-center gap-3">
              {post.author.image ? (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center font-bold text-white">
                  {post.author.name[0]}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium text-sm">
                    {post.author.name}
                  </span>
                  {post.author.linkedin && (
                    <a
                      href={post.author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-purple-400 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {post.author.github && (
                    <a
                      href={post.author.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-purple-400 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                </div>
                <span className="text-xs text-gray-500">{post.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span>·</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* Share */}
          <ShareButtons title={post.title} slug={post.slug} />
        </AnimatedSection>

        {/* Cover Image */}
        {post.coverImage && (
          <AnimatedSection className="mb-10" delay={0.1}>
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A2B] via-transparent to-transparent" />
            </div>
          </AnimatedSection>
        )}

        {/* Content area with TOC */}
        <div className="flex gap-10">
          {/* Main content */}
          <AnimatedSection
            className="flex-1 min-w-0"
            delay={0.15}
          >
            <article
              className="prose prose-invert prose-purple max-w-none
                prose-headings:font-heading prose-headings:text-white prose-headings:scroll-mt-24
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-purple-500/20 prose-h2:pb-2
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300 hover:prose-a:underline
                prose-strong:text-white
                prose-ul:text-gray-300 prose-ol:text-gray-300
                prose-li:mb-1.5
                prose-blockquote:border-l-purple-500 prose-blockquote:bg-purple-500/5 prose-blockquote:rounded-r-lg prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:italic prose-blockquote:text-gray-400
                prose-code:text-pink-400 prose-code:bg-pink-500/10 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
                prose-pre:bg-black/50 prose-pre:border prose-pre:border-purple-500/20 prose-pre:rounded-xl
                prose-img:rounded-xl prose-img:border prose-img:border-purple-500/20"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-purple-500/20">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-xs bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-400/40 transition-all"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Share (bottom) */}
            <div className="mt-6 pt-6 border-t border-purple-500/20">
              <ShareButtons title={post.title} slug={post.slug} />
            </div>

            {/* Embed this post */}
            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-purple-500/20">
              <h4 className="text-sm font-heading text-white mb-2">
                📌 Embed this article
              </h4>
              <div className="bg-black/40 rounded-lg p-3">
                <code className="text-xs text-green-400 break-all">
                  {`<iframe src="${typeof window !== "undefined" ? window.location.origin : "https://www.bvpoptica.com"}/blog/embed/${post.slug}" width="100%" height="500" frameborder="0" style="border-radius:12px;border:1px solid rgba(139,92,246,0.2)"></iframe>`}
                </code>
              </div>
            </div>
          </AnimatedSection>

          {/* Table of Contents sidebar */}
          <TableOfContents content={post.content} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <AnimatedSection className="mt-16" delay={0.1}>
            <h2 className="text-xl font-heading font-semibold text-white mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group block"
                >
                  <article className="bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 overflow-hidden">
                    <div className="relative h-36">
                      {rp.coverImage ? (
                        <Image
                          src={rp.coverImage}
                          alt={rp.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                          <span className="text-4xl">
                            {CATEGORY_ICONS[rp.category]}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-heading font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2 mb-1">
                        {rp.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {rp.readingTime} min read ·{" "}
                        {new Date(rp.publishedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <FooterSection />
      </div>
    </main>
  );
}
