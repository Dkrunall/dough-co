"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Leaf } from "lucide-react";

type Category = "All" | "Sweet" | "Savoury" | "Wholesome";

const PRODUCTS = [
  // ── Sweet ──────────────────────────────────────────────
  {
    id: 1,
    name: "Signature Butter Croissant",
    category: "Sweet" as Category,
    label: "Viennoiserie",
    price: "AED 22",
    image: "/assets/images/croissant.jpg",
    range: "Indulgent",
    isSignature: true,
    description: "Golden, buttery layers — the soul of French viennoiserie, baked fresh daily.",
  },
  {
    id: 2,
    name: "Pain au Chocolat",
    category: "Sweet" as Category,
    label: "Viennoiserie",
    price: "AED 24",
    image: "/assets/images/croissant.jpg",
    range: "Classic",
    isSignature: false,
    description: "Rich, dark chocolate wrapped in flaky, buttered layers.",
  },
  {
    id: 3,
    name: "Pistachio Custard Cruffin",
    category: "Sweet" as Category,
    label: "Signature",
    price: "AED 28",
    image: "/assets/images/croissant.jpg",
    range: "Limited",
    isSignature: true,
    description: "Silky pistachio custard fills a perfectly laminated cruffin.",
  },
  {
    id: 4,
    name: "Opera Pastry",
    category: "Sweet" as Category,
    label: "Pâtisserie",
    price: "AED 30",
    image: "/assets/images/tart.jpg",
    range: "Signature",
    isSignature: false,
    description: "An elegant French classic — coffee, ganache and almond joconde.",
  },
  {
    id: 5,
    name: "Sea Salt Caramel Chocolate Tart",
    category: "Sweet" as Category,
    label: "Pâtisserie",
    price: "AED 28",
    image: "/assets/images/tart.jpg",
    range: "Signature",
    isSignature: false,
    description: "Dark chocolate ganache, salted caramel — intense and perfectly refined.",
  },
  {
    id: 6,
    name: "Berry Cheesecake",
    category: "Sweet" as Category,
    label: "Pâtisserie",
    price: "AED 32",
    image: "/assets/images/wholesome.jpg",
    range: "Seasonal",
    isSignature: false,
    description: "Velvety cream cheese, fresh berry compote on a buttery biscuit base.",
  },
  // ── Savoury ────────────────────────────────────────────
  {
    id: 7,
    name: "Smoked Salmon & Cream Cheese Croissant",
    category: "Savoury" as Category,
    label: "Savoury",
    price: "AED 34",
    image: "/assets/images/croissant.jpg",
    range: "Brunch",
    isSignature: false,
    description: "Cold-smoked salmon, whipped cream cheese in a perfectly golden croissant.",
  },
  {
    id: 8,
    name: "Butter Chicken Croissant",
    category: "Savoury" as Category,
    label: "Savoury",
    price: "AED 30",
    image: "/assets/images/croissant.jpg",
    range: "Fusion",
    isSignature: true,
    description: "Slow-cooked butter chicken — a Dubai staple reimagined in a flaky crust.",
  },
  {
    id: 9,
    name: "Prawns Chettinad Danish",
    category: "Savoury" as Category,
    label: "Savoury",
    price: "AED 36",
    image: "/assets/images/croissant.jpg",
    range: "Fusion",
    isSignature: false,
    description: "Bold Chettinad spices, fresh prawns in a delicate laminated Danish pastry.",
  },
  // ── Wholesome ──────────────────────────────────────────
  {
    id: 10,
    name: "Guilt-Free Rocher Brownie",
    category: "Wholesome" as Category,
    label: "Health-Forward",
    price: "AED 26",
    image: "/assets/images/brownie.jpg",
    range: "Wholesome",
    isSignature: true,
    description: "Deep, chocolatey indulgence — gluten-free, naturally sweetened with monk fruit.",
  },
  {
    id: 11,
    name: "Mini Wholesome Tea Cakes",
    category: "Wholesome" as Category,
    label: "Health-Forward",
    price: "AED 22",
    image: "/assets/images/wholesome.jpg",
    range: "Wholesome",
    isSignature: false,
    description: "Finger millet flour, monk fruit sweetener — health-forward, never flavour-backward.",
  },
];

