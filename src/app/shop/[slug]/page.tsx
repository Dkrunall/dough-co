import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, ChevronRight, CookingPot, Plus, Star, Truck } from "lucide-react";
import AddToCart from "@/components/shop/AddToCart";
import ProductGallery from "@/components/shop/ProductGallery";
import { formatPrice, getProduct, PRODUCTS } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return { title: product?.name };
}

const FEATURES = [
  { icon: CookingPot, label: "Freshly Baked" },
  { icon: BadgeCheck, label: "Premium Ingredients" },
  { icon: Truck, label: "Same Day Delivery in Dubai" },
];

const DETAILS = [
  {
    title: "Ingredients",
    body: "Butter, brown sugar, free-range eggs, wheat flour, Belgian dark chocolate (cocoa mass, sugar, cocoa butter, soy lecithin), vanilla, baking soda, flaky sea salt.",
  },
  {
    title: "Allergen Information",
    body: "Contains wheat (gluten), milk, eggs and soy. Baked in a kitchen that also handles nuts and sesame.",
  },
  {
    title: "Delivery Information",
    body: "Order before 2 pm for same-day delivery anywhere in Dubai. Best enjoyed within 3 days; warm for 10 seconds for that fresh-from-the-oven texture.",
  },
];

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <div className="bg-surface">
      <div className="page-container pb-20 pt-6">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-foreground/70">
          <Link href="/" className="hover:text-accent">Home</Link>
          <ChevronRight className="size-3" />
          <Link href="/shop" className="hover:text-accent">Cookies &amp; Bakes</Link>
          <ChevronRight className="size-3" />
          <span>{product.name}</span>
        </nav>

        <div className="grid gap-12 md:grid-cols-[minmax(0,520px)_1fr] md:gap-16">
          {/* Left column: gallery + pairing */}
          <div className="space-y-6">
            <ProductGallery images={product.gallery} alt={product.name} />

            <Link href="/shop" className="group flex items-stretch bg-sand">
              <div className="relative w-[38%] shrink-0">
                <Image
                  src="/assets/mock/pd-pair.jpg"
                  alt="Cookie with a cup of coffee"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
              <div className="flex min-h-48 flex-col justify-center gap-3 px-8 py-6">
                <p className="text-[11px] text-foreground/60">Pairs Perfectly With</p>
                <p className="font-serif text-xl leading-snug text-foreground/70">
                  Iced Coffee or
                  <br />
                  Hot Chocolate
                </p>
                <span className="mt-2 flex size-8 items-center justify-center rounded-full border border-foreground/40 transition-colors group-hover:bg-cocoa group-hover:text-background">
                  <ArrowRight className="size-3.5" strokeWidth={1.4} />
                </span>
              </div>
            </Link>
          </div>

          {/* Right column: details */}
          <div className="md:pt-4">
            <h1 className="max-w-[12ch] text-[clamp(38px,4.2vw,58px)] leading-[1.08]">{product.name}</h1>
            <p className="mt-6 text-lg tracking-[0.1em]">{formatPrice(product.price)}</p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex gap-0.5 text-star">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-3.5" fill={i < product.rating ? "currentColor" : "none"} strokeWidth={1.2} />
                ))}
              </div>
              <span className="text-xs text-foreground/60">({product.reviews} reviews)</span>
            </div>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-foreground/80">{product.description}</p>

            <div className="mt-8 max-w-md">
              <AddToCart />
            </div>

            <ul className="mt-10 grid max-w-md grid-cols-3 gap-4 text-center">
              {FEATURES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-center gap-3">
                  <Icon className="size-6" strokeWidth={1.1} />
                  <span className="max-w-[9rem] text-[11px] leading-snug text-foreground/75">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 max-w-md border-t border-line">
              {DETAILS.map((d) => (
                <details key={d.title} className="group border-b border-line">
                  <summary className="flex cursor-pointer items-center justify-between py-6 text-[11px] font-medium uppercase tracking-[0.18em]">
                    {d.title}
                    <Plus className="size-4 transition-transform group-open:rotate-45" strokeWidth={1.3} />
                  </summary>
                  <p className="pb-6 text-sm leading-relaxed text-foreground/75">{d.body}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
