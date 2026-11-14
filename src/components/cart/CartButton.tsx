"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";

export default function CartButton() {
  const { cart, open } = useCart();
  const count = cart?.totalQuantity ?? 0;

  return (
    <button
      onClick={open}
      aria-label={count ? `Cart, ${count} items` : "Cart"}
      className="relative transition-colors hover:text-accent"
    >
      <ShoppingBag className="size-[18px] md:size-5" strokeWidth={1.4} />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-cocoa text-[9px] text-background">
          {count}
        </span>
      )}
    </button>
  );
}
