import Link from "next/link";
import Image from "next/image";

export default function BrandStory() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/home/pro.jpg"
              alt="CRYSMA watch craftsmanship"
              width={1074}
              height={1354}
              className="aspect-[4/5] object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 hidden rounded-xl border border-accent-gold/30 bg-card-background px-6 py-4 shadow-xl sm:block">
            <span className="font-serif text-3xl font-bold text-accent-gold">
              25+
            </span>
            <p className="text-xs uppercase tracking-wider text-text-secondary">
              Years of Craftsmanship
            </p>
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-gold">
            Our Story
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
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
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full bg-accent-gold px-7 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105 hover:bg-accent-gold-light"
            >
              Learn More
            </Link>
            <Link
              href="/collections/men"
              className="inline-flex items-center justify-center rounded-full border border-text-secondary/40 px-7 py-3 text-sm font-bold uppercase tracking-wider text-text-primary transition-all duration-300 hover:border-accent-gold hover:text-accent-gold"
            >
              Browse Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}