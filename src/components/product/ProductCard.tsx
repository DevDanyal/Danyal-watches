"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { formatPrice, getDiscountPercent, type Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const [hovering, setHovering] = useState(false);

  const discount = getDiscountPercent(product);

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-background-secondary bg-card-background transition-all duration-300 hover:-translate-y-1 hover:border-accent-gold/40 hover:shadow-xl hover:shadow-black/50"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-background-secondary">
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              "object-cover transition-all duration-500 group-hover:scale-105",
              hovering && "opacity-0"
            )}
          />
        )}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              "object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
            )}
          />
        )}

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge === "sale" && (
            <span className="rounded bg-sale-badge px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              -{discount}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="rounded bg-new-badge px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              NEW
            </span>
          )}
          {product.badge === "bestseller" && (
            <span className="rounded bg-accent-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
              Best Seller
            </span>
          )}
        </div>

        <button
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-sale-badge group-hover:opacity-100"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4" />
        </button>

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-accent-gold p-3 transition-all duration-300 group-hover:translate-y-0">
          <button className="flex w-full items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-black">
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-0.5 text-accent-gold">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-xs font-semibold">{product.rating}</span>
          </span>
          <span className="text-xs text-text-secondary">({product.reviews})</span>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-1 text-sm font-medium text-text-primary hover:text-accent-gold"
        >
          {product.name}
        </Link>

        <p className="text-xs text-text-secondary">{product.subtitle}</p>

        <div className="mt-1.5 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-montserrat text-sm font-bold text-text-primary">
              {formatPrice(product.price)}
            </span>
            {product.regularPrice > product.price && (
              <span className="text-xs text-text-secondary line-through">
                {formatPrice(product.regularPrice)}
              </span>
            )}
          </div>
        </div>

        {product.colors.length > 0 && (
          <div className="mt-1.5 flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="h-4 w-4 cursor-pointer rounded-full border border-white/20 transition-transform hover:scale-110"
                style={{ backgroundColor: color.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-text-secondary">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}