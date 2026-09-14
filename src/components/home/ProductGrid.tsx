import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { type Product } from "@/lib/data/products";

export default function ProductGrid({
  title,
  kicker,
  viewAllHref,
  products,
}: {
  title: string;
  kicker: string;
  viewAllHref: string;
  products: Product[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-gold">
            {kicker}
          </span>
          <h2 className="mt-2 font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            {title}
          </h2>
        </div>
        <Link
          href={viewAllHref}
          className="text-sm font-semibold uppercase tracking-wider text-accent-gold hover:text-accent-gold-light"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}