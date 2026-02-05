import { getPostBySlug, getRelatedPosts, getAllPosts } from "@/lib/blog/posts";
import BlogPostClient from "@/components/blog/BlogPostClient";

// Generate static paths for all blog posts at build time
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug) || null;
  const relatedPosts = getRelatedPosts(slug);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
