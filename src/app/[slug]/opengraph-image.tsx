import { ogTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/template";
import { renderOgImage } from "@/lib/og/render";
import { getLinkBySlug } from "@/lib/links/links";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

interface ShortLinkImageProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: ShortLinkImageProps) {
  const { slug } = await params;
  const link = getLinkBySlug(slug);

  return renderOgImage(
    ogTemplate({
      eyebrow: "BVP OPTICA",
      title: link?.label ?? "Link Not Found",
      description: link?.description,
    }),
  );
}
