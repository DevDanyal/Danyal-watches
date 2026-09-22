"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  ReactNode,
} from "react";
import { products as seedProducts, getProductStock, getProductCode, type Product } from "@/lib/data/products";
import { writeCatalog, refreshServerCatalog, type CatalogEntry } from "@/lib/catalog";
import type { SavedOrder } from "@/components/checkout/CheckoutClient";

const DEFAULT_IMAGE = "/images/products/images (17).jpg";
const DEFAULT_COLORS = [
  { name: "Full Black", hex: "#0A0A0A" },
  { name: "Golden", hex: "#C9A96E" },
];

export type ManagedProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  sku: string;
  stock: number;
  status: "published" | "draft";
  image: string;
  slug?: string;
  images?: string[];
};

export type AdminOrder = {
  id: string;
  customer: string;
  email: string;
  total: number;
  items: number;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  payment: string;
};

export type CustomerRow = {
  name: string;
  email: string;
  phone: string;
  city: string;
  orders: number;
  spent: number;
};

export type Coupon = {
  code: string;
  type: "percentage" | "flat";
  value: number;
  minOrder: number;
  expires: string;
  limit: number;
  used: number;
  active: boolean;
};

export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  active: boolean;
};

export type ManagedCategory = {
  id: string;
  name: string;
  slug: string;
  image: string;
  active: boolean;
};

export type Settings = {
  storeName: string;
  announcement: string;
  shippingFreeThreshold: number;
  email: string;
  phone: string;
};

type AdminStore = {
  products: ManagedProduct[];
  addProduct: (p: Omit<ManagedProduct, "id">) => void | Promise<void>;
  updateProduct: (id: string, p: Partial<ManagedProduct>) => void | Promise<void>;
  deleteProduct: (id: string) => void | Promise<void>;
  orders: AdminOrder[];
  setOrderStatus: (id: string, status: AdminOrder["status"]) => void | Promise<void>;
  customers: CustomerRow[];
  coupons: Coupon[];
  addCoupon: (c: Omit<Coupon, "used">) => void;
  toggleCoupon: (code: string) => void;
  deleteCoupon: (code: string) => void;
  banners: Banner[];
  addBanner: (b: Omit<Banner, "id">) => void;
  toggleBanner: (id: string) => void;
  deleteBanner: (id: string) => void;
  categories: ManagedCategory[];
  addCategory: (c: Omit<ManagedCategory, "id">) => void;
  updateCategory: (id: string, c: Partial<ManagedCategory>) => void;
  deleteCategory: (id: string) => void;
  settings: Settings;
  saveSettings: (s: Partial<Settings>) => void;
  dbMode: boolean;
};

const AdminContext = createContext<AdminStore | null>(null);

const STORAGE_PREFIX = "danyal_admin_";

const load = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const categoryOf = (subtitle: string): Product["category"] => {
  const t = subtitle.toLowerCase();
  if (t.includes("woman")) return "women";
  if (t.includes("couple")) return "couple";
  return "men";
};

const isObjectId = (id: string) => /^[a-f0-9]{24}$/i.test(id);

type DbProductJson = {
  _id?: string;
  id?: string;
  slug?: string;
  code?: string;
  name: string;
  subtitle?: string;
  price: number;
  stock?: number;
  status?: "published" | "draft";
  images?: string[];
};

const toManagedProduct = (doc: DbProductJson): ManagedProduct => {
  const id = doc._id || doc.id || String(Date.now());
  return {
    id,
    name: doc.name,
    category: doc.subtitle ?? "",
    price: doc.price,
    sku: doc.code ?? "",
    stock: doc.stock ?? 0,
    status: (doc.status ?? "draft") as ManagedProduct["status"],
    image: doc.images?.[0] ?? DEFAULT_IMAGE,
    slug: doc.slug,
    images: doc.images,
  };
};

type DbOrderJson = {
  orderId: string;
  customerName?: string;
  email?: string;
  total?: number;
  items?: { quantity?: number }[];
  createdAt?: string;
  paymentMethod?: string;
  status?: AdminOrder["status"];
};

