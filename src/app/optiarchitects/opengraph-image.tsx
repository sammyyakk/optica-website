import { ImageResponse } from "next/og";
import { ogTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      eyebrow: "BVP OPTICA · DEV TEAM",
      title: "OptiArchitects",
      description:
        "The developers and designers building BVP Optica's digital presence.",
      tags: ["Engineering", "Design"],
    }),
    { ...size },
  );
}
