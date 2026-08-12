import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLinkBySlug } from "@/lib/links/links";
import RedirectClient from "./RedirectClient";

interface ShortLinkPageProps {
  params: Promise<{ slug: string }>;
}

// A plain redirect() aborts rendering before the <head> is ever built, so a
// share/unfurl bot fetching the short link would never see custom OG tags —
// it'd just see the raw 307. Rendering a branded interstitial instead (with
// its own generateMetadata + opengraph-image) lets every short link carry its
// own preview card; real visitors still land on the destination instantly via
// the client-side redirect below.
export async function generateMetadata({ params }: ShortLinkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const link = getLinkBySlug(slug);

  if (!link) {
    return { title: "Link Not Found | BVP Optica" };
  }

  return {
    title: link.label,
    description: link.description ?? `Redirecting to ${link.label}`,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: link.label,
      description: link.description,
      url: `/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: link.label,
      description: link.description,
    },
  };
}

export default async function ShortLinkPage({ params }: ShortLinkPageProps) {
  const { slug } = await params;
  const link = getLinkBySlug(slug);

  if (!link) {
    notFound();
  }

  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${link.url}`} />
      <RedirectClient url={link.url} label={link.label} />
    </>
  );
}
