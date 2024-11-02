import { create } from "zustand";
import { IProduct } from "./products";

type state = {
  cartItems: (IProduct & { quantity: number })[];
};

type actions = {
  setQuantity: (qty: number, productId: number) => void;
  addItems: (product: (IProduct & { quantity: number })[]) => void;
};

const useStore = create<state & actions>((set) => ({
  cartItems: [],
  setQuantity: (qty: number, productId: number) =>
    set((state) => {
      if (qty <= 0) {
        return {
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        };
      }
      const updatedCartItems = state.cartItems.map((item) => {
        return item.id === productId ? { ...item, quantity: qty } : item;
      });
      state.cartItems = updatedCartItems;
      return state;
    }),
  addItems: (products) => {
    set((state) => {
      state.cartItems = products;
      return state;
    });
  },
}));

export default useStore;
