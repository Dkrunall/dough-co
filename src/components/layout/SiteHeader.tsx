import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/gifts", label: "Gifts" },
  { href: "/our-story", label: "Our Story" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-background/95 backdrop-blur">
      <div className="mx-auto grid h-20 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-24 md:px-10">
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
          <button aria-label="Search" className="whitespace-nowrap transition-colors hover:text-accent">
            <Search className="size-[18px] md:size-5" strokeWidth={1.4} />
          </button>
          <button aria-label="Account" className="whitespace-nowrap transition-colors hover:text-accent">
            <User className="size-[18px] md:size-5" strokeWidth={1.4} />
          </button>
          <button aria-label="Cart" className="whitespace-nowrap transition-colors hover:text-accent">
            <ShoppingBag className="size-[18px] md:size-5" strokeWidth={1.4} />
          </button>
        </div>
      </div>
    </header>
  );
}
