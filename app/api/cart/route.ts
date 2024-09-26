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
    const { email, productId } = bodySchema.parse(body);

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
  } catch (e: unknown) {
    return new Response(
      "Error occuring at API endpoint: " + JSON.stringify(e),
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  const products = Products.getInstance();
  const maxId = products.all().length;
  try {
    // fetch email and productId from params
    const params = {
      email: req.nextUrl.searchParams.get("email"),
      productId: parseInt(req.nextUrl.searchParams.get("productId") as string),
    };
    const { email, productId } = bodySchema.parse(params);

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

    const cart = await db
      .select()
      .from(carts)
      .where(eq(carts.userId, userId))
      .limit(1);
    if (cart.length === 0) {
      return new Response(JSON.stringify({ found: false }));
    }
    return new Response(JSON.stringify({ found: true }));
  } catch (e: unknown) {
    return new Response(
      "Error occuring at API endpoint: " + JSON.stringify(e),
      { status: 400 }
    );
  }
}
