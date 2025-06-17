import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// --- Users Table ---
export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"), // Optional, only used for credentials
});

// --- Accounts Table ---
export const accounts = pgTable("account", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

// --- Sessions Table ---
export const sessions = pgTable("session", {
  id: serial("id").primaryKey(),
  sessionToken: text("sessionToken").notNull().unique(),
  userId: integer("userId").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// --- Verification Tokens Table ---
export const verificationTokens = pgTable("verificationToken", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// --- Optional Relations (not required unless you use drizzle ORM queries manually) ---
export const userRelations = relations(users, ({ one }) => ({
  account: one(accounts, {
    fields: [users.id],
    references: [accounts.userId],
  }),
}));
