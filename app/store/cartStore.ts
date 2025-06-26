import { create } from "zustand";

type CartItem = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  totalCount: number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (item) => {
    const existing = get().items.find((i) => i.id === item.id);

    if (existing) {
      set({
        items: get().items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({
        items: [...get().items, { ...item, quantity: 1 }],
      });
    }
  },
  removeFromCart: (id) => {
    set({
      items: get().items.filter((item) => item.id !== id),
    });
  },
  clearCart: () => set({ items: [] }),
  get totalCount() {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
