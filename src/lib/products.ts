/** Menu sections; each slug is a Shopify collection handle. */
export type Category =
  | "viennoiserie"
  | "cookies"
  | "cruffins"
  | "croffles"
  | "pastries"
  | "tarts"
  | "tea-cakes"
  | "croissant-sandwiches";

export const CATEGORIES: { slug: Category; label: string }[] = [
  { slug: "viennoiserie", label: "Viennoiserie" },
  { slug: "cookies", label: "Cookies" },
  { slug: "cruffins", label: "Cruffins" },
  { slug: "croffles", label: "Croffles" },
  { slug: "pastries", label: "Pastries" },
];

/** Categories tucked under the "More" menu on the shop page. */
export const MORE_CATEGORIES: { slug: Category; label: string }[] = [
  { slug: "croissant-sandwiches", label: "Croissant Sandwiches" },
  { slug: "tea-cakes", label: "Tea Cakes" },
  { slug: "tarts", label: "Tarts" },
];

export type Variant = { id: string; title: string; price: number; available: boolean };

/** Shown wherever a product has no photo yet. */
export const PLACEHOLDER_IMAGE = "/assets/images/logo-brown.png";

export type Product = {
  slug: string;
  name: string;
  /** Lowest variant price. */
  price: number;
  currency: string;
  /** Shopify variants (sizes); empty for local placeholder products. */
  variants: Variant[];
  available: boolean;
  category?: Category;
  image: string;
  gallery: string[];
  description: string;
  rating?: number;
  reviews?: number;
};

const IMG = "/assets/mock";

/** Placeholder catalog shown until Shopify is connected (see .env.example). */
const LOCAL_PRODUCTS: Omit<Product, "currency" | "available" | "variants">[] = [
  {
    slug: "signature-chocolate-chunk-cookie",
    name: "Signature Chocolate Chunk Cookie",
    price: 24,
    category: "cookies",
    image: `${IMG}/p-signature.jpg`,
    gallery: [`${IMG}/pd-main.jpg`, `${IMG}/p-signature.jpg`, `${IMG}/hero-cookie.jpg`, `${IMG}/col-cookies.jpg`],
    description:
      "A soft, chewy cookie with rich dark chocolate chunks and a hint of sea salt. Made with the finest ingredients and baked fresh in small batches.",
    rating: 5,
    reviews: 42,
  },
  {
    slug: "double-chocolate-cookie",
    name: "Double Chocolate Cookie",
    price: 24,
    category: "cookies",
    image: `${IMG}/p-double.jpg`,
    gallery: [`${IMG}/p-double.jpg`],
    description:
      "A deep cocoa dough loaded with dark and milk chocolate, baked until the edges set and the centre stays fudgy.",
    rating: 5,
    reviews: 31,
  },
  {
    slug: "pistachio-white-chocolate-cookie",
    name: "Pistachio & White Chocolate Cookie",
    price: 24,
    category: "cookies",
    image: `${IMG}/p-pistachio.jpg`,
    gallery: [`${IMG}/p-pistachio.jpg`],
    description:
      "Roasted pistachios and creamy white chocolate folded into a brown-butter dough, finished with a pistachio drizzle.",
    rating: 5,
    reviews: 27,
  },
  {
    slug: "salted-caramel-brownie",
    name: "Salted Caramel Brownie",
    price: 26,
    category: "pastries",
    image: `${IMG}/p-brownie.jpg`,
    gallery: [`${IMG}/p-brownie.jpg`],
    description:
      "A dense, glossy-topped brownie swirled with house-made salted caramel and topped with dark chocolate shards.",
    rating: 5,
    reviews: 38,
  },
  {
    slug: "biscoff-cookie",
    name: "Biscoff Cookie",
    price: 24,
    category: "cookies",
    image: `${IMG}/p-biscoff.jpg`,
    gallery: [`${IMG}/p-biscoff.jpg`],
    description:
      "Caramelised biscuit spread baked into a buttery dough with crushed speculoos for a warm, spiced crunch.",
    rating: 4,
    reviews: 22,
  },
  {
    slug: "oat-cranberry-cookie",
    name: "Oat & Cranberry Cookie",
    price: 24,
    category: "cookies",
    image: `${IMG}/p-oat.jpg`,
    gallery: [`${IMG}/p-oat.jpg`],
    description:
      "Rolled oats, tart cranberries and a touch of cinnamon in a golden, wholesome cookie with crisp edges.",
    rating: 4,
    reviews: 19,
  },
];

export const PRODUCTS: Product[] = LOCAL_PRODUCTS.map((p) => ({
  ...p,
  currency: "AED",
  available: true,
  variants: [],
}));

/** "AED 28", or "From AED 28" when sizes are priced differently. */
export function productPrice(p: Product) {
  const varies = new Set(p.variants.map((v) => v.price)).size > 1;
  return `${varies ? "From " : ""}${formatPrice(p.price, p.currency)}`;
}

/** "AED 24", or "AED 24.50" when there are fils. */
export function formatPrice(price: number | string, currency = "AED") {
  const n = Number(price);
  return `${currency} ${Number.isInteger(n) ? n : n.toFixed(2)}`;
}
