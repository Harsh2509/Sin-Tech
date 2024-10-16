export const runtime = "edge";

import { createDb } from "@/db";
import { carts, users } from "@/db/schema";
import { Products } from "@/lib/products";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
});

export async function GET(req: NextRequest) {
  const DB = getRequestContext().env.DB;
  const db = createDb(DB);
  const products = Products.getInstance();
  const maxId = products.all().length;
  try {
    const params = {
      email: req.nextUrl.searchParams.get("email"),
    };
    const { email } = bodySchema.parse(params);
    const cartItems = await db
      .select({ id: carts.productId })
      .from(users)
      .leftJoin(carts, eq(users.id, carts.userId))
      .where(eq(users.email, email));

    const cartItemIds = cartItems.map((item) => item.id);
    return new Response(JSON.stringify(cartItemIds));
  } catch (e) {
    return new Response(
      "Error occuring at API endpoint: " + JSON.stringify(e),
      { status: 400 }
    );
  }
}
