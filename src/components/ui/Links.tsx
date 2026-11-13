import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/** Solid espresso button, e.g. "Shop Now →". */
export function ButtonLink({ href, children, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-4 bg-cocoa px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-background transition-colors hover:bg-foreground/85",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-3.5" strokeWidth={1.5} />
    </Link>
  );
}

/** Small uppercase text link, e.g. "Explore All →". */
export function ArrowLink({ href, children, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors hover:text-accent",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
    </Link>
  );
}
