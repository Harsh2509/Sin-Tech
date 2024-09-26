import { auth, signIn } from "@/auth";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Products } from "@/lib/products";
import React, { ReactEventHandler } from "react";

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
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Product Image */}
      <div className="md:w-1/2">
        <img
          src={image}
          alt={alt}
          width={500}
          height={500}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Details */}
      <div className="p-6 md:w-1/2 flex flex-col">
        {/* Category and Rating */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{category}</span>
          <div className="flex items-center">
            <span className="text-yellow-400 text-lg mr-1">&#9733;</span>
            <span className="text-gray-700">{rating.rate} / 5</span>
            <span className="text-gray-500 ml-2">({rating.count} reviews)</span>
          </div>
        </div>

        {/* Product Name */}
        <h1 className="text-2xl font-bold mt-2">{name}</h1>

        {/* Short Description */}
        <p className="text-gray-700 mt-2">{shortDescription}</p>

        {/* Price */}
        <div className="text-3xl font-semibold text-green-600 mt-4">
          ₹{price}
        </div>

        {/* Long Description */}
        <p className="text-gray-600 mt-4">{description}</p>

        {/* Add to Cart Button */}
        {session ? (
          <AddToCartButton
            email={session?.user?.email as string}
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
              className="flex justify-center gap-9 md:gap-6 mt-9 flex-wrap items-center"
            >
              Add to Cart
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
