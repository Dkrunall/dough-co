import "server-only";

/**
 * Thin client for the Shopify Storefront API (headless).
 * Catalog reads are cached for a minute; cart calls are never cached.
 */

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2026-07";

export const isShopifyConfigured = Boolean(domain && token);

/** Country carts are created for, so checkout offers delivery there (the bakery only delivers in the UAE). */
export const shopCountry = process.env.SHOPIFY_COUNTRY ?? "AE";

/** Shopify-hosted customer account (sign in, orders, addresses). */
export const accountUrl = domain ? `https://${domain}/account` : null;

type Money = { amount: string; currencyCode: string };
type ShopifyImage = { url: string; altText: string | null };

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  { cache = true }: { cache?: boolean } = {},
): Promise<T> {
  if (!isShopifyConfigured) throw new Error("Shopify is not configured (see .env.example)");

  const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token!,
    },
    body: JSON.stringify({ query, variables }),
    ...(cache ? { next: { revalidate: 60, tags: ["shopify"] } } : { cache: "no-store" as const }),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok || !json || json.errors) {
    const detail = json?.errors?.map((e: { message: string }) => e.message).join("; ");
    throw new Error(`Shopify request failed (${res.status}): ${detail ?? res.statusText}`);
  }
  return json.data as T;
}

/* ── Catalog ─────────────────────────────────────────────── */

const PRODUCT_FIELDS = /* GraphQL */ `
  fragment ProductFields on Product {
    handle
    title
    description
    availableForSale
    featuredImage { url altText }
    images(first: 8) { nodes { url altText } }
    priceRange { minVariantPrice { amount currencyCode } }
    variants(first: 20) { nodes { id title availableForSale price { amount currencyCode } } }
  }
`;

export type ShopifyProduct = {
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  images: { nodes: ShopifyImage[] };
  priceRange: { minVariantPrice: Money };
  variants: { nodes: { id: string; title: string; availableForSale: boolean; price: Money }[] };
};

export async function fetchProducts(collectionHandle?: string) {
  if (collectionHandle) {
    const data = await shopifyFetch<{ collection: { products: { nodes: ShopifyProduct[] } } | null }>(
      `${PRODUCT_FIELDS}
      query CollectionProducts($handle: String!) {
        collection(handle: $handle) { products(first: 100) { nodes { ...ProductFields } } }
      }`,
      { handle: collectionHandle },
    );
    return data.collection?.products.nodes ?? [];
  }

  const data = await shopifyFetch<{ products: { nodes: ShopifyProduct[] } }>(
    `${PRODUCT_FIELDS}
    query Products { products(first: 100, sortKey: BEST_SELLING) { nodes { ...ProductFields } } }`,
  );
  return data.products.nodes;
}

/** Shopify's product search (matches title, type, tags, description). */
export async function searchShopifyProducts(query: string) {
  const data = await shopifyFetch<{ products: { nodes: ShopifyProduct[] } }>(
    `${PRODUCT_FIELDS}
    query Search($query: String!) { products(first: 50, query: $query) { nodes { ...ProductFields } } }`,
    { query },
  );
  return data.products.nodes;
}

export async function fetchProduct(handle: string) {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(
    `${PRODUCT_FIELDS}
    query Product($handle: String!) { product(handle: $handle) { ...ProductFields } }`,
    { handle },
  );
  return data.product;
}

/* ── Cart ────────────────────────────────────────────────── */

const CART_FIELDS = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    buyerIdentity { countryCode }
    cost { subtotalAmount { amount currencyCode } }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            image { url altText }
            product { title handle }
          }
        }
      }
    }
  }
`;

type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  buyerIdentity: { countryCode: string | null };
  cost: { subtotalAmount: Money };
  lines: {
    nodes: {
      id: string;
      quantity: number;
      cost: { totalAmount: Money };
      merchandise: {
        id: string;
        title: string;
        image: ShopifyImage | null;
        product: { title: string; handle: string };
      };
    }[];
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  /** Delivery country checkout opens with. */
  country: string | null;
  subtotal: Money;
  lines: {
    id: string;
    quantity: number;
    total: Money;
    title: string;
    variantTitle: string | null;
    handle: string;
    image: string | null;
  }[];
};

function toCart(cart: ShopifyCart): Cart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    country: cart.buyerIdentity.countryCode,
    subtotal: cart.cost.subtotalAmount,
    lines: cart.lines.nodes.map((line) => ({
      id: line.id,
      quantity: line.quantity,
      total: line.cost.totalAmount,
      title: line.merchandise.product.title,
      // Shopify names single-variant products "Default Title".
      variantTitle: line.merchandise.title === "Default Title" ? null : line.merchandise.title,
      handle: line.merchandise.product.handle,
      image: line.merchandise.image?.url ?? null,
    })),
  };
}

type UserErrors = { userErrors: { message: string }[] };

function unwrap(payload: { cart: ShopifyCart | null } & UserErrors) {
  if (payload.userErrors.length) throw new Error(payload.userErrors.map((e) => e.message).join("; "));
  if (!payload.cart) throw new Error("Shopify returned no cart");
  return toCart(payload.cart);
}

export async function getCart(cartId: string) {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(
    `${CART_FIELDS} query Cart($cartId: ID!) { cart(id: $cartId) { ...CartFields } }`,
    { cartId },
    { cache: false },
  );
  return data.cart ? toCart(data.cart) : null;
}

export async function createCart(lines: { merchandiseId: string; quantity: number }[]) {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart | null } & UserErrors }>(
    `${CART_FIELDS}
    mutation CartCreate($lines: [CartLineInput!], $country: CountryCode!) {
      cartCreate(input: { lines: $lines, buyerIdentity: { countryCode: $country } }) {
        cart { ...CartFields }
        userErrors { message }
      }
    }`,
    { lines, country: shopCountry },
    { cache: false },
  );
  return unwrap(data.cartCreate);
}

/** Moves an existing cart (e.g. one made before the market changed) to the shop's country. */
export async function setCartCountry(cartId: string) {
  const data = await shopifyFetch<{ cartBuyerIdentityUpdate: { cart: ShopifyCart | null } & UserErrors }>(
    `${CART_FIELDS}
    mutation CartBuyerIdentityUpdate($cartId: ID!, $country: CountryCode!) {
      cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: { countryCode: $country }) {
        cart { ...CartFields }
        userErrors { message }
      }
    }`,
    { cartId, country: shopCountry },
    { cache: false },
  );
  return unwrap(data.cartBuyerIdentityUpdate);
}

export async function addCartLines(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart | null } & UserErrors }>(
    `${CART_FIELDS}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ...CartFields } userErrors { message } }
    }`,
    { cartId, lines },
    { cache: false },
  );
  return unwrap(data.cartLinesAdd);
}

export async function updateCartLines(cartId: string, lines: { id: string; quantity: number }[]) {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart | null } & UserErrors }>(
    `${CART_FIELDS}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ...CartFields } userErrors { message } }
    }`,
    { cartId, lines },
    { cache: false },
  );
  return unwrap(data.cartLinesUpdate);
}
