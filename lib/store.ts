import { create } from "zustand";

type state = {
  cartItems: { productId: number; quantity: number }[];
};

type actions = {
  setQuantity: (qty: number, productId: number) => void;
};

const useStore = create<state & actions>((set) => ({
  cartItems: [],
  setQuantity: (qty: number, productId: number) =>
    set((state) => {
      const product = state.cartItems.find((p) => p.productId === productId);
      if (product !== undefined) {
        product.quantity = qty;
      }
      return state;
    }),
}));

export default useStore;
