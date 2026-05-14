"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Leaf } from "lucide-react";

const FEATURES = [
  { num: "01", label: "Gluten-Free",         desc: "Crafted with nutrient-rich finger millet flour"    },
  { num: "02", label: "No Refined Sugar",     desc: "Naturally sweetened with monk fruit extract"      },
  { num: "03", label: "White Butter",         desc: "Pure, quality fat — never a shortcut"             },
  { num: "04", label: "Every Age, Every Day", desc: "Designed for children and adults equally"         },
];

export default function WholesomeSection() {
  return (
    <section id="wholesome" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-start">

          {/* ── Left: copy + feature list ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col gap-12"
          >
            {/* Label + Headline */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-accent/40" />
                <span className="text-accent uppercase font-sans text-[9px] tracking-[0.45em] font-bold flex items-center gap-2">
                  <Leaf className="w-2.5 h-2.5" /> Wholesome Range
                </span>
              </div>
              <h2 className="text-[clamp(40px,5.5vw,72px)] font-serif text-foreground leading-[1.0] tracking-tighter mb-7">
                Indulge Without <br />
                <span className="italic text-accent">Compromise.</span>
              </h2>
              <p className="text-foreground/55 font-sans text-base leading-relaxed max-w-md">
                Every item in our Wholesome range carries the same craftsmanship as our indulgent line — just without gluten or refined sugar. Mindful eating should never mean missing out.
              </p>
            </div>

            {/* Editorial numbered features */}
            <div className="flex flex-col divide-y divide-foreground/6">
              {FEATURES.map((f, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className="group flex items-start gap-6 py-6 hover:bg-accent/3 -mx-4 px-4 rounded-xl transition-colors"
                >
                  {/* Number */}
                  <span className="text-[11px] font-bold text-accent/40 tracking-widest mt-1 w-6 flex-shrink-0 group-hover:text-accent/70 transition-colors">
                    {f.num}
                  </span>
                  {/* Separator */}
                  <div className="w-px h-10 bg-accent/15 flex-shrink-0 mt-0.5 group-hover:bg-accent/40 transition-colors" />
                  {/* Text */}
                  <div>
                    <p className="font-serif text-foreground text-xl leading-tight mb-1 group-hover:text-accent transition-colors">
                      {f.label}
                    </p>
                    <p className="text-foreground/40 text-xs font-sans leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pull quote */}
            <blockquote className="relative pl-8 border-l-2 border-accent/40">
              <p className="italic text-foreground/55 font-sans text-sm leading-relaxed">
                "Guilt-free indulgence crafted for those who believe a balanced life still deserves beautiful dessert."
              </p>
              <cite className="block mt-3 text-[9px] uppercase tracking-[0.4em] not-italic text-accent/60 font-bold">
                — Dough & Co., Dubai
              </cite>
            </blockquote>
          </motion.div>

          {/* ── Right: image stack ── */}
          <div className="flex flex-col gap-4 pt-4">

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85 }}
              viewport={{ once: true }}
              className="relative h-72 md:h-96 rounded-[28px] overflow-hidden"
            >
              <Image
                src="/assets/images/brownie.jpg"
                alt="Guilt-Free Rocher Brownie"
                fill
                className="object-cover hover:scale-[1.04] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/80 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-7">
                <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#90c44a]/80 mb-2">
                  Signature Wholesome
                </p>
                <h3 className="text-2xl font-serif text-background leading-tight">
                  Guilt-Free Rocher Brownie
                </h3>
                <p className="text-background/50 text-[11px] font-sans mt-1.5 tracking-wide">
                  Gluten-free · Naturally Sweetened · AED 26
                </p>
              </div>
            </motion.div>

            {/* Two smaller cards */}
            <div className="grid grid-cols-2 gap-4">

              {/* Tea cakes image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative h-48 rounded-[22px] overflow-hidden"
              >
                <Image
                  src="/assets/images/wholesome.jpg"
                  alt="Mini Wholesome Tea Cakes"
                  fill
                  className="object-cover hover:scale-[1.04] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <h3 className="text-base font-serif text-background leading-tight">Mini Tea Cakes</h3>
                  <p className="text-background/45 text-[10px] font-sans mt-1">GF · Sugar-free</p>
                </div>
              </motion.div>

              {/* Ingredient info card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative h-48 rounded-[22px] bg-secondary/5 border border-accent/10 flex flex-col justify-between p-6 hover:border-accent/25 transition-colors overflow-hidden"
              >
                {/* Faded number watermark */}
                <span className="absolute -bottom-4 -right-2 text-[80px] font-serif text-accent/6 leading-none pointer-events-none select-none">
                  3
                </span>
                <Leaf className="w-6 h-6 text-accent/35" />
                <div>
                  <p className="font-serif text-foreground text-lg leading-tight mb-1">
                    Key <span className="italic text-accent">Ingredients</span>
                  </p>
                  <p className="text-foreground/40 text-[10px] font-sans leading-relaxed">
                    Finger Millet · Monk Fruit · White Butter
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
