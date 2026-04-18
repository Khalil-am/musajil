import type { VercelRequest, VercelResponse } from "@vercel/node";
import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "../../lib/db.js";
import { events, registrations, eventSchema } from "../../shared/schema.js";
import { methodNotAllowed, requireUser } from "../../lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const user = await requireUser(req, res);
  if (!user) return;

  if (req.method === "GET") {
    const rows = await db
      .select({
        event: events,
        registered: sql<number>`count(${registrations.id})::int`,
        checkedIn: sql<number>`count(${registrations.id}) filter (where ${registrations.checkedIn} = true)::int`,
      })
      .from(events)
      .leftJoin(registrations, eq(registrations.eventId, events.id))
      .where(eq(events.ownerId, user.id))
      .groupBy(events.id)
      .orderBy(desc(events.startAt));

    return res.json(rows.map(r => ({ ...r.event, registered: r.registered, checkedIn: r.checkedIn })));
  }

  if (req.method === "POST") {
    const parsed = eventSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const { name, description, location, startAt, endAt, capacity, status } = parsed.data;
    const [created] = await db
      .insert(events)
      .values({
        ownerId: user.id,
        name,
        description: description ?? null,
        location: location ?? null,
        startAt: new Date(startAt),
        endAt: endAt ? new Date(endAt) : null,
        capacity,
        status,
      })
      .returning();
    return res.status(201).json({ ...created, registered: 0, checkedIn: 0 });
  }

  return methodNotAllowed(res, ["GET", "POST"]);
}
