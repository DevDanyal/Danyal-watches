"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Truck } from "lucide-react";
import { useAdmin, type AdminOrder } from "@/context/AdminContext";
import { formatPrice } from "@/lib/data/products";
import { SectionTitle, Card, Badge, Select } from "@/components/admin/ui";

const statusOptions: AdminOrder["status"][] = ["pending", "processing", "shipped", "delivered", "cancelled"];
const statusTone: Record<string, "gold" | "success" | "muted" | "error"> = {
  pending: "gold",
  processing: "gold",
  shipped: "success",
  delivered: "success",
  cancelled: "error",
};

export default function AdminOrders() {
  const { orders, setOrderStatus } = useAdmin();
  const [filter, setFilter] = useState<AdminOrder["status"] | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = orders.filter((o) => filter === "all" || o.status === filter);

  return (
    <div>
      <SectionTitle title="Orders" subtitle={`${orders.length} total orders`} />

      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", ...statusOptions] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              filter === s ? "bg-accent-gold text-black" : "border border-background-secondary text-text-secondary hover:text-text-primary"
            }`}
          >
            {s} {s !== "all" && `(${orders.filter((o) => o.status === s).length})`}
          </button>
        ))}
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-background-secondary text-xs uppercase tracking-wider text-text-secondary">
              <th className="pb-3 pr-4 font-semibold">Order</th>
              <th className="pb-3 pr-4 font-semibold">Customer</th>
              <th className="pb-3 pr-4 font-semibold">Items</th>
              <th className="pb-3 pr-4 font-semibold">Date</th>
              <th className="pb-3 pr-4 font-semibold">Total</th>
              <th className="pb-3 pr-4 font-semibold">Payment</th>
              <th className="pb-3 pr-4 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-background-secondary/60 last:border-0">
                <td className="py-3 pr-4 font-montserrat text-xs font-bold text-accent-gold">{o.id}</td>
                <td className="py-3 pr-4">
                  <p className="text-text-primary">{o.customer}</p>
                  <p className="text-xs text-text-secondary">{o.email}</p>
                </td>
                <td className="py-3 pr-4 text-text-secondary">{o.items}</td>
                <td className="py-3 pr-4 text-text-secondary">
                  {new Date(o.date).toLocaleDateString("en-PK", { day: "numeric", month: "short" })}
                </td>
                <td className="py-3 pr-4 font-montserrat font-bold text-text-primary">{formatPrice(o.total)}</td>
                <td className="py-3 pr-4">
                  <Badge tone="muted">{o.payment}</Badge>
                </td>
                <td className="py-3 pr-4">
                  <Badge tone={statusTone[o.status]}>{o.status}</Badge>
                </td>
                <td className="py-3">
                  <Select
                    value={o.status}
                    onChange={(e) => setOrderStatus(o.id, e.target.value as AdminOrder["status"])}
                    className="!h-9 w-36 !rounded-lg !text-xs"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-text-secondary">No orders match this filter.</p>
        )}
      </Card>
    </div>
  );
}