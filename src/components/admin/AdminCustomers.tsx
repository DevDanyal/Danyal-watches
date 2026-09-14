"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { formatPrice } from "@/lib/data/products";
import { SectionTitle, Card, Badge } from "@/components/admin/ui";

export default function AdminCustomers() {
  const { customers } = useAdmin();
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <SectionTitle title="Customers" subtitle={`${customers.length} total customers`} />

      <div className="mb-4 flex gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="h-11 w-full rounded-xl border border-background-secondary bg-background pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
          />
        </div>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-background-secondary text-xs uppercase tracking-wider text-text-secondary">
              <th className="pb-3 pr-4 font-semibold">Customer</th>
              <th className="pb-3 pr-4 font-semibold">Phone</th>
              <th className="pb-3 pr-4 font-semibold">City</th>
              <th className="pb-3 pr-4 font-semibold">Orders</th>
              <th className="pb-3 font-semibold">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.email} className="border-b border-background-secondary/60 last:border-0">
                <td className="py-3 pr-4">
                  <p className="text-text-primary">{c.name}</p>
                  <p className="text-xs text-text-secondary">{c.email}</p>
                </td>
                <td className="py-3 pr-4 text-text-secondary">{c.phone}</td>
                <td className="py-3 pr-4 text-text-secondary">{c.city}</td>
                <td className="py-3 pr-4 font-montserrat font-bold text-text-primary">{c.orders}</td>
                <td className="py-3 font-montserrat font-bold text-text-primary">{formatPrice(c.spent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-text-secondary">No customers match your search.</p>
        )}
      </Card>
    </div>
  );
}