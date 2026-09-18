"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { products, getProductStock, type Product } from "@/lib/data/products";
import { getCollection } from "@/lib/data/collections";
import { cn } from "@/lib/utils";

type SortOption =
  | "featured"
  | "best-selling"
  | "price-asc"
  | "price-desc"
  | "newest";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best Selling" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "newest", label: "Newest" },
];

const productTypes = ["Luxury", "Strap", "Chain", "Automatic"];

const priceRanges = [
  { label: "Under Rs. 7,500", min: 0, max: 7500 },
  { label: "Rs. 7,500 - Rs. 15,000", min: 7500, max: 15000 },
  { label: "Rs. 15,000 - Rs. 30,000", min: 15000, max: 30000 },
  { label: "Rs. 30,000+", min: 30000, max: Infinity },
];

export default function CollectionClient({ slug }: { slug: string }) {
  const collection = getCollection(slug);

  const baseProducts = useMemo(() => {
    let list = [...products];

    switch (slug) {
      case "sale":
        list = list.filter((p) => p.regularPrice > p.price);
        break;
      case "featured":
        list = list.slice(0, 8);
        break;
      case "best-sellers":
        list = list.filter((p) => p.isBestSeller);
        if (!list.length) list = products.slice(0, 8);
        break;
      case "new-arrivals":
        list = list.filter((p) => p.isNew);
        if (!list.length) list = products.slice(0, 8);
        break;
      default:
        break;
    }

    if (collection?.filterCategories.length) {
      list = list.filter((p) =>
        collection.filterCategories.some((cat) => p.category === cat)
      );
    }

    if (collection?.keyword) {
      list = list.filter((p) =>
        p.subtitle.toLowerCase().includes(collection.keyword!.toLowerCase())
      );
    }

    return list;
  }, [slug, collection]);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = baseProducts;

    if (selectedTypes.length) {
      list = list.filter((p) =>
        selectedTypes.some((t) => p.subtitle.toLowerCase().includes(t.toLowerCase()))
      );
    }

    if (priceRange) {
      list = list.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    }

    if (inStockOnly) {
      list = list.filter((p) => getProductStock(p) > 0);
    }

    switch (sort) {
      case "best-selling":
        list = [...list].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return list;
  }, [baseProducts, selectedTypes, priceRange, inStockOnly, sort]);

  const toggleType = (type: string) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const resetFilters = () => {
    setSelectedTypes([]);
    setPriceRange(null);
    setInStockOnly(false);
  };

  const hasActiveFilters =
    selectedTypes.length > 0 || priceRange !== null || inStockOnly;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sale-badge">
          Collection
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
          {collection?.name ?? "All Watches"}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
          {collection?.description}
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-3.5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 rounded-md border border-border bg-card-background px-4 py-2 text-sm font-medium text-text-primary lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sale-badge text-[10px] font-bold text-white">
                {selectedTypes.length + (priceRange ? 1 : 0) + (inStockOnly ? 1 : 0)}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 rounded-md border border-border bg-card-background px-4 py-2 text-sm font-medium text-text-primary"
            >
              Sort: {sortOptions.find((o) => o.value === sort)?.label}
              <ChevronDown className={cn("h-4 w-4 transition-transform", sortOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 top-full z-20 mt-2 w-60 rounded-lg border border-border bg-card-background p-2 shadow-xl shadow-black/10"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSort(opt.value);
                        setSortOpen(false);
                      }}
                      className={cn(
                        "block w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                        sort === opt.value
                          ? "bg-background-secondary font-semibold text-text-primary"
                          : "text-text-secondary hover:bg-background-secondary hover:text-text-primary"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <span className="text-sm text-text-secondary">
          {filtered.length} products
        </span>
      </div>

      <div className="flex gap-10">
        <aside className="hidden w-60 shrink-0 lg:block">
          <FilterPanel
            selectedTypes={selectedTypes}
            onToggleType={toggleType}
            priceRange={priceRange}
            onSetPriceRange={setPriceRange}
            inStockOnly={inStockOnly}
            onSetInStockOnly={setInStockOnly}
            hasActiveFilters={hasActiveFilters}
            onReset={resetFilters}
            sort={sort}
            onSortChange={(v) => setSort(v as SortOption)}
          />
        </aside>

        <div className="min-w-0 flex-1">
          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
              {visibleProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-xl font-bold text-text-primary">No products found</p>
              <p className="mt-2 text-sm text-text-secondary">
                Try adjusting your filters or removing some categories.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 bg-text-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-sale-badge"
              >
                Clear Filters
              </button>
            </div>
          )}

          {hasMore && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisibleCount((c) => c + 8)}
                className="inline-flex items-center justify-center border border-border px-10 py-3 text-sm font-bold uppercase tracking-wider text-text-primary transition-all hover:border-text-primary"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setShowMobileFilters(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-border bg-background p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-text-primary">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  aria-label="Close filters"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-background-secondary text-text-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FilterPanel
                selectedTypes={selectedTypes}
                onToggleType={toggleType}
                priceRange={priceRange}
                onSetPriceRange={setPriceRange}
                inStockOnly={inStockOnly}
                onSetInStockOnly={setInStockOnly}
                hasActiveFilters={hasActiveFilters}
                onReset={resetFilters}
                sort={sort}
                onSortChange={(v) => setSort(v as SortOption)}
              />
              <button
                onClick={() => setShowMobileFilters(false)}
                className="mt-6 w-full bg-text-primary py-3.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-sale-badge"
              >
                View {filtered.length} Results
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="mt-16 border-t border-border pt-8">
        <h2 className="text-lg font-bold text-text-primary">
          Buy {collection?.name ?? "Watches"} Online in Pakistan
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-text-secondary">
          <p>
            {collection?.description} Explore the full Danyal range of premium
            timepieces for men, women and couples — all at affordable prices in
            Pakistan. Every watch is covered by a 1-year international warranty
            and delivered free anywhere in the country.
          </p>
          <p>
            Enjoy hassle-free Cash on Delivery nationwide, with payment options
            including JazzCash, EasyPaisa and bank transfer. Order now and get
            your watch delivered to Karachi, Lahore, Islamabad, Rawalpindi,
            Faisalabad and all across Pakistan within 3-5 working days.
          </p>
        </div>
      </section>
    </div>
  );
}

