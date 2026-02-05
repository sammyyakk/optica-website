import { getPostBySlug, getRelatedPosts, getAllPosts } from "@/lib/blog/posts";
import { extractHeadings } from "@/lib/blog/mdx";
import BlogPostClient from "@/components/blog/BlogPostClient";
import BlogPostMDXContent from "@/components/blog/BlogPostMDXContent";

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
