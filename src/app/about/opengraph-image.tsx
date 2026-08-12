import { ImageResponse } from "next/og";
import { ogTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      title: "About BVP Optica",
      description:
        "Advancing optics and photonics through workshops, seminars, and hands-on innovation at BVCOE Delhi.",
      tags: ["Workshops", "Seminars", "Community"],
    }),
    { ...size },
  );
}
