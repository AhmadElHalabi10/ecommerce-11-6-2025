import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { products } from "@/app/lib/schema";
import { eq } from "drizzle-orm";

// ✅ GET: Fetch all products
export async function GET(req: NextRequest) {
  const allProducts = await db.select().from(products);
  return NextResponse.json(allProducts);
}

// ✅ POST: Add a new product
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, category, price, stock, status, discount, description, image } = body;

  if (!name || !category || price == null || stock == null || !status || !image) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const [newProduct] = await db
    .insert(products)
    .values({ name, category, price, stock, status, discount, description, image })
    .returning();

  return NextResponse.json(newProduct);
}

// ✅ DELETE: Delete a product by id
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    await db.delete(products).where(eq(products.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
  