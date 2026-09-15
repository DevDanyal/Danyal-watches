"use client";

import { useSearchParams } from "next/navigation";
import { Search, SearchX } from "lucide-react";
import { searchProducts } from "@/lib/data/products";
import ProductCard from "@/components/product/ProductCard";
import PageHeader from "@/components/shared/PageHeader";

export default function SearchResults() {
  const params = useSearchParams();
  const q = params.get("q")?.trim() ?? "";

  const results = q ? searchProducts(q) : [];

  return (
    <>
      <PageHeader
        kicker="Search"
        title={q ? `Results for "${q}"` : "Search Products"}
        subtitle={
          q
            ? `${results.length} product${results.length === 1 ? "" : "s"} found`
            : "Enter a search term to find watches across our catalogue."
        }
      />

      {!q ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <Search className="h-10 w-10 text-text-secondary" />
          <p className="text-sm text-text-secondary">
            Try searching for &quot;chain&quot;, &quot;luxury&quot;, or &quot;strap&quot;.
          </p>
        </div>
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <SearchX className="h-12 w-12 text-text-secondary" />
          <h2 className="font-serif text-xl font-bold text-text-primary">
            No products found
          </h2>
          <p className="max-w-sm text-sm text-text-secondary">
            We couldn&apos;t find anything matching &quot;{q}&quot;. Try a different keyword
            or browse our collections.
          </p>
        </div>
      ) : (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}