import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-sale-badge">
            {kicker}
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
            {title}
          </h2>
        </div>
        <Link
          href={viewAllHref}
          className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-text-primary underline underline-offset-4 transition-colors hover:text-sale-badge"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 md:gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}