const toAdminOrder = (doc: DbOrderJson): AdminOrder => ({
  id: doc.orderId,
  customer: doc.customerName ?? "Guest",
  email: doc.email ?? "",
  total: doc.total ?? 0,
  items: (doc.items ?? []).reduce((a, it) => a + (it.quantity ?? 1), 0),
  date: doc.createdAt ?? new Date().toISOString(),
  status: (doc.status ?? "pending") as AdminOrder["status"],
  payment: doc.paymentMethod ?? "cod",
});

const apiJson = async (res: Response) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

const notifyStorefrontRefresh = () => {
  if (typeof window === "undefined") return;
  refreshServerCatalog();
  fetch("/api/admin/revalidate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  }).catch(() => {
    // demo mode — revalidation is a no-op
  });
};

const initialManagedProducts = (): ManagedProduct[] =>
  load<ManagedProduct[] | null>("products", null) ??
  seedProducts.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.subtitle,
    price: p.price,
    sku: p.code,
    stock: getProductStock(p),
    status: "published",
    image: p.images[0],
  }));

const asCatalogEntry = (m: ManagedProduct): CatalogEntry => {
  const seed = seedProducts.find((p) => p.id === m.id);
  if (seed) {
    const images = m.image
      ? [m.image, ...seed.images.filter((i) => i !== m.image)].slice(0, 2)
      : seed.images;
    return {
      ...seed,
      name: m.name,
      subtitle: m.category,
      code: m.sku,
      price: m.price,
      images,
      stock: m.stock,
      status: m.status,
    };
  }
  const slug = slugify(m.name);
  return {
    id: m.id,
    slug,
    code: m.sku || getProductCode({ slug }),
    name: m.name,
    category: categoryOf(m.category),
    subtitle: m.category,
    price: m.price,
    regularPrice: m.price,
    rating: 0,
    reviews: 0,
    isNew: true,
    isBestSeller: false,
    colors: [
      { name: "Full Black", hex: "#0A0A0A" },
      { name: "Golden", hex: "#C9A96E" },
    ],
    images: [m.image || "/images/products/images (17).jpg"],
    stock: m.stock,
    status: m.status,
  };
};

const publishCatalog = (managed: ManagedProduct[]) =>
  writeCatalog(managed.map(asCatalogEntry));

const syncCheckoutOrderStatus = (id: string, status: AdminOrder["status"]) => {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem("danyal_orders");
    if (!raw) return;
    const orders = JSON.parse(raw) as SavedOrder[];
    const next = orders.map((o) => (o.orderId === id ? { ...o, status } : o));
    window.localStorage.setItem("danyal_orders", JSON.stringify(next));
  } catch {
    // ignore
  }
};

