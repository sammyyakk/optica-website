import { ImageResponse } from "next/og";
import { ogTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/template";
import { getLinkBySlug } from "@/lib/links/links";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

interface ShortLinkImageProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: ShortLinkImageProps) {
  const { slug } = await params;
  const link = getLinkBySlug(slug);

  return new ImageResponse(
    ogTemplate({
      eyebrow: "BVP OPTICA",
      title: link?.label ?? "Link Not Found",
      description: link?.description,
    }),
    { ...size },
  );
}
