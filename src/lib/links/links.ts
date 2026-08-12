import { Briefcase, Mail, Globe } from "lucide-react";
import { SiInstagram, SiX, SiGoogleforms, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { LinkItem } from "./types";

/**
 * Add a new short link by appending an entry below.
 * `slug` becomes bvpoptica.com/{slug} and redirects to `url`.
 * The same list also renders the /links linktree page as cards.
 */
export const links: LinkItem[] = [
  {
    slug: "support-group",
    label: "Support Group",
    url: "https://chat.whatsapp.com/Edfa3llf0vP1NaFQdKRsrr",
    description: "Join the WhatsApp group",
    icon: SiWhatsapp,
    featured: true,
  },
  // TODO: replace url with the real Google Form link, update label/description as needed
  {
    slug: "recruit-form",
    label: "Registration Form",
    url: "https://docs.google.com/forms/d/e/1FAIpQLScopA6u4GDd47GlrxpV23GnJG_TyR6i_1YNSv4wWxelPb3KPw/viewform?usp=publish-editor",
    description: "Fill out the form",
    icon: SiGoogleforms,
    featured: true,
  },
  {
    slug: "website",
    label: "Official Website",
    url: "https://www.bvpoptica.com",
    description: "Explore everything BVP Optica",
    icon: Globe,
  },
  {
    slug: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/bvpoptica",
    description: "Photos, reels & event highlights",
    icon: SiInstagram,
  },
  {
    slug: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/bvp-optica/",
    description: "Follow our journey & opportunities",
    // simple-icons removed the LinkedIn mark after LinkedIn's 2023 takedown request — closest generic icon instead
    icon: Briefcase,
  },
  {
    slug: "twitter",
    label: "Twitter / X",
    url: "https://twitter.com/bvpoptica",
    description: "Updates & announcements",
    icon: SiX,
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
