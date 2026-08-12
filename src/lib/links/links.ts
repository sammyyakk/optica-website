import { Camera, Briefcase, X, Mail, Globe } from "lucide-react";
import { LinkItem } from "./types";

/**
 * Add a new short link by appending an entry below.
 * `slug` becomes bvpoptica.com/{slug} and redirects to `url`.
 * The same list also renders the /links linktree page as cards.
 */
export const links: LinkItem[] = [
  {
    slug: "website",
    label: "Official Website",
    url: "https://www.bvpoptica.com",
    description: "Explore everything BVP Optica",
    icon: Globe,
    featured: true,
  },
  {
    slug: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/bvpoptica",
    description: "Photos, reels & event highlights",
    icon: Camera,
  },
  {
    slug: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/bvpoptica",
    description: "Follow our journey & opportunities",
    icon: Briefcase,
  },
  {
    slug: "twitter",
    label: "Twitter / X",
    url: "https://twitter.com/bvpoptica",
    description: "Updates & announcements",
    icon: X,
  },
  {
    slug: "email",
    label: "Email Us",
    url: "mailto:bvpoptica@gmail.com",
    description: "bvpoptica@gmail.com",
    icon: Mail,
  },
];

export function getLinkBySlug(slug: string): LinkItem | undefined {
  return links.find((link) => link.slug === slug);
}
