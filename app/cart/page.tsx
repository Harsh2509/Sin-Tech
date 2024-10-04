import { auth, signIn } from "@/auth";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { db } from "@/db";
import { carts, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Divide } from "lucide-react";
import Link from "next/link";
export const runtime = "edge";

export default async function CartPage() {
  const session = await auth();

  // Redirect to sign-in if no session
  if (!session) {
    return (
      <div className="flex items-center justify-center h-[80vh] w-full bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
          <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>
          <p className="text-gray-600 text-center mb-4">
            Access the cart by signing in.
          </p>
          <form method="post">
            <button
              onClick={async (e) => {
                e.preventDefault();
                await signIn("google");
              }}
              type="submit"
              className="w-full py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Ensure email exists before proceeding
  const email = session?.user?.email;
  if (!email) {
    return <div>Error: No email found.</div>;
  }

  try {
    // Fetch user data
    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user.length) {
      return <div>User not found.</div>;
    }

    // Fetch cart data
    const cart = await db
      .select({
        id: carts.id,
        quantity: carts.quantity,
        productId: carts.productId,
      })
      .from(carts)
      .where(eq(carts.userId, user[0].id));

    if (!cart.length) {
      return (
        <div className="h-[70vh] w-screen flex justify-center items-center flex-col">
          <div className="container mx-auto p-6">
            <div className="flex items-center justify-center">
              <Divide size={48} />
            </div>
            <p className="text-center mt-6">
              Your cart is empty. Add some products to get started!
            </p>
          </div>
          <RainbowButton>
            <Link href="/products">Add a few products</Link>
          </RainbowButton>
        </div>
      );
    }
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl mb-6">Your Cart</h1>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="mb-4">
              <div className="flex items-center justify-between">
                <span>Product ID: {item.productId}</span>
                <span>Quantity: {item.quantity}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return <div>Failed to load cart data. Please try again later.</div>;
  }
}
