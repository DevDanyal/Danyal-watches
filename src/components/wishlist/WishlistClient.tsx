"use client";

import { useMemo } from "react";
import ProductCard from "@/components/product/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/lib/data/products";

export default function WishlistClient({ empty }: { empty: React.ReactNode }) {
  const { ids } = useWishlist();

  const items = useMemo(
    () => products.filter((p) => ids.includes(p.id)),
    [ids]
  );

  if (items.length === 0) return <>{empty}</>;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 lg:gap-6">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}