// "All" bento — every row sums to 12, no orphan columns
const BENTO_SPANS = [
  "col-span-12 lg:col-span-8",                // 0  hero
  "col-span-12 lg:col-span-4",                // 1
  "col-span-12 md:col-span-6 lg:col-span-4",  // 2
  "col-span-12 md:col-span-6 lg:col-span-4",  // 3
  "col-span-12 md:col-span-6 lg:col-span-4",  // 4
  "col-span-12 md:col-span-6",                // 5
  "col-span-12 md:col-span-6",                // 6
  "col-span-12 md:col-span-6 lg:col-span-4",  // 7
  "col-span-12 md:col-span-6 lg:col-span-4",  // 8
  "col-span-12 md:col-span-6 lg:col-span-4",  // 9
  "col-span-12",                               // 10 full-width closer
];

const BENTO_HEIGHTS = [
  "min-h-[420px] sm:min-h-[580px]",
  "min-h-[380px] sm:min-h-[580px]",
  "min-h-[320px] sm:min-h-[380px]",
  "min-h-[320px] sm:min-h-[380px]",
  "min-h-[320px] sm:min-h-[380px]",
  "min-h-[380px] sm:min-h-[460px]",
  "min-h-[380px] sm:min-h-[460px]",
  "min-h-[320px] sm:min-h-[380px]",
  "min-h-[320px] sm:min-h-[380px]",
  "min-h-[320px] sm:min-h-[380px]",
  "min-h-[320px] sm:min-h-[300px]",
];

const CATEGORIES: { label: Category; count: number }[] = [
  { label: "All", count: 11 },
  { label: "Sweet", count: 6 },
  { label: "Savoury", count: 3 },
  { label: "Wholesome", count: 2 },
];

