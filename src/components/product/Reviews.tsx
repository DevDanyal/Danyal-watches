import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Review = {
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
};

const sampleReviews: Review[] = [
  {
    name: "Ahmed R.",
    rating: 5,
    date: "Aug 28, 2026",
    comment:
      "Excellent quality watch. The gold finish looks premium and the strap is very comfortable. Shipped in 3 days!",
    verified: true,
  },
  {
    name: "Fatima K.",
    rating: 4,
    date: "Aug 15, 2026",
    comment:
      "Beautiful timepiece, matches the photos perfectly. Slight delay in delivery but worth the wait.",
    verified: true,
  },
  {
    name: "Bilal S.",
    rating: 5,
    date: "Jul 30, 2026",
    comment:
      "Bought this for my father's birthday. He absolutely loves it. Great customer service too.",
    verified: true,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5 text-accent-gold">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn(
            "h-4 w-4",
            s <= rating ? "fill-current" : "fill-current opacity-25"
          )}
        />
      ))}
    </span>
  );
}

export default function Reviews({ rating, count }: { rating: number; count: number }) {
  const breakdown = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 16 },
    { stars: 3, pct: 4 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-gold">
          Customer Feedback
        </span>
        <h2 className="mt-2 font-serif text-2xl font-bold text-text-primary sm:text-3xl">
          Reviews & Ratings
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-xl border border-background-secondary bg-card-background p-6 lg:col-span-1">
          <div className="text-center">
            <span className="font-serif text-5xl font-bold text-text-primary">
              {rating}
            </span>
            <div className="mt-3 flex justify-center">
              <Stars rating={Math.round(rating)} />
            </div>
            <p className="mt-2 text-sm text-text-secondary">
              Based on {count} reviews
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
                    className="h-full rounded-full bg-accent-gold"
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs text-text-secondary">
                  {b.pct}%
                </span>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full rounded-full bg-accent-gold py-3 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-105 hover:bg-accent-gold-light">
            Write a Review
          </button>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {sampleReviews.map((review) => (
            <div
              key={review.name}
              className="rounded-xl border border-background-secondary bg-card-background p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gold/15 font-serif text-sm font-bold text-accent-gold">
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