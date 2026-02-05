"use client";

import { useMemo } from "react";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog/posts";
import { CATEGORY_ICONS } from "@/lib/blog/types";

export default function BlogEmbedPage() {
  const posts = useMemo(() => getAllPosts().slice(0, 6), []);

  return (
    <div
      className="min-h-screen p-4 sm:p-6"
      style={{
        background: "linear-gradient(135deg, #0E1A2B 0%, #1a0a2e 50%, #0E1A2B 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <Image
            src="/glow_accent_logo.png"
            alt="BVP Optica"
            width={28}
            height={28}
          />
          <h2
            className="text-lg font-bold text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(to right, #c4b5fd, #f9a8d4, #c4b5fd)",
            }}
          >
            BVP Optica Blog
          </h2>
        </div>
        <a
          href="https://www.bvpoptica.com/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-3 py-1.5 rounded-full transition-all"
          style={{
            background: "rgba(139, 92, 246, 0.15)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            color: "#c4b5fd",
          }}
        >
          View All →
        </a>
      </div>

      {/* Posts Grid */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        }}
      >
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`https://www.bvpoptica.com/blog/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
            style={{ textDecoration: "none" }}
          >
            <article
              className="h-full overflow-hidden rounded-xl transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(88, 28, 135, 0.2), rgba(0, 0, 0, 0.3), rgba(88, 28, 135, 0.15))",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(139, 92, 246, 0.15)",
              }}
            >
              {/* Cover */}
              <div className="relative h-36 overflow-hidden">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))",
                    }}
                  >
                    <span className="text-4xl">
                      {CATEGORY_ICONS[post.category]}
                    </span>
                  </div>
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                  }}
                />
                <div className="absolute top-2 right-2">
                  <span
                    className="px-2 py-0.5 text-[10px] font-medium rounded-full text-white"
                    style={{
                      backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                      background: "linear-gradient(to right, rgba(139, 92, 246, 0.8), rgba(236, 72, 153, 0.8))",
                    }}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3
                  className="text-sm font-semibold mb-1.5 line-clamp-2 transition-colors"
                  style={{ color: "#fff" }}
                >
                  {post.title}
                </h3>
                <p
                  className="text-xs line-clamp-2 mb-3"
                  style={{ color: "#9ca3af" }}
                >
                  {post.excerpt}
                </p>
                <div
                  className="flex items-center justify-between text-[10px]"
                  style={{ color: "#6b7280" }}
                >
                  <span>{post.author.name}</span>
                  <span>
                    {post.readingTime} min ·{" "}
                    {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              </div>
            </article>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-5 text-center">
        <a
          href="https://www.bvpoptica.com/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px]"
          style={{ color: "#6b7280" }}
        >
          Powered by BVP Optica · bvpoptica.com
        </a>
      </div>
    </div>
  );
}
