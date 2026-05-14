"use client";

import Image from "next/image";
import { MapPin, Mail, Camera, Send, Globe } from "lucide-react";
import { motion } from "framer-motion";

const NAV = [
  { label: "The Bakery",      href: "#bakery"   },
  { label: "Savoury Range",   href: "#bakery"   },
  { label: "Wholesome Range", href: "#wholesome"},
  { label: "Our Story",       href: "#story"    },
  { label: "Order Now",       href: "#order"    },
];

const PLATFORMS = ["Deliveroo", "Noon Food", "Talabat", "Keeta", "Careem"];

export default function Footer() {
  return (
    <footer className="bg-background relative overflow-hidden">

      {/* ── Brand stamp ── */}
      <div className="border-t border-accent/8 pt-12 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/15" />
          <span
            aria-hidden
            className="text-[clamp(28px,5vw,56px)] font-serif text-foreground/6 tracking-tighter whitespace-nowrap select-none"
          >
            DOUGH &amp; CO.
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/15" />
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-16">

          {/* Brand col */}
          <div className="flex flex-col gap-7">
            <motion.div whileHover={{ scale: 1.03 }} className="relative w-36 h-10">
              <Image src="/assets/images/logo-brown.png" alt="DOUGH & CO." fill className="object-contain" />
            </motion.div>
            <p className="text-sm text-foreground/45 leading-relaxed font-sans italic">
              "Crafting mindful indulgence through the alchemy of traditional patisserie and modern nutrition."
            </p>
            <div className="flex gap-3">
              <motion.a
                href="https://www.instagram.com/doughandco.dubai/"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2.5 border border-accent/10 rounded-full text-foreground/35 hover:text-accent hover:border-accent/30 transition-colors"
                title="Instagram"
              >
                <Camera className="w-3.5 h-3.5" />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.1 }}
                className="p-2.5 border border-accent/10 rounded-full text-foreground/35 hover:text-accent hover:border-accent/30 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </motion.a>
              <motion.a
                href="https://peninsulagroup.ae/" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2.5 border border-accent/10 rounded-full text-foreground/35 hover:text-accent hover:border-accent/30 transition-colors"
                title="Peninsula Hospitality"
              >
                <Globe className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </div>

          {/* Order col */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[9px] uppercase tracking-[0.35em] font-bold text-accent">Order On</h4>
            <ul className="flex flex-col gap-3">
              {PLATFORMS.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-foreground/50 font-sans hover:text-accent hover:translate-x-1 inline-block transition-all">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover col */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[9px] uppercase tracking-[0.35em] font-bold text-accent">Discover</h4>
            <ul className="flex flex-col gap-3">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-foreground/50 font-sans hover:text-accent hover:translate-x-1 inline-block transition-all">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[9px] uppercase tracking-[0.35em] font-bold text-accent">Contact</h4>
            <div className="flex flex-col gap-5 text-sm text-foreground/50">
              <div className="flex items-start gap-3">
                <MapPin className="w-3.5 h-3.5 text-accent/45 mt-0.5 flex-shrink-0" />
                <span className="font-sans leading-relaxed">Cloud Kitchen,<br />Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 text-accent/45 flex-shrink-0" />
                <a href="mailto:divya@peninsulagroup.ae" className="font-sans hover:text-accent transition-colors break-all">
                  divya@peninsulagroup.ae
                </a>
              </div>
            </div>

            <div className="pt-5 border-t border-accent/8">
              <p className="text-[9px] uppercase tracking-widest text-foreground/25 font-bold mb-1.5">Part of</p>
              <a
                href="https://peninsulagroup.ae/" target="_blank" rel="noopener noreferrer"
                className="text-foreground/45 font-sans text-sm hover:text-accent transition-colors"
              >
                Peninsula Hospitality Group
              </a>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-accent/6 gap-5">
          <p className="text-[8px] uppercase tracking-[0.35em] text-foreground/25 font-bold">
            © 2026 DOUGH & CO. A Peninsula Hospitality Group Vision.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[8px] uppercase tracking-[0.35em] text-foreground/25 font-bold italic">
              Curated Excellence in Dubai
            </span>
            <div className="w-1 h-1 bg-accent/35 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

    </footer>
  );
}
