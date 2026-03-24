import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog/posts";
import fs from "fs";
import path from "path";
import { Buffer } from "buffer";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div style={{ fontSize: 128, background: "white", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          Not Found
        </div>
      ),
      { ...size }
    );
  }

  let authorImageSrc = undefined;
  if (post.author.image) {
    try {
      if (post.author.image.startsWith("http")) {
        // Fetch external image
        const res = await fetch(post.author.image);
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString("base64");
        const mimeType = post.author.image.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
        authorImageSrc = `data:${mimeType};base64,${base64Image}`;
      } else {
        // Read local image
        // Remove leading slash if present to avoid absolute path issues with path.join
        const normalizedPath = post.author.image.startsWith("/") ? post.author.image.slice(1) : post.author.image;
        const imagePath = path.join(process.cwd(), "public", normalizedPath);
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString("base64");
        const mimeType = post.author.image.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
        authorImageSrc = `data:${mimeType};base64,${base64Image}`;
      }
    } catch (e) {
      console.error("Failed to load author image for OG:", e);
    }
  }

  let coverImageSrc = undefined;
  if (post.coverImage) {
    try {
      if (post.coverImage.startsWith("http")) {
        const res = await fetch(post.coverImage);
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Cover = buffer.toString("base64");
        const mimeType = post.coverImage.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
        coverImageSrc = `data:${mimeType};base64,${base64Cover}`;
      } else {
        const normalizedPath = post.coverImage.startsWith("/") ? post.coverImage.slice(1) : post.coverImage;
        const coverPath = path.join(process.cwd(), "public", normalizedPath);
        const coverBuffer = fs.readFileSync(coverPath);
        const base64Cover = coverBuffer.toString("base64");
        const mimeType = post.coverImage.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
        coverImageSrc = `data:${mimeType};base64,${base64Cover}`;
      }
    } catch (e) {
      console.error("Failed to load cover image for OG:", e);
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: coverImageSrc 
            ? "linear-gradient(to right, rgba(14, 26, 43, 1) 0%, rgba(14, 26, 43, 0.9) 60%, rgba(14, 26, 43, 0.4) 100%)"
            : "linear-gradient(to bottom right, #0e1a2b, #1a0b2e)",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {coverImageSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImageSrc}
            alt="Cover"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
            }}
          />
        )}
        
        {coverImageSrc && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(to right, #0e1a2b 0%, rgba(14, 26, 43, 0.85) 50%, rgba(14, 26, 43, 0.2) 100%)",
              zIndex: -1,
            }}
          />
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1 }}>
          <div style={{ fontSize: 36, fontWeight: "bold", color: "#a48ff5", letterSpacing: "2px", display: "flex", alignItems: "center" }}>
            <span style={{ color: "#e91e63", marginRight: "12px" }}>●</span> BVP OPTICA
          </div>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#e91e63", background: "rgba(233, 30, 99, 0.15)", padding: "10px 24px", borderRadius: "100px", border: "1px solid rgba(233, 30, 99, 0.3)" }}>
            {post.category}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", flex: 1, justifyContent: "center", paddingTop: "60px", zIndex: 1 }}>
          <div style={{ fontSize: 72, fontWeight: "bold", lineHeight: 1.1, maxWidth: "1000px" }}>
            {post.title}
          </div>
          <div style={{ fontSize: 32, color: "#cbd5e1", maxWidth: "800px", lineHeight: 1.4 }}>
            {post.excerpt.length > 130 ? post.excerpt.substring(0, 130) + "..." : post.excerpt}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px", zIndex: 1 }}>
          {authorImageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={authorImageSrc} 
              alt={post.author.name}
              width={80} 
              height={80}
              style={{ borderRadius: "40px", objectFit: "cover", border: "3px solid #a48ff5" }}
            />
          ) : (
            <div style={{ width: 80, height: 80, borderRadius: 40, background: "linear-gradient(135deg, #a48ff5, #e91e63)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: "bold" }}>
              {post.author.name.charAt(0)}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ fontSize: 32, fontWeight: "bold", display: "flex", color: "white" }}>{post.author.name}</div>
            <div style={{ fontSize: 24, color: "#a48ff5", display: "flex" }}>{post.author.role}</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
