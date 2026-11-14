import type { NextRequest } from "next/server";

/** Public origin of the site; must match the URLs registered in Shopify's Customer Account API settings. */
export function siteOrigin(req: NextRequest) {
  return process.env.SITE_URL ?? req.nextUrl.origin;
}
