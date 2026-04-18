import type { VercelRequest, VercelResponse } from "@vercel/node";
import { and, eq } from "drizzle-orm";
import { db } from "../../../../lib/db.js";
import { events, registrations } from "../../../../shared/schema.js";
import { methodNotAllowed, requireUser } from "../../../../lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const user = await requireUser(req, res);
  if (!user) return;

  const id = String(req.query.id || "");
  const regId = String(req.query.regId || "");
  if (!id || !regId) return res.status(400).json({ message: "Missing id" });

  const [event] = await db
    .select()
    .from(events)
    .where(and(eq(events.id, id), eq(events.ownerId, user.id)))
    .limit(1);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (req.method === "PATCH") {
    const action = (req.body as any)?.action;
    if (action === "checkin") {
      const [updated] = await db
        .update(registrations)
        .set({ checkedIn: true, checkedInAt: new Date() })
        .where(and(eq(registrations.id, regId), eq(registrations.eventId, id)))
        .returning();
      if (!updated) return res.status(404).json({ message: "Registration not found" });
      return res.json(updated);
    }
    if (action === "undo-checkin") {
      const [updated] = await db
        .update(registrations)
        .set({ checkedIn: false, checkedInAt: null })
        .where(and(eq(registrations.id, regId), eq(registrations.eventId, id)))
        .returning();
      if (!updated) return res.status(404).json({ message: "Registration not found" });
      return res.json(updated);
    }
    return res.status(400).json({ message: "Unknown action" });
  }

  if (req.method === "DELETE") {
    await db
      .delete(registrations)
      .where(and(eq(registrations.id, regId), eq(registrations.eventId, id)));
    return res.status(204).end();
  }

  return methodNotAllowed(res, ["PATCH", "DELETE"]);
}
