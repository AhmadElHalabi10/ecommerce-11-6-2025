import "dotenv/config"; // 👈 this must stay at the top
import { db } from "@/app/lib/db";

async function testConnection() {
  try {
    const result = await db.execute("SELECT 1;");
    console.log("✅ Connected to DB:", result);
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
}

testConnection();
