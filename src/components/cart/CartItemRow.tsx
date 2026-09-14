"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/data/products";

export default function CartItemRow({
  id,
  slug,
  color,
  image,
  name,
  subtitle,
  price,
  quantity,
}: {
  id: string;
  slug: string;
  color?: string;
  image: string;
  name: string;
  subtitle: string;
  price: number;
  quantity: number;
}) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="flex gap-4 border-b border-background-secondary py-4">
      <Link
        href={`/products/${slug}`}
        className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-background-secondary"
      >
        <Image src={image} alt={name} fill sizes="80px" className="object-cover" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/products/${slug}`}
              className="line-clamp-1 text-sm font-medium text-text-primary hover:text-accent-gold"
            >
              {name}
            </Link>
            <p className="mt-0.5 text-xs text-text-secondary">{subtitle}</p>
            {color && (
              <p className="mt-0.5 text-xs text-text-secondary">{color}</p>
            )}
          </div>
          <button
            onClick={() => removeItem(id, color)}
            aria-label="Remove item"
            className="text-text-secondary transition-colors hover:text-sale-badge"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center rounded-full border border-background-secondary">
            <button
              onClick={() => updateQuantity(id, color, -1)}
              aria-label="Decrease quantity"
              className="flex h-8 w-8 items-center justify-center text-text-primary hover:text-accent-gold"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-7 text-center text-sm font-semibold tabular-nums text-text-primary">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(id, color, 1)}
              aria-label="Increase quantity"
              className="flex h-8 w-8 items-center justify-center text-text-primary hover:text-accent-gold"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="font-montserrat text-sm font-bold text-text-primary">
            {formatPrice(price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}