"use client";

import { useEffect, useState } from "react";
import {
  products as seedProducts,
  getProductStock,
  type Product,
} from "@/lib/data/products";

export type CatalogEntry = Product & {
  stock: number;
  status: "published" | "draft";
};

export const CATALOG_KEY = "danyal_catalog";
export const CATALOG_EVENT = "danyal:catalog";
export const REFRESH_EVENT = "danyal:refresh-products";

type Source = "seed" | "demo" | "db";

const safeGet = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // storage unavailable — ignore
  }
};

export const seedCatalog = (): CatalogEntry[] =>
  seedProducts.map((p) => ({
    ...p,
    stock: getProductStock(p),
    status: "published" as const,
  }));

export function readCatalog(): CatalogEntry[] | null {
  if (typeof window === "undefined") return null;
  const raw = safeGet(CATALOG_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return parsed as CatalogEntry[];
  } catch {
    // corrupted — fall through to seed
  }
  return null;
}

export function writeCatalog(entries: CatalogEntry[]) {
  if (typeof window === "undefined") return;
  safeSet(CATALOG_KEY, JSON.stringify(entries));
  notifyCatalogChange();
}

export function notifyCatalogChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CATALOG_EVENT));
}

export function catalogProducts(catalog: CatalogEntry[] | null): Product[] {
  return (catalog ?? seedCatalog()).filter((e) => e.status !== "draft");
}

// --- Server (MongoDB) catalog probe -------------------------------------

let serverCache: CatalogEntry[] | null = null;
let serverLoading: Promise<void> | null = null;
let serverSource: Source = "seed";

async function probeServer(): Promise<void> {
  try {
    const res = await fetch("/api/products?published=true", {
      cache: "no-store",
    });
    const json = await res.json().catch(() => null);
    if (res.ok && json && Array.isArray(json.data) && json.data.length > 0) {
      serverCache = json.data as CatalogEntry[];
      serverSource = "db";
    } else {
      serverCache = null;
      serverSource = "seed";
    }
  } catch {
    serverCache = null;
    serverSource = "seed";
  }
  notifyCatalogChange();
}

function ensureProbeStarted(): Promise<void> {
  if (!serverLoading) {
    serverLoading = probeServer().finally(() => {
      serverLoading = null;
    });
  }
  return serverLoading;
}

/** Re-fetch the server catalog now (e.g. after an admin write in DB mode). */
export function refreshServerCatalog() {
  if (typeof window === "undefined") return;
  serverCache = null;
  void ensureProbeStarted();
}

export function useCatalog(): {
  products: Product[];
  source: Source;
  loaded: boolean;
} {
  const [state, setState] = useState<{
    products: Product[];
    source: Source;
    loaded: boolean;
  }>(() => ({ products: catalogProducts(null), source: "seed", loaded: false }));

  useEffect(() => {
    let mounted = true;
    const apply = () => {
      const cache = serverCache ?? readCatalog();
      setState({
        products: catalogProducts(cache),
        source: serverCache ? serverSource : cache ? "demo" : "seed",
        loaded: true,
      });
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === CATALOG_KEY) apply();
    };
    apply();
    window.addEventListener("storage", onStorage);
    window.addEventListener(CATALOG_EVENT, apply);
    void ensureProbeStarted().then(() => {
      if (mounted) apply();
    });
    return () => {
      mounted = false;
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CATALOG_EVENT, apply);
    };
  }, []);

  return state;
}

export function useCatalogProducts(): Product[] {
  return useCatalog().products;
}