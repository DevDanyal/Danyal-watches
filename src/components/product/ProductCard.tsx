"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, Star, Heart } from "lucide-react";
import {
  formatPrice,
  getDiscountPercent,
  getProductStock,
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
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      regularPrice: product.regularPrice,
      image: product.images[0],
      color: product.colors[0]?.name,
    });

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card-background transition-all duration-300 hover:-translate-y-1 hover:border-accent-gold/50 hover:shadow-2xl hover:shadow-black/30"
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

        {outOfStock && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-xs font-bold uppercase tracking-[0.25em] text-white backdrop-blur-[1px]">
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
            "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:scale-110",
            wishlisted
              ? "bg-sale-badge text-white"
              : "bg-black/50 text-white backdrop-blur-sm hover:bg-sale-badge",
            "opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
          )}
        >
          <Heart className={cn("h-4 w-4", wishlisted && "fill-current")} />
        </button>

        <div className="absolute inset-x-0 bottom-0 hidden translate-y-full border-t border-border bg-black/90 p-3 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 lg:block">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAdd();
            }}
            disabled={outOfStock}
            className="flex w-full items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-gold disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {outOfStock ? "Out of Stock" : "Add to Cart"}
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
          <button
            onClick={handleAdd}
            disabled={outOfStock}
            aria-label="Add to cart"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-gold text-black transition-all active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 lg:hidden"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
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