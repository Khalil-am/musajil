import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  company: text("company"),
  role: text("role"),
  eventSize: text("event_size"),
  agreedToTerms: boolean("agreed_to_terms").default(false),
  marketingOptIn: boolean("marketing_opt_in").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
  firstName: true,
  lastName: true,
  company: true,
  role: true,
  eventSize: true,
  agreedToTerms: true,
  marketingOptIn: true,
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.string().min(1, "Please select your role"),
  eventSize: z.string().optional(),
  agreedToTerms: z.literal(true, { errorMap: () => ({ message: "You must agree to the Terms of Service and Privacy Policy" }) }),
  marketingOptIn: z.boolean().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
