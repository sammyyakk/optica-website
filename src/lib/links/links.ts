import { Video } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
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
  {
    slug: "panel1",
    label: "Panel 1",
    url: "https://meet.google.com/chx-bzwz-cgu?hs=224",
    description: "Anand",
    icon: Video,
  },
  {
    slug: "panel2_am",
    label: "Panel 2 (AM)",
    url: "https://meet.google.com/jud-pohj-iwr",
    description: "Samyak",
    icon: Video,
  },
  {
    slug: "panel2_pm",
    label: "Panel 2 (PM)",
    url: "https://meet.google.com/wue-pwse-bfu",
    description: "Akshat",
    icon: Video,
  },
  {
    slug: "panel3_am",
    label: "Panel 3 (AM)",
    url: "https://meet.google.com/wue-pwse-bfu",
    description: "Akshat",
    icon: Video,
  },
  {
    slug: "panel3_pm",
    label: "Panel 3 (PM)",
    url: "https://meet.google.com/jud-pohj-iwr",
    description: "Samyak",
    icon: Video,
  },
  {
    slug: "panel4",
    label: "Panel 4",
    url: "https://meet.google.com/eay-wvjy-uxs",
    description: "Gaurav",
    icon: Video,
  },
  {
    slug: "panel5",
    label: "Panel 5",
    url: "https://meet.google.com/wod-smic-xvn",
    description: "Pratham",
    icon: Video,
  },
  {
    slug: "panel6",
    label: "Panel 6",
    url: "https://meet.google.com/qbf-ysbj-muz",
    description: "Simran",
    icon: Video,
  },
  {
    slug: "panel7",
    label: "Panel 7",
    url: "https://meet.google.com/vus-ojyz-uhz",
    description: "Avni",
    icon: Video,
  },
];
export function getLinkBySlug(slug: string): LinkItem | undefined {
  return links.find((link) => link.slug === slug);
}
