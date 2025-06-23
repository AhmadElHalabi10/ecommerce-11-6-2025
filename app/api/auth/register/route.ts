import { db } from "@/app/lib/db";
import { users } from "@/app/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already in use" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: "user", // default role
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Register Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
