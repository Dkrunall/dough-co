import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Links";

export const metadata: Metadata = { title: "Gifting" };

const BOXES = [
  { name: "Signature Gift Box", note: "From AED 120", image: "/assets/mock/gift-signature.jpg" },
  { name: "Celebration Box", note: "From AED 220", image: "/assets/mock/gift-celebration.jpg" },
  { name: "Custom Box", note: "Build Your Own", image: "/assets/mock/gift-custom.jpg" },
];

export default function GiftsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-sand">
        <div className="absolute inset-0 md:left-[36%]">
          <Image
            src="/assets/mock/gift-hero.jpg"
            alt="Stacked Dough & Co. gift boxes tied with chocolate ribbon"
            fill
            priority
            sizes="(min-width: 768px) 64vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sand via-sand/80 to-sand/20 md:bg-gradient-to-r md:from-sand md:to-transparent md:via-transparent md:via-30%" />
        </div>

        <div className="relative page-container flex min-h-[520px] flex-col justify-center py-16 md:min-h-[600px]">
          <h1 className="text-[clamp(56px,6.5vw,96px)] leading-none">Gifting</h1>
          <p className="mt-6 max-w-[15rem] text-lg leading-relaxed text-foreground/80">
            Thoughtful boxes for sweet occasions.
          </p>
          <ButtonLink href="#boxes" className="mt-10 self-start">
            Explore Gifts
          </ButtonLink>
        </div>
      </section>

      <section id="boxes" className="bg-surface">
        <div className="page-container grid gap-6 py-14 md:grid-cols-3 md:gap-8 md:py-20">
          {BOXES.map((box) => (
            <Link key={box.name} href="/shop" className="group block bg-sand/60">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={box.image}
                  alt={box.name}
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="px-5 py-6">
                <h2 className="font-sans text-[15px]">{box.name}</h2>
                <p className="mt-3 flex items-center gap-3 text-[13px] text-foreground/70">
                  {box.note}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.4} />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
