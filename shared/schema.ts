import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, integer, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  company: text("company"),
  role: text("role"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ownerId: varchar("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  location: text("location"),
  startAt: timestamp("start_at").notNull(),
  endAt: timestamp("end_at"),
  capacity: integer("capacity").notNull().default(100),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const registrations = pgTable("registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  checkedIn: boolean("checked_in").notNull().default(false),
  checkedInAt: timestamp("checked_in_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => ({
  eventEmailIdx: uniqueIndex("registrations_event_email_idx").on(t.eventId, t.email),
}));

export const usersRelations = relations(users, ({ many }) => ({
  events: many(events),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  owner: one(users, { fields: [events.ownerId], references: [users.id] }),
  registrations: many(registrations),
}));

export const registrationsRelations = relations(registrations, ({ one }) => ({
  event: one(events, { fields: [registrations.eventId], references: [events.id] }),
}));

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  company: z.string().optional(),
  role: z.string().optional(),
});

export const eventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  description: z.string().optional(),
  location: z.string().optional(),
  startAt: z.string().min(1, "Start date is required"),
  endAt: z.string().optional(),
  capacity: z.coerce.number().int().positive().default(100),
  status: z.enum(["draft", "published", "live", "ended"]).default("draft"),
});

export const registrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

export type User = typeof users.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Registration = typeof registrations.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type EventData = z.infer<typeof eventSchema>;
export type RegistrationData = z.infer<typeof registrationSchema>;

export type SafeUser = Omit<User, "password">;
