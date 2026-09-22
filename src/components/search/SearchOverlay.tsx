"use client";

import { useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { searchProducts, formatPrice } from "@/lib/data/products";
import { useCatalogProducts } from "@/lib/catalog";

const hotSearches = ["Luxury", "Chain", "Strap", "Silver", "Couple"];

export default function SearchOverlay() {
  const { searchOpen, closeSearch, query, setQuery } = useSearch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const catalogProducts = useCatalogProducts();

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    if (searchOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, closeSearch]);

  const debounced = useMemo(() => {
    const q = query.trim();
    return q.length >= 2 ? searchProducts(q, catalogProducts) : [];
  }, [query, catalogProducts]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      closeSearch();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60]"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeSearch} />

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative mx-auto mt-0 max-w-2xl border-x border-b border-border bg-card-background px-4 py-6 shadow-2xl shadow-black/30 sm:rounded-b-2xl sm:px-6"
          >
            <form onSubmit={submit} className="flex items-center gap-3">
              <Search className="h-5 w-5 shrink-0 text-text-secondary" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, e.g. 'chain watch'..."
                className="w-full bg-transparent py-2 text-base text-text-primary placeholder:text-text-secondary focus:outline-none"
              />
              <button
                type="button"
                onClick={closeSearch}
                className="text-text-secondary hover:text-text-primary"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-5 border-t border-border pt-4">
              {query.trim().length < 2 ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Hot Searches
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {hotSearches.map((t) => (
                      <button
                        key={t}
                        onClick={() => setQuery(t)}
                        className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-text-primary transition-colors hover:border-text-primary"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      Popular Products
                    </p>
                    <PopGrid onPick={closeSearch} />
                  </div>
                </div>
              ) : debounced.length === 0 ? (
                <p className="py-6 text-center text-sm text-text-secondary">
                  No products found for &quot;<span className="text-text-primary">{query}</span>&quot;
                </p>
              ) : (
                <div className="flex max-h-[50vh] flex-col gap-1 overflow-y-auto pr-1">
                  {debounced.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      onClick={closeSearch}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-background-secondary"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-background-secondary">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-text-primary">
                          {p.name}
                        </p>
                        <p className="truncate text-xs text-text-secondary">{p.subtitle}</p>
                      </div>
                      <span className="shrink-0 text-sm font-bold text-text-primary">
                        {formatPrice(p.price)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {debounced.length > 0 && (
              <button
                type="button"
                onClick={submit}
                className="mt-4 w-full bg-text-primary py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-sale-badge"
              >
                View all results
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PopGrid({ onPick }: { onPick: () => void }) {
  const popular = [...useCatalogProducts()].slice(0, 4);
  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {popular.map((p) => (
        <Link
          key={p.id}
          href={`/products/${p.slug}`}
          onClick={onPick}
          className="flex items-center gap-2 rounded-lg border border-border px-2 py-2 transition-colors hover:border-text-primary/30"
        >
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded bg-background-secondary">
            <Image src={p.images[0]} alt={p.name} fill sizes="36px" className="object-cover" />
          </div>
          <span className="truncate text-xs text-text-primary">{p.name}</span>
        </Link>
      ))}
    </div>
  );
}