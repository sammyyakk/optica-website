import { getAllPosts, getFeaturedPosts, getAllTags } from "@/lib/blog/posts";
import BlogListClient from "@/components/blog/BlogListClient";

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const allTags = getAllTags();

  return (
    <BlogListClient
      allPosts={allPosts}
      featuredPosts={featuredPosts}
      allTags={allTags}
    />
  );
}