const seedOrders = (): AdminOrder[] => {
  const saved = load<SavedOrder[]>("orders", []) ?? [];
  if (typeof window !== "undefined" && window.localStorage.getItem("danyal_orders")) {
    try {
      const checkout = JSON.parse(window.localStorage.getItem("danyal_orders") ?? "[]") as SavedOrder[];
      if (checkout.length > 0) {
        return checkout.map((o, i) => ({
          id: o.orderId,
          customer: o.shipping.firstName + " " + o.shipping.lastName,
          email: o.shipping.email,
          total: o.total,
          items: o.items.reduce((a, it) => a + it.quantity, 0),
          date: o.date,
          status: i === 0 ? "processing" : "pending",
          payment: o.paymentMethod,
        }));
      }
    } catch {
      // fall through to seed
    }
  }
  if (saved.length > 0) {
    return saved.slice(0, 20).map((o, i) => ({
      id: o.orderId,
      customer: o.shipping.firstName + " " + o.shipping.lastName,
      email: o.shipping.email,
      total: o.total,
      items: o.items.reduce((a, it) => a + it.quantity, 0),
      date: o.date,
      status: i === 0 ? "processing" : "pending",
      payment: o.paymentMethod,
    }));
  }
  return [
    { id: "Danyal-8K2F9P", customer: "Ahmed Raza", email: "ahmed@example.com", total: 16600, items: 1, date: new Date(Date.now() - 1 * 86400000).toISOString(), status: "processing", payment: "cod" },
    { id: "Danyal-3M7Q1Z", customer: "Sara Khan", email: "sara@example.com", total: 24200, items: 2, date: new Date(Date.now() - 2 * 86400000).toISOString(), status: "pending", payment: "jazzcash" },
    { id: "Danyal-9N4X8B", customer: "Bilal Hussain", email: "bilal@example.com", total: 6800, items: 1, date: new Date(Date.now() - 4 * 86400000).toISOString(), status: "shipped", payment: "easypaisa" },
    { id: "Danyal-5T2W6D", customer: "Ayesha Malik", email: "ayesha@example.com", total: 8900, items: 1, date: new Date(Date.now() - 6 * 86400000).toISOString(), status: "delivered", payment: "card" },
    { id: "Danyal-7K1V3C", customer: "Hassan Ali", email: "hassan@example.com", total: 31200, items: 3, date: new Date(Date.now() - 9 * 86400000).toISOString(), status: "delivered", payment: "cod" },
    { id: "Danyal-2S8E5G", customer: "Mariam Fatima", email: "mariam@example.com", total: 13200, items: 1, date: new Date(Date.now() - 12 * 86400000).toISOString(), status: "cancelled", payment: "cod" },
  ];
};

const seedCustomers: () => CustomerRow[] = () =>
  Array.from(new Map(seedOrders().map((o) => [o.email, o])).values()).map((o) => ({
    name: o.customer,
    email: o.email,
    phone: "+92 3XX XXXXXXX",
    city: "Lahore",
    orders: 1,
    spent: o.total,
  }));

const seedCategories: () => ManagedCategory[] = () => [
  { id: "cat-men", name: "Men", slug: "men", image: "/images/home/images (7).jpg", active: true },
  { id: "cat-men-luxury", name: "Men's Luxury", slug: "men-luxury", image: "/images/home/images (27).jpg", active: true },
  { id: "cat-men-strap", name: "Men's Strap", slug: "men-strap", image: "/images/home/images (18).jpg", active: true },
  { id: "cat-men-chain", name: "Men's Chain", slug: "men-chain", image: "/images/home/images (8).jpg", active: true },
  { id: "cat-women", name: "Women", slug: "women", image: "/images/home/images (8).jpg", active: true },
  { id: "cat-women-luxury", name: "Women's Luxury", slug: "women-luxury", image: "/images/home/images (27).jpg", active: true },
  { id: "cat-women-chain", name: "Women's Chain", slug: "women-chain", image: "/images/home/images (26).jpg", active: true },
  { id: "cat-couple", name: "Couples", slug: "couple", image: "/images/home/images (26).jpg", active: true },
  { id: "cat-couple-chain", name: "Couple's Chain", slug: "couple-chain", image: "/images/home/images (26).jpg", active: true },
  { id: "cat-sale", name: "Sale", slug: "sale", image: "/images/home/images (1).jpg", active: true },
];

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ManagedProduct[]>(() =>
    initialManagedProducts()
  );
  const [orders, setOrders] = useState<AdminOrder[]>(() =>
    load<AdminOrder[]>("all_orders", seedOrders())
  );
  const [customers] = useState<CustomerRow[]>(() =>
    load<CustomerRow[]>("customers", seedCustomers())
  );
  const [coupons, setCoupons] = useState<Coupon[]>(() =>
    load<Coupon[]>("coupons", [
      { code: "Danyal10", type: "percentage", value: 10, minOrder: 5000, expires: "Dec 31, 2026", limit: 100, used: 12, active: true },
      { code: "FLAT500", type: "flat", value: 500, minOrder: 3000, expires: "Nov 30, 2026", limit: 50, used: 3, active: true },
    ])
  );
  const [banners, setBanners] = useState<Banner[]>(() =>
    load<Banner[]>("banners", [
      { id: "b1", title: "Luxury Defined", subtitle: "New Season Collection — Up to 30% Off", cta: "Shop Now", image: seedProducts[0].images[0], active: true },
      { id: "b2", title: "Couple Watches", subtitle: "Matching timepieces for two hearts", cta: "Explore", image: seedProducts[8].images[0], active: true },
    ])
  );
  const [categories, setCategories] = useState<ManagedCategory[]>(() =>
    load<ManagedCategory[]>("categories", seedCategories())
  );
  const [settings, setSettings] = useState<Settings>(() =>
    load<Settings>("settings", {
      storeName: "Danyal Watches",
      announcement: "Free Shipping on orders over Rs.10,000 | 1 Year Warranty on all watches",
      shippingFreeThreshold: 10000,
      email: "aidevdanyal@gmail.com",
      phone: "+92 346 4141007",
    })
  );
  const [ready] = useState(true);
