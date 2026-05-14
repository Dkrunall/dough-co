"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const STATS = [
  { label: "Founded",         value: "2026"    },
  { label: "Group Heritage",  value: "40+ Yrs" },
  { label: "Hotels",          value: "6"       },
  { label: "Brands",          value: "35+"     },
];

export default function AboutSection() {
  return (
    <section id="story" className="py-32 bg-secondary text-background overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
      {/* Ambient */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-accent/4 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-28 items-center">

          {/* ── Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Offset border frame */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 border border-accent/15 rounded-sm pointer-events-none" />

            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-2xl shadow-black/30">
              <Image
                src="/assets/images/wholesome.jpg"
                alt="Artisanal Baking"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s]"
              />
              <div className="absolute inset-0 bg-secondary/15 mix-blend-multiply" />
            </div>

            {/* Peninsula stamp */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-5 -right-5 bg-accent px-5 py-3 rounded-xl shadow-xl"
            >
              <p className="text-[8px] uppercase tracking-[0.35em] font-bold text-background/70 mb-0.5">Part of</p>
              <p className="text-sm font-serif text-background leading-tight">Peninsula<br />Hospitality Group</p>
            </motion.div>
          </motion.div>

          {/* ── Copy ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col gap-10"
          >
            <div>
              <span className="text-accent uppercase tracking-[0.4em] text-[9px] font-bold mb-5 block">
                Our Heritage
              </span>
              <h2 className="text-[clamp(40px,5.5vw,72px)] font-serif leading-[1.05] tracking-tighter mb-8">
                Crafted by <br />
                <span className="italic text-accent/80">Peninsula Hospitality.</span>
              </h2>

              <div className="space-y-5 font-sans leading-relaxed">
                <p className="text-background/65 text-base italic">
                  Rooted in over four decades of culinary excellence, DOUGH & CO. is the latest evolution of Peninsula Hospitality Group — the force behind 35+ luxury brands, 6 hotels, and 25+ signature restaurants across the UAE and India.
                </p>

                {/* Pull quote */}
                <div className="border-l-2 border-accent/35 pl-6 py-1">
                  <p className="text-background/85 text-sm leading-relaxed">
                    "DOUGH & CO. was created to deliver bakery-quality excellence without the limitations of a traditional storefront. By launching as a cloud kitchen, we are able to prioritise freshness, precision, and accessibility — ensuring every order reaches customers at its best."
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-accent/65 font-bold mt-3">
                    — Saachi Timmins, Brand Head
                  </p>
                </div>

                <p className="text-background/45 text-sm leading-relaxed">
                  Founded in Dubai by K.R. Shetty in 1980, Peninsula Hospitality Group has spent four decades proving that excellence in hospitality is built through consistency and an unwavering commitment to the guest experience. DOUGH & CO. carries that same DNA — into your home.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 pt-8 border-t border-background/8">
              {STATS.map((stat) => (
                <div key={stat.label} className="group cursor-default">
                  <p className="text-accent text-[9px] uppercase tracking-[0.3em] font-bold mb-2 group-hover:text-background/70 transition-colors">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-serif tracking-tight leading-none">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
