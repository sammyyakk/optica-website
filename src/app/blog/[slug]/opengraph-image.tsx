import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog/posts";
import fs from "fs";
import path from "path";
import { Buffer } from "buffer";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
const MAX_INLINE_IMAGE_BYTES = 250_000;

async function toDataUrl(imagePathOrUrl: string): Promise<string | undefined> {
  try {
    if (imagePathOrUrl.startsWith("http")) {
      const res = await fetch(imagePathOrUrl);
      if (!res.ok) return undefined;
      const arrayBuffer = await res.arrayBuffer();
      if (arrayBuffer.byteLength > MAX_INLINE_IMAGE_BYTES) return undefined;
      const buffer = Buffer.from(arrayBuffer);
      const mimeType = imagePathOrUrl.toLowerCase().endsWith(".png")
        ? "image/png"
        : "image/jpeg";
      return `data:${mimeType};base64,${buffer.toString("base64")}`;
    }

    const normalizedPath = imagePathOrUrl.startsWith("/")
      ? imagePathOrUrl.slice(1)
      : imagePathOrUrl;
    const absolutePath = path.join(process.cwd(), "public", normalizedPath);
    const fileSize = fs.statSync(absolutePath).size;
    if (fileSize > MAX_INLINE_IMAGE_BYTES) return undefined;
    const imageBuffer = fs.readFileSync(absolutePath);
    const mimeType = imagePathOrUrl.toLowerCase().endsWith(".png")
      ? "image/png"
      : "image/jpeg";
    return `data:${mimeType};base64,${imageBuffer.toString("base64")}`;
  } catch (e) {
    console.error("Failed to load image for OG:", e);
    return undefined;
  }
}

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
  if (post.author.image) authorImageSrc = await toDataUrl(post.author.image);

  let coverImageSrc = undefined;
  if (post.coverImage) coverImageSrc = await toDataUrl(post.coverImage);

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
          backgroundColor: "#0e1a2b",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
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
              width: "1200px",
              height: "630px",
              objectFit: "cover",
              zIndex: 0,
            }}
          />
        )}
        
        {coverImageSrc && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "1200px",
              height: "630px",
              background:
                "linear-gradient(135deg, rgba(14, 26, 43, 0.88) 0%, rgba(14, 26, 43, 0.8) 45%, rgba(14, 26, 43, 0.9) 100%)",
              zIndex: 1,
            }}
          />
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 2, width: "100%" }}>
          <div style={{ fontSize: 36, fontWeight: "bold", color: "#a48ff5", letterSpacing: "2px", display: "flex", alignItems: "center" }}>
            BVP OPTICA
          </div>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#e91e63", background: "rgba(233, 30, 99, 0.15)", padding: "10px 24px", borderRadius: "100px", border: "1px solid rgba(233, 30, 99, 0.3)", display: "flex" }}>
            {post.category}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 2, width: "100%", paddingTop: "30px", paddingBottom: "30px" }}>
          <div style={{ fontSize: 50, fontWeight: "bold", lineHeight: 1.1, color: "white", marginBottom: "30px", maxWidth: "1000px" }}>
            {post.title}
          </div>
          <div style={{ fontSize: 35, color: "#cbd5e1", lineHeight: 1.4, maxWidth: "900px" }}>
            {post.excerpt.length > 130 ? post.excerpt.substring(0, 130) + "..." : post.excerpt}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", zIndex: 2, width: "100%" }}>
          {authorImageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={authorImageSrc} 
              alt={post.author.name}
              width={80} 
              height={80}
              style={{ borderRadius: "40px", objectFit: "cover", border: "3px solid #a48ff5", marginRight: "24px" }}
            />
          ) : (
            <div style={{ width: 80, height: 80, borderRadius: 40, background: "linear-gradient(135deg, #a48ff5, #e91e63)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: "bold", marginRight: "24px", color: "white" }}>
              {post.author.name.charAt(0)}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 32, fontWeight: "bold", color: "white", marginBottom: "8px", display: "flex" }}>{post.author.name}</div>
            <div style={{ fontSize: 24, color: "#a48ff5", display: "flex" }}>{post.author.role}</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
