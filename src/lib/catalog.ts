import "server-only";
import { PRODUCTS, type Product } from "@/lib/products";
import { fetchProduct, fetchProducts, isShopifyConfigured, type ShopifyProduct } from "@/lib/shopify";

/**
 * Product source for every page: Shopify once SHOPIFY_* env vars are set,
 * otherwise the local placeholder catalog.
 *
 * With Shopify, shop categories are collection handles (see CATEGORIES in products.ts).
 */

const PLACEHOLDER_IMAGE = "/assets/images/logo-brown.png";

function fromShopify(p: ShopifyProduct): Product {
  const images = p.images.nodes.map((img) => img.url);
  const image = p.featuredImage?.url ?? images[0] ?? PLACEHOLDER_IMAGE;
  const variant = p.variants.nodes[0];
  return {
    slug: p.handle,
    name: p.title,
    price: Number(p.priceRange.minVariantPrice.amount),
    currency: p.priceRange.minVariantPrice.currencyCode,
    variantId: variant?.id,
    available: p.availableForSale && Boolean(variant?.availableForSale),
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

export async function getProduct(slug: string): Promise<Product | undefined> {
  if (!isShopifyConfigured) return PRODUCTS.find((p) => p.slug === slug);
  const product = await fetchProduct(slug);
  return product ? fromShopify(product) : undefined;
}
