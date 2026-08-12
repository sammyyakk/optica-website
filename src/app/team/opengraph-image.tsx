import { ogTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/template";
import { renderOgImage } from "@/lib/og/render";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    ogTemplate({
      title: "Meet the Team",
      description:
        "The students leading BVP Optica's workshops, events, and community initiatives.",
      tags: ["Leadership", "Volunteers"],
    }),
  );
}
