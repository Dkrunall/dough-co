"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice, type Variant } from "@/lib/products";
import { cn } from "@/lib/utils";

type Props = { variants: Variant[]; currency: string; available: boolean };

export default function AddToCart({ variants, currency, available }: Props) {
  const { enabled, add, error } = useCart();
  const [selectedId, setSelectedId] = useState(() => (variants.find((v) => v.available) ?? variants[0])?.id);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  const selected = variants.find((v) => v.id === selectedId);
  const canBuy = enabled && available && Boolean(selected?.available);
  const label = !enabled || !selected
    ? "Ordering Opens Soon"
    : !canBuy
      ? "Sold Out"
      : adding
        ? "Adding…"
        : `Add to Cart · ${formatPrice(selected.price * qty, currency)}`;

  async function onAdd() {
    if (!selected) return;
    setAdding(true);
    if (await add(selected.id, qty)) setQty(1);
    setAdding(false);
  }

  return (
    <div>
      {variants.length > 1 && (
        <fieldset className="mb-6">
          <legend className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em]">Size</legend>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                disabled={!v.available}
                aria-pressed={v.id === selectedId}
                onClick={() => setSelectedId(v.id)}
                className={cn(
                  "border px-4 py-2.5 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                  v.id === selectedId
                    ? "border-cocoa bg-cocoa text-background"
                    : "border-foreground/30 hover:border-foreground",
                )}
              >
                {v.title} · {formatPrice(v.price, currency)}
              </button>
            ))}
          </div>
        </fieldset>
      )}

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
          className="h-12 flex-1 bg-cocoa px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-background transition-colors hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {label}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
    </div>
  );
}
