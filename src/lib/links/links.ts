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
    slug: "panel1_am",
    label: "Panel 1 (AM)",
    url: "https://meet.google.com/chx-bzwz-cgu?hs=224",
    description: "Anand",
    icon: Video,
  },
  {
    slug: "panel1_pm",
    label: "Panel 1 (PM)",
    url: "https://meet.google.com/chx-bzwz-cgu?hs=224",
    description: "Anand",
    icon: Video,
  },
  {
    slug: "panel2_am",
    label: "Panel 2 (AM)",
    url: "https://meet.google.com/wue-pwse-bfu",
    description: "Akshat",
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
    url: "https://meet.google.com/wod-smic-xvn",
    description: "Pratham",
    icon: Video,
  },
  {
    slug: "panel3_pm",
    label: "Panel 3 (PM)",
    url: "https://meet.google.com/gfr-kyki-yrh",
    description: "Gaurav",
    icon: Video,
  },
  {
    slug: "panel4_am",
    label: "Panel 4 (AM)",
    url: "https://meet.google.com/gfr-kyki-yrh",
    description: "Gaurav",
    icon: Video,
  },
  {
    slug: "panel4_pm",
    label: "Panel 4 (PM)",
    url: "https://meet.google.com/jud-pohj-iwr",
    description: "Samyak",
    icon: Video,
  },
  {
    slug: "panel5_am",
    label: "Panel 5 (AM)",
    url: "https://meet.google.com/jud-pohj-iwr",
    description: "Samyak",
    icon: Video,
  },
  {
    slug: "panel5_pm",
    label: "Panel 5 (PM)",
    url: "https://meet.google.com/wod-smic-xvn",
    description: "Pratham",
    icon: Video,
  },
  {
    slug: "panel6_am",
    label: "Panel 6 (AM)",
    url: "https://meet.google.com/tnu-hnmc-qhx",
    description: "Sambhav/Krish",
    icon: Video,
  },
  // TODO: fill in Khushi/Krishiv's Panel 6 PM Google Meet link
  {
    slug: "panel6_pm",
    label: "Panel 6 (PM)",
    url: "https://meet.google.com/TBD",
    description: "Khushi/Krishiv",
    icon: Video,
    hidden: true,
  },
  {
    slug: "panel7_am",
    label: "Panel 7 (AM)",
    url: "https://meet.google.com/vus-ojyz-uhz",
    description: "Avni",
    icon: Video,
  },
  {
    slug: "panel7_pm",
    label: "Panel 7 (PM)",
    url: "https://meet.google.com/vus-ojyz-uhz",
    description: "Avni",
    icon: Video,
  },
];
export function getLinkBySlug(slug: string): LinkItem | undefined {
  return links.find((link) => link.slug === slug);
}
