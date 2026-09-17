import type { Metadata } from "next";
import Link from "next/link";
import WishlistClient from "@/components/wishlist/WishlistClient";

export const metadata: Metadata = {
  title: "Wishlist | CRYSMA Watches",
  description: "Your saved CRYSMA watches. Add your favourites and check out anytime.",
};

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sale-badge">
          Saved for later
        </span>
        <h1 className="mt-2 text-3xl font-bold text-text-primary sm:text-4xl">
          Your Wishlist
        </h1>
      </div>
      <WishlistClient
        empty={
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <p className="text-xl text-text-primary">
              Your wishlist is empty
            </p>
            <p className="text-sm text-text-secondary">
              Tap the heart on any watch to save it here.
            </p>
            <Link
              href="/collections/men"
              className="rounded-full bg-text-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-105"
            >
              Browse Watches
            </Link>
          </div>
        }
      />
    </div>
  );
}