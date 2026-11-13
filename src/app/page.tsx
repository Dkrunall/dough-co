import Image from "next/image";
import Link from "next/link";
import { ArrowLink, ButtonLink } from "@/components/ui/Links";

const COLLECTION = [
  { label: "Cookies & Bakes", href: "/shop?category=cookies", image: "/assets/mock/col-cookies.jpg" },
  { label: "Pastries", href: "/shop?category=pastries", image: "/assets/mock/col-pastries.jpg" },
  { label: "Cakes & Desserts", href: "/shop?category=cakes", image: "/assets/mock/col-cakes.jpg" },
  { label: "Gifts & Hampers", href: "/gifts", image: "/assets/mock/col-gifts.jpg" },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-sand">
        <div className="absolute inset-0 md:left-[38%]">
          <Image
            src="/assets/mock/hero-cookie.jpg"
            alt="Chocolate chunk cookie broken open on a stone stand"
            fill
            priority
            sizes="(min-width: 768px) 62vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sand via-sand/80 to-sand/20 md:bg-gradient-to-r md:from-sand md:to-transparent md:via-transparent md:via-35%" />
        </div>

        <div className="relative mx-auto flex min-h-[640px] max-w-[1440px] flex-col justify-center px-5 py-20 md:min-h-[760px] md:px-24">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-foreground/75">
            Artisanal Bakes
          </p>
          <h1 className="max-w-[4.3em] text-[clamp(60px,8vw,120px)] leading-[0.95] tracking-[-0.01em]">
            Made for Brighter Days.
          </h1>
          <p className="mt-8 max-w-[19rem] text-[15px] leading-relaxed text-foreground/80">
            Thoughtfully crafted bakes, using the finest ingredients, for moments worth savouring.
          </p>
          <ButtonLink href="/shop" className="mt-10 self-start">
            Shop Now
          </ButtonLink>

          <div className="mt-16 flex items-center gap-4 text-[11px] tracking-[0.15em] text-foreground/70">
            <span>01</span>
            <span className="h-px w-14 bg-foreground/40" />
            <span>03</span>
          </div>
        </div>
      </section>

      {/* ── Our Collection ── */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-14 md:py-24">
        <div className="mb-12 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl uppercase tracking-[0.2em] md:text-[28px]">Our Collection</h2>
            <span className="hidden h-px w-16 bg-foreground/50 sm:block" />
          </div>
          <ArrowLink href="/shop">Explore All</ArrowLink>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8">
          {COLLECTION.map((item) => (
            <article key={item.label} className="group">
              <Link href={item.href} className="relative block aspect-[3/4] overflow-hidden rounded-t-full bg-sand">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <h3 className="mt-6 text-[15px] uppercase tracking-[0.2em] md:text-lg">{item.label}</h3>
              <ArrowLink href={item.href} className="mt-4">
                Shop
              </ArrowLink>
            </article>
          ))}
        </div>
      </section>

      {/* ── Boxed indulgence ── */}
      <section className="relative overflow-hidden bg-sand">
        <div className="absolute inset-0 md:left-[38%]">
          <Image
            src="/assets/mock/boxed-banner.jpg"
            alt="Dough & Co. gift box filled with assorted cookies"
            fill
            sizes="(min-width: 768px) 62vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sand via-sand/80 to-sand/20 md:bg-gradient-to-r md:from-sand md:to-transparent md:via-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[440px] max-w-[1440px] flex-col justify-center px-5 py-16 md:px-24">
          <h2 className="max-w-[12ch] text-[clamp(36px,4vw,54px)] uppercase leading-[1.08] tracking-[0.06em]">
            Beautifully Boxed Indulgence.
          </h2>
          <p className="mt-6 max-w-[19rem] text-[15px] leading-relaxed text-foreground/80">
            Our curated gift boxes are perfect for every occasion.
          </p>
          <ArrowLink href="/gifts" className="mt-8 text-xs">
            Shop Gifts
          </ArrowLink>
        </div>
      </section>
    </>
  );
}
