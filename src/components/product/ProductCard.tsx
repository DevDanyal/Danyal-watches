"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, Star, Heart } from "lucide-react";
import {
  formatPrice,
  getDiscountPercent,
  getProductStock,
  getProductCode,
  type Product,
} from "@/lib/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const [hovering, setHovering] = useState(false);
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const stock = getProductStock(product);
  const outOfStock = stock === 0;

  const discount = getDiscountPercent(product);

  const handleAdd = () =>
    addItem({
      id: product.id,
      slug: product.slug,
      code: getProductCode(product),
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      regularPrice: product.regularPrice,
      image: product.images[0],
      color: product.colors[0]?.name,
    });

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card-background transition-all duration-300 hover:border-text-primary/20 hover:shadow-lg hover:shadow-black/5"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-background-secondary">
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
          {(product.badge === "sale" || discount > 0) && (
            <span className="rounded bg-sale-badge px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
              -{discount}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="rounded bg-new-badge px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
              NEW
            </span>
          )}
          {product.badge === "bestseller" && (
            <span className="rounded bg-text-primary px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
              Best Seller
            </span>
          )}
        </div>

        {outOfStock && (
          <span className="absolute inset-0 flex items-center justify-center bg-white/70 text-xs font-bold uppercase tracking-[0.25em] text-text-secondary backdrop-blur-[1px]">
            Out of Stock
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id);
          }}
          aria-label="Toggle wishlist"
          className={cn(
            "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-text-primary shadow-sm transition-all duration-300 hover:scale-110 hover:text-sale-badge",
            wishlisted && "text-sale-badge",
            "opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
          )}
        >
          <Heart className={cn("h-4 w-4", wishlisted && "fill-current")} />
        </button>

        <div className="absolute inset-x-0 bottom-0 hidden translate-y-full bg-white p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:translate-y-0 lg:block">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAdd();
            }}
            disabled={outOfStock}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-text-primary py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-sale-badge disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {outOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-0.5 text-star">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-xs font-bold text-text-primary">{product.rating}</span>
          </span>
          <span className="text-xs text-text-secondary">({product.reviews})</span>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-1 text-sm font-semibold text-text-primary hover:text-text-secondary"
        >
          {product.name}
        </Link>

        <p className="text-xs text-text-secondary">{product.subtitle}</p>

        <div className="mt-1.5 flex items-center gap-2">
          <span className="font-bold text-text-primary">
            {formatPrice(product.price)}
          </span>
          {product.regularPrice > product.price && (
            <span className="text-sm text-text-secondary line-through">
              {formatPrice(product.regularPrice)}
            </span>
          )}
          <button
            onClick={handleAdd}
            disabled={outOfStock}
            aria-label="Add to cart"
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-text-primary text-white transition-all active:scale-90 hover:bg-sale-badge disabled:cursor-not-allowed disabled:opacity-40 lg:hidden"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>

        {product.colors.length > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="h-4 w-4 cursor-pointer rounded-full border border-border transition-transform hover:scale-110"
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