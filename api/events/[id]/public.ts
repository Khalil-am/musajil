import type { VercelRequest, VercelResponse } from "@vercel/node";
import { eq, sql } from "drizzle-orm";
import { db } from "../../../lib/db.js";
import { events, registrations } from "../../../shared/schema.js";
import { methodNotAllowed } from "../../../lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);

  const id = String(req.query.id || "");
  if (!id) return res.status(400).json({ message: "Missing event id" });

  const [event] = await db.select().from(events).where(eq(events.id, id)).limit(1);
  if (!event) return res.status(404).json({ message: "Event not found" });

  const [counts] = await db
    .select({ registered: sql<number>`count(${registrations.id})::int` })
    .from(registrations)
    .where(eq(registrations.eventId, id));

  const { ownerId: _owner, ...rest } = event;
  return res.json({
    ...rest,
    registered: counts?.registered ?? 0,
    seatsLeft: Math.max(event.capacity - (counts?.registered ?? 0), 0),
    full: (counts?.registered ?? 0) >= event.capacity,
  });
}
