import FloatingNav from "@/components/layout/FloatingNav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import ProductGrid from "@/components/sections/ProductGrid";
import WholesomeSection from "@/components/sections/WholesomeSection";
import AboutSection from "@/components/sections/AboutSection";
import OrderSection from "@/components/sections/OrderSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <FloatingNav />

      {/* Hero no longer needs top padding offset for a fixed navbar */}
      <Hero />
      <MarqueeStrip />
      <ProductGrid />
      <WholesomeSection />
      <AboutSection />
      <OrderSection />

      {/* ── Newsletter ── */}
      <section className="relative overflow-hidden bg-[#2A1A0F] py-20 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(184,142,91,0.12),transparent)] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span className="text-[clamp(80px,18vw,220px)] font-serif text-background/[0.03] whitespace-nowrap tracking-tighter leading-none">
            DOUGH &amp; CO.
          </span>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-accent/40" />
            <span className="text-accent uppercase font-sans text-[9px] tracking-[0.45em] font-bold">
              Stay in the Loop
            </span>
            <div className="w-8 h-px bg-accent/40" />
          </div>

          <h2 className="text-[clamp(40px,6vw,72px)] font-serif text-[#FCF9F6] leading-[1.0] tracking-tighter mb-5">
            Be First <br />
            <span className="italic text-accent/85">to Taste.</span>
          </h2>

          <p className="text-[#FCF9F6]/40 font-sans text-sm leading-relaxed mb-10 max-w-sm mx-auto">
            Exclusive launches, seasonal specials, and artisanal stories — delivered to your inbox, not just your door.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-[#FCF9F6]/6 border border-[#FCF9F6]/10 focus:border-accent/50 px-6 py-4 rounded-full text-sm font-sans text-[#FCF9F6] placeholder:text-[#FCF9F6]/25 focus:outline-none transition-colors"
            />
            <button className="whitespace-nowrap bg-accent hover:bg-[#FCF9F6] text-background px-8 py-4 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-300">
              Subscribe
            </button>
          </div>

          <p className="mt-6 text-[#FCF9F6]/20 text-[10px] uppercase tracking-[0.35em] font-bold">
            No spam. Just pastry.
          </p>
        </div>
      </section>

      {/* Extra bottom padding so last section content clears the floating nav */}
      <div className="h-24 bg-background" />

      <Footer />
    </main>
  );
}
