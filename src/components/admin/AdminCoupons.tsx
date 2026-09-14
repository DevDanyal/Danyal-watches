"use client";

import { useState } from "react";
import { Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { useAdmin, type Coupon } from "@/context/AdminContext";
import { SectionTitle, Card, Badge, Input, Select, PrimaryBtn, DangerBtn } from "@/components/admin/ui";

export default function AdminCoupons() {
  const { coupons, addCoupon, toggleCoupon, deleteCoupon } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: "", type: "percentage" as Coupon["type"], value: 10, minOrder: 0, expires: "", limit: 100 });

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    addCoupon({ ...form, code: form.code.toUpperCase(), active: true });
    setShowForm(false);
    setForm({ code: "", type: "percentage", value: 10, minOrder: 0, expires: "", limit: 100 });
  };

  return (
    <div>
      <SectionTitle
        title="Coupons & Discounts"
        subtitle={`${coupons.length} coupon codes`}
        action={
          <PrimaryBtn onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4" /> New Coupon
          </PrimaryBtn>
        }
      />

      {showForm && (
        <Card className="mb-6 border-accent-gold/30">
          <form onSubmit={save} className="grid gap-4 sm:grid-cols-4">
            <Input
              label="Code"
              required
              placeholder="e.g. SUMMER15"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
            />
            <Select label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Coupon["type"] })}>
              <option value="percentage">Percentage</option>
              <option value="flat">Flat (PKR)</option>
            </Select>
            <Input
              label={form.type === "percentage" ? "% Discount" : "Amount (PKR)"}
              type="number"
              min={0}
              required
              value={form.value}
              onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
            />
            <Input
              label="Min Order"
              type="number"
              min={0}
              value={form.minOrder}
              onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })}
            />
            <Input
              label="Expiry"
              type="text"
              placeholder="Dec 31, 2026"
              value={form.expires}
              onChange={(e) => setForm({ ...form, expires: e.target.value })}
              className="sm:col-span-2"
            />
            <Input
              label="Usage Limit"
              type="number"
              min={0}
              value={form.limit}
              onChange={(e) => setForm({ ...form, limit: Number(e.target.value) })}
            />
            <div className="flex gap-3 sm:col-span-4">
              <PrimaryBtn type="submit">Create Coupon</PrimaryBtn>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-full border border-background-secondary px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary">
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-background-secondary text-xs uppercase tracking-wider text-text-secondary">
              <th className="pb-3 pr-4 font-semibold">Code</th>
              <th className="pb-3 pr-4 font-semibold">Discount</th>
              <th className="pb-3 pr-4 font-semibold">Min Order</th>
              <th className="pb-3 pr-4 font-semibold">Usage</th>
              <th className="pb-3 pr-4 font-semibold">Expires</th>
              <th className="pb-3 pr-4 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.code} className="border-b border-background-secondary/60 last:border-0">
                <td className="py-3 pr-4 font-montserrat text-xs font-bold text-accent-gold">{c.code}</td>
                <td className="py-3 pr-4 text-text-primary">
                  {c.type === "percentage" ? `${c.value}%` : `Rs.${c.value.toLocaleString()}`}
                </td>
                <td className="py-3 pr-4 text-text-secondary">Rs.{c.minOrder.toLocaleString()}</td>
                <td className="py-3 pr-4 text-text-secondary">{c.used}/{c.limit}</td>
                <td className="py-3 pr-4 text-text-secondary">{c.expires}</td>
                <td className="py-3 pr-4">
                  <Badge tone={c.active ? "success" : "muted"}>{c.active ? "Active" : "Inactive"}</Badge>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleCoupon(c.code)} className="text-text-secondary hover:text-accent-gold" title="Toggle">
                      {c.active ? <ToggleRight className="h-5 w-5 text-success" /> : <ToggleLeft className="h-5 w-5" />}
                    </button>
                    <button onClick={() => deleteCoupon(c.code)} className="text-text-secondary hover:text-error" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {coupons.length === 0 && (
          <p className="py-8 text-center text-sm text-text-secondary">No coupons created yet.</p>
        )}
      </Card>
    </div>
  );
}