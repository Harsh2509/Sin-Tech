import { IProduct } from "@/lib/products";
import axios from "axios";
import { auth } from "@/auth";
import Link from "next/link";

export default async function ProductCard({ product }: { product: IProduct }) {
  const session = await auth();

  return (
    <div className="max-w-xs sm:max-w-sm lg:max-w-md mx-auto my-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all hover:shadow-lg">
        {product && (
          <>
            <img
              className="w-full h-48 sm:h-64 md:h-72 object-contain"
              src={product.image}
              alt={product.name}
            />
            <div className="p-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                {product.shortDescription}
              </p>

              <p className="text-sm text-gray-600">
                Category: {product.category}
              </p>

              <div className="flex items-center mt-2">
                <span className="text-yellow-500 flex">
                  {Array(Math.round(product.rating.rate))
                    .fill("")
                    .map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-4 w-4 md:h-5 md:w-5"
                      >
                        <path d="M12 .587l3.668 7.431 8.199 1.191-5.938 5.788 1.4 8.167-7.329-3.85-7.329 3.85 1.4-8.167L.133 9.209l8.199-1.191z" />
                      </svg>
                    ))}
                </span>
                <span className="text-gray-600 ml-2 text-xs md:text-sm">
                  ({product.rating.count} reviews)
                </span>
              </div>

              <div className="mt-4 flex justify-center md:justify-start">
                <Link
                  href={`/product/${product.id}`}
                  className="bg-green-600 text-white px-6 py-2 rounded-md text-sm md:text-base cursor-pointer hover:bg-green-500 transition-all focus:outline-none focus:ring focus:ring-green-400"
                >
                  See more
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
