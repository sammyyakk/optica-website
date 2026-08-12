import { ogTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/template";
import { renderOgImage } from "@/lib/og/render";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    ogTemplate({
      eyebrow: "BVP OPTICA · LINKS",
      title: "All Our Links",
      description: "Everything you need, one tap away.",
    }),
  );
}
