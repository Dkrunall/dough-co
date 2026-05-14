"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Wheat, Clock, MapPin, Award } from "lucide-react";

const FEATURED = [
  { image: "/assets/images/croissant.jpg", title: "Butter Croissant",        subtitle: "The Signature"    },
  { image: "/assets/images/tart.jpg",      title: "Sea Salt Caramel Tart",   subtitle: "Pâtisserie"       },
  { image: "/assets/images/brownie.jpg",   title: "Rocher Brownie",          subtitle: "Wholesome Range"  },
];

const STATS = [
  { icon: Wheat,  label: "Viennoiserie",    value: "AOP Butter",  bg: "bg-accent/5"      },
  { icon: Clock,  label: "Made Daily",      value: "Fresh Only",  bg: "bg-secondary/5"   },
  { icon: MapPin, label: "5 Platforms",     value: "Across Dubai",bg: "bg-background"    },
  { icon: Award,  label: "Group Heritage",  value: "40+ Years",   bg: "bg-accent/10"     },
];

const MagneticButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x  = useSpring(mx, { damping: 15, stiffness: 150 });
  const y  = useSpring(my, { damping: 15, stiffness: 150 });

  return (
    <motion.div
      style={{ x, y }}
      className={className}
      onMouseMove={(e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - (left + width / 2));
        my.set(e.clientY - (top  + height / 2));
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      {children}
    </motion.div>
  );
};

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % FEATURED.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-background pt-16 pb-28"
    >
      {/* ── Background video ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video autoPlay loop muted playsInline
          className="h-full w-full object-cover opacity-[0.07] mix-blend-multiply scale-110 blur-sm"
        >
          <source src="/assets/videos/hero-bread.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/50 to-background/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-5 auto-rows-min">

          {/* ── Headline cell ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-8 min-h-[500px] p-10 lg:p-16 flex flex-col justify-end bg-secondary/4 rounded-[40px] border border-accent/8 backdrop-blur-sm relative overflow-hidden group"
          >
            {/* Top badge */}
            <div className="absolute top-10 left-10 flex items-center gap-3">
              <span className="w-8 h-px bg-accent/40" />
              <span className="text-[9px] uppercase tracking-[0.45em] font-bold text-accent">
                Cloud Kitchen · Dubai, UAE
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(48px,8vw,96px)] font-serif leading-[0.88] tracking-tighter text-foreground mb-10 relative z-10">
              Bakery-Level <br />
              <span className="italic text-accent font-normal relative">
                Indulgence
                <motion.svg
                  viewBox="0 0 300 16"
                  className="absolute -bottom-1 left-0 w-full h-3 text-accent/25"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1.6, ease: "easeOut" }}
                >
                  <motion.path
                    d="M4,12 Q150,3 296,12"
                    fill="none" stroke="currentColor"
                    strokeWidth="3" strokeLinecap="round"
                  />
                </motion.svg>
              </span>
              <br />
              at Your Door.
            </h1>

            {/* CTAs */}
            <div className="flex flex-wrap gap-6 items-center relative z-10">
              <MagneticButton>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => scrollTo("order")}
                  className="group/btn bg-foreground text-background px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold shadow-xl shadow-black/15 flex items-center gap-4 overflow-hidden relative"
                >
                  <span className="relative z-10">Order Online</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform relative z-10" />
                  <motion.div className="absolute inset-0 bg-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                </motion.button>
              </MagneticButton>

              <button
                onClick={() => scrollTo("story")}
                className="text-[11px] uppercase tracking-[0.3em] font-bold text-foreground/35 hover:text-accent transition-colors px-4 py-4"
              >
                Our Story
              </button>
            </div>

            {/* Warm glow */}
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-accent/8 rounded-full blur-[100px] pointer-events-none" />
          </motion.div>

          {/* ── Slider cell ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="col-span-12 lg:col-span-4 bg-secondary rounded-[40px] relative overflow-hidden min-h-[400px] shadow-2xl shadow-black/5"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={FEATURED[current].image}
                  alt={FEATURED[current].title}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-[1200ms] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                <motion.div
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-10 left-10 text-background"
                >
                  <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-accent/80 mb-2.5">
                    {FEATURED[current].subtitle}
                  </p>
                  <h3 className="text-3xl font-serif leading-tight">
                    {FEATURED[current].title}
                  </h3>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-background/10 z-20">
              <motion.div
                key={current}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
                className="h-full bg-accent"
              />
            </div>

            {/* Slide dots */}
            <div className="absolute top-8 right-8 flex gap-1.5 z-20">
              {FEATURED.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-accent scale-125" : "bg-background/30"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* ── Stat cards ── */}
          {STATS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.08, duration: 0.5 }}
              className={`col-span-6 md:col-span-3 min-h-[180px] p-7 ${item.bg} rounded-[28px] border border-accent/6 flex flex-col justify-between hover:shadow-lg hover:border-accent/15 transition-all group cursor-default`}
            >
              <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-accent shadow-sm group-hover:scale-110 transition-transform">
                <item.icon className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.35em] text-foreground/35 font-bold mb-1.5">
                  {item.label}
                </p>
                <p className="text-xl font-serif text-foreground">{item.value}</p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 right-10 flex items-center gap-4 rotate-90 origin-right translate-x-10 pointer-events-none"
      >
        <span className="text-[8px] uppercase tracking-[0.5em] text-accent/40 font-bold">Scroll</span>
        <div className="w-16 h-px bg-accent/20" />
      </motion.div>
    </section>
  );
}
