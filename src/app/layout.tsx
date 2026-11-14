import type { Metadata } from "next";
import { Gilda_Display, Jost } from "next/font/google";
import CartDrawer from "@/components/cart/CartDrawer";
import CartProvider from "@/components/cart/CartProvider";
import SiteHeader from "@/components/layout/SiteHeader";
import { isShopifyConfigured } from "@/lib/shopify";
import SiteFooter from "@/components/layout/SiteFooter";
import "./globals.css";

const display = Gilda_Display({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const body = Jost({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dough & Co. | Artisanal Bakes in Dubai",
    template: "%s | Dough & Co.",
  },
  description:
    "Thoughtfully crafted cookies, bakes and gift boxes, baked fresh in small batches and delivered same day across Dubai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col selection:bg-accent/30">
        <CartProvider enabled={isShopifyConfigured}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
