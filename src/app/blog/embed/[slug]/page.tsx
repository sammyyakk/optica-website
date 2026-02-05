import Image from "next/image";
import { getPostBySlug, getAllPosts } from "@/lib/blog/posts";
import { CategoryIcon, FileTextIcon } from "@/components/blog/Icons";

// Generate static paths for all blog posts at build time
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function EmbedSinglePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "#0E1A2B",
          color: "#fff",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div className="text-center">
          <div className="mb-3 flex justify-center">
            <FileTextIcon className="w-10 h-10 text-purple-400" />
          </div>
          <p style={{ color: "#9ca3af" }}>Article not found</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-5 sm:p-8"
      style={{
        background:
          "linear-gradient(135deg, #0E1A2B 0%, #1a0a2e 50%, #0E1A2B 100%)",
        fontFamily: "'Inter', sans-serif",
        color: "#d1d5db",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <a
          href="https://www.bvpoptica.com/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
          style={{ textDecoration: "none" }}
        >
          <Image
            src="/glow_accent_logo.png"
            alt="BVP Optica"
            width={20}
            height={20}
          />
          <span style={{ color: "#9ca3af", fontSize: "11px" }}>
            BVP Optica Blog
          </span>
        </a>
      </div>

      {/* Cover */}
      {post.coverImage && (
        <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-6">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(14,26,43,1), transparent)",
            }}
          />
        </div>
      )}

      {/* Category */}
      <span
        className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full text-white mb-3"
        style={{
          background:
            "linear-gradient(to right, rgba(139, 92, 246, 0.8), rgba(236, 72, 153, 0.8))",
        }}
      >
        <span className="inline-flex items-center gap-1">
          <CategoryIcon category={post.category} className="w-3.5 h-3.5" />{" "}
          {post.category}
        </span>
      </span>

      {/* Title */}
      <h1
        className="text-2xl sm:text-3xl font-bold mb-3"
        style={{ color: "#fff", lineHeight: 1.3 }}
      >
        {post.title}
      </h1>

      {/* Meta */}
      <div
        className="flex items-center gap-3 mb-6 text-xs"
        style={{ color: "#6b7280" }}
      >
        <span>{post.author.name}</span>
        <span>·</span>
        <span>{post.readingTime} min read</span>
        <span>·</span>
        <span>
          {new Date(post.publishedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Content */}
      <article
        className="prose prose-sm prose-invert max-w-none"
        style={{
          fontSize: "14px",
          lineHeight: "1.7",
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Footer */}
      <div
        className="mt-8 pt-4 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(139, 92, 246, 0.2)" }}
      >
        <a
          href={`https://www.bvpoptica.com/blog/${post.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-4 py-2 rounded-lg transition-all"
          style={{
            background: "rgba(139, 92, 246, 0.15)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            color: "#c4b5fd",
            textDecoration: "none",
          }}
        >
          Read on BVP Optica →
        </a>
        <span style={{ fontSize: "10px", color: "#4b5563" }}>
          bvpoptica.com
        </span>
      </div>
    </div>
  );
}
