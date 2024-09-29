"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "./Spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddToCartButton({
  email,
  productId,
}: {
  email: string;
  productId: number;
}) {
  const [isAdded, setIsAdded] = useState<boolean>(false); // Initially false
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initially false

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/cart", {
        params: { email, productId },
      })
      .then((res) => {
        setIsAdded(res.data.found);
      })
      .catch((e) => {
        console.error("Error occurred: ", e);
        setIsAdded(true);
        toast.error(
          "Error occurred while checking cart. Please refresh the page."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [email, productId]);

  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    setIsLoading(true);
    axios
      .post("/api/cart", { email, productId })
      .then((res) => {
        if (res.status === 200) {
          setIsAdded(true);
          toast.success("Added to cart successfully!");
        }
      })
      .catch((e) => {
        toast.error("Failed to add to cart. Please try again.");
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false); // Ensure loading stops after response
      });
  }

  return (
    <>
      <button
        onClick={handleAddToCart}
        className={`relative mt-6 bg-blue-600 text-white px-4 py-2 rounded-md w-full ${
          isAdded ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isAdded || isLoading} // Also disable while loading
      >
        {isLoading ? "Loading..." : isAdded ? "Added to Cart" : "Add to Cart"}
        {isLoading && <Spinner className="absolute z-10 top-1/3 h-4 w-4" />}
      </button>
      <ToastContainer />
    </>
  );
}
