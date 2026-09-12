import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/utils";
import { getLinks } from "@/lib/links/links";
import LinksPageClient from "@/components/links/LinksPageClient";

// Links are edited live from /admin — without this, Next has no dynamic API
// to key off and prerenders this page once at build/deploy time, so admin
// edits would never show up until the next deploy.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Links",
  description:
    "All BVP Optica links in one place — website, socials, and contact.",
  alternates: {
    canonical: "/links",
  },
};

export default async function LinksPage() {
  const pageUrl = `${getBaseUrl()}/links`;
  const links = await getLinks();

  return <LinksPageClient pageUrl={pageUrl} links={links} />;
}
