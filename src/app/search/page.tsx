import type { Metadata } from "next";
import { Search } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import { ArrowLink } from "@/components/ui/Links";
import { searchProducts } from "@/lib/catalog";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = ((await searchParams).q ?? "").slice(0, 100);
  const results = await searchProducts(q);

  return (
    <div className="bg-surface">
      <div className="page-container py-14 md:py-20">
        <h1 className="text-[clamp(44px,5.5vw,76px)] leading-none">Search</h1>

        <form action="/search" role="search" className="mt-10 flex max-w-2xl items-center border-b border-foreground/40">
          <Search className="size-5 shrink-0 text-foreground/60" strokeWidth={1.4} />
          <input
            type="search"
            name="q"
            defaultValue={q}
            autoFocus
            placeholder="Croissant, cookie, pistachio…"
            aria-label="Search the menu"
            className="w-full bg-transparent px-4 py-4 text-lg outline-none placeholder:text-foreground/40"
          />
          <button type="submit" className="text-[11px] font-medium uppercase tracking-[0.2em] hover:text-accent">
            Search
          </button>
        </form>

        {q && (
          <p className="mt-8 text-sm text-muted">
            {results.length} {results.length === 1 ? "result" : "results"} for “{q}”
          </p>
        )}

        {results.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8">
            {results.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          q && (
            <div className="mt-16 flex flex-col items-start gap-6">
              <p className="font-serif text-2xl text-muted">Nothing on the menu matches that.</p>
              <ArrowLink href="/shop">Browse the full menu</ArrowLink>
            </div>
          )
        )}
      </div>
    </div>
  );
}
