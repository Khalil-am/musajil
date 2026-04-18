import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../../lib/db.js";
import { users, registerSchema } from "../../shared/schema.js";
import { methodNotAllowed, setSessionCookie, signSession } from "../../lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.errors[0].message });
  }

  const { name, email, password, company, role } = parsed.data;
  const normalizedEmail = email.toLowerCase().trim();

  const [existing] = await db.select().from(users).where(eq(users.email, normalizedEmail)).limit(1);
  if (existing) {
    return res.status(409).json({ message: "An account with this email already exists" });
  }

  const hash = await bcrypt.hash(password, 10);
  const [created] = await db
    .insert(users)
    .values({
      email: normalizedEmail,
      password: hash,
      name,
      company: company ?? null,
      role: role ?? null,
    })
    .returning();

  const token = await signSession(created.id);
  setSessionCookie(res, token);
  const { password: _pw, ...safe } = created;
  return res.status(201).json(safe);
}
