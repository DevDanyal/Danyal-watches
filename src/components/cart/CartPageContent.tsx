"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import CartItemRow from "@/components/cart/CartItemRow";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/data/products";

export default function CartPage() {
  const { items, subtotal, count, note, setNote } = useCart();

  const total = subtotal;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-background-secondary text-text-secondary">
          <ShoppingBag className="h-10 w-10" />
        </span>
        <h1 className="text-2xl font-extrabold text-text-primary sm:text-3xl">
          Your cart is empty
        </h1>
        <p className="max-w-sm text-text-secondary">
          Discover our premium collection and find your perfect timepiece.
        </p>
        <Link
          href="/collections/men"
          className="mt-4 bg-text-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-sale-badge"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
        Your Cart{" "}
        <span className="text-base font-medium text-text-secondary">
          ({count} items)
        </span>
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div layout className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card-background px-5">
            {items.map((item) => (
              <CartItemRow
                key={`${item.id}::${item.color ?? "default"}`}
                id={item.id}
                slug={item.slug}
                color={item.color}
                code={item.code}
                image={item.image}
                name={item.name}
                subtitle={item.subtitle}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card-background p-5">
            <label htmlFor="page-order-note" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-primary">
              Order Note
            </label>
            <textarea
              id="page-order-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Add a note for your order (optional)"
              className="w-full resize-none rounded-lg border border-border bg-background-secondary px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-text-primary focus:outline-none"
            />
          </div>
        </motion.div>

        <div className="h-fit rounded-xl border border-border bg-card-background p-5 lg:sticky lg:top-24">
          <h2 className="mb-4 text-lg font-bold text-text-primary">
            Order Summary
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-text-secondary">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Shipping</span>
              <span className="text-success">FREE</span>
            </div>
            <div className="flex justify-between pt-2 text-lg font-bold text-text-primary">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-lg bg-background-secondary px-4 py-2.5 text-xs text-text-secondary">
            <Truck className="h-4 w-4 shrink-0 text-sale-badge" />
            Expected delivery in 3-5 days
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="flex flex-col items-center gap-1 rounded-lg border border-border px-2 py-2 text-center">
              <ShieldCheck className="h-4 w-4 text-sale-badge" />
              <span className="text-[10px] font-medium text-text-primary">
                1-Yr Warranty
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-lg border border-border px-2 py-2 text-center">
              <RotateCcw className="h-4 w-4 text-sale-badge" />
              <span className="text-[10px] font-medium text-text-primary">
                30-Day Returns
              </span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-5 flex w-full items-center justify-center bg-text-primary py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-sale-badge"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/collections/men"
            className="mt-2 block w-full py-2 text-center text-sm text-text-secondary hover:text-text-primary"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}