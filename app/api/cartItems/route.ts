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
  try {
    const params = {
      email: req.nextUrl.searchParams.get("email"),
    };
    const { email } = bodySchema.parse(params);
    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (user.length === 0) {
      return new Response("User not found", { status: 404 });
    }
    const cartItems = await db
      .select({ id: carts.productId, quantity: carts.quantity })
      .from(users)
      .leftJoin(carts, eq(users.id, carts.userId))
      .where(eq(users.email, email));

    const itemsWithQuantity = cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));
    return new Response(JSON.stringify(itemsWithQuantity));
  } catch (e) {
    return new Response(
      "Error occuring at API endpoint: " + JSON.stringify(e),
      { status: 400 }
    );
  }
}
