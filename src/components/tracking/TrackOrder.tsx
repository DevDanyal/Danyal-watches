"use client";

import { useState } from "react";
import { PackageSearch, Truck, CheckCircle2, Package, Search } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const statuses = [
  { label: "Order Placed", icon: Package },
  { label: "Processing", icon: PackageSearch },
  { label: "Shipped", icon: Truck },
  { label: "Delivered", icon: CheckCircle2 },
];

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-gold">
          Track Your Order
        </span>
        <h1 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          Where is my order?
        </h1>
        <p className="mt-4 text-sm text-text-secondary">
          Enter your order ID (e.g. CRYSMA-XXXXXX) to see the latest status.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="CRYSMA-XXXXXX"
          className="flex-1 rounded-full border border-background-secondary bg-card-background px-6 py-3.5 text-sm uppercase tracking-wider text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-full bg-accent-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-105 hover:bg-accent-gold-light"
        >
          <Search className="h-4 w-4" />
          Track
        </button>
      </form>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 overflow-hidden rounded-xl border border-background-secondary bg-card-background"
        >
          <div className="border-b border-background-secondary px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-text-secondary">
                  Order ID
                </p>
                <p className="font-montserrat text-lg font-bold text-accent-gold">
                  {orderId.toUpperCase()}
                </p>
              </div>
              <span className="rounded-full bg-accent-gold/15 px-3 py-1 text-xs font-bold uppercase text-accent-gold">
                In Transit
              </span>
            </div>
          </div>

          <div className="px-6 py-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              {statuses.map((s, i) => {
                const Icon = s.icon;
                const done = i < 2;
                const current = i === 2;
                const line = i < statuses.length - 1;
                return (
                  <div key={s.label} className="flex items-center gap-4 sm:flex-1 sm:flex-col sm:items-center sm:gap-3">
                    <div className="flex items-center gap-4 sm:flex-col sm:items-center">
                      <span
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors",
                          done
                            ? "bg-success text-white"
                            : current
                              ? "bg-accent-gold text-black"
                              : "bg-background-secondary text-text-secondary"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      {line && (
                        <div
                          className={cn(
                            "h-px w-10 sm:h-1 sm:w-full",
                            done ? "bg-success" : "bg-background-secondary"
                          )}
                        />
                      )}
                    </div>
                    <div className="sm:mt-2 sm:text-center">
                      <p
                        className={cn(
                          "text-sm font-semibold",
                          current ? "text-accent-gold" : done ? "text-text-primary" : "text-text-secondary"
                        )}
                      >
                        {s.label}
                      </p>
                      {i < 2 && (
                        <p className="mt-0.5 text-xs text-text-secondary">
                          {new Date(Date.now() - (3 - i) * 86400000).toLocaleDateString("en-PK", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      )}
                      {current && (
                        <p className="mt-0.5 text-xs text-accent-gold">Today</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-background-secondary bg-background-secondary px-6 py-4 text-sm text-text-secondary">
            Estimated delivery: <span className="text-text-primary">3-5 business days</span>
          </div>
        </motion.div>
      )}

      {!submitted && (
        <p className="mt-6 text-center text-xs text-text-secondary">
          Order ID was shared with you on the confirmation page after purchase.
        </p>
      )}
    </div>
  );
}