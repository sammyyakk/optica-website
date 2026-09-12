import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createSessionToken, verifyPassword } from "@/lib/admin/auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (typeof password !== "string" || !(await verifyPassword(password))) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
