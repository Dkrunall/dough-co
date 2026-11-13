import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Links";

export const metadata: Metadata = { title: "Our Story" };

const VALUES = [
  {
    title: "Small Batches",
    body: "Every tray is mixed, shaped and baked by hand in quantities small enough to get right.",
  },
  {
    title: "Honest Ingredients",
    body: "Cultured butter, Belgian chocolate, free-range eggs. Nothing we wouldn't bake with at home.",
  },
  {
    title: "Baked for Today",
    body: "We bake every morning and deliver the same day across Dubai, so it arrives tasting like it should.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <section className="bg-background">
        <div className="page-container grid md:min-h-[calc(100vh-6rem)] md:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col justify-center py-16 md:pr-16">
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-foreground/75">Our Story</p>
            <h1 className="max-w-[9ch] text-[clamp(48px,5.5vw,84px)] leading-[1.02]">
              A Love for Baking. A Brighter Everyday.
            </h1>
            <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-foreground/80">
              Dough &amp; Co. was born from a simple belief — that exceptional bakes can make everyday moments a
              little more special.
            </p>
            <ButtonLink href="#values" className="mt-10 self-start">
              Our Story
            </ButtonLink>
          </div>
          <div className="relative min-h-[520px]">
            <Image
              src="/assets/mock/story.jpg"
              alt="Icing sugar being dusted over a freshly baked pastry"
              fill
              priority
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="values" className="bg-surface">
        <div className="page-container grid gap-12 py-20 md:grid-cols-3 md:py-28">
          {VALUES.map((v) => (
            <div key={v.title}>
              <h2 className="text-2xl uppercase tracking-[0.12em]">{v.title}</h2>
              <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-foreground/75">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
