"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function AddToCart() {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
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
          onClick={() => setQty((q) => q + 1)}
          className="flex h-full w-11 items-center justify-center hover:text-accent"
        >
          <Plus className="size-3.5" strokeWidth={1.4} />
        </button>
      </div>
      <button
        onClick={() => setAdded(true)}
        className="h-12 flex-1 bg-cocoa px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-background transition-colors hover:bg-foreground/85"
      >
        {added ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}
