import { NextRequest, NextResponse } from "next/server";
import { createLink, getAllLinks } from "@/lib/links/db";
import { LinkInput } from "@/lib/links/types";

// GET route handlers are static-cacheable by default when they don't touch a
// dynamic API — this one just reads the DB, so without this it could get
// cached and admin edits would stop showing up in the list.
export const dynamic = "force-dynamic";

export async function GET() {
  const links = await getAllLinks();
  return NextResponse.json({ links });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as LinkInput;

  if (!body.slug?.trim() || !body.label?.trim() || !body.url?.trim()) {
    return NextResponse.json({ error: "slug, label, and url are required" }, { status: 400 });
  }

  try {
    const link = await createLink(body);
    return NextResponse.json({ link }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create link";
    const isDuplicateSlug = message.includes("duplicate key");
    return NextResponse.json(
      { error: isDuplicateSlug ? "That slug is already in use" : message },
      { status: isDuplicateSlug ? 409 : 500 }
    );
  }
}
