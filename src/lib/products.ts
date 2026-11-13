export type Category = "cookies" | "brownies" | "tea-cakes" | "madeleines" | "pastries" | "cakes";

export const CATEGORIES: { slug: Category; label: string }[] = [
  { slug: "cookies", label: "Cookies" },
  { slug: "brownies", label: "Brownies" },
  { slug: "tea-cakes", label: "Tea Cakes" },
  { slug: "madeleines", label: "Madeleines" },
];

/** Categories tucked under the "More" menu on the shop page. */
export const MORE_CATEGORIES: { slug: Category; label: string }[] = [
  { slug: "pastries", label: "Pastries" },
  { slug: "cakes", label: "Cakes & Desserts" },
];

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  gallery: string[];
  description: string;
  rating: number;
  reviews: number;
};

const IMG = "/assets/mock";

export const PRODUCTS: Product[] = [
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
    category: "brownies",
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

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(price: number) {
  return `AED ${price}`;
}
