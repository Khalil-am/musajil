import type { VercelRequest, VercelResponse } from "@vercel/node";
import { and, asc, eq, sql } from "drizzle-orm";
import { db } from "../../../../lib/db.js";
import { events, registrations, registrationSchema } from "../../../../shared/schema.js";
import { methodNotAllowed, getCurrentUser } from "../../../../lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = String(req.query.id || "");
  if (!id) return res.status(400).json({ message: "Missing event id" });

  const [event] = await db.select().from(events).where(eq(events.id, id)).limit(1);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (req.method === "GET") {
    const user = await getCurrentUser(req);
    if (!user || user.id !== event.ownerId) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const rows = await db
      .select()
      .from(registrations)
      .where(eq(registrations.eventId, id))
      .orderBy(asc(registrations.createdAt));
    return res.json(rows);
  }

  if (req.method === "POST") {
    const parsed = registrationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const email = parsed.data.email.toLowerCase().trim();

    const [{ count }] = await db
      .select({ count: sql<number>`count(${registrations.id})::int` })
      .from(registrations)
      .where(eq(registrations.eventId, id));
    if (count >= event.capacity) {
      return res.status(409).json({ message: "This event is fully booked" });
    }

    const [dup] = await db
      .select()
      .from(registrations)
      .where(and(eq(registrations.eventId, id), eq(registrations.email, email)))
      .limit(1);
    if (dup) return res.status(409).json({ message: "This email is already registered for the event" });

    try {
      const [created] = await db
        .insert(registrations)
        .values({
          eventId: id,
          name: parsed.data.name,
          email,
          phone: parsed.data.phone ?? null,
        })
        .returning();
      return res.status(201).json(created);
    } catch (err: any) {
      if (err?.code === "23505") {
        return res.status(409).json({ message: "This email is already registered for the event" });
      }
      throw err;
    }
  }

  return methodNotAllowed(res, ["GET", "POST"]);
}
