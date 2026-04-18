import { SignJWT, jwtVerify } from "jose";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./db.js";
import { users, type SafeUser } from "../shared/schema.js";
import { eq } from "drizzle-orm";

const COOKIE_NAME = "msj_session";
const SESSION_TTL_SEC = 60 * 60 * 24 * 7;

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET is not set (or too short). Set a strong secret in env.");
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(userId: string): Promise<string> {
  return await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SEC}s`)
    .sign(getSecret());
}

export async function verifySession(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

function parseCookies(header?: string): Record<string, string> {
  if (!header) return {};
  const out: Record<string, string> = {};
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k) out[k] = decodeURIComponent(rest.join("="));
  }
  return out;
}

export function readSessionCookie(req: VercelRequest): string | undefined {
  return parseCookies(req.headers.cookie)[COOKIE_NAME];
}

export function setSessionCookie(res: VercelResponse, token: string) {
  const parts = [
    `${COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_TTL_SEC}`,
  ];
  if (process.env.VERCEL_ENV === "production") parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

export function clearSessionCookie(res: VercelResponse) {
  const parts = [
    `${COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
  ];
  if (process.env.VERCEL_ENV === "production") parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

export async function getCurrentUser(req: VercelRequest): Promise<SafeUser | null> {
  const token = readSessionCookie(req);
  if (!token) return null;
  const userId = await verifySession(token);
  if (!userId) return null;
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user) return null;
  const { password: _pw, ...safe } = user;
  return safe;
}

export async function requireUser(req: VercelRequest, res: VercelResponse): Promise<SafeUser | null> {
  const user = await getCurrentUser(req);
  if (!user) {
    res.status(401).json({ message: "Authentication required" });
    return null;
  }
  return user;
}

export function methodNotAllowed(res: VercelResponse, allowed: string[]) {
  res.setHeader("Allow", allowed.join(", "));
  res.status(405).json({ message: "Method not allowed" });
}
