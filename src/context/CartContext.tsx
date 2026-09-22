"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  id: string;
  slug: string;
  code: string;
  name: string;
  subtitle: string;
  price: number;
  regularPrice: number;
  image: string;
  color?: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  note: string;
  setNote: (note: string) => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string, color?: string) => void;
  updateQuantity: (id: string, color: string | undefined, delta: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function itemKey(id: string, color?: string) {
  return `${id}::${color ?? "default"}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("danyal-cart");
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("danyal-cart", JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((prev) => {
        const key = itemKey(item.id, item.color);
        const existing = prev.find((i) => itemKey(i.id, i.color) === key);
        if (existing) {
          return prev.map((i) =>
            itemKey(i.id, i.color) === key
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { ...item, quantity }];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((id: string, color?: string) => {
    setItems((prev) =>
      prev.filter((i) => itemKey(i.id, i.color) !== itemKey(id, color))
    );
  }, []);

  const updateQuantity = useCallback(
    (id: string, color: string | undefined, delta: number) => {
      setItems((prev) =>
        prev.map((i) =>
          itemKey(i.id, i.color) === itemKey(id, color)
            ? { ...i, quantity: Math.max(1, i.quantity + delta) }
            : i
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setNote("");
  }, []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((n, i) => n + i.price * i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      isOpen,
      note,
      setNote,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
    }),
    [items, count, subtotal, isOpen, note, setNote, addItem, removeItem, updateQuantity, clearCart, openCart, closeCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}