const [dbMode, setDbMode] = useState(false);

  const persist = useCallback((key: string, value: unknown) => {
    if (typeof window !== "undefined")
      window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  }, []);

  useEffect(() => {
    publishCatalog(initialManagedProducts());
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/products?published=false", {
          cache: "no-store",
        });
        const json = await apiJson(res);
        if (active && res.ok && json && Array.isArray(json.data)) {
          setDbMode(true);
          setProducts(json.data.map(toManagedProduct));
        }
      } catch {
        // demo mode
      }
      try {
        const res = await fetch("/api/orders", { cache: "no-store" });
        const json = await apiJson(res);
        if (active && res.ok && json && Array.isArray(json.data)) {
          setOrders(json.data.slice(0, 20).map(toAdminOrder));
        }
      } catch {
        // demo mode
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const addProduct = useCallback(
    async (p: Omit<ManagedProduct, "id">) => {
      if (dbMode) {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: p.name,
            subtitle: p.category,
            category: categoryOf(p.category),
            price: p.price,
            sku: p.sku || getProductCode({ slug: slugify(p.name) }),
            stock: p.stock,
            status: p.status,
            images: [p.image || DEFAULT_IMAGE],
            colors: DEFAULT_COLORS,
            rating: 0,
            reviews: 0,
            description: "",
          }),
        });
        const json = await apiJson(res);
        if (res.ok && json?.data) {
          setProducts((prev) => [toManagedProduct(json.data), ...prev]);
          notifyStorefrontRefresh();
          return;
        }
      }
      setProducts((prev) => {
        const next = [{ id: String(Date.now()), ...p }, ...prev];
        persist("products", next);
        publishCatalog(next);
        return next;
      });
    },
    [dbMode, persist]
  );

  const updateProduct = useCallback(
    async (id: string, p: Partial<ManagedProduct>) => {
      if (dbMode && isObjectId(id)) {
        const existing = products.find((x) => x.id === id);
        const patch: Record<string, unknown> = {
          name: p.name,
          sku: p.sku,
          stock: p.stock,
          status: p.status,
          price: p.price,
          subtitle: p.category,
          category: categoryOf(p.category ?? existing?.category ?? "men"),
        };
        if (p.image) {
          const others = (existing?.images ?? []).filter((i) => i !== p.image);
          patch.images = [p.image, ...others].slice(0, 2);
        }
        const res = await fetch(`/api/products/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        });
        const json = await apiJson(res);
        if (res.ok && json?.data) {
          setProducts((prev) =>
            prev.map((x) => (x.id === id ? toManagedProduct(json.data) : x))
          );
          notifyStorefrontRefresh();
          return;
        }
      }
      setProducts((prev) => {
        const next = prev.map((x) => (x.id === id ? { ...x, ...p } : x));
        persist("products", next);
        publishCatalog(next);
        return next;
      });
    },
    [dbMode, products, persist]
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      if (dbMode && isObjectId(id)) {
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
        if (res.ok) {
          setProducts((prev) => prev.filter((x) => x.id !== id));
          notifyStorefrontRefresh();
          return;
        }
      }
      setProducts((prev) => {
        const next = prev.filter((x) => x.id !== id);
        persist("products", next);
        publishCatalog(next);
        return next;
      });
    },
    [dbMode, persist]
  );

  const setOrderStatus = useCallback(
    async (id: string, status: AdminOrder["status"]) => {
      if (dbMode) {
        const res = await fetch(`/api/orders/${encodeURIComponent(id)}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        if (res.ok) {
          setOrders((prev) =>
            prev.map((o) => (o.id === id ? { ...o, status } : o))
          );
          notifyStorefrontRefresh();
        }
      }
      setOrders((prev) => {
        const next = prev.map((o) => (o.id === id ? { ...o, status } : o));
        persist("all_orders", next);
        syncCheckoutOrderStatus(id, status);
        return next;
      });
    },
    [dbMode, persist]
  );

  const addCoupon = useCallback(
    (c: Omit<Coupon, "used">) =>
      setCoupons((prev) => {
        if (prev.some((x) => x.code === c.code)) return prev;
        const next = [...prev, { ...c, used: 0 }];
        persist("coupons", next);
        return next;
      }),
    [persist]
  );

  const toggleCoupon = useCallback(
    (code: string) =>
      setCoupons((prev) => {
        const next = prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c));
        persist("coupons", next);
        return next;
      }),
    [persist]
  );

  const deleteCoupon = useCallback(
    (code: string) =>
      setCoupons((prev) => {
        const next = prev.filter((c) => c.code !== code);
        persist("coupons", next);
        return next;
      }),
    [persist]
  );

  const addBanner = useCallback(
    (b: Omit<Banner, "id">) =>
      setBanners((prev) => {
        const next = [...prev, { ...b, id: String(Date.now()) }];
        persist("banners", next);
        return next;
      }),
    [persist]
  );

  const toggleBanner = useCallback(
    (id: string) =>
      setBanners((prev) => {
        const next = prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b));
        persist("banners", next);
        return next;
      }),
    [persist]
  );

  const deleteBanner = useCallback(
    (id: string) =>
      setBanners((prev) => {
        const next = prev.filter((b) => b.id !== id);
        persist("banners", next);
        return next;
      }),
    [persist]
  );

  const addCategory = useCallback(
    (c: Omit<ManagedCategory, "id">) =>
      setCategories((prev) => {
        const next = [...prev, { ...c, id: `cat-${Date.now()}` }];
        persist("categories", next);
        return next;
      }),
    [persist]
  );

  const updateCategory = useCallback(
    (id: string, c: Partial<ManagedCategory>) =>
      setCategories((prev) => {
        const next = prev.map((x) => (x.id === id ? { ...x, ...c } : x));
        persist("categories", next);
        return next;
      }),
    [persist]
  );

  const deleteCategory = useCallback(
    (id: string) =>
      setCategories((prev) => {
        const next = prev.filter((x) => x.id !== id);
        persist("categories", next);
        return next;
      }),
    [persist]
  );

  const saveSettings = useCallback(
    (s: Partial<Settings>) =>
      setSettings((prev) => {
        const next = { ...prev, ...s };
        persist("settings", next);
        return next;
      }),
    [persist]
  );

  const value = useMemo(
    () => ({
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      orders,
      setOrderStatus,
      customers,
      coupons,
      addCoupon,
      toggleCoupon,
      deleteCoupon,
      banners,
      addBanner,
      toggleBanner,
      deleteBanner,
      categories,
      addCategory,
      updateCategory,
      deleteCategory,
      settings,
      saveSettings,
      ready,
      dbMode,
    }),
    [products, addProduct, updateProduct, deleteProduct, orders, setOrderStatus, customers, coupons, addCoupon, toggleCoupon, deleteCoupon, banners, addBanner, toggleBanner, deleteBanner, categories, addCategory, updateCategory, deleteCategory, settings, saveSettings, ready, dbMode]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}