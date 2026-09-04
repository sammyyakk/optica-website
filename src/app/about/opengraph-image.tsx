import { ogTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/template";
import { renderOgImage } from "@/lib/og/render";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    ogTemplate({
      title: "About BVP Optica",
      description:
        "Building across AI, ML, cybersecurity, robotics, blockchain, and optics through workshops, seminars, and hands-on innovation at BVCOE Delhi.",
      tags: ["Workshops", "Seminars", "Community"],
    }),
  );
}
