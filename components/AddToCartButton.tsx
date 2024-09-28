import { db } from "@/db";
import { carts, users } from "@/db/schema";
import { Products } from "@/lib/products";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache"; // To revalidate the page after adding to the cart

interface AddToCartButtonProps {
  email: string;
  productId: number;
}

export async function AddToCartButton({
  email,
  productId,
}: AddToCartButtonProps) {
  // Fetch whether the product is in the cart on the server
  const products = Products.getInstance();
  const maxId = products.all().length;

  if (productId > maxId) {
    throw new Error("Invalid product ID");
  }

  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) {
    throw new Error("User not found");
  }

  const userId = user[0].id;

  const cart = await db
    .select()
    .from(carts)
    .where(and(eq(carts.userId, userId), eq(carts.productId, productId)))
    .limit(1);

  const isAdded = cart.length > 0;

  // Server-side form to add to cart
  async function addToCart(data: FormData) {
    "use server"; // Mark as a server action

    const email = data.get("email") as string;
    const productId = Number(data.get("productId"));

    if (productId > maxId) {
      throw new Error("Invalid product ID");
    }

    await db.insert(carts).values({ userId, productId });

    // Optionally, revalidate the page to reflect the new cart state
    revalidatePath(`/product/${productId}`); // Adjust path based on where you're calling this component
  }

  return (
    <form action={addToCart}>
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="productId" value={productId} />
      <button
        type="submit"
        className={`relative mt-6 bg-blue-600 text-white px-4 py-2 rounded-md w-full ${
          isAdded ? "opacity-70 cursor-not-allowed" : ""
        }`}
        disabled={isAdded}
      >
        {isAdded ? "✔️ Added to Cart" : "Add to Cart"}
      </button>
    </form>
  );
}
