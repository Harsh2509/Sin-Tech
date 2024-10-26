"use client";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { IProduct } from "../lib/products";

export function CartItem({
  cart,
}: {
  cart: (IProduct & { quantity: number })[];
}) {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6">
        Your Cart
      </h1>
      <ul className="space-y-4 md:space-y-6">
        {cart.map((item) => (
          <li
            key={item.id}
            className="bg-white rounded-lg shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.alt}
              className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md"
            />
            {/* Product Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-lg md:text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600 text-sm md:text-base">
                {item.shortDescription}
              </p>
              <div className="mt-2 flex justify-center md:justify-start items-center space-x-2 text-yellow-500">
                <span className="font-bold">{item.rating.rate}</span>
                <span className="text-gray-500 text-sm">
                  ({item.rating.count} reviews)
                </span>
              </div>
            </div>
            {/* Price and Quantity Controls */}
            <div className="flex flex-col items-center md:items-end space-y-2">
              <span className="text-lg md:text-xl font-medium text-gray-800">
                ₹{item.price.toFixed(2)}
              </span>

              <div className="flex md:block gap-7 ">
                <div className="flex items-center space-x-2">
                  <button
                    // onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 p-1 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    // onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 p-1 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                {/* Delete Button */}
                <button
                  // onClick={() => removeFromCart(item.id)}
                  className="text-white bg-red-400 hover:bg-red-600 p-1 rounded-xl my-1 transition-colors self-center md:self-auto md:mx-8"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
