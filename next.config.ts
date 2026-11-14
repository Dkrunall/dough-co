import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product photos served by Shopify.
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
