"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  PackageSearch,
  Truck,
  CheckCircle2,
  Package,
  Search,
  XCircle,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/data/products";
import { dbOrderToSavedOrder } from "@/lib/orderMap";
import { cn } from "@/lib/utils";
import type { SavedOrder } from "@/components/checkout/CheckoutClient";

const statusSteps = ["pending", "processing", "shipped", "delivered", "cancelled"];

const statusMeta: Record<string, { label: string; color: string; icon: typeof Package }> = {
  pending: { label: "Order Placed", color: "bg-background-secondary text-text-primary", icon: Package },
  processing: { label: "Processing", color: "bg-background-secondary text-text-primary", icon: PackageSearch },
  shipped: { label: "Shipped", color: "bg-success/15 text-success", icon: Truck },
  delivered: { label: "Delivered", color: "bg-success/15 text-success", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-sale-badge/15 text-sale-badge", icon: XCircle },
};

type LookedUp = {
  order: SavedOrder;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
};

function readLocalOrders(): LookedUp[] {
  try {
    const raw = window.localStorage.getItem("danyal_orders") ?? "[]";
    const orders = JSON.parse(raw) as SavedOrder[];
    return orders.map((o) => ({
      order: o,
      status: (o.status ?? "pending") as LookedUp["status"],
    }));
  } catch {
    return [];
  }
}

function TrackResult({ result }: { result: LookedUp }) {
  const { order, status } = result;
  const cancelled = status === "cancelled";
  const currentIndex = statusSteps.indexOf(status);
  const visibleSteps = cancelled ? statusSteps : statusSteps.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 overflow-hidden rounded-xl border border-border bg-card-background"
    >
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-text-secondary">Order ID</p>
            <p className="text-lg font-bold text-text-primary">{order.orderId}</p>
          </div>
          <span className={cn("rounded-full px-3 py-1 text-xs font-bold uppercase", statusMeta[status].color)}>
            {statusMeta[status].label}
          </span>
        </div>
        <p className="mt-2 text-xs text-text-secondary">
          Placed {new Date(order.date).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      <div className="px-6 py-8">
        {cancelled ? (
          <div className="flex items-center gap-3 text-sale-badge">
            <XCircle className="h-6 w-6" />
            <p className="text-sm font-medium">This order was cancelled.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {visibleSteps.map((s, i) => {
              const Icon = statusMeta[s].icon;
              const done = i < currentIndex;
              const current = i === currentIndex;
              const line = i < visibleSteps.length - 1;
              return (
                <div key={s} className="flex items-center gap-4 sm:flex-1 sm:flex-col sm:items-center sm:gap-3">
                  <div className="flex items-center gap-4 sm:flex-col sm:items-center">
                    <span
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors",
                        done
                          ? "bg-success text-white"
                          : current
                            ? "bg-text-primary text-white"
                            : "bg-background-secondary text-text-secondary"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    {line && (
                      <div className={cn("h-px w-10 sm:h-1 sm:w-full", done ? "bg-success" : "bg-background-secondary")} />
                    )}
                  </div>
                  <div className="sm:mt-2 sm:text-center">
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        current ? "text-text-primary" : done ? "text-text-primary" : "text-text-secondary"
                      )}
                    >
                      {statusMeta[s].label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-border px-6 py-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Items ({order.items.length})
        </p>
        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div key={`${item.id}-${i}`} className="flex items-center gap-3">
              <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-background-secondary">
                <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm text-text-primary">{item.name}</p>
                <p className="text-xs text-text-secondary">
                  {item.quantity} × {formatPrice(item.price)}
                </p>
              </div>
              <span className="text-sm font-bold text-text-primary">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-text-secondary">
            {order.paymentMethod.toUpperCase()} · {order.shipping.city || "—"}
          </span>
          <span className="text-base font-bold text-text-primary">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>

      {!cancelled && status !== "delivered" && (
        <div className="border-t border-border bg-background-secondary px-6 py-4 text-sm text-text-secondary">
          Estimated delivery: <span className="text-text-primary">3-5 business days</span>
        </div>
      )}
    </motion.div>
  );
}

export default function TrackOrder({
  initialOrderId = "",
}: {
  initialOrderId?: string;
}) {
  const [orderId, setOrderId] = useState(initialOrderId);
  const [result, setResult] = useState<LookedUp[] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const search = async (q: string) => {
    const query = q.trim().toUpperCase();
    if (!query) return;
    setLoading(true);
    setNotFound(false);
    setResult(null);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(query)}`, {
        cache: "no-store",
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.data) {
        setResult([
          { order: dbOrderToSavedOrder(json.data), status: json.data.status ?? "pending" },
        ]);
        setLoading(false);
        return;
      }
    } catch {
      // fall through to local orders
    }

    window.setTimeout(() => {
      const matches = readLocalOrders().filter(
        (r) => r.order.orderId.toUpperCase() === query
      );
      if (matches.length > 0) {
        setResult(matches);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }, 450);
  };

  useEffect(() => {
    if (!initialOrderId.trim()) return;
    const timer = window.setTimeout(() => search(initialOrderId), 0);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(orderId);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-text-primary">
          Track Your Order
        </span>
        <h1 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
          Where is my order?
        </h1>
        <p className="mt-4 text-sm text-text-secondary">
          Enter the order ID you received on the confirmation page to see its
          live status.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Danyal-XXXXXX"
          className="flex-1 rounded-full border border-border bg-card-background px-6 py-3.5 text-sm uppercase tracking-wider text-text-primary placeholder:text-text-secondary focus:border-text-primary focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-full bg-text-primary px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-sale-badge disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Track
        </button>
      </form>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.p
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 text-center text-sm text-text-secondary"
          >
            Looking up your order…
          </motion.p>
        )}

        {notFound && (
          <motion.div
            key="notfound"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-10 rounded-xl border border-border bg-card-background px-6 py-10 text-center"
          >
            <p className="text-xl text-text-primary">Order not found</p>
            <p className="mt-2 text-sm text-text-secondary">
              We couldn&apos;t find an order with ID{" "}
              <span className="text-text-primary">{orderId.toUpperCase()}</span>. Please double-check
              the ID from your confirmation page.
            </p>
          </motion.div>
        )}

        {result &&
          result.map((r) => <TrackResult key={r.order.orderId} result={r} />)}
      </AnimatePresence>

      {!result && !notFound && !loading && (
        <p className="mt-6 text-center text-xs text-text-secondary">
          Order ID was shared with you on the confirmation page after purchase.
        </p>
      )}
    </div>
  );
}
