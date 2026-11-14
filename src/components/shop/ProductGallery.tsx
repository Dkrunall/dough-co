"use client";

import Image from "next/image";
import { useState } from "react";
import { PLACEHOLDER_IMAGE } from "@/lib/products";
import { cn } from "@/lib/utils";

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex gap-4 md:gap-5">
      {images.length > 1 && (
        <div className="flex w-14 shrink-0 flex-col gap-3 md:w-[72px]">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={cn(
                "relative aspect-[3/4] overflow-hidden border transition-colors",
                i === active ? "border-foreground/70" : "border-transparent opacity-80 hover:opacity-100",
              )}
            >
              <Image src={src} alt="" fill sizes="72px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="relative aspect-[9/16] max-h-[680px] flex-1 overflow-hidden bg-sand">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 768px) 35vw, 80vw"
          className={images[active] === PLACEHOLDER_IMAGE ? "object-contain p-[22%] opacity-40" : "object-cover"}
        />
      </div>
    </div>
  );
}
