import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { BlogPost, BlogCategory } from "./types";

// ============================================================
// MARKDOWN-BASED BLOG SYSTEM
// ============================================================
// To add a new blog post:
//   1. Create a .md file in /content/blog/
//   2. Add YAML frontmatter (title, excerpt, category, tags, etc.)
//   3. Write your content in Markdown below the frontmatter
//   4. The filename becomes the URL slug
//      e.g. my-first-post.md → /blog/my-first-post
//   5. Set draft: true in frontmatter to hide from public
//
// Supported frontmatter fields:
//   title       (required) — Post title
//   excerpt     (required) — Short summary shown in cards
//   category    (required) — One of the BlogCategory values
//   tags        (required) — Array of tag strings
//   author      (required) — Object with name, role, image?, linkedin?, github?
//   publishedAt (required) — ISO date string
//   coverImage  (optional) — Path to cover image in /public
//   featured    (optional) — Show in featured section
//   pinned      (optional) — Pin to top
//   draft       (optional) — Hide from public when true
//   updatedAt   (optional) — ISO date string
//   readingTime (optional) — Override auto-calculated reading time
// ============================================================

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function calculateReadingTime(text: string): number {
  const plainText = text.replace(/<[^>]*>/g, "");
  const words = plainText.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function markdownToHtmlSync(markdown: string): string {
  // Use processSync for synchronous rendering
  const result = remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .processSync(markdown);
  return result.toString();
}

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();
}

function parsePost(filename: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, filename);
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content: rawContent } = matter(fileContents);

  // Slug comes from filename (remove .md extension)
  const slug = filename.replace(/\.md$/, "");

  // Validate required fields
  if (!data.title || !data.excerpt || !data.category || !data.author) {
    console.warn(
      `Blog post "${filename}" is missing required frontmatter fields. Skipping.`,
    );
    return null;
  }

  // Convert markdown → HTML
  const htmlContent = markdownToHtmlSync(rawContent);

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    content: htmlContent,
    coverImage: data.coverImage || undefined,
    author: {
      name: data.author.name,
      role: data.author.role || "",
      image: data.author.image,
      linkedin: data.author.linkedin,
      instagram: data.author.instagram,
      github: data.author.github,
    },
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    category: data.category as BlogCategory,
    tags: data.tags || [],
    readingTime: data.readingTime || calculateReadingTime(htmlContent),
    featured: data.featured || false,
    pinned: data.pinned || false,
    draft: data.draft || false,
  };
}

// ============================================================
// Cache: parse all .md files once per server lifecycle
// ============================================================
let _cachedPosts: BlogPost[] | null = null;

function loadAllPosts(): BlogPost[] {
  if (_cachedPosts) return _cachedPosts;

  const files = getMarkdownFiles();
  const posts = files
    .map((file) => parsePost(file))
    .filter((p): p is BlogPost => p !== null && !p.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

  _cachedPosts = posts;
  return posts;
}

// ============================================================
// Public API
// ============================================================

export function getAllPosts(): BlogPost[] {
  // Reset cache in dev so .md file changes are picked up on refresh
  if (process.env.NODE_ENV === "development") {
    _cachedPosts = null;
  }
  return loadAllPosts();
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.featured);
}

export function getPinnedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.pinned);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

export function searchPosts(query: string): BlogPost[] {
  const q = query.toLowerCase();
  return getAllPosts().filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q) ||
      p.author.name.toLowerCase().includes(q),
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPosts().forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getPostBySlug(slug);
  if (!post) return [];
  const scored = getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (p.category === post.category) score += 3;
      p.tags.forEach((t) => {
        if (post.tags.includes(t)) score += 1;
      });
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}
