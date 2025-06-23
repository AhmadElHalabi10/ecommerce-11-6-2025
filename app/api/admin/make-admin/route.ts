import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/app/lib/db";
import { users } from "@/app/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if current user is admin
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Update user to be admin
    const result = await db
      .update(users)
      .set({ isAdmin: true })
      .where(eq(users.email, email))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User made admin successfully", user: result[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error making user admin:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 