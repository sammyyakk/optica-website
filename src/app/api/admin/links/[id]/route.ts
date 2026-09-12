import { NextRequest, NextResponse } from "next/server";
import { deleteLink, updateLink } from "@/lib/links/db";
import { LinkInput } from "@/lib/links/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = (await request.json()) as LinkInput;

  if (!body.slug?.trim() || !body.label?.trim() || !body.url?.trim()) {
    return NextResponse.json({ error: "slug, label, and url are required" }, { status: 400 });
  }

  try {
    const link = await updateLink(Number(id), body);
    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }
    return NextResponse.json({ link });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update link";
    const isDuplicateSlug = message.includes("duplicate key");
    return NextResponse.json(
      { error: isDuplicateSlug ? "That slug is already in use" : message },
      { status: isDuplicateSlug ? 409 : 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  await deleteLink(Number(id));
  return NextResponse.json({ ok: true });
}
