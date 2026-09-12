import { getSql } from "@/lib/db";
import { LinkInput, LinkRecord } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toRecord(row: any): LinkRecord {
  return {
    id: row.id,
    slug: row.slug,
    label: row.label,
    url: row.url,
    description: row.description,
    icon: row.icon,
    featured: row.featured,
    hidden: row.hidden,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function ensureLinksTable() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS links (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      label TEXT NOT NULL,
      url TEXT NOT NULL,
      description TEXT,
      icon TEXT,
      featured BOOLEAN NOT NULL DEFAULT false,
      hidden BOOLEAN NOT NULL DEFAULT false,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

/** All links, in admin display order (featured first, then by sort_order). */
export async function getAllLinks(): Promise<LinkRecord[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM links ORDER BY featured DESC, sort_order ASC, id ASC
  `;
  return rows.map(toRecord);
}

/** Non-hidden links in the order the /links page renders them. */
export async function getVisibleLinks(): Promise<LinkRecord[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM links WHERE hidden = false ORDER BY featured DESC, sort_order ASC, id ASC
  `;
  return rows.map(toRecord);
}

export async function getLinkBySlug(slug: string): Promise<LinkRecord | undefined> {
  const sql = getSql();
  const rows = await sql`SELECT * FROM links WHERE slug = ${slug} LIMIT 1`;
  return rows[0] ? toRecord(rows[0]) : undefined;
}

export async function createLink(input: LinkInput): Promise<LinkRecord> {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO links (slug, label, url, description, icon, featured, hidden, sort_order)
    VALUES (
      ${input.slug},
      ${input.label},
      ${input.url},
      ${input.description ?? null},
      ${input.icon ?? null},
      ${input.featured ?? false},
      ${input.hidden ?? false},
      COALESCE((SELECT MAX(sort_order) + 1 FROM links), 0)
    )
    RETURNING *
  `;
  return toRecord(rows[0]);
}

export async function updateLink(id: number, input: LinkInput): Promise<LinkRecord | undefined> {
  const sql = getSql();
  const rows = await sql`
    UPDATE links SET
      slug = ${input.slug},
      label = ${input.label},
      url = ${input.url},
      description = ${input.description ?? null},
      icon = ${input.icon ?? null},
      featured = ${input.featured ?? false},
      hidden = ${input.hidden ?? false},
      updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] ? toRecord(rows[0]) : undefined;
}

export async function deleteLink(id: number): Promise<void> {
  const sql = getSql();
  await sql`DELETE FROM links WHERE id = ${id}`;
}

/** Persists a full new ordering. `orderedIds` must contain every link id. */
export async function reorderLinks(orderedIds: number[]): Promise<void> {
  const sql = getSql();
  await Promise.all(
    orderedIds.map((id, index) => sql`UPDATE links SET sort_order = ${index} WHERE id = ${id}`)
  );
}
