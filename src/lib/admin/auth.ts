export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

async function hmac(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Buffer.from(signature).toString("base64url");
}

/** Builds a signed `exp.signature` session token good for SESSION_TTL_SECONDS. */
export async function createSessionToken(): Promise<string> {
  const secret = getSecret();
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const signature = await hmac(String(exp), secret);
  return `${exp}.${signature}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [expPart, signature] = token.split(".");
  if (!expPart || !signature) return false;

  const exp = Number(expPart);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;

  const secret = getSecret();
  const expected = await hmac(expPart, secret);
  return timingSafeEqual(expected, signature);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function verifyPassword(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD is not set");
  // hash both sides so comparison length/content doesn't leak the raw password length
  const [a, b] = await Promise.all([hmac(password, "compare"), hmac(expected, "compare")]);
  return timingSafeEqual(a, b);
}
