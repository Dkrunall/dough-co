import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import { CATEGORIES, MORE_CATEGORIES, PRODUCTS } from "@/lib/products";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Cookies & Bakes" };

const tabClass = "pb-3 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const products = category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS;
  const moreActive = MORE_CATEGORIES.find((c) => c.slug === category);

  return (
    <div className="bg-surface">
      <div className="page-container py-14 md:py-20">
        <h1 className="text-[clamp(44px,5.5vw,76px)] leading-none">Cookies &amp; Bakes</h1>

        <nav className="mt-12 flex flex-wrap items-start gap-x-10 gap-y-4 md:gap-x-16">
          <Link
            href="/shop"
            className={cn(tabClass, !category ? "border-b border-foreground" : "text-foreground/55 hover:text-foreground")}
          >
            All
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/shop?category=${c.slug}`}
              className={cn(
                tabClass,
                category === c.slug ? "border-b border-foreground" : "text-foreground/55 hover:text-foreground",
              )}
            >
              {c.label}
            </Link>
          ))}
          <details className="relative">
            <summary
              className={cn(
                tabClass,
                "flex cursor-pointer items-center gap-2",
                moreActive ? "border-b border-foreground" : "text-foreground/55 hover:text-foreground",
              )}
            >
              {moreActive?.label ?? "More"}
              <ChevronDown className="size-3" strokeWidth={1.5} />
            </summary>
            <div className="absolute left-0 z-10 mt-1 min-w-44 border border-line bg-surface py-2 shadow-sm">
              {MORE_CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop?category=${c.slug}`}
                  className="block px-4 py-2 text-[11px] uppercase tracking-[0.18em] hover:text-accent"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </details>
        </nav>

        {products.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="mt-20 text-center font-serif text-2xl text-muted">
            Fresh batches coming soon.
          </p>
        )}
      </div>
    </div>
  );
}
