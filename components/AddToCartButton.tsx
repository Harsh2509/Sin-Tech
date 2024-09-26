"use client";

import { useEffect, useState } from "react";

export function AddToCartButton() {
  const [isAdded, setIsAdded] = useState<boolean>(true);
  useEffect(() => {});

  return (
    <button
      className={`mt-6 bg-blue-600 text-white px-4 py-2 rounded-md`}
    >
      Add to Cart
    </button>
  );
}
