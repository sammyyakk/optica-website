import { ImageResponse } from "next/og";
import { ogTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      title: "Meet the Team",
      description:
        "The students leading BVP Optica's workshops, events, and community initiatives.",
      tags: ["Leadership", "Volunteers"],
    }),
    { ...size },
  );
}
