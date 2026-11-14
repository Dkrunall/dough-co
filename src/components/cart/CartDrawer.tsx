"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ArrowRight, Minus, Plus, X } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { cn } from "@/lib/utils";
import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const { enabled, cart, isOpen, close, update, pending, error } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const lines = cart?.lines ?? [];

  return (
    <div className={cn("fixed inset-0 z-50", !isOpen && "pointer-events-none")} aria-hidden={!isOpen}>
      <div
        onClick={close}
        className={cn("absolute inset-0 bg-foreground/30 transition-opacity", isOpen ? "opacity-100" : "opacity-0")}
      />
      <aside
        role="dialog"
        aria-label="Your cart"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-surface shadow-xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-6">
          <h2 className="text-2xl">Your Cart</h2>
          <button onClick={close} aria-label="Close cart" className="hover:text-accent">
            <X className="size-5" strokeWidth={1.4} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="font-serif text-2xl text-muted">
              {enabled ? "Your cart is empty." : "Online ordering is coming soon."}
            </p>
            <Link
              href="/shop"
              onClick={close}
              className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] hover:text-accent"
            >
              Continue Shopping <ArrowRight className="size-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        ) : (
          <>
            <ul className={cn("flex-1 divide-y divide-line overflow-y-auto px-6", pending && "opacity-60")}>
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 py-6">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-sand">
                    {line.image && <Image src={line.image} alt={line.title} fill sizes="80px" className="object-cover" />}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <Link href={`/shop/${line.handle}`} onClick={close} className="text-sm leading-snug hover:text-accent">
                      {line.title}
                    </Link>
                    {line.variantTitle && <span className="mt-1 text-xs text-muted">{line.variantTitle}</span>}
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex h-8 items-center border border-foreground/25">
                        <button
                          aria-label="Decrease quantity"
                          disabled={pending}
                          onClick={() => update(line.id, line.quantity - 1)}
                          className="flex h-full w-8 items-center justify-center hover:text-accent"
                        >
                          <Minus className="size-3" strokeWidth={1.4} />
                        </button>
                        <span className="w-6 text-center text-xs">{line.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          disabled={pending || line.quantity >= 99}
                          onClick={() => update(line.id, line.quantity + 1)}
                          className="flex h-full w-8 items-center justify-center hover:text-accent"
                        >
                          <Plus className="size-3" strokeWidth={1.4} />
                        </button>
                      </div>
                      <span className="text-xs tracking-[0.1em]">
                        {formatPrice(line.total.amount, line.total.currencyCode)}
                      </span>
                    </div>
                    <button
                      disabled={pending}
                      onClick={() => update(line.id, 0)}
                      className="mt-2 self-start text-[11px] text-muted underline-offset-4 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-6 py-6">
              {error && <p className="mb-4 text-sm text-red-700">{error}</p>}
              <div className="flex items-center justify-between text-sm">
                <span className="uppercase tracking-[0.18em]">Subtotal</span>
                <span>{cart && formatPrice(cart.subtotal.amount, cart.subtotal.currencyCode)}</span>
              </div>
              <p className="mt-2 text-xs text-muted">Delivery and taxes are calculated at checkout.</p>
              <a
                href={cart?.checkoutUrl}
                className="mt-6 flex h-12 items-center justify-center gap-4 bg-cocoa text-[11px] font-medium uppercase tracking-[0.2em] text-background transition-colors hover:bg-foreground/85"
              >
                Checkout <ArrowRight className="size-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
