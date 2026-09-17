"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, Flavor, Plan } from "@/lib/catalog";

type CartContextValue = {
  items: CartLine[];
  count: number;
  subtotalCents: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (line: Omit<CartLine, "qty">, qty?: number) => void;
  removeItem: (slug: string, kind: CartLine["kind"]) => void;
  setQty: (slug: string, kind: CartLine["kind"], qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "lacroix-boi-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore corrupted state
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable
    }
  }, [items, hydrated]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const addItem = useCallback((line: Omit<CartLine, "qty">, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.slug === line.slug && p.kind === line.kind);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: Math.min(24, next[idx].qty + qty) };
        return next;
      }
      return [...prev, { ...line, qty }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((slug: string, kind: CartLine["kind"]) => {
    setItems((prev) => prev.filter((p) => !(p.slug === slug && p.kind === kind)));
  }, []);

  const setQty = useCallback((slug: string, kind: CartLine["kind"], qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((p) => !(p.slug === slug && p.kind === kind))
        : prev.map((p) => (p.slug === slug && p.kind === kind ? { ...p, qty: Math.min(24, qty) } : p)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotalCents = items.reduce((n, i) => n + i.qty * i.priceCents, 0);
    return {
      items,
      count,
      subtotalCents,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      setQty,
      clear,
    };
  }, [items, isOpen, openCart, closeCart, addItem, removeItem, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function flavorToLine(flavor: Flavor): Omit<CartLine, "qty"> {
  return {
    slug: flavor.slug,
    name: `${flavor.name} 8-pack`,
    priceCents: flavor.priceCents,
    kind: "flavor",
    colorHex: flavor.colorHex,
  };
}

export function planToLine(plan: Plan): Omit<CartLine, "qty"> {
  return {
    slug: plan.slug,
    name: `${plan.name} · weekly sub`,
    priceCents: plan.priceCents,
    kind: "plan",
    colorHex: "#16122B",
  };
}
