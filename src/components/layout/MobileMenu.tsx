"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, Search, User, X } from "lucide-react";
import { CATEGORIES, MORE_CATEGORIES } from "@/lib/products";
import { cn } from "@/lib/utils";

type Props = {
  nav: { href: string; label: string }[];
  /** Own /account page, Shopify's hosted account, or null when accounts are off. */
  accountHref: string | null;
};

/** Phone-only menu: a button in the header that opens a slide-in panel from the left. */
export default function MobileMenu({ nav, accountHref }: Props) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const categories = [...CATEGORIES, ...MORE_CATEGORIES];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="-ml-1 p-1 transition-colors hover:text-accent md:hidden"
      >
        <Menu className="size-[22px]" strokeWidth={1.4} />
      </button>

      <div className={cn("fixed inset-0 z-50 md:hidden", !open && "pointer-events-none")} aria-hidden={!open}>
        <div
          onClick={close}
          className={cn("absolute inset-0 bg-foreground/30 transition-opacity", open ? "opacity-100" : "opacity-0")}
        />
        <nav
          aria-label="Menu"
          className={cn(
            "absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-background shadow-xl transition-transform duration-300",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Link href="/" onClick={close} aria-label="Dough & Co. home">
              <Image src="/assets/images/logo-brown.png" alt="Dough & Co." width={1011} height={874} className="h-12 w-auto" />
            </Link>
            <button onClick={close} aria-label="Close menu" className="p-1 hover:text-accent">
              <X className="size-5" strokeWidth={1.4} />
            </button>
          </div>

          <ul className="px-5 pt-6">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex items-center justify-between py-4 font-serif text-[28px] leading-none hover:text-accent"
                >
                  {item.label}
                  <ArrowRight className="size-4" strokeWidth={1.3} />
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-5 pt-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted">Shop the menu</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/shop?category=${c.slug}`}
                    onClick={close}
                    className="text-[12px] uppercase tracking-[0.15em] hover:text-accent"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto space-y-4 border-t border-line px-5 py-6 text-[11px] font-medium uppercase tracking-[0.2em]">
            <Link href="/search" onClick={close} className="flex items-center gap-3 hover:text-accent">
              <Search className="size-4" strokeWidth={1.4} /> Search
            </Link>
            {accountHref && (
              <a href={accountHref} onClick={close} className="flex items-center gap-3 hover:text-accent">
                <User className="size-4" strokeWidth={1.4} /> My Account
              </a>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
