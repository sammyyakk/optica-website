import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/utils";
import LinksPageClient from "@/components/links/LinksPageClient";

export const metadata: Metadata = {
  title: "Links",
  description:
    "All BVP Optica links in one place — website, socials, and contact.",
  alternates: {
    canonical: "/links",
  },
};

export default function LinksPage() {
  const pageUrl = `${getBaseUrl()}/links`;

  return <LinksPageClient pageUrl={pageUrl} />;
}
