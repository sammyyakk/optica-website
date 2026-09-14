import { cache } from "react";
import { getAllLinks, getLinkBySlug as getLinkRecordBySlug, getVisibleLinks } from "./db";
import { LinkItem, LinkRecord } from "./types";

/**
 * Links are managed dynamically from /admin (stored in the `links` table).
 * This module adapts DB records into the `LinkItem` shape the UI renders.
 * `icon` stays a string key here — it's resolved to a component client-side
 * by LinkCard, since component references can't cross server → client.
 */
export function toLinkItem(record: LinkRecord): LinkItem {
  return {
    slug: record.slug,
    label: record.label,
    url: record.url,
    description: record.description ?? undefined,
    icon: record.icon,
    featured: record.featured,
    hidden: record.hidden,
  };
}

/** Non-hidden links, in /links page order (featured first). */
export async function getLinks(): Promise<LinkItem[]> {
  const records = await getVisibleLinks();
  return records.map(toLinkItem);
}

/** Every link including hidden ones, for the admin list. */
export async function getAllLinkItems(): Promise<LinkItem[]> {
  const records = await getAllLinks();
  return records.map(toLinkItem);
}

export const getLinkBySlug = cache(async function getLinkBySlug(
  slug: string,
): Promise<LinkItem | undefined> {
  const record = await getLinkRecordBySlug(slug);
  return record ? toLinkItem(record) : undefined;
});
