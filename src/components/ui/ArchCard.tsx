import Image from "next/image";
import Link from "next/link";
import { PLACEHOLDER_IMAGE } from "@/lib/products";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  image: string;
  title: string;
  /** Row under the title, e.g. a "Shop →" link or price. */
  children?: React.ReactNode;
};

/** Arch-topped image card used for the home collection row and the shop grid. */
export default function ArchCard({ href, image, title, children }: Props) {
  return (
    <article className="group flex flex-col">
      <Link href={href} className="relative block aspect-[3/4] overflow-hidden rounded-t-full bg-sand">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className={cn(
            "transition-transform duration-700 group-hover:scale-105",
            image === PLACEHOLDER_IMAGE ? "object-contain p-[22%] opacity-40" : "object-cover",
          )}
        />
      </Link>
      <h3 className="mt-6 text-[15px] uppercase leading-snug tracking-[0.2em] md:text-lg">
        <Link href={href} className="transition-colors hover:text-accent">
          {title}
        </Link>
      </h3>
      {/* Pinned to the bottom so rows line up when titles wrap differently. */}
      <div className="mt-auto">{children}</div>
    </article>
  );
}
