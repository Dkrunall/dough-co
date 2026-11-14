"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

export default function AddToCart({ variantId, available }: { variantId?: string; available: boolean }) {
  const { enabled, add, error } = useCart();
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  const canBuy = enabled && Boolean(variantId) && available;
  const label = !enabled || !variantId ? "Ordering Opens Soon" : !available ? "Sold Out" : adding ? "Adding…" : "Add to Cart";

  async function onAdd() {
    if (!variantId) return;
    setAdding(true);
    if (await add(variantId, qty)) setQty(1);
    setAdding(false);
  }

  return (
    <div>
      <div className="flex gap-4">
        <div className="flex h-12 items-center border border-foreground/30">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-full w-11 items-center justify-center hover:text-accent"
          >
            <Minus className="size-3.5" strokeWidth={1.4} />
          </button>
          <span className="w-8 text-center text-sm">{qty}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="flex h-full w-11 items-center justify-center hover:text-accent"
          >
            <Plus className="size-3.5" strokeWidth={1.4} />
          </button>
        </div>
        <button
          onClick={onAdd}
          disabled={!canBuy || adding}
          className="h-12 flex-1 bg-cocoa px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-background transition-colors hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {label}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
    </div>
  );
}
