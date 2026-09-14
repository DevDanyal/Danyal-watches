"use client";

import { useState } from "react";
import Image from "next/image";
import { AlertTriangle, Search } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { SectionTitle, Card, Badge, Input, GhostBtn } from "@/components/admin/ui";

export default function AdminInventory() {
  const { products, updateProduct } = useAdmin();
  const [search, setSearch] = useState("");
  const [showLow, setShowLow] = useState(false);

  const filtered = products
    .filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => !showLow || p.stock <= 5)
    .sort((a, b) => a.stock - b.stock);

  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  return (
    <div>
      <SectionTitle
        title="Inventory"
        subtitle={`${lowStockCount} items low or out of stock`}
        action={
          <GhostBtn onClick={() => setShowLow((v) => !v)}>
            <AlertTriangle className="h-4 w-4 text-error" />
            {showLow ? "Show All" : "Low Stock Only"}
          </GhostBtn>
        }
      />

      <div className="mb-4 flex gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="h-11 w-full rounded-xl border border-background-secondary bg-background pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
          />
        </div>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-background-secondary text-xs uppercase tracking-wider text-text-secondary">
              <th className="pb-3 pr-4 font-semibold">Product</th>
              <th className="pb-3 pr-4 font-semibold">SKU</th>
              <th className="pb-3 pr-4 font-semibold">Current Stock</th>
              <th className="pb-3 font-semibold">Adjust Stock</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-background-secondary/60 last:border-0">
                <td className="flex items-center gap-3 py-3 pr-4">
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded bg-background-secondary">
                    <Image src={p.image} alt={p.name} fill sizes="36px" className="object-cover" />
                  </div>
                  <span className="truncate text-text-primary">{p.name}</span>
                </td>
                <td className="py-3 pr-4 font-montserrat text-xs font-bold text-text-secondary">{p.sku}</td>
                <td className="py-3 pr-4">
                  <Badge tone={p.stock === 0 ? "error" : p.stock <= 5 ? "gold" : "default"}>
                    {p.stock === 0 ? "Out of stock" : `${p.stock} units`}
                  </Badge>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateProduct(p.id, { stock: Math.max(0, p.stock - 1) })}
                      className="h-7 w-7 rounded-lg border border-background-secondary text-text-secondary transition-colors hover:border-error hover:text-error"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-montserrat text-sm font-bold text-text-primary">
                      {p.stock}
                    </span>
                    <button
                      onClick={() => updateProduct(p.id, { stock: p.stock + 1 })}
                      className="h-7 w-7 rounded-lg border border-background-secondary text-text-secondary transition-colors hover:border-accent-gold hover:text-accent-gold"
                    >
                      +
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-text-secondary">No products match.</p>
        )}
      </Card>
    </div>
  );
}