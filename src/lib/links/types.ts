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
  /**
   * Icon key into ICON_MAP (see ./icons), not a component — this crosses the
   * server → client boundary as page data, and component references/functions
   * can't be serialized across that boundary. LinkCard resolves it at render time.
   */
  icon?: string | null;
  /** Pins the card to the top of the list, above non-featured entries */
  featured?: boolean;
  /** Keeps the short link (bvpoptica.com/slug) working, but hides its card from /links */
  hidden?: boolean;
}

/** Row shape as stored in the database — `icon` is a key into ICON_MAP, not a component. */
export interface LinkRecord {
  id: number;
  slug: string;
  label: string;
  url: string;
  description: string | null;
  icon: string | null;
  featured: boolean;
  hidden: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

/** Fields an admin can create/edit; slug and sortOrder are handled separately. */
export interface LinkInput {
  slug: string;
  label: string;
  url: string;
  description?: string | null;
  icon?: string | null;
  featured?: boolean;
  hidden?: boolean;
}
