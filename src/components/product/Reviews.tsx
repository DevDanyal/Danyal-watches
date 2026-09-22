"use client";

import { useMemo, useState } from "react";
import { Star, X } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";

type Review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
};

const pool: Review[] = [
  { id: "seed-1", name: "Ahmed R.", rating: 5, date: "Aug 28, 2026", comment: "Excellent quality watch. The gold finish looks premium and the strap is very comfortable. Shipped in 3 days!", verified: true },
  { id: "seed-2", name: "Fatima K.", rating: 4, date: "Aug 15, 2026", comment: "Beautiful timepiece, matches the photos perfectly. Slight delay in delivery but worth the wait.", verified: true },
  { id: "seed-3", name: "Bilal S.", rating: 5, date: "Jul 30, 2026", comment: "Bought this for my father's birthday. He absolutely loves it. Great customer service too.", verified: true },
  { id: "seed-4", name: "Ayesha M.", rating: 5, date: "Jul 12, 2026", comment: "Looks even better in person. Very satisfied with the purchase and packaging.", verified: true },
  { id: "seed-5", name: "Usman T.", rating: 4, date: "Jun 26, 2026", comment: "Solid build quality for the price. The dial is stunning in natural light.", verified: true },
  { id: "seed-6", name: "Mariam F.", rating: 3, date: "Jun 9, 2026", comment: "Nice watch overall, delivery took a little longer than expected but the product is good.", verified: true },
];

function hashId(product: Product): number {
  let h = 0;
  for (const ch of product.id + product.slug) h = (h * 31 + ch.charCodeAt(0)) | 0;
  return Math.abs(h);
}

function loadUserReviews(productId: string): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(`danyal_reviews_${productId}`);
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
}

function Stars({ rating, size = "md" }: { rating: number; size?: "md" | "sm" }) {
  return (
    <span className="flex items-center gap-0.5 text-star">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn(
            size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
            s <= rating ? "fill-current" : "fill-current opacity-25"
          )}
        />
      ))}
    </span>
  );
}

export default function Reviews({ product }: { product: Product }) {
  const seedCount = Math.max(3, product.reviews % pool.length || 3);
  const offset = hashId(product) % pool.length;

  const seedReviews = useMemo(() => {
    const ordered: Review[] = [];
    for (let i = 0; i < seedCount; i++) {
      ordered.push(pool[(offset + i) % pool.length]);
    }
    return ordered;
  }, [offset, seedCount]);

  const [userReviews, setUserReviews] = useState<Review[]>(() =>
    loadUserReviews(product.id)
  );
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });
  const [thanks, setThanks] = useState(false);

  const allReviews = useMemo(
    () => [...userReviews, ...seedReviews],
    [userReviews, seedReviews]
  );

  const breakdown = useMemo(() => {
    const buckets = [0, 0, 0, 0, 0];
    allReviews.forEach((r) => {
      const idx = Math.min(5, Math.max(1, Math.round(r.rating))) - 1;
      buckets[idx] += 1;
    });
    const total = allReviews.length || 1;
    return [5, 4, 3, 2, 1].map((stars, i) => ({
      stars,
      pct: Math.round((buckets[i] / total) * 100),
    }));
  }, [allReviews]);

  const avg = useMemo(
    () =>
      allReviews.length
        ? Math.round((allReviews.reduce((a, r) => a + r.rating, 0) / allReviews.length) * 10) / 10
        : product.rating,
    [allReviews, product.rating]
  );

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) return;
    const next: Review = {
      id: `user-${Date.now()}`,
      name: form.name.trim(),
      rating: form.rating,
      date: new Date().toLocaleDateString("en-PK", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      comment: form.comment.trim(),
      verified: false,
    };
    const updated = [next, ...userReviews];
    setUserReviews(updated);
    try {
      window.localStorage.setItem(`danyal_reviews_${product.id}`, JSON.stringify(updated));
    } catch {
      /* ignore */
    }
    setForm({ name: "", rating: 5, comment: "" });
    setShowForm(false);
    setThanks(true);
    window.setTimeout(() => setThanks(false), 4000);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-sale-badge">
          Customer Feedback
        </span>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
          Reviews & Ratings
        </h2>
      </div>

      {thanks && (
        <div className="mx-auto mb-6 max-w-lg rounded-xl border border-success/40 bg-success/10 px-5 py-4 text-center text-sm font-medium text-success">
          Thank you! Your review has been published below.
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card-background p-6 lg:col-span-1">
          <div className="text-center">
            <span className="text-5xl font-extrabold text-text-primary">{avg}</span>
            <div className="mt-3 flex justify-center">
              <Stars rating={Math.round(avg)} />
            </div>
            <p className="mt-2 text-sm text-text-secondary">
              Based on {allReviews.length} reviews
            </p>
          </div>

          <div className="mt-6 space-y-2.5">
            {breakdown.map((b) => (
              <div key={b.stars} className="flex items-center gap-3">
                <span className="flex w-12 items-center gap-1 text-xs text-text-secondary">
                  {b.stars} <Star className="h-3 w-3 fill-current" />
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-background-secondary">
                  <div
                    className="h-full rounded-full bg-star"
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs text-text-secondary">{b.pct}%</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="mt-6 w-full bg-text-primary py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-sale-badge"
          >
            Write a Review
          </button>
        </div>

        <div className="space-y-4 lg:col-span-2">
          {showForm && (
            <form
              onSubmit={submitReview}
              className="rounded-xl border border-border bg-card-background p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-primary">
                  Share your experience
                </h3>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  aria-label="Close review form"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-background-secondary text-text-secondary hover:text-text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-text-primary focus:outline-none"
                />
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Rating
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setForm({ ...form, rating: s })}
                        aria-label={`${s} stars`}
                      >
                        <Star
                          className={cn(
                            "h-5 w-5 transition-colors",
                            s <= form.rating ? "fill-current text-text-primary" : "text-text-secondary"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  placeholder="Tell us about your experience…"
                  required
                  rows={3}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-text-primary focus:outline-none sm:col-span-2"
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-text-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-sale-badge"
              >
                Submit Review
              </button>
            </form>
          )}

          {allReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border border-border bg-card-background p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary text-sm font-bold text-text-primary">
                    {review.name.charAt(0)}
                  </span>
                  <div>
                    <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      {review.name}
                      {review.verified && (
                        <span className="rounded bg-success/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-success">
                          Verified
                        </span>
                      )}
                      {!review.verified && (
<span className="rounded bg-background-secondary px-1.5 py-0.5 text-[10px] font-bold uppercase text-text-secondary">
                          New
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-text-secondary">{review.date}</p>
                  </div>
                </div>
                <Stars rating={review.rating} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
