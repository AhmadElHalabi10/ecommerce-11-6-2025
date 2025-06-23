import { db } from "../app/lib/db";
import { users } from "../app/lib/schema";
import { eq } from "drizzle-orm";

async function checkUser(email: string) {
  try {
    console.log("🔍 Checking for user:", email);
    
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (result.length === 0) {
      console.log("❌ User not found with email:", email);
      console.log("Available users:");
      
      const allUsers = await db.select().from(users);
      allUsers.forEach(user => {
        console.log(`- ${user.email} (ID: ${user.id}, Admin: ${user.isAdmin})`);
      });
    } else {
      console.log("✅ User found:", result[0]);
    }
  } catch (error) {
    console.error("❌ Error checking user:", error);
  }
}

// Get email from command line argument
const email = process.argv[2] || "admin@gmail.com";

checkUser(email).then(() => {
  process.exit(0);
}); 