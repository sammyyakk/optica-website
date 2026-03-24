import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px",
          background: "linear-gradient(to bottom right, #0e1a2b, #1a0b2e)",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: 48, fontWeight: "bold", color: "#a48ff5", letterSpacing: "4px", display: "flex", alignItems: "center" }}>
            <span style={{ color: "#e91e63", marginRight: "16px" }}>●</span> BVP OPTICA
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", zIndex: 1 }}>
          <div style={{ fontSize: 96, fontWeight: "bold", lineHeight: 1.1, maxWidth: "1000px", color: "white" }}>
            The Optica Blog
          </div>
          <div style={{ fontSize: 36, color: "#cbd5e1", maxWidth: "800px", lineHeight: 1.5, textAlign: "center" }}>
            Stories, tutorials, event recaps, and insights from the world of optics and photonics.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
