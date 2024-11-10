"use client";
import { create } from "zustand";
import { IProduct } from "./products";

type state = {
  cartItems: (IProduct & { quantity: number })[];
};

type actions = {
  setQuantity: (productId: number, quantity: number) => void;
  addItems: (product: (IProduct & { quantity: number })[]) => void;
  deleteItem: (productId: number) => void;
};

const useStore = create<state & actions>((set) => ({
  cartItems: [],

  setQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return state;
      }
      // Map through items and update quantity for the matching product
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );

      // Return a new state object with updated cartItems
      return {
        cartItems: updatedCartItems,
      };
    }),

  addItems: (products) => {
    set((state) => ({
      cartItems: [
        ...state.cartItems,
        ...products.filter(
          (product) => !state.cartItems.some((item) => item.id === product.id)
        ),
      ],
    }));
  },

  deleteItem: (productId) => {
    set((state) => {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== productId
      );
      return {
        cartItems: updatedCartItems,
      };
    });
  },
}));

export default useStore;
