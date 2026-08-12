import { ComponentType, SVGProps } from "react";

export type LinkIcon = ComponentType<SVGProps<SVGSVGElement> & { title?: string; size?: string | number }>;

export interface LinkItem {
  /** URL path segment: bvpoptica.com/{slug} redirects to `url` */
  slug: string;
  /** Display title on the linktree card */
  label: string;
  /** Destination URL to redirect to */
  url: string;
  /** Optional short subtext shown under the label */
  description?: string;
  /** icon component (lucide-react or @icons-pack/react-simple-icons) to render on the card */
  icon?: LinkIcon;
  /** Renders a larger, highlighted card at the top of the list */
  featured?: boolean;
}
