"use client";

import { useMemo } from "react";
import ProductCarousel from "@/components/home/ProductCarousel";
import ProductGrid from "@/components/home/ProductGrid";
import { useCatalogProducts } from "@/lib/catalog";
import type { Product } from "@/lib/data/products";

export default function CatalogSection({
  type,
  layout,
  seed,
  title,
  kicker,
  viewAllHref,
}: {
  type: "featured" | "best" | "new";
  layout: "carousel" | "grid";
  seed: Product[];
  title: string;
  kicker: string;
  viewAllHref: string;
}) {
  const catalog = useCatalogProducts();

  const products = useMemo(() => {
    let list = [...catalog];
    if (type === "featured") list = list.slice(0, seed.length || 8);
    if (type === "best") list = list.filter((p) => p.isBestSeller);
    if (type === "new") list = list.filter((p) => p.isNew);
    if (!list.length) list = catalog.slice(0, 8);
    return list;
  }, [type, catalog, seed.length]);

  if (layout === "grid") {
    return (
      <ProductGrid
        title={title}
        kicker={kicker}
        viewAllHref={viewAllHref}
        products={products}
      />
    );
  }

  return (
    <ProductCarousel
      title={title}
      kicker={kicker}
      viewAllHref={viewAllHref}
      products={products}
    />
  );
}