export const runtime = "edge";
import { auth, signIn } from "@/auth";
import { CartItems } from "@/components/CartItems";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { createDb } from "@/db";
import { carts, users } from "@/db/schema";
import { Products } from "@/lib/products";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { eq } from "drizzle-orm";
import { Divide, ShoppingBagIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";

export default async function CartPage() {
  const DB = getRequestContext().env.DB;
  const db = createDb(DB);
  const session = await auth();
  const products = Products.getInstance();

  // Redirect to sign-in if no session
  if (!session) {
    return <SignInMessage message="Access the cart by signing in." />;
  }

  // Ensure email exists before proceeding
  const email = session?.user?.email;
  const name = session?.user?.name;
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
      return (
        <SignInMessage message="User not found. Please Signup to proceed." />
      );
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

    const productz = cart.map((item) => {
      const product = products.find(item.productId);
      return { ...product, quantity: item.quantity as number };
    });

    if (!cart.length) {
      return <EmptyCartMessage />;
    }
    return <CartItems cart={productz} email={email} name={name || "unknown"} />;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return <div>Failed to load cart data. Please try again later.</div>;
  }
}

function EmptyCartMessage() {
  return (
    <div className="h-[88vh] w-screen flex justify-center items-center flex-col">
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

function SignInMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-[88vh] w-full bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>
        <p className="text-gray-600 text-center mb-4">{message}</p>
        <form
          method="post"
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 flex justify-center items-center gap-3 md:gap-6"
          >
            <BsGoogle />
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}
