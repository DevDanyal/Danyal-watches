"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import CartItemRow from "@/components/cart/CartItemRow";
import { useCart } from "@/context/CartContext";
import { formatPrice, products } from "@/lib/data/products";

export default function CartDrawer() {
  const { items, subtotal, isOpen, closeCart } = useCart();
  const [note, setNote] = useState("");

  const shipping = 0; // free shipping on all orders
  const total = subtotal + shipping;

  const upsell = products.filter((p) => !items.some((i) => i.id === p.id)).slice(0, 2);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full flex-col border-l border-border bg-background shadow-2xl shadow-black/50 sm:w-[440px]"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="text-xl font-extrabold tracking-tight text-text-primary">
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-background-secondary text-text-primary transition-colors hover:text-sale-badge"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-background-secondary text-text-secondary">
                  <ShoppingBag className="h-9 w-9" />
                </span>
                <p className="text-lg font-bold text-text-primary">
                  Your cart is empty
                </p>
                <p className="text-sm text-text-secondary">
                  Discover our premium collection and find your perfect timepiece.
                </p>
                <Link
                  href="/collections/men"
                  onClick={closeCart}
                  className="mt-2 bg-text-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-sale-badge"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5">
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

                  <div className="grid grid-cols-3 gap-2 py-4">
                    <div className="flex flex-col items-center gap-1 rounded-lg border border-border bg-background-secondary px-2 py-2.5 text-center">
                      <Truck className="h-4 w-4 text-sale-badge" />
                      <span className="text-[10px] font-medium text-text-primary">
                        Free Shipping
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-lg border border-border bg-background-secondary px-2 py-2.5 text-center">
                      <RotateCcw className="h-4 w-4 text-sale-badge" />
                      <span className="text-[10px] font-medium text-text-primary">
                        30-Day Returns
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-lg border border-border bg-background-secondary px-2 py-2.5 text-center">
                      <ShieldCheck className="h-4 w-4 text-sale-badge" />
                      <span className="text-[10px] font-medium text-text-primary">
                        1-Yr Warranty
                      </span>
                    </div>
                  </div>

                  <div className="pb-4">
                    <label htmlFor="order-note" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-primary">
                      Order Note
                    </label>
                    <textarea
                      id="order-note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={2}
                      placeholder="Add a note for your order (optional)"
                      className="w-full resize-none rounded-lg border border-border bg-card-background px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-text-primary focus:outline-none"
                    />
                  </div>

                  {upsell.length > 0 && (
                    <div className="border-t border-border py-4">
                      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-text-secondary">
                        You may also like
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {upsell.map((p) => (
                          <Link
                            key={p.id}
                            href={`/products/${p.slug}`}
                            onClick={closeCart}
                            className="group flex items-center gap-3 rounded-lg border border-border bg-card-background p-2.5 transition-colors hover:border-text-primary/30"
                          >
                            <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-md bg-background-secondary">
                              <Image
                                src={p.images[0]}
                                alt={p.name}
                                fill
                                sizes="48px"
                                className="object-cover group-hover:scale-105"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="line-clamp-1 text-xs font-medium text-text-primary group-hover:text-sale-badge">
                                {p.name}
                              </p>
                              <p className="mt-0.5 text-xs font-bold text-text-primary">
                                {formatPrice(p.price)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-border px-5 py-4">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-text-secondary">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Shipping</span>
                      <span className="text-success">{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between pt-2 text-base font-bold text-text-primary">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="mt-4 flex w-full items-center justify-center bg-text-primary py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-sale-badge"
                  >
                    Checkout
                  </Link>
                  <button
                    onClick={closeCart}
                    className="mt-2 w-full py-2 text-center text-sm text-text-secondary hover:text-text-primary"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}