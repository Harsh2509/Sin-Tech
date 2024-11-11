export const runtime = "edge";

import { createDb } from "@/db";
import { carts, users } from "@/db/schema";
import { Products } from "@/lib/products";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { z } from "zod";

const postBodySchema = z.object({
  email: z.string().email(),
  productId: z.number(),
});

const putBodySchema = z.object({
  email: z.string().email(),
  items: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number(),
    })
  ),
});

// Add to cart is handeled by this route.
export async function POST(req: NextRequest) {
  const DB = getRequestContext().env.DB;
  const db = createDb(DB);
  const products = Products.getInstance();
  const maxId = products.all().length;
  try {
    const body = await req.json();
    const { email, productId } = postBodySchema.parse(body);
    if (productId > maxId) {
      throw new Error("Invalid product ID");
    }
    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (user.length === 0) {
      return new Response("User not found", { status: 404 });
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

// This route checks if an item is already present in user's cart or not.
export async function GET(req: NextRequest) {
  const DB = getRequestContext().env.DB;
  const db = createDb(DB);
  const products = Products.getInstance();
  const maxId = products.all().length;
  try {
    // fetch email and productId from params
    const params = {
      email: req.nextUrl.searchParams.get("email"),
      productId: parseInt(req.nextUrl.searchParams.get("productId") as string),
    };
    const { email, productId } = postBodySchema.parse(params);
    if (productId > maxId) {
      throw new Error("Invalid product ID");
    }
    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (user.length === 0) {
      return new Response(JSON.stringify({ found: false }));
    }
    const userId = user[0].id;
    const cart = await db
      .select()
      .from(carts)
      .where(and(eq(carts.userId, userId), eq(carts.productId, productId)))
      .limit(1);
    if (cart.length === 0) {
      return new Response(JSON.stringify({ found: false }));
    }
    return new Response(JSON.stringify({ found: true }));
  } catch (e: unknown) {
    console.error(e);
    return new Response(
      "Error occuring at API endpoint: " + JSON.stringify(e),
      { status: 400 }
    );
  }
}

// This route gets all the items from the cart and updates the quantity of each item.
export async function PUT(req: NextRequest) {
  const DB = getRequestContext().env.DB;
  const db = createDb(DB);
  const products = Products.getInstance();
  const maxId = products.all().length;
  try {
    const body = await req.json();
    const { email, items } = putBodySchema.parse(body);
    for (const { productId, quantity } of items) {
      if (productId > maxId) {
        throw new Error("Invalid product ID");
      }
      const user = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      if (user.length === 0) {
        return new Response("User not found", { status: 404 });
      }
      const userId = user[0].id;
      await db
        .update(carts)
        .set({ quantity })
        .where(and(eq(carts.userId, userId), eq(carts.productId, productId)));
    }
    return new Response(JSON.stringify(body));
  } catch (e: unknown) {
    console.error(e);
    return new Response(
      "Error occuring at API endpoint: " + JSON.stringify(e),
      { status: 400 }
    );
  }
}
