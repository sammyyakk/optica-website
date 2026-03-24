import { getPostBySlug, getRelatedPosts, getAllPosts } from "@/lib/blog/posts";
import { extractHeadings } from "@/lib/blog/mdx";
import BlogPostClient from "@/components/blog/BlogPostClient";
import BlogPostMDXContent from "@/components/blog/BlogPostMDXContent";
import { Metadata } from "next";

// Generate static paths for all blog posts at build time
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // Next.js will automatically handle assigning the opengraph-image to these metadata objects if `opengraph-image.tsx` exists.
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name, url: post.author.linkedin || post.author.github }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug) || null;
  const relatedPosts = getRelatedPosts(slug);

  let headings: { id: string; text: string; level: number }[] = [];

  if (post) {
    headings = extractHeadings(post.content);
  }

  return (
    <BlogPostClient post={post} relatedPosts={relatedPosts} headings={headings}>
      {post && <BlogPostMDXContent source={post.content} />}
    </BlogPostClient>
  );
}
