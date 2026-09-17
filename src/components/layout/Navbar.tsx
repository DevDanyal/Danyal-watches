"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
      { name: "Luxury Watches", href: "/collections/men-luxury", image: "/images/products/images (4).jpg" },
      { name: "Strap Watches", href: "/collections/men-strap", image: "/images/products/images (1).jpg" },
      { name: "Chain Watches", href: "/collections/men-chain", image: "/images/products/images (17).jpg" },
    ],
  },
  {
    name: "Women",
    href: "/collections/women",
    image: "/images/home/images (18).jpg",
    subcategories: [
      { name: "Luxury Watches", href: "/collections/women-luxury", image: "/images/products/images (4).jpg" },
      { name: "Chain Watches", href: "/collections/women-chain", image: "/images/products/images (12).jpg" },
    ],
  },
  {
    name: "Couple",
    href: "/collections/couple",
    image: "/images/home/images (13).jpg",
    subcategories: [{ name: "Chain Watches", href: "/collections/couple-chain", image: "/images/products/images (3).jpg" }],
  },
];

const quickLinks = [
  { name: "Best Sellers", href: "/collections/best-sellers" },
  { name: "New Arrival", href: "/collections/new-arrivals" },
  { name: "Track Order", href: "/track-order" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const { count, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { openSearch } = useSearch();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <button
          className="text-text-primary lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link href="/" className="shrink-0">
          <span className="text-2xl font-extrabold tracking-wide text-text-primary sm:text-[1.7rem]">
            CRYS<span className="text-sale-badge">MA</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <Link
            href="/collections/sale"
            className="text-sm font-bold text-sale-badge hover:opacity-80"
          >
            SALE
          </Link>
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-primary transition-colors hover:text-text-secondary"
            >
              {link.name}
            </Link>
          ))}
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="relative"
              onMouseEnter={() => setOpenMegaMenu(cat.name)}
              onMouseLeave={() => setOpenMegaMenu(null)}
            >
              <Link
                href={cat.href}
                className="flex items-center gap-1 text-sm font-medium text-text-primary transition-colors hover:text-text-secondary"
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
                    className="absolute left-1/2 top-full w-80 -translate-x-1/2 rounded-xl border border-border bg-card-background p-5 shadow-2xl shadow-black/10"
                  >
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      Shop {cat.name}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-background-secondary"
                        >
                          <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-md bg-background-secondary">
                            <Image
                              src={sub.image}
                              alt={sub.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </span>
                          <span className="text-sm font-medium text-text-primary">
                            {sub.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={openSearch}
            className="text-text-primary transition-colors hover:text-text-secondary"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/wishlist"
            className="relative text-text-primary transition-colors hover:text-text-secondary sm:block"
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
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-sale-badge text-[10px] font-bold text-white"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link
            href="/account"
            className="hidden text-text-primary transition-colors hover:text-text-secondary sm:block"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>
          <button
            onClick={openCart}
            className="relative text-text-primary transition-colors hover:text-text-secondary"
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
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-sale-badge text-[10px] font-bold text-white"
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
              <Link
                href="/collections/sale"
                className="rounded-lg px-3 py-3 font-bold text-sale-badge"
                onClick={() => setMobileMenuOpen(false)}
              >
                SALE
              </Link>
              {categories.map((cat) => (
                <div key={cat.name}>
                  <Link
                    href={cat.href}
                    className="flex items-center justify-between rounded-lg px-3 py-3 font-semibold text-text-primary hover:bg-background-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                  <div className="ml-4 flex flex-col gap-1 border-l border-border pl-3">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="rounded-lg px-3 py-2 text-sm text-text-secondary hover:text-text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                href="/collections/best-sellers"
                className="rounded-lg px-3 py-3 font-medium text-text-primary hover:bg-background-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Best Sellers
              </Link>
              <Link
                href="/collections/new-arrivals"
                className="rounded-lg px-3 py-3 font-medium text-text-primary hover:bg-background-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                New Arrival
              </Link>
              <Link
                href="/track-order"
                className="rounded-lg px-3 py-3 font-medium text-text-primary hover:bg-background-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Track Order
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