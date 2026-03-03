import bcrypt from "bcryptjs";
import type { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import createMemoryStore from "memorystore";
import { storage } from "./storage";
import { loginSchema, registerSchema } from "@shared/schema";

const MemoryStore = createMemoryStore(session);
const SALT_ROUNDS = 10;

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "musajil-session-secret-dev-only",
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  };

  app.use(session(sessionSettings));

  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const result = registerSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: result.error.errors[0].message });
      }

      const { firstName, lastName, email, password, company, role, eventSize, agreedToTerms, marketingOptIn } = result.data;
      const name = `${firstName} ${lastName}`;

      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: "An account with this email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const user = await storage.createUser({
        username: email,
        email,
        name,
        firstName,
        lastName,
        company: company || null,
        role: role || null,
        eventSize: eventSize || null,
        agreedToTerms: agreedToTerms || false,
        marketingOptIn: marketingOptIn || false,
        password: hashedPassword,
      });

      (req.session as any).userId = user.id;

      const { password: _, ...safeUser } = user;
      return res.status(201).json(safeUser);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const result = loginSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: result.error.errors[0].message });
      }

      const { email, password } = result.data;

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      (req.session as any).userId = user.id;

      const { password: _, ...safeUser } = user;
      return res.json(safeUser);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.clearCookie("connect.sid");
      return res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", async (req: Request, res: Response) => {
    const userId = (req.session as any)?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const { password: _, ...safeUser } = user;
    return res.json(safeUser);
  });
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const userId = (req.session as any)?.userId;
  if (!userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
}
