"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  ChevronDown,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useSearch } from "@/context/SearchContext";

const categories = [
  {
    name: "Men",
    href: "/collections/men",
    image: "/images/home/images (8).jpg",
    subcategories: [
      { name: "Luxury Watches", href: "/collections/men-luxury" },
      { name: "Strap Watches", href: "/collections/men-strap" },
      { name: "Chain Watches", href: "/collections/men-chain" },
    ],
  },
  {
    name: "Women",
    href: "/collections/women",
    image: "/images/home/images (9).jpg",
    subcategories: [
      { name: "Luxury Watches", href: "/collections/women-luxury" },
      { name: "Chain Watches", href: "/collections/women-chain" },
    ],
  },
  {
    name: "Couple",
    href: "/collections/couple",
    image: "/images/home/images (10).jpg",
    subcategories: [{ name: "Chain Watches", href: "/collections/couple-chain" }],
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const { count, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { openSearch } = useSearch();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <button
          className="text-text-primary lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link href="/" className="shrink-0">
          <span className="font-serif text-2xl font-bold tracking-wider text-accent-gold sm:text-3xl">
            CRYSMA
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="relative"
              onMouseEnter={() => setOpenMegaMenu(cat.name)}
              onMouseLeave={() => setOpenMegaMenu(null)}
            >
              <Link
                href={cat.href}
                className="relative flex items-center gap-1 text-sm font-medium text-text-primary transition-colors hover:text-accent-gold after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent-gold after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {cat.name}
                <ChevronDown className="h-3.5 w-3.5" />
              </Link>

              <AnimatePresence>
                {openMegaMenu === cat.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-full w-64 -translate-x-1/2 rounded-xl border border-border bg-card-background p-4 shadow-2xl shadow-black/40"
                  >
                    <div className="flex flex-col gap-2">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="rounded-lg px-3 py-2 text-sm text-text-primary transition-colors hover:bg-background-secondary hover:text-accent-gold"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <Link
            href="/collections/sale"
            className="text-sm font-semibold text-sale-badge hover:opacity-80"
          >
            SALE
          </Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={openSearch}
            className="text-text-primary transition-colors hover:text-accent-gold"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/wishlist"
            className="relative text-text-primary transition-colors hover:text-accent-gold sm:block"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            <AnimatePresence>
              {wishlistCount > 0 && (
                <motion.span
                  key={wishlistCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="absolute -right-2 -top-2 hidden h-4 w-4 items-center justify-center rounded-full bg-sale-badge text-[10px] font-bold text-white sm:flex"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link
            href="/account"
            className="hidden text-text-primary transition-colors hover:text-accent-gold sm:block"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>
          <button
            onClick={openCart}
            className="relative text-text-primary transition-colors hover:text-accent-gold"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent-gold text-[10px] font-bold text-black"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {categories.map((cat) => (
                <div key={cat.name}>
                  <Link
                    href={cat.href}
                    className="flex items-center justify-between rounded-lg px-3 py-3 font-medium text-text-primary hover:bg-background-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                  <div className="ml-4 flex flex-col gap-1 border-l border-background-secondary pl-3">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="rounded-lg px-3 py-2 text-sm text-text-secondary hover:text-accent-gold"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                href="/collections/sale"
                className="rounded-lg px-3 py-3 font-semibold text-sale-badge"
                onClick={() => setMobileMenuOpen(false)}
              >
                SALE
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center gap-2 rounded-lg px-3 py-3 font-medium text-text-primary hover:bg-background-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="h-5 w-5" />
                Wishlist
                {wishlistCount > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-sale-badge text-[10px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                href="/account"
                className="flex items-center gap-2 rounded-lg px-3 py-3 font-medium text-text-primary hover:bg-background-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                Account
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}