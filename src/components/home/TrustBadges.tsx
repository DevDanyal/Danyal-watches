import { Truck, RotateCcw, ShieldCheck, Lock } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: "On all orders nationwide",
  },
  {
    icon: RotateCcw,
    title: "7-Day Returns",
    subtitle: "Hassle-free exchange",
  },
  {
    icon: ShieldCheck,
    title: "1 Year Warranty",
    subtitle: "On every timepiece",
  },
  {
    icon: Lock,
    title: "Secure Payment",
    subtitle: "COD · JazzCash · EasyPaisa",
  },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-background-secondary bg-background-secondary">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {badges.map(({ icon: Icon, title, subtitle }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-3 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent-gold/30 bg-accent-gold/10 text-accent-gold">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">
                {title}
              </h3>
              <p className="mt-1 text-xs text-text-secondary">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}