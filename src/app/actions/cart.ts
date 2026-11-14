"use server";

import { cookies } from "next/headers";
import {
  addCartLines,
  createCart,
  getCart,
  isShopifyConfigured,
  setCartCountry,
  shopCountry,
  updateCartLines,
  type Cart,
} from "@/lib/shopify";

// The Shopify cart id lives in an httpOnly cookie; the cart itself lives in Shopify.
const CART_COOKIE = "dc_cart";

async function cartId() {
  return (await cookies()).get(CART_COOKIE)?.value;
}

function assertQuantity(quantity: number, min: number) {
  if (!Number.isInteger(quantity) || quantity < min || quantity > 99) throw new Error("Invalid quantity");
}

export async function loadCart(): Promise<Cart | null> {
  if (!isShopifyConfigured) return null;
  const id = await cartId();
  return id ? getCart(id) : null;
}

export async function addToCart(variantId: string, quantity: number): Promise<Cart> {
  if (!variantId.startsWith("gid://shopify/ProductVariant/")) throw new Error("Invalid product");
  assertQuantity(quantity, 1);

  const lines = [{ merchandiseId: variantId, quantity }];
  const id = await cartId();
  // Carts expire in Shopify; start a fresh one if the stored id is gone.
  const existing = id ? await getCart(id) : null;
  if (id && existing) {
    if (existing.country !== shopCountry) await setCartCountry(id);
    return addCartLines(id, lines);
  }

  const cart = await createCart(lines);
  (await cookies()).set(CART_COOKIE, cart.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return cart;
}

/** Quantity 0 removes the line. */
export async function updateLineQuantity(lineId: string, quantity: number): Promise<Cart | null> {
  assertQuantity(quantity, 0);
  const id = await cartId();
  return id ? updateCartLines(id, [{ id: lineId, quantity }]) : null;
}
