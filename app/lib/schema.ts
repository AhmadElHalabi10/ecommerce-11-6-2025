import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// --- Users Table ---
export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: text("role").default("user").notNull(), // "user" or "admin"
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

// --- Products Table ---
export const products = pgTable("product", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: integer("price").notNull(), // price in cents for accuracy
  stock: integer("stock").notNull(),
  status: text("status").notNull(), // 'active' or 'inactive'
  discount: integer("discount"), // discount in percent (0-100)
  description: text("description"),
  image: text("image").notNull(), // product image URL
});

// --- Categories Table ---
export const categories = pgTable("category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

// --- Optional Relations ---
export const userRelations = relations(users, ({ one }) => ({
  account: one(accounts, {
    fields: [users.id],
    references: [accounts.userId],
  }),
}));

export const schema = {
  users,
  accounts,
  sessions,
  verificationTokens,
  products,
  categories,
};
