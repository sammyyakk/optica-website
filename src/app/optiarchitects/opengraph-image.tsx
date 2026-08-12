import { ogTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/template";
import { renderOgImage } from "@/lib/og/render";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    ogTemplate({
      eyebrow: "BVP OPTICA · DEV TEAM",
      title: "OptiArchitects",
      description:
        "The developers and designers building BVP Optica's digital presence.",
      tags: ["Engineering", "Design"],
    }),
  );
}
