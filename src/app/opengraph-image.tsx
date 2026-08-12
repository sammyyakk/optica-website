import { ImageResponse } from "next/og";
import { ogTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      title: "Optics & Photonics, Reimagined",
      description:
        "Student chapter advancing optics and photonics through education, innovation, and global collaboration.",
      tags: ["Workshops", "Research", "Innovation"],
    }),
    { ...size },
  );
}
