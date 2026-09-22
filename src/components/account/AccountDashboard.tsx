"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Boxes,
  LogOut,
  MapPin,
  Mail,
  Package,
  Phone,
  Save,
  Tag,
  User as UserIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/data/products";
import { dbOrderToSavedOrder, type DbOrderJson } from "@/lib/orderMap";
import type { SavedOrder } from "@/components/checkout/CheckoutClient";
import { cn } from "@/lib/utils";

type Tab = "dashboard" | "products" | "orders" | "profile";

const statusStyles: Record<string, string> = {
  "Order Placed": "bg-text-secondary/20 text-text-primary",
  Processing: "bg-background-secondary text-text-primary",
  Shipped: "bg-background-secondary text-text-primary",
  Delivered: "bg-success/20 text-success",
  Cancelled: "bg-sale-badge/20 text-sale-badge",
};

export function orderStatusLabel(status?: string): string {
  switch (status) {
    case "processing":
      return "Processing";
    case "shipped":
      return "Shipped";
    case "delivered":
      return "Delivered";
    case "cancelled":
      return "Cancelled";
    default:
      return "Order Placed";
  }
}

export default function AccountDashboard() {
  const router = useRouter();
  const { user, logout, updateProfile } = useAuth();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [orders, setOrders] = useState<SavedOrder[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = JSON.parse(window.localStorage.getItem("danyal_orders") ?? "[]");
      return stored.filter((o: SavedOrder) => o.shipping.email === user?.email);
    } catch {
      return [];
    }
  });
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    city: user?.city ?? "",
    address: user?.address ?? "",
  });

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(() => {
      try {
        const stored = JSON.parse(window.localStorage.getItem("danyal_orders") ?? "[]");
        const filtered = stored.filter((o: SavedOrder) => o.shipping.email === user?.email);
        if (!cancelled) setOrders(filtered);
      } catch {
        /* ignore */
      }
    }, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [user?.email]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/orders", { cache: "no-store" });
        const json = await res.json().catch(() => null);
        if (!cancelled && res.ok && json && Array.isArray(json.data)) {
          const fromDb = (json.data as DbOrderJson[])
            .filter((o) => !user?.email || (o.email ?? "").toLowerCase() === user.email.toLowerCase())
            .map(dbOrderToSavedOrder);
          if (fromDb.length) setOrders(fromDb);
        }
      } catch {
        /* demo mode */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  const handleSaveProfile = () => {
    updateProfile(form);
    setTab("dashboard");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-text-primary">
            My Account
          </span>
          <h1 className="mt-2 text-3xl font-bold text-text-primary">
            Hello, {user!.name}
          </h1>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-text-secondary transition-colors hover:border-error/50 hover:text-error"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <aside>
          <div className="rounded-2xl border border-border bg-card-background p-2">
            {(
              [
                { id: "dashboard", label: "Dashboard", icon: UserIcon },
                { id: "products", label: "My Product Codes", icon: Tag },
                { id: "orders", label: "My Orders", icon: Package },
                { id: "profile", label: "Edit Profile", icon: Boxes },
              ] as { id: Tab; label: string; icon: typeof UserIcon }[]
            ).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                  tab === id
                    ? "bg-text-primary text-white"
                    : "text-text-secondary hover:bg-background-secondary hover:text-text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-border bg-card-background p-5 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Contact
            </p>
            <div className="mt-3 space-y-2 text-text-primary">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-text-primary" />
                <span className="truncate">{user!.email}</span>
              </p>
              {user!.phone && (
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-text-primary" />
                  {user!.phone}
                </p>
              )}
              {user!.city && (
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-text-primary" />
                  {user!.city}
                </p>
              )}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {tab === "dashboard" && (
                <Dashboard
                  orderCount={orders.length}
                  productCount={orders.reduce(
                    (n, o) => n + o.items.reduce((n2, i) => n2 + i.quantity, 0),
                    0
                  )}
                  onGoToProducts={() => setTab("products")}
                />
              )}
              {tab === "products" && <ProductCodes orders={orders} />}
              {tab === "orders" && (
                <OrdersList
                  orders={orders}
                  onTrack={(id) =>
                    router.push(`/track-order?order=${encodeURIComponent(id)}`)
                  }
                />
              )}
              {tab === "profile" && (
                <ProfileForm
                  form={form}
                  setForm={setForm}
                  onSave={handleSaveProfile}
                  onCancel={() =>
                    setForm({
                      name: user?.name ?? form.name,
                      email: user?.email ?? form.email,
                      phone: user?.phone ?? form.phone,
                      city: user?.city ?? form.city,
                      address: user?.address ?? form.address,
                    })
                  }
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Dashboard({
  orderCount,
  productCount,
  onGoToProducts,
}: {
  orderCount: number;
  productCount: number;
  onGoToProducts: () => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[
        { value: orderCount, label: "Total Orders", icon: Package },
        { value: productCount, label: "Watches Bought", icon: Tag },
        { value: "1 Year", label: "Warranty", icon: Boxes },
      ].map(({ value, label, icon: Icon }) => (
        <div
          key={label}
          className="rounded-2xl border border-border bg-card-background p-6"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-background-secondary text-text-primary">
            <Icon className="h-5 w-5" />
          </span>
          <p className="mt-4 text-2xl font-bold text-text-primary">{value}</p>
          <p className="mt-1 text-sm text-text-secondary">{label}</p>
        </div>
      ))}

      <div className="rounded-2xl border border-border bg-card-background p-6 sm:col-span-3">
        <h2 className="text-lg font-bold text-text-primary">Quick Actions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            onClick={onGoToProducts}
            className="rounded-xl border border-border px-5 py-4 text-left text-sm font-semibold text-text-primary transition-colors hover:border-text-primary"
          >
            My Product Codes →
          </button>
          <Link
            href="/collections/men"
            className="rounded-xl border border-border px-5 py-4 text-sm font-semibold text-text-primary transition-colors hover:border-text-primary"
          >
            Shop Men&apos;s Watches →
          </Link>
          <Link href="/track-order" className="rounded-xl border border-border px-5 py-4 text-sm font-semibold text-text-primary transition-colors hover:border-text-primary">
            Track an Order →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductCodes({ orders }: { orders: SavedOrder[] }) {
  const codes: {
    code: string;
    name: string;
    color?: string;
    qty: number;
    date: string;
    id: string;
  }[] = [];

  for (const order of orders) {
    for (const item of order.items) {
      codes.push({
        code: item.code ?? item.slug?.replace(/^danyal-/, "").split("-")[0]?.toUpperCase() ?? item.slug,
        name: item.name,
        color: item.color,
        qty: item.quantity,
        date: order.date,
        id: `${order.orderId}::${item.id}::${item.color ?? "default"}`,
      });
    }
  }

  if (codes.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card-background py-20 text-center">
        <Tag className="h-12 w-12 text-text-secondary" />
        <div>
          <h2 className="text-xl font-bold text-text-primary">No product codes yet</h2>
          <p className="mt-1 text-sm text-text-secondary">
            When you buy a watch, its unique product code will appear here for warranty and support.
          </p>
        </div>
        <Link
          href="/collections/men"
          className="rounded-full bg-text-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:scale-105"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-text-primary">My Product Codes</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Keep these codes safe — they are used for order support and warranty claims.
          </p>
        </div>
        <span className="rounded-full bg-text-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-text-primary">
          {codes.length} {codes.length === 1 ? "watch" : "watches"}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {codes.map((code) => (
          <div
            key={code.id}
            className="rounded-2xl border border-border bg-card-background p-5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-text-primary text-black">
                <Tag className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-wider text-text-secondary">
                  Product Code
                </p>
                <p className="truncate text-lg font-extrabold tracking-tight text-text-primary">
                  {code.code}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-1 border-t border-border pt-3 text-sm">
              <p className="truncate font-semibold text-text-primary">{code.name}</p>
              {code.color && <p className="text-xs text-text-secondary">Color: {code.color}</p>}
              <p className="text-xs text-text-secondary">
                Qty {code.qty} ·{" "}
                {new Date(code.date).toLocaleDateString("en-PK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-md bg-success/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-success">
                Warranty Active
              </span>
              <Link
                href="/track-order"
                className="rounded-md border border-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-primary transition-colors hover:border-text-primary"
              >
                Track Order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersList({ orders, onTrack }: { orders: SavedOrder[]; onTrack: (orderId: string) => void }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card-background py-20 text-center">
        <Package className="h-12 w-12 text-text-secondary" />
        <div>
          <h2 className="text-xl font-bold text-text-primary">No orders yet</h2>
          <p className="mt-1 text-sm text-text-secondary">
            When you place an order, it will appear here.
          </p>
        </div>
        <Link
          href="/collections/men"
          className="rounded-full bg-text-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-105"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-text-primary">My Orders</h2>
      {orders.map((order) => (
        <div
          key={order.orderId}
          className="overflow-hidden rounded-2xl border border-border bg-card-background"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-text-secondary">Order</p>
              <p className="text-sm font-bold text-text-primary">
                {order.orderId}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-text-secondary">
                {new Date(order.date).toLocaleDateString("en-PK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm font-bold text-text-primary">
                {formatPrice(order.total)}
              </p>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold uppercase",
                statusStyles[orderStatusLabel(order.status)] ?? ""
              )}
            >
              {orderStatusLabel(order.status)}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 px-5 py-4">
            {order.items.map((item) => (
              <Link
                key={`${item.id}::${item.color ?? "default"}`}
                href={`/products/${item.slug}`}
                className="flex items-center gap-2.5"
              >
                <div className="relative h-12 w-10 overflow-hidden rounded-lg bg-background-secondary">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold text-text-primary">{item.name}</p>
                  <p className="text-[11px] text-text-secondary">
                    Qty {item.quantity} · {formatPrice(item.price)}
                  </p>
                </div>
              </Link>
            ))}
            <button
              onClick={() => onTrack(order.orderId)}
              className="ml-auto rounded-full border border-border px-5 py-2 text-xs font-semibold uppercase tracking-wider text-text-secondary transition-colors hover:border-text-primary hover:text-text-primary"
            >
              Track
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfileForm({
  form,
  setForm,
  onSave,
  onCancel,
}: {
  form: { name: string; email: string; phone: string; city: string; address: string } | null;
  setForm: (f: { name: string; email: string; phone: string; city: string; address: string }) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  if (!form) return null;
  const field = (
    label: string,
    key: keyof typeof form,
    placeholder: string,
    type = "text"
  ) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-text-primary">
        {label}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-text-primary focus:outline-none"
      />
    </div>
  );

  return (
    <div className="rounded-2xl border border-border bg-card-background p-6 sm:p-8">
      <h2 className="text-xl font-bold text-text-primary">Edit Profile</h2>
      <p className="mt-1 text-sm text-text-secondary">
        Update your personal information and shipping defaults.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {field("Full Name", "name", "Your full name")}
        {field("Email", "email", "you@example.com", "email")}
        {field("Phone", "phone", "+92 3XX XXXXXXX", "tel")}
        {field("City", "city", "e.g. Lahore")}
        <div className="sm:col-span-2">{field("Address", "address", "Your delivery address")}</div>
      </div>
      <div className="mt-6 flex gap-3">
        <button
          onClick={onSave}
          className="flex items-center gap-2 rounded-full bg-text-primary px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-sale-badge"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
        <button
          onClick={onCancel}
          className="rounded-full border border-border px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-text-secondary transition-colors hover:text-text-primary"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}