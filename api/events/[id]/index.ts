import type { VercelRequest, VercelResponse } from "@vercel/node";
import { and, eq, sql } from "drizzle-orm";
import { db } from "../../../lib/db.js";
import { events, registrations, eventSchema } from "../../../shared/schema.js";
import { methodNotAllowed, requireUser } from "../../../lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const user = await requireUser(req, res);
  if (!user) return;

  const id = String(req.query.id || "");
  if (!id) return res.status(400).json({ message: "Missing event id" });

  const [owned] = await db
    .select()
    .from(events)
    .where(and(eq(events.id, id), eq(events.ownerId, user.id)))
    .limit(1);
  if (!owned) return res.status(404).json({ message: "Event not found" });

  if (req.method === "GET") {
    const [counts] = await db
      .select({
        registered: sql<number>`count(${registrations.id})::int`,
        checkedIn: sql<number>`count(${registrations.id}) filter (where ${registrations.checkedIn} = true)::int`,
      })
      .from(registrations)
      .where(eq(registrations.eventId, id));
    return res.json({ ...owned, registered: counts?.registered ?? 0, checkedIn: counts?.checkedIn ?? 0 });
  }

  if (req.method === "PATCH" || req.method === "PUT") {
    const parsed = eventSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const d = parsed.data;
    const [updated] = await db
      .update(events)
      .set({
        ...(d.name !== undefined && { name: d.name }),
        ...(d.description !== undefined && { description: d.description ?? null }),
        ...(d.location !== undefined && { location: d.location ?? null }),
        ...(d.startAt !== undefined && { startAt: new Date(d.startAt) }),
        ...(d.endAt !== undefined && { endAt: d.endAt ? new Date(d.endAt) : null }),
        ...(d.capacity !== undefined && { capacity: d.capacity }),
        ...(d.status !== undefined && { status: d.status }),
      })
      .where(eq(events.id, id))
      .returning();
    return res.json(updated);
  }

  if (req.method === "DELETE") {
    await db.delete(events).where(eq(events.id, id));
    return res.status(204).end();
  }

  return methodNotAllowed(res, ["GET", "PATCH", "DELETE"]);
}
