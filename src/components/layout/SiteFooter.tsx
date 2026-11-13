import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="page-container flex flex-col items-center gap-6 py-12 text-center md:flex-row md:justify-between md:text-left">
        <Image
          src="/assets/images/logo-brown.png"
          alt="Dough & Co."
          width={1011}
          height={874}
          className="h-16 w-auto"
        />
        <nav className="flex gap-8 text-[11px] font-medium uppercase tracking-[0.18em]">
          <Link href="/shop" className="hover:text-accent">Shop</Link>
          <Link href="/gifts" className="hover:text-accent">Gifts</Link>
          <Link href="/our-story" className="hover:text-accent">Our Story</Link>
        </nav>
        <p className="text-xs text-muted">© {new Date().getFullYear()} Dough &amp; Co. · Baked in Dubai</p>
      </div>
    </footer>
  );
}
