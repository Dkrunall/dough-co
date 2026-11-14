import Image from "next/image";
import Link from "next/link";
import { Search, User } from "lucide-react";
import CartButton from "@/components/cart/CartButton";
import { isCustomerAccountConfigured } from "@/lib/customer-account";
import { accountUrl } from "@/lib/shopify";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/gifts", label: "Gifts" },
  { href: "/our-story", label: "Our Story" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-background/95 backdrop-blur">
      <div className="page-container grid h-20 grid-cols-[1fr_auto_1fr] items-center md:h-24">
        <nav className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.18em] md:gap-12 md:text-[11px]">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap transition-colors hover:text-accent">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/" aria-label="Dough & Co. home" className="px-3">
          <Image
            src="/assets/images/logo-brown.png"
            alt="Dough & Co."
            width={1011}
            height={874}
            priority
            className="h-14 w-auto md:h-[74px]"
          />
        </Link>

        <div className="flex items-center justify-end gap-3 md:gap-7">
          <Link href="/search" aria-label="Search" className="transition-colors hover:text-accent">
            <Search className="size-[18px] md:size-5" strokeWidth={1.4} />
          </Link>
          {isCustomerAccountConfigured ? (
            <Link href="/account" aria-label="My account" className="transition-colors hover:text-accent">
              <User className="size-[18px] md:size-5" strokeWidth={1.4} />
            </Link>
          ) : (
            accountUrl && (
              <a href={accountUrl} aria-label="My account" className="transition-colors hover:text-accent">
                <User className="size-[18px] md:size-5" strokeWidth={1.4} />
              </a>
            )
          )}
          <CartButton />
        </div>
      </div>
    </header>
  );
}
