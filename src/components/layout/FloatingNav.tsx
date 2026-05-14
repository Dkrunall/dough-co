"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const LINKS = [
  { id: "bakery",    label: "Menu"      },
  { id: "wholesome", label: "Wholesome" },
  { id: "story",     label: "Story"     },
];

const ALL_IDS = ["bakery", "wholesome", "story", "order"];

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function FloatingNav() {
  const [ready,  setReady]  = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Animate in once on mount (slight delay so page renders first)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Active section tracking
  useEffect(() => {
    const track = () => {
      const threshold = window.scrollY + window.innerHeight * 0.38;
      let hit: string | null = null;
      for (const id of ALL_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= threshold) hit = id;
      }
      setActive(hit);
    };
    window.addEventListener("scroll", track, { passive: true });
    track();
    return () => window.removeEventListener("scroll", track);
  }, []);

  return (
    <AnimatePresence>
      {ready && (
        <motion.nav
          aria-label="Site navigation"
          initial={{ opacity: 0, y: 32, scale: 0.92 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
        >
          <div className="relative flex items-center bg-[#150c05]/94 backdrop-blur-2xl rounded-full border border-white/[0.08] shadow-[0_12px_50px_rgba(0,0,0,0.5)]">

            {/* Inner accent ring */}
            <div className="pointer-events-none absolute inset-0 rounded-full border border-accent/[0.14]" />

            {/* ── Logo ── */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center pl-5 pr-4 py-3 opacity-75 hover:opacity-100 transition-opacity flex-shrink-0"
              aria-label="Back to top"
            >
              <div className="relative w-[68px] h-[26px]">
                <Image
                  src="/assets/images/logo-white.png"
                  alt="DOUGH & CO."
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-white/[0.1] flex-shrink-0" />

            {/* ── Nav links ── */}
            <div className="flex items-center gap-0.5 px-2">
              {LINKS.map(({ id, label }) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`relative px-4 py-2.5 rounded-full text-[10px] uppercase tracking-[0.28em] font-bold outline-none focus-visible:ring-1 focus-visible:ring-accent/50 ${
                      id === "wholesome" ? "hidden md:block" : ""
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="fnav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.1]"
                        transition={{ type: "spring", stiffness: 400, damping: 38 }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive
                          ? "text-white/90"
                          : "text-white/35 hover:text-white/65"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-white/[0.1] flex-shrink-0" />

            {/* ── Order Now CTA ── */}
            <motion.button
              onClick={() => scrollTo("order")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-accent hover:bg-accent/90 text-[#150c05] ml-2 mr-2 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.28em] font-bold transition-colors shadow-lg shadow-accent/20 flex-shrink-0"
            >
              Order Now
            </motion.button>

          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
