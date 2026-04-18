import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getCurrentUser, methodNotAllowed } from "../../lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ message: "Not authenticated" });
  return res.json(user);
}
