const fs = require('fs');

let file = fs.readFileSync('src/app/blog/[slug]/opengraph-image.tsx', 'utf8');

const satoriContent = `  return new ImageResponse(
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
              backgroundColor: "rgba(14, 26, 43, 0.82)", // Even darker background for contrast
              zIndex: 1,
            }}
          />
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 2, width: "100%" }}>
          <div style={{ fontSize: 36, fontWeight: "bold", color: "#a48ff5", letterSpacing: "2px", display: "flex", alignItems: "center" }}>
            <span style={{ color: "#e91e63", marginRight: "12px" }}>●</span> BVP OPTICA
          </div>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#e91e63", background: "rgba(233, 30, 99, 0.15)", padding: "10px 24px", borderRadius: "100px", border: "1px solid rgba(233, 30, 99, 0.3)", display: "flex" }}>
            {post.category}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 2, width: "100%", paddingTop: "50px", paddingBottom: "30px" }}>
          <div style={{ fontSize: 64, fontWeight: "bold", lineHeight: 1.1, color: "white", marginBottom: "30px", maxWidth: "1000px" }}>
            {post.title}
          </div>
          <div style={{ fontSize: 32, color: "#cbd5e1", lineHeight: 1.4, maxWidth: "900px" }}>
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
  );`;

// Find the last return new ImageResponse(... and replace to the end.
const lastIdx = file.lastIndexOf('return new ImageResponse(');
if (lastIdx !== -1) {
  file = file.substring(0, lastIdx) + satoriContent + '\n}\n';
  fs.writeFileSync('src/app/blog/[slug]/opengraph-image.tsx', file);
  console.log('Successfully updated!');
} else {
  console.log('Could not find ImageResponse return block');
}
