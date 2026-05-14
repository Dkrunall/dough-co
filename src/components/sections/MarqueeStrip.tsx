const ITEMS = [
  "Butter Croissant",
  "Pain au Chocolat",
  "Pistachio Custard Cruffin",
  "Opera Pastry",
  "Sea Salt Caramel Tart",
  "Berry Cheesecake",
  "Butter Chicken Croissant",
  "Prawns Chettinad Danish",
  "Guilt-Free Rocher Brownie",
  "Mini Wholesome Tea Cakes",
];

const Dot = () => (
  <span className="mx-5 text-accent/50 text-[8px]">◆</span>
);

export default function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-accent/10 bg-secondary/3 py-3.5">
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-foreground/30">
              {item}
            </span>
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
}