function FilterPanel({
  selectedTypes,
  onToggleType,
  priceRange,
  onSetPriceRange,
  inStockOnly,
  onSetInStockOnly,
  hasActiveFilters,
  onReset,
  sort,
  onSortChange,
}: {
  selectedTypes: string[];
  onToggleType: (t: string) => void;
  priceRange: { min: number; max: number } | null;
  onSetPriceRange: (r: { min: number; max: number } | null) => void;
  inStockOnly: boolean;
  onSetInStockOnly: (v: boolean) => void;
  hasActiveFilters: boolean;
  onReset: () => void;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
}) {
  const inputCls = "h-4 w-4 cursor-pointer accent-text-primary";
  return (
    <div className="flex flex-col gap-7">
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="self-start text-xs font-semibold uppercase tracking-wider text-sale-badge hover:opacity-80"
        >
          Clear all filters
        </button>
      )}

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-primary">
          Product Type
        </h3>
        <div className="space-y-2.5">
          {productTypes.map((type) => (
            <label key={type} className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => onToggleType(type)}
                className={inputCls}
              />
              <span className="text-sm text-text-secondary">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-primary">
          Price
        </h3>
        <div className="space-y-2.5">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="price"
                checked={
                  priceRange?.min === range.min && priceRange?.max === range.max
                }
                onChange={() =>
                  onSetPriceRange(
                    priceRange?.min === range.min && priceRange?.max === range.max
                      ? null
                      : { min: range.min, max: range.max }
                  )
                }
                className={inputCls}
              />
              <span className="text-sm text-text-secondary">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-primary">
          Availability
        </h3>
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={() => onSetInStockOnly(!inStockOnly)}
            className={inputCls}
          />
          <span className="text-sm text-text-secondary">In stock only</span>
        </label>
      </div>

      <div className="lg:hidden">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-primary">Sort</h3>
        <div className="space-y-2.5">
          {sortOptions.map((opt) => (
            <label key={opt.value} className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="mobile-sort"
                checked={sort === opt.value}
                onChange={() => onSortChange(opt.value)}
                className={inputCls}
              />
              <span className="text-sm text-text-secondary">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}