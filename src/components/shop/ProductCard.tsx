import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-[9/10] overflow-hidden bg-sand">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 30vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-5 max-w-[16rem] font-sans text-sm leading-snug md:text-[15px]">{product.name}</h3>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs tracking-[0.12em]">{formatPrice(product.price)}</span>
        <span
          aria-hidden
          className="flex size-7 items-center justify-center rounded-full border border-foreground/40 transition-colors group-hover:border-cocoa group-hover:bg-cocoa group-hover:text-background"
        >
          <Plus className="size-3.5" strokeWidth={1.4} />
        </span>
      </div>
    </Link>
  );
}
