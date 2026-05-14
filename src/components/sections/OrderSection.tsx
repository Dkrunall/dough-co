"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PLATFORMS = [
  { name: "Deliveroo", note: "Fast delivery",     dot: "#00CCBC" },
  { name: "Noon Food", note: "Order on Noon",     dot: "#F5C518" },
  { name: "Talabat",   note: "Most popular",      dot: "#FF6B35" },
  { name: "Keeta",     note: "Order via Keeta",   dot: "#E63946" },
  { name: "Careem",    note: "Careem delivery",   dot: "#1DBF73" },
];

export default function OrderSection() {
  return (
    <section id="order" className="py-20 md:py-32 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
      <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-accent/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-background/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-12 sm:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-8 h-px bg-accent/40" />
              <span className="text-accent uppercase font-sans text-[9px] tracking-[0.45em] font-bold">
                Order Now
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-[clamp(40px,5.5vw,72px)] font-serif text-background tracking-tighter leading-[1.0]"
            >
              One Tap. <br />
              <span className="italic text-accent/80">Pure Indulgence.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            viewport={{ once: true }}
            className="text-background/45 font-sans text-sm leading-relaxed max-w-sm lg:pb-4 border-l border-background/10 pl-6"
          >
            Available across Dubai on all major platforms. Premium bakery quality, delivered fresh — in 30 to 45 minutes.
          </motion.p>
        </div>

        {/* ── Platform cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {PLATFORMS.map((p, idx) => (
            <motion.a
              key={p.name}
              href="#"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative rounded-[24px] bg-background/4 border border-background/8 hover:border-accent/35 hover:bg-background/8 transition-all duration-400 overflow-hidden flex flex-col justify-between p-5 sm:p-7 min-h-[160px] sm:min-h-[200px]"
            >
              {/* Platform color bar at top */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: p.dot }}
              />

              {/* Color dot */}
              <div
                className="w-2.5 h-2.5 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: p.dot }}
              />

              {/* Name + note */}
              <div>
                <h3 className="font-serif text-background text-[1.4rem] leading-tight mb-1">
                  {p.name}
                </h3>
                <p className="text-background/30 text-[10px] font-sans uppercase tracking-[0.3em]">
                  {p.note}
                </p>
              </div>

              {/* Arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 text-accent" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-background/20 text-[9px] uppercase tracking-[0.45em] font-bold mt-14"
        >
          Delivering Across Dubai · Premium Bakery · Made Fresh Daily
        </motion.p>
      </div>
    </section>
  );
}
