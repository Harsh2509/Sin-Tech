"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "./Spinner";

export function AddToCartButton({
  email,
  productId,
}: {
  email: string;
  productId: number;
}) {
  const [isAdded, setIsAdded] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    axios
      .get("/api/cart", {
        params: {
          email,
          productId,
        },
      })
      .then((res) => {
        setIsAdded(res.data.found);
        setIsLoading(false);
      });
  }, []);

  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    axios.post("/api/cart", { email, productId }).then((res) => {
      if (res.status === 200) {
        setIsAdded(true);
      }
    });
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`relative mt-6 bg-blue-600 text-white px-4 py-2 rounded-md w-full ${
        isAdded ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isAdded}
    >
      {isAdded && !isLoading ? "Added to Cart" : "Add to Cart"}
      {isLoading && <Spinner className="absolute z-10 top-1/3 h-4 w-4" />}
    </button>
  );
}
