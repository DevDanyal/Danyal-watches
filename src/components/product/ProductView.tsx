"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import ProductDetail from "@/components/product/ProductDetail";
import Reviews from "@/components/product/Reviews";
import StickyAddToCart from "@/components/product/StickyAddToCart";
import { useCatalog } from "@/lib/catalog";
import type { Product } from "@/lib/data/products";

function ProductNotFound({ slug }: { slug: string }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-28 text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-text-secondary">
        Product Unavailable
      </span>
      <h1 className="text-3xl font-bold text-text-primary">
        This watch is no longer available
      </h1>
      <p className="text-sm text-text-secondary">
        The product you were looking for has been removed or is not yet
        published. Browse the current catalogue instead.
      </p>
      <p className="font-mono text-xs text-text-secondary">/{slug}</p>
      <Link
        href="/collections/all"
        className="mt-2 rounded-full bg-text-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-sale-badge"
      >
        Browse Watches
      </Link>
    </div>
  );
}

export default function ProductView({
  product,
  slug,
  related,
}: {
  product?: Product;
  slug: string;
  related: Product[];
}) {
  const { products: catalogProducts, loaded } = useCatalog();
  const live = catalogProducts.find((p) => p.slug === slug);
  const effective = live ?? product;

  const relatedList = related.filter((r) =>
    catalogProducts.some((c) => c.slug === r.slug)
  );

  const [color, setColor] = useState(effective?.colors[0]?.name);
  const [quantity, setQuantity] = useState(1);

  const handleSelectionChange = useCallback(
    (nextColor: string | undefined, nextQuantity: number) => {
      setColor(nextColor);
      setQuantity(nextQuantity);
    },
    []
  );

  if ((loaded && !live) || !effective) {
    return <ProductNotFound slug={slug} />;
  }

  return (
    <>
      <ProductDetail
        product={effective}
        related={relatedList}
        onSelectionChange={handleSelectionChange}
      />
      <Reviews product={effective} />
      <StickyAddToCart product={effective} color={color} quantity={quantity} />
    </>
  );
}