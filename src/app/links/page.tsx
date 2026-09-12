import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/utils";
import { getLinks } from "@/lib/links/links";
import LinksPageClient from "@/components/links/LinksPageClient";

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
