import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { categories } from "@/app/lib/schema";

// GET: Fetch all categories
export async function GET() {
  const allCategories = await db.select().from(categories);
  return NextResponse.json(allCategories);
}

// POST: Add a new category
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name } = body;
  if (!name) {
    return NextResponse.json({ error: "Category name is required" }, { status: 400 });
  }
  const [newCategory] = await db
    .insert(categories)
    .values({ name })
    .returning();
  return NextResponse.json(newCategory);
} 