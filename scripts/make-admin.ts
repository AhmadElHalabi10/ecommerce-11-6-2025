import { db } from "../app/lib/db";
import { users } from "../app/lib/schema";
import { eq } from "drizzle-orm";

// Change this to the email you want to promote
const email = "ali@gmail.com";

async function makeAdmin(email: string) {
  try {
    const result = await db
      .update(users)
      .set({ role: "admin" }) // ✅ updated field
      .where(eq(users.email, email))
      .returning();

    if (result.length === 0) {
      console.log("❌ User not found with email:", email);
      return;
    }

    console.log("✅ User made admin successfully:", result[0]);
  } catch (error) {
    console.error("❌ Error making user admin:", error);
  }
}

makeAdmin(email).then(() => {
  process.exit(0);
});
