import { db } from "@/db";
import { carts, users } from "@/db/schema";
import { Products } from "@/lib/products";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { z } from "zod";
export const runtime = "edge";

const bodySchema = z.object({
  email: z.string().email(),
  productId: z.number(),
});

export async function POST(req: NextRequest) {
  const products = Products.getInstance();
  const maxId = products.all().length;
  try {
    const body = await req.json();
    console.log("All good till here");
    const { email, productId } = bodySchema.parse(body);
    console.log("All good till here");

    if (productId > maxId) {
      throw new Error("Invalid product ID");
    }

    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (user.length === 0) {
      return;
    }
    const userId = user[0].id;

    const cart = await db.insert(carts).values({ userId, productId });

    return new Response(JSON.stringify(body));
  } catch (e: any) {
    return new Response(
      "Error occuring at API endpoint: " + JSON.stringify(e),
      { status: 400 }
    );
  }
}
