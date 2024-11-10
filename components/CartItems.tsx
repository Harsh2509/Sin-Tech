"use client";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { IProduct } from "../lib/products";
import { useEffect, useState } from "react";
import useStore from "@/lib/store";
import { LoadingSpinner } from "./LoadingSpinner";

export function CartItems({
  cart,
}: {
  cart: (IProduct & { quantity: number })[];
}) {
  const setQuantity = useStore((state) => state.setQuantity);
  const items = useStore((state) => state.cartItems);
  const addItems = useStore((state) => state.addItems);
  const deleteItem = useStore((state) => state.deleteItem);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (cart.length > 0) addItems(cart);
    setIsLoading(false);
  }, [cart]);

  console.log(isLoading);

  if (isLoading)
    return (
      <LoadingSpinner className="w-screen h-[80vh] flex justify-center items-center" />
    );

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6">
        Your Cart
      </h1>
      <ul className="space-y-4 md:space-y-6">
        {items.map((item) => (
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

              <div className="flex md:flex-col md:justify-center gap-7 md:gap-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setQuantity(item.id, item.quantity - 1);
                    }}
                    className="bg-gray-200 p-1 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="px-3 min-w-11 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => {
                      setQuantity(item.id, item.quantity + 1);
                    }}
                    className="bg-gray-200 p-1 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                {/* Delete Button */}
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-white bg-red-400 hover:bg-red-600 p-1 rounded-xl transition-colors self-center  md:mx-8"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <SaveButton className="my-10" items={items} />
    </div>
  );
}

function SaveButton({
  className,
  items,
}: {
  className: string;
  items: (IProduct & {
    quantity: number;
  })[];
}) {
  async function onClickHandler() {}

  return (
    <div className={className}>
      <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear">
        Save Changes
      </button>
    </div>
  );
}