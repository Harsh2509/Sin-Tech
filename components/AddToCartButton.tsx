"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

export function AddToCartButton({
  email,
  productId,
}: {
  email: string;
  productId: number;
}) {
  const [isAdded, setIsAdded] = useState<boolean>(true);
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
      className={`mt-6 bg-blue-600 text-white px-4 py-2 rounded-md ${
        isAdded ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isAdded}
    >
      {isAdded ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
