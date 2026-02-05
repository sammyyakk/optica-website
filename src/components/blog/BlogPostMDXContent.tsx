import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { mdxComponents } from "./MDXComponents";

// ============================================================
// Server Component that renders MDX content
// ============================================================
// This is a React Server Component — it renders MDX on the
// server and streams it to the client. Custom components like
// <Callout>, <Tabs>, etc. are passed in as client components.
// ============================================================

export default function BlogPostMDXContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: "wrap",
                properties: {
                  className: ["heading-anchor"],
                },
              },
            ],
          ],
        },
      }}
      components={mdxComponents}
    />
  );
}
