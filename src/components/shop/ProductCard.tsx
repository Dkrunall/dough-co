import ArchCard from "@/components/ui/ArchCard";
import { ArrowLink } from "@/components/ui/Links";
import { productPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const href = `/shop/${product.slug}`;

  return (
    <ArchCard href={href} image={product.image} title={product.name}>
      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="text-xs tracking-[0.15em] text-foreground/75">{productPrice(product)}</span>
        <ArrowLink href={href}>Shop</ArrowLink>
      </div>
    </ArchCard>
  );
}
