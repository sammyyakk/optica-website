"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { FixedParticleBackground } from "@/components/ui/FixedParticleBackground";
import { FooterSection } from "@/components/home/FooterSection";
import {
  getAllPosts,
  getFeaturedPosts,
  getAllTags,
} from "@/lib/blog/posts";
import {
  BLOG_CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  type BlogPost,
} from "@/lib/blog/types";

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

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/blog/${post.slug}`} className="block group h-full">
        <article className="relative h-full bg-gradient-to-br from-purple-900/30 via-black/40 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 overflow-hidden">
          {/* Hover glow */}
          <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-xl blur-lg transition-all duration-500" />

          <div className="relative">
            {/* Cover image */}
            {post.coverImage ? (
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            ) : (
              <div className="h-48 rounded-t-xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                <span className="text-5xl">
                  {CATEGORY_ICONS[post.category]}
                </span>
              </div>
            )}

            {/* Pinned badge */}
            {post.pinned && (
              <div className="absolute top-3 left-3 px-2 py-1 bg-amber-500/90 text-black text-xs font-bold rounded-md backdrop-blur-sm">
                📌 Pinned
              </div>
            )}

            {/* Category badge */}
            <div className="absolute top-3 right-3">
              <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${CATEGORY_COLORS[post.category]} text-white`}
              >
                {post.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-heading font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2 mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  {post.author.image ? (
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-purple-500/30 flex items-center justify-center text-[10px]">
                      {post.author.name[0]}
                    </div>
                  )}
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{post.readingTime} min read</span>
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="relative overflow-hidden rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
        <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-2xl blur-lg transition-all duration-500" />

        <div className="relative flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full md:w-1/2 h-64 md:h-80">
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-600/40 to-pink-600/40 flex items-center justify-center">
                <span className="text-7xl">
                  {CATEGORY_ICONS[post.category]}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden" />
          </div>

          {/* Content */}
          <div className="relative w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-black/40 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 text-xs font-bold text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/30">
                ⭐ Featured
              </span>
              <span
                className={`px-2.5 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r ${CATEGORY_COLORS[post.category]} text-white`}
              >
                {post.category}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white group-hover:text-purple-300 transition-colors mb-3">
              {post.title}
            </h2>

            <p className="text-gray-400 text-sm md:text-base mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                {post.author.image ? (
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs">
                    {post.author.name[0]}
                  </div>
                )}
                <span>{post.author.name}</span>
              </div>
              <span>·</span>
              <span>{post.readingTime} min read</span>
              <span>·</span>
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage() {
  const allPosts = useMemo(() => getAllPosts(), []);
  const featuredPosts = useMemo(() => getFeaturedPosts(), []);
  const allTags = useMemo(() => getAllTags(), []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.author.name.toLowerCase().includes(q),
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      posts = posts.filter((p) => p.category === selectedCategory);
    }

    // Tag filter
    if (selectedTag) {
      posts = posts.filter((p) => p.tags.includes(selectedTag));
    }

    // Sort
    if (sortBy === "oldest") {
      posts = [...posts].reverse();
    }

    return posts;
  }, [allPosts, searchQuery, selectedCategory, selectedTag, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTag("");
    setSortBy("newest");
  };

  const hasFilters =
    searchQuery || selectedCategory !== "All" || selectedTag;

  return (
    <main className="min-h-screen bg-[#0E1A2B] pt-20 sm:pt-24 pb-16 sm:pb-20">
      <FixedParticleBackground />

      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-[80px] sm:blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-80 sm:h-80 bg-pink-500/10 rounded-full blur-[80px] sm:blur-[128px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-purple-500/10 border border-purple-500/20"
          >
            <span className="text-sm text-purple-300 font-medium">
              📝 Our Blog
            </span>
          </motion.div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent mb-4">
            BVP Optica Blog
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Stories, insights, tutorials, and updates from the world of optics,
            photonics, and our vibrant student community.
          </p>
        </AnimatedSection>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && !hasFilters && (
          <AnimatedSection className="mb-12" delay={0.1}>
            <h2 className="text-xl font-heading font-semibold text-white mb-5 flex items-center gap-2">
              <span className="text-amber-400">⭐</span> Featured
            </h2>
            <div className="space-y-6">
              {featuredPosts.slice(0, 2).map((post) => (
                <FeaturedPost key={post.slug} post={post} />
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Search & Filters */}
        <AnimatedSection className="mb-8" delay={0.15}>
          <div className="flex flex-col gap-4">
            {/* Search bar */}
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search articles, tags, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-3 py-1.5 text-xs sm:text-sm rounded-full border transition-all ${
                  selectedCategory === "All"
                    ? "bg-purple-500/30 border-purple-400/50 text-purple-300"
                    : "bg-white/5 border-white/10 text-gray-400 hover:border-purple-500/30 hover:text-gray-300"
                }`}
              >
                All
              </button>
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === cat ? "All" : cat,
                    )
                  }
                  className={`px-3 py-1.5 text-xs sm:text-sm rounded-full border transition-all ${
                    selectedCategory === cat
                      ? "bg-purple-500/30 border-purple-400/50 text-purple-300"
                      : "bg-white/5 border-white/10 text-gray-400 hover:border-purple-500/30 hover:text-gray-300"
                  }`}
                >
                  {CATEGORY_ICONS[cat]} {cat}
                </button>
              ))}
            </div>

            {/* Tags & Sort */}
            <div className="flex flex-wrap items-center gap-2 justify-between">
              <div className="flex flex-wrap gap-1.5">
                {allTags.slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      setSelectedTag(selectedTag === tag ? "" : tag)
                    }
                    className={`px-2 py-0.5 text-xs rounded-full transition-all ${
                      selectedTag === tag
                        ? "bg-pink-500/30 border border-pink-400/50 text-pink-300"
                        : "bg-white/5 text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1 text-xs text-gray-400 hover:text-white border border-white/10 rounded-full transition-all"
                  >
                    Clear filters
                  </button>
                )}
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "newest" | "oldest")
                  }
                  className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-full text-gray-400 focus:outline-none cursor-pointer"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                </select>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Results count */}
        {hasFilters && (
          <div className="mb-6 text-sm text-gray-500">
            Showing {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "article" : "articles"}
            {selectedCategory !== "All" && (
              <span>
                {" "}
                in <span className="text-purple-400">{selectedCategory}</span>
              </span>
            )}
            {selectedTag && (
              <span>
                {" "}
                tagged <span className="text-pink-400">#{selectedTag}</span>
              </span>
            )}
          </div>
        )}

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          {filteredPosts.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${selectedTag}-${searchQuery}-${sortBy}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPosts.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-heading text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg border border-purple-500/30 transition-all"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Embed CTA */}
        <AnimatedSection className="mt-16 mb-8" delay={0.2}>
          <div className="relative bg-gradient-to-br from-purple-900/30 via-black/40 to-pink-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6 sm:p-8 text-center">
            <h3 className="text-xl font-heading font-semibold text-white mb-2">
              📌 Embed Our Blog on Your Site
            </h3>
            <p className="text-gray-400 text-sm mb-4 max-w-lg mx-auto">
              Want to showcase BVP Optica articles on your website? Use our
              embed widget — just copy the code below!
            </p>
            <div className="bg-black/50 rounded-lg p-4 max-w-2xl mx-auto text-left">
              <code className="text-xs sm:text-sm text-green-400 break-all">
                {`<iframe src="${typeof window !== "undefined" ? window.location.origin : "https://www.bvpoptica.com"}/blog/embed" width="100%" height="600" frameborder="0" style="border-radius:12px;border:1px solid rgba(139,92,246,0.2)"></iframe>`}
              </code>
            </div>
            <p className="text-gray-500 text-xs mt-3">
              Or embed a single post:{" "}
              <code className="text-purple-400">
                /blog/embed/[slug]
              </code>
            </p>
          </div>
        </AnimatedSection>
      </div>

      <FooterSection />
    </main>
  );
}
