import Image from "next/image";
import Link from "next/link";
import { Search, User } from "lucide-react";
import CartButton from "@/components/cart/CartButton";
import MobileMenu from "@/components/layout/MobileMenu";
import { isCustomerAccountConfigured } from "@/lib/customer-account";
import { accountUrl } from "@/lib/shopify";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/gifts", label: "Gifts" },
  { href: "/our-story", label: "Our Story" },
];

export default function SiteHeader() {
  const accountHref = isCustomerAccountConfigured ? "/account" : accountUrl;

  return (
    // No backdrop-blur on the header: it would trap the mobile menu's fixed overlay inside it.
    <header className="sticky top-0 z-40 border-b border-line/60 bg-background">
      <div className="page-container grid h-20 grid-cols-[1fr_auto_1fr] items-center md:h-24">
        {/* Phones: menu button + search. Desktop: text links. */}
        <div className="flex items-center gap-4 md:hidden">
          <MobileMenu nav={NAV} accountHref={accountHref} />
          <Link href="/search" aria-label="Search" className="transition-colors hover:text-accent">
            <Search className="size-[18px]" strokeWidth={1.4} />
          </Link>
        </div>
        <nav className="hidden items-center gap-12 text-[11px] font-medium uppercase tracking-[0.18em] md:flex">
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

        <div className="flex items-center justify-end gap-4 md:gap-7">
          <Link href="/search" aria-label="Search" className="hidden transition-colors hover:text-accent md:block">
            <Search className="size-5" strokeWidth={1.4} />
          </Link>
          {accountHref &&
            (accountHref.startsWith("/") ? (
              <Link href={accountHref} aria-label="My account" className="transition-colors hover:text-accent">
                <User className="size-[18px] md:size-5" strokeWidth={1.4} />
              </Link>
            ) : (
              <a href={accountHref} aria-label="My account" className="transition-colors hover:text-accent">
                <User className="size-[18px] md:size-5" strokeWidth={1.4} />
              </a>
            ))}
          <CartButton />
        </div>
      </div>
    </header>
  );
}
