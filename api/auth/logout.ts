import type { VercelRequest, VercelResponse } from "@vercel/node";
import { clearSessionCookie, methodNotAllowed } from "../../lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);
  clearSessionCookie(res);
  return res.json({ message: "Logged out" });
}
