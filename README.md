# Dough & Co.

Next.js storefront for Dough & Co. The site is self-hosted; **products, cart, checkout and billing come from Shopify** through the Storefront API (headless). Customers browse here, then pay on Shopify's secure checkout.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without Shopify credentials the site shows the local placeholder products from `src/lib/products.ts` and ordering is disabled.

## Connect Shopify

1. **Get a Storefront API token.** In Shopify admin, install the free **Headless** sales channel (by Shopify), create a storefront, open *Storefront API* and copy the **public access token**.
2. **Publish products** to the Headless channel (each product → *Sales channels*), or they won't appear on the site.
3. **Create collections** with these handles so the shop tabs work: `viennoiserie`, `cookies`, `cruffins`, `croffles`, `pastries`, `croissant-sandwiches`, `tea-cakes`, `tarts`.
4. **Set up selling in Shopify:** store currency (AED), Dubai shipping/local delivery, payments and taxes. Checkout uses these settings as-is.
5. **Add credentials** to `.env.local` (copy `.env.example`):

   ```
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=<public token>
   ```

6. Restart the server. Product changes in Shopify show up on the site within about a minute.

### How the pieces fit

| Where | What |
|---|---|
| `src/lib/shopify.ts` | Storefront API client: products, collections, cart mutations |
| `src/lib/catalog.ts` | Picks Shopify or the local placeholder catalog |
| `src/app/actions/cart.ts` | Server actions; the cart id is kept in an httpOnly cookie |
| `src/components/cart/` | Cart context, header button and slide-out drawer |

The **Checkout** button sends customers to the cart's Shopify `checkoutUrl`. Payment, billing, order emails and order management all happen in Shopify.

**Domains:** keep your main domain pointed at this Next.js server. Checkout opens on your `*.myshopify.com` domain, or on a subdomain such as `shop.yourdomain.com` if you connect one in Shopify.

## Deploy (custom hosting)

Needs Node.js 20.9 or newer.

```bash
npm ci
npm run build
npm start          # serves on port 3000; put it behind your reverse proxy
```

Set the `SHOPIFY_*` variables in the server environment (or `.env.local` on the server) before `npm run build`.