const ProductGrid = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="bakery" className="py-16 md:py-24 bg-[#F9F6F2] relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6 sm:gap-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-5"
            >
              <div className="w-10 h-px bg-accent/40" />
              <span className="text-accent uppercase font-sans text-[10px] tracking-[0.45em] font-bold">
                Curated Menu
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-serif text-foreground leading-[1.0] tracking-tighter"
            >
              The{" "}
              <span className="italic font-normal text-accent/90">Artisanal</span>{" "}
              Selection
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            viewport={{ once: true }}
            className="text-foreground/45 font-sans text-sm leading-relaxed max-w-xs italic border-l-2 border-accent/20 pl-6"
          >
            French craft meets bold fusion. Every item made fresh, delivered to your door.
          </motion.p>
        </div>

        {/* ── Category Filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="flex gap-2.5 mb-14 flex-wrap"
        >
          {CATEGORIES.map(({ label, count }) => {
            const isActive = activeCategory === label;
            return (
              <button
                key={label}
                onClick={() => setActiveCategory(label)}
                className={`group relative px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 border flex items-center gap-2.5 ${
                  isActive
                    ? "bg-foreground text-background border-foreground shadow-md"
                    : "bg-transparent text-foreground/40 border-foreground/10 hover:border-accent/50 hover:text-foreground/70"
                }`}
              >
                {label === "Wholesome" && (
                  <Leaf className={`w-2.5 h-2.5 ${isActive ? "text-accent" : "text-foreground/30"}`} />
                )}
                {label}
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-background/20 text-background/70" : "bg-foreground/5 text-foreground/30"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ── Product Grid ── */}
        <motion.div layout className="grid grid-cols-12 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => {
              const allIdx = PRODUCTS.findIndex((p) => p.id === product.id);
              const isAllView = activeCategory === "All";

              // Span: bento for "All", clean equal columns for categories
              const spanClass = isAllView
                ? BENTO_SPANS[allIdx]
                : filtered.length <= 2
                ? "col-span-12 md:col-span-6"
                : "col-span-12 md:col-span-6 lg:col-span-4";

              // Height: varied for bento, uniform for filtered
              const heightClass = isAllView
                ? BENTO_HEIGHTS[allIdx]
                : "min-h-[440px]";

              // Full-width card in "All" view gets a special landscape treatment
              const isLandscape = isAllView && allIdx === 10;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative rounded-[28px] overflow-hidden bg-secondary shadow-sm hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 cursor-default ${spanClass} ${heightClass}`}
                >
                  {/* Image */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[900ms] group-hover:scale-[1.04]"
                  />

                  {/* Overlay — brand-warm gradient, not cold black */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      product.category === "Wholesome"
                        ? "bg-gradient-to-t from-[#1a2e1a]/90 via-[#1a2e1a]/20 to-transparent"
                        : "bg-gradient-to-t from-[#1A0F08]/92 via-[#1A0F08]/20 to-transparent"
                    }`}
                  />

                  {/* Subtle top vignette */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

                  {/* ── Card Content ── */}
                  <div className={`absolute inset-0 flex ${isLandscape ? "flex-col justify-end sm:flex-row sm:items-center" : "flex-col justify-between"} p-5 sm:p-7 md:p-8`}>

                    {/* Top row — badges */}
                    <div className={`flex justify-between items-start ${isLandscape ? "hidden" : ""}`}>
                      {/* Category pill */}
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/8 backdrop-blur-md border border-white/10 text-[8px] uppercase tracking-[0.35em] text-white/70 font-bold">
                        {product.label}
                      </span>
                      {/* Signature / Wholesome badges */}
                      <div className="flex gap-2">
                        {product.isSignature && (
                          <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center shadow-lg">
                            <Star className="w-3.5 h-3.5 text-background fill-current" />
                          </div>
                        )}
                        {product.category === "Wholesome" && (
                          <div className="w-7 h-7 rounded-full bg-[#2d5016]/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-[#4a7c2a]/30">
                            <Leaf className="w-3.5 h-3.5 text-[#90c44a]" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Landscape (full-width card) layout */}
                    {isLandscape && (
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-5 sm:gap-10">
                        <div>
                          <p className="text-accent text-[9px] uppercase tracking-[0.4em] font-bold mb-2">
                            {product.range} Range
                          </p>
                          <h3 className="text-3xl md:text-5xl font-serif text-background leading-tight max-w-md">
                            {product.name}
                          </h3>
                          <p className="text-background/50 font-sans text-sm mt-3 max-w-xs leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                        <div className="hidden md:flex items-center gap-6 flex-shrink-0">
                          <span className="font-serif text-2xl text-background/80">{product.price}</span>
                          <button className="px-6 py-3 rounded-full bg-accent text-background text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-background hover:text-foreground transition-all">
                            Order Now
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Standard card bottom content */}
                    {!isLandscape && (
                      <div>
                        <p className="text-accent text-[9px] uppercase tracking-[0.35em] font-bold mb-1.5">
                          {product.range} Range
                        </p>
                        <h3 className={`font-serif text-background leading-tight text-balance ${
                          isAllView && allIdx === 0 ? "text-4xl md:text-5xl" : "text-2xl md:text-[1.6rem]"
                        }`}>
                          {product.name}
                        </h3>

                        {/* Description — fades in on hover */}
                        <p className="text-background/55 font-sans text-[13px] italic mt-2.5 leading-relaxed max-w-[280px] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                          {product.description}
                        </p>

                        {/* Price + CTA — slides in on hover */}
                        <div className="flex items-center gap-4 mt-5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-75">
                          <span className="font-serif text-xl text-background/90 tracking-tight">
                            {product.price}
                          </span>
                          <div className="h-px flex-1 bg-white/15" />
                          <span className="text-[9px] uppercase tracking-[0.35em] font-bold text-accent">
                            Add to Box
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hover border glow */}
                  <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/0 group-hover:ring-accent/20 transition-all duration-500 pointer-events-none" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── View Full Menu CTA ── */}
        <div className="mt-20 flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="group flex flex-col items-center gap-5 cursor-default"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-foreground/30 font-bold group-hover:text-accent transition-colors duration-300">
              Order on App
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-accent/30 via-accent/10 to-transparent relative overflow-hidden">
              <motion.div
                animate={{ y: [-64, 64] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-accent/60"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
