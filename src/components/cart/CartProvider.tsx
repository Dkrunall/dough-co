"use client";

import { createContext, useCallback, useContext, useEffect, useState, useTransition } from "react";
import { addToCart, loadCart, updateLineQuantity } from "@/app/actions/cart";
import type { Cart } from "@/lib/shopify";

type CartContextValue = {
  /** False until Shopify env vars are set; the cart UI then explains that ordering is offline. */
  enabled: boolean;
  cart: Cart | null;
  isOpen: boolean;
  pending: boolean;
  error: string | null;
  open: () => void;
  close: () => void;
  add: (variantId: string, quantity: number) => Promise<boolean>;
  update: (lineId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export default function CartProvider({ enabled, children }: { enabled: boolean; children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!enabled) return;
    loadCart()
      .then(setCart)
      .catch(() => setCart(null));
  }, [enabled]);

  const add = useCallback(async (variantId: string, quantity: number) => {
    setError(null);
    try {
      setCart(await addToCart(variantId, quantity));
      setOpen(true);
      return true;
    } catch {
      setError("Sorry, we couldn't add that to your cart. Please try again.");
      return false;
    }
  }, []);

  const update = useCallback((lineId: string, quantity: number) => {
    setError(null);
    startTransition(async () => {
      try {
        setCart(await updateLineQuantity(lineId, quantity));
      } catch {
        setError("Sorry, we couldn't update your cart. Please try again.");
      }
    });
  }, []);

  return (
    <CartContext.Provider
      value={{
        enabled,
        cart,
        isOpen,
        pending,
        error,
        open,
        close,
        add,
        update,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
