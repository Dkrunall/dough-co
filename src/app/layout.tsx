import type { Metadata } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DOUGH & CO. | Artisanal Cloud Kitchen",
  description: "Premium artisanal cloud kitchen bakery bringing the finest patisserie directly to your door in Dubai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-accent/30 selection:text-foreground">
        {children}
      </body>
    </html>
  );
}
