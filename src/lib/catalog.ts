"use client";

import { useEffect, useMemo, useState } from "react";
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

export function useCatalog(): { products: Product[]; loaded: boolean } {
  const [catalog, setCatalog] = useState<CatalogEntry[] | null>(null);

  useEffect(() => {
    const apply = () => setCatalog(readCatalog());
    const onStorage = (e: StorageEvent) => {
      if (e.key === CATALOG_KEY) apply();
    };
    apply();
    window.addEventListener("storage", onStorage);
    window.addEventListener(CATALOG_EVENT, apply);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CATALOG_EVENT, apply);
    };
  }, []);

  return useMemo(
    () => ({ products: catalogProducts(catalog), loaded: catalog !== null }),
    [catalog]
  );
}

export function useCatalogProducts(): Product[] {
  return useCatalog().products;
}