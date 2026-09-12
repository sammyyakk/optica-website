import { NextRequest, NextResponse } from "next/server";
import { reorderLinks } from "@/lib/links/db";

export async function POST(request: NextRequest) {
  const { orderedIds } = (await request.json()) as { orderedIds: number[] };

  if (!Array.isArray(orderedIds) || orderedIds.some((id) => typeof id !== "number")) {
    return NextResponse.json({ error: "orderedIds must be an array of numbers" }, { status: 400 });
  }

  await reorderLinks(orderedIds);
  return NextResponse.json({ ok: true });
}
