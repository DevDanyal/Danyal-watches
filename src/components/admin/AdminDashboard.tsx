"use client";

import Link from "next/link";
import {
  Banknote,
  ShoppingCart,
  Package,
  Users,
  AlertTriangle,
  TrendingUp,
  Clock,
  Percent,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { StatCard, Card, Badge } from "@/components/admin/ui";

const revenueSeries = [18, 32, 28, 45, 38, 52, 60, 55, 72, 68, 85, 98];
const orderSeries = [6, 9, 8, 12, 11, 14, 16, 15, 19, 18, 22, 27];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function LineChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const step = 100 / (data.length - 1);
  const points = data
    .map((d, i) => `${(i * step).toFixed(1)},${100 - (d / max) * 92}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-24 w-full">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points={`0,100 ${points} 100,100`}
        fill={color}
        opacity="0.08"
        stroke="none"
      />
    </svg>
  );
}

export default function AdminDashboard() {
  const { products, orders, customers, coupons } = useAdmin();

  const revenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((a, o) => a + o.total, 0);
  const lowStock = products.filter((p) => p.stock <= 5);
  const recent = [...orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  const statusTone: Record<string, "gold" | "success" | "muted" | "error"> = {
    pending: "gold",
    processing: "gold",
    shipped: "success",
    delivered: "success",
    cancelled: "error",
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Overview of your store performance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={`Rs.${revenue.toLocaleString()}`} change="12.5% vs last week" icon={<Banknote className="h-5 w-5" />} />
        <StatCard label="Total Orders" value={String(orders.length)} change="8.2% vs last week" icon={<ShoppingCart className="h-5 w-5" />} />
        <StatCard label="Products" value={String(products.length)} icon={<Package className="h-5 w-5" />} />
        <StatCard label="Customers" value={String(customers.length)} change="3.1% vs last week" icon={<Users className="h-5 w-5" />} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-text-primary">Sales Overview</h2>
            <span className="flex items-center gap-1 text-xs font-semibold text-success">
              <TrendingUp className="h-3.5 w-3.5" />
              +18.4% this week
            </span>
          </div>
          <LineChart data={revenueSeries} color="#C9A96E" />
          <div className="mt-2 flex justify-between border-t border-background-secondary pt-3">
            {days.map((d) => (
              <span key={d} className="text-[10px] text-text-secondary">
                {d}
              </span>
            ))}
          </div>
          <p className="mt-1 text-[10px] text-text-secondary">
            Revenue trend (thousands PKR)
          </p>
          <h2 className="mt-6 font-serif text-lg font-bold text-text-primary">Orders</h2>
          <LineChart data={orderSeries} color="#2D6A4F" />
        </Card>

        <div className="space-y-4">
          <Card>
            <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-text-primary">
              <AlertTriangle className="h-4 w-4 text-error" />
              Low Stock Alerts
            </h2>
            <div className="mt-3 space-y-2.5">
              {lowStock.length === 0 && (
                <p className="text-sm text-text-secondary">All products sufficiently stocked.</p>
              )}
              {lowStock.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-2 text-sm">
                  <span className="truncate text-text-primary">{p.name}</span>
                  <Badge tone={p.stock === 0 ? "error" : "gold"}>
                    {p.stock === 0 ? "Out" : `${p.stock} left`}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-text-primary">
              <Percent className="h-4 w-4 text-accent-gold" />
              Coupons
            </h2>
            <p className="mt-3 text-sm text-text-secondary">
              {coupons.length} active schemes
            </p>
            <Link
              href="/admin/coupons"
              className="mt-2 inline-block text-xs font-semibold uppercase tracking-wider text-accent-gold hover:text-accent-gold-light"
            >
              Manage Coupons →
            </Link>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-text-primary">
            <Clock className="h-4 w-4 text-accent-gold" />
            Recent Orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold uppercase tracking-wider text-accent-gold hover:text-accent-gold-light"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-background-secondary text-xs uppercase tracking-wider text-text-secondary">
                <th className="pb-3 pr-4 font-semibold">Order</th>
                <th className="pb-3 pr-4 font-semibold">Customer</th>
                <th className="pb-3 pr-4 font-semibold">Date</th>
                <th className="pb-3 pr-4 font-semibold">Total</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((o) => (
                <tr key={o.id} className="border-b border-background-secondary/60 last:border-0">
                  <td className="py-3 pr-4 font-montserrat text-xs font-bold text-accent-gold">
                    {o.id}
                  </td>
                  <td className="py-3 pr-4 text-text-primary">{o.customer}</td>
                  <td className="py-3 pr-4 text-text-secondary">
                    {new Date(o.date).toLocaleDateString("en-PK", { day: "numeric", month: "short" })}
                  </td>
                  <td className="py-3 pr-4 font-montserrat font-bold text-text-primary">
                    Rs.{o.total.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <Badge tone={statusTone[o.status]}>{o.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}