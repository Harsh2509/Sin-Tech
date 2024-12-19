import { auth, signIn } from "@/auth";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Products } from "@/lib/products";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Link from "next/link";

export const runtime = "edge";

export default async function Page({ params }: { params: { id: string } }) {
  const products = Products.getInstance();
  const {
    id,
    name,
    price,
    shortDescription,
    description,
    category,
    image,
    alt,
    rating,
  } = products.find(parseInt(params.id));
  const session = await auth();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/products"
        className="underline text-l md:text-xl hover:text-zinc-700 md:mb-4"
      >
        {"<- "} Go Back{" "}
      </Link>
      <Card className="bg-white">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Image Section */}
            <div className="relative h-96 lg:h-full overflow-hidden rounded-t-lg lg:rounded-l-lg lg:rounded-t-none">
              <div className="absolute inset-0">
                <img
                  src={image}
                  alt={alt}
                  className="w-full h-full object-contain bg-gray-50"
                />
              </div>
            </div>

            {/* Product Details Section */}
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {category}
                </span>
                <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-gray-700 font-medium">
                    {rating.rate}
                  </span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-gray-500">5</span>
                  <span className="text-gray-400 ml-2">({rating.count})</span>
                </div>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                {name}
              </h1>

              <p className="text-gray-600 mb-4 text-lg">{shortDescription}</p>

              <div className="text-3xl font-bold text-green-600 mb-4">
                ₹{price.toLocaleString()}
              </div>

              <div className="bg-gray-50 rounded-lg p-2 mb-6 -mx-6">
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>

              <div className="mt-auto">
                {session ? (
                  <AddToCartButton
                    email={session.user?.email as string}
                    productId={id}
                  />
                ) : (
                  <form
                    action={async () => {
                      "use server";
                      await signIn("google");
                    }}
                  >
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                    >
                      Sign in to Add to Cart
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
