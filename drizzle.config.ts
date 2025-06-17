import "dotenv/config";

export default {
  schema: "./app/lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // ✅ FIXED: use `url`, not `connectionString`
  },
} as const;
