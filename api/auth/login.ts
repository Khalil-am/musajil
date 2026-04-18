import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../../lib/db.js";
import { users, loginSchema } from "../../shared/schema.js";
import { methodNotAllowed, setSessionCookie, signSession } from "../../lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.errors[0].message });
  }

  const email = parsed.data.email.toLowerCase().trim();
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (!user) return res.status(401).json({ message: "Invalid email or password" });

  const ok = await bcrypt.compare(parsed.data.password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid email or password" });

  const token = await signSession(user.id);
  setSessionCookie(res, token);
  const { password: _pw, ...safe } = user;
  return res.json(safe);
}
