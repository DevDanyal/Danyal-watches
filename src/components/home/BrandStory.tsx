import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, ShieldCheck, Truck } from "lucide-react";

const highlights = [
  {
    icon: BadgeCheck,
    text: "Authentic CRYSMA timepieces",
  },
  {
    icon: ShieldCheck,
    text: "1-year international warranty",
  },
  {
    icon: Truck,
    text: "Free delivery anywhere in Pakistan",
  },
];

export default function BrandStory() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-border">
            <Image
              src="/images/home/crysma-bloom.jpg"
              alt="CRYSMA luxury watch"
              width={600}
              height={800}
              className="aspect-[4/5] w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 hidden rounded-lg border border-border bg-card-background px-6 py-4 shadow-lg shadow-black/5 sm:block">
            <span className="text-3xl font-extrabold text-sale-badge">25+</span>
            <p className="text-xs uppercase tracking-wider text-text-secondary">
              Years of Craftsmanship
            </p>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-sale-badge">
            Our Story
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-4xl">
            Crafting Timeless Pieces Since 1998
          </h2>
          <p className="mt-6 leading-relaxed text-text-secondary">
            At CRYSMA, we believe a watch is more than a timekeeper — it is a
            statement. For over two decades, we have combined Swiss-inspired
            design with exceptional value, delivering precision-crafted
            timepieces for men, women, and couples across Pakistan.
          </p>
          <p className="mt-4 leading-relaxed text-text-secondary">
            Every watch in our collection is a testament to quality, featuring
            premium materials, reliable movements, and a design language that
            never goes out of style.
          </p>

          <ul className="mt-7 space-y-3">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <Icon className="h-5 w-5 shrink-0 text-sale-badge" />
                <span className="text-sm font-medium text-text-primary">
                  {text}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center justify-center bg-text-primary px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-sale-badge"
            >
              Learn More
            </Link>
            <Link
              href="/collections/men"
              className="inline-flex items-center justify-center border border-border px-7 py-3 text-sm font-bold uppercase tracking-wider text-text-primary transition-all duration-300 hover:border-text-primary"
            >
              Browse Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}