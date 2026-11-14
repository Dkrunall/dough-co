import "server-only";
import { PLACEHOLDER_IMAGE, PRODUCTS, type Product } from "@/lib/products";
import {
  fetchProduct,
  fetchProducts,
  isShopifyConfigured,
  searchShopifyProducts,
  type ShopifyProduct,
} from "@/lib/shopify";

/**
 * Product source for every page: Shopify once SHOPIFY_* env vars are set,
 * otherwise the local placeholder catalog.
 *
 * With Shopify, shop categories are collection handles (see CATEGORIES in products.ts).
 */

function fromShopify(p: ShopifyProduct): Product {
  const images = p.images.nodes.map((img) => img.url);
  const image = p.featuredImage?.url ?? images[0] ?? PLACEHOLDER_IMAGE;
  const variants = p.variants.nodes.map((v) => ({
    id: v.id,
    title: v.title,
    price: Number(v.price.amount),
    available: v.availableForSale,
  }));
  return {
    slug: p.handle,
    name: p.title,
    price: Number(p.priceRange.minVariantPrice.amount),
    currency: p.priceRange.minVariantPrice.currencyCode,
    variants,
    available: p.availableForSale && variants.some((v) => v.available),
    image,
    gallery: images.length ? images : [image],
    description: p.description,
  };
}

export async function getProducts(category?: string): Promise<Product[]> {
  if (!isShopifyConfigured) {
    return category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS;
  }
  return (await fetchProducts(category)).map(fromShopify);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim();
  if (!q) return [];
  if (!isShopifyConfigured) {
    const needle = q.toLowerCase();
    return PRODUCTS.filter((p) => `${p.name} ${p.category ?? ""}`.toLowerCase().includes(needle));
  }
  return (await searchShopifyProducts(q)).map(fromShopify);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  if (!isShopifyConfigured) return PRODUCTS.find((p) => p.slug === slug);
  const product = await fetchProduct(slug);
  return product ? fromShopify(product) : undefined;
}
