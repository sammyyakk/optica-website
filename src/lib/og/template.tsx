import { OG_FONT_FAMILY, OG_BODY_FONT_FAMILY } from "./font";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OgTemplateProps {
  eyebrow?: string;
  title: string;
  description?: string;
  tags?: string[];
}

export function ogTemplate({ eyebrow = "BVP OPTICA · FORMERLY OSA", title, description, tags }: OgTemplateProps) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#030014",
        backgroundImage: "radial-gradient(circle at 50% 45%, #1a103c 0%, #030014 70%)",
        fontFamily: OG_BODY_FONT_FAMILY,
        position: "relative",
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.25,
          backgroundImage:
            "linear-gradient(#4c1d95 1px, transparent 1px), linear-gradient(90deg, #4c1d95 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Corner glows */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "420px",
          height: "420px",
          borderRadius: "420px",
          background: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: "-140px",
          left: "-140px",
          width: "460px",
          height: "460px",
          borderRadius: "460px",
          background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          padding: "40px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: OG_FONT_FAMILY,
            fontSize: 22,
            fontWeight: 700,
            color: "#a855f7",
            marginBottom: 28,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background: "rgba(168, 85, 247, 0.1)",
            padding: "10px 24px",
            borderRadius: "50px",
            border: "1px solid rgba(168, 85, 247, 0.3)",
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: OG_FONT_FAMILY,
            fontSize: title.length > 26 ? 64 : 84,
            fontWeight: 900,
            background: "linear-gradient(to right, #c084fc, #f472b6, #22d3ee)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: description ? 20 : 0,
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: "980px",
            textShadow: "0 0 40px rgba(168, 85, 247, 0.3)",
          }}
        >
          {title}
        </div>

        {description && (
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#e2e8f0",
              maxWidth: "820px",
              lineHeight: 1.5,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {description}
          </div>
        )}

        {tags && tags.length > 0 && (
          <div style={{ display: "flex", gap: "20px", marginTop: "36px" }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "12px 24px",
                  background: "rgba(168, 85, 247, 0.15)",
                  borderRadius: "16px",
                  border: "1px solid rgba(168, 85, 247, 0.4)",
                  color: "#d8b4fe",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Brand footer */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: "36px",
          fontSize: 22,
          color: "rgba(226,232,240,0.5)",
          letterSpacing: "0.05em",
        }}
      >
        bvpoptica.com
      </div>
    </div>
  );
}
