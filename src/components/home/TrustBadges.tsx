import { Truck, RotateCcw, ShieldCheck, BadgeCheck } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Delivery",
    subtitle: "Nationwide across Pakistan",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    subtitle: "Hassle-free exchange & refund",
  },
  {
    icon: ShieldCheck,
    title: "1-Year Warranty",
    subtitle: "International warranty included",
  },
  {
    icon: BadgeCheck,
    title: "Cash on Delivery",
    subtitle: "COD, JazzCash, EasyPaisa, Bank",
  },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {badges.map(({ icon: Icon, title, subtitle }) => (
          <div
            key={title}
            className="flex items-center gap-3.5"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-background-secondary text-sale-badge">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-text-primary">{title}</h3>
              <p className="mt-0.5 text-xs text-text-secondary">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}