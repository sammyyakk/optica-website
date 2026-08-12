import { notFound, redirect } from "next/navigation";
import { getLinkBySlug } from "@/lib/links/links";

interface ShortLinkPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ShortLinkPage({ params }: ShortLinkPageProps) {
  const { slug } = await params;
  const link = getLinkBySlug(slug);

  if (!link) {
    notFound();
  }

  redirect(link.url);
}
