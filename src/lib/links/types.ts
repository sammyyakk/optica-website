import { LucideIcon } from "lucide-react";

export interface LinkItem {
  /** URL path segment: bvpoptica.com/{slug} redirects to `url` */
  slug: string;
  /** Display title on the linktree card */
  label: string;
  /** Destination URL to redirect to */
  url: string;
  /** Optional short subtext shown under the label */
  description?: string;
  /** lucide-react icon component to render on the card */
  icon?: LucideIcon;
  /** Renders a larger, highlighted card at the top of the list */
  featured?: boolean;
}
