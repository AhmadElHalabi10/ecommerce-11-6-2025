// scripts/promote-user.ts
import { db } from "@/app/lib/db";
import { users } from "@/app/lib/schema";
import { eq } from "drizzle-orm";

const email = process.argv[2];

if (!email) {
  console.error("❌ Please provide an email: npm run promote-user <email>");
  process.exit(1);
}

async function promoteToAdmin(userEmail: string) {
  try {
    const result = await db
      .update(users)
      .set({ role: "admin" })
      .where(eq(users.email, userEmail))
      .returning();

    if (result.length === 0) {
      console.log("❌ No user found with that email:", userEmail);
    } else {
      console.log("✅ User promoted to admin:", result[0]);
    }
  } catch (error) {
    console.error("❌ Error promoting user:", error);
  } finally {
    process.exit(0);
  }
}

promoteToAdmin(email);
