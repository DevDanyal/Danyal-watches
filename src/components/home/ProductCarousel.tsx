"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { type Product } from "@/lib/data/products";

export default function ProductCarousel({
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? el.clientWidth * 0.8 : -el.clientWidth * 0.8, behavior: "smooth" });
  };

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
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card-background text-text-primary transition-all hover:border-text-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card-background text-text-primary transition-all hover:border-text-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <Link
            href={viewAllHref}
            className="hidden items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-text-primary underline underline-offset-4 transition-colors hover:text-sale-badge sm:flex"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[70vw] flex-none snap-start sm:w-[280px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}