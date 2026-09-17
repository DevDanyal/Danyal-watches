"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, type Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";

export default function StickyAddToCart({
  product,
  color,
  quantity,
}: {
  product: Product;
  color?: string;
  quantity: number;
}) {
  const { addItem } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > 500);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-xs text-text-secondary">{product.name}</span>
          <span className="text-lg font-bold text-text-primary">
            {formatPrice(product.price)}
          </span>
        </div>
        <button
          onClick={() =>
            addItem(
              {
                id: product.id,
                slug: product.slug,
                name: product.name,
                subtitle: product.subtitle,
                price: product.price,
                regularPrice: product.regularPrice,
                image: product.images[0],
                color,
              },
              quantity
            )
          }
          className="flex flex-1 items-center justify-center gap-2 bg-text-primary py-3.5 text-sm font-bold uppercase tracking-wider text-white active:scale-95"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}