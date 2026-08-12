import { ogTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/template";
import { renderOgImage } from "@/lib/og/render";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    ogTemplate({
      title: "Optics & Photonics, Reimagined",
      description:
        "Student chapter advancing optics and photonics through education, innovation, and global collaboration.",
      tags: ["Workshops", "Research", "Innovation"],
    }),
  );
}
