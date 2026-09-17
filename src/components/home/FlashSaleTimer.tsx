"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";

function getTarget() {
  const now = new Date();
  const target = new Date(now);
  target.setDate(target.getDate() + 3);
  target.setHours(23, 59, 59, 999);
  return target.getTime();
}

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function FlashSaleTimer() {
  const [target] = useState(getTarget);
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    const timer = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(timer);
  }, [target]);

  const units = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Mins", value: remaining.minutes },
    { label: "Secs", value: remaining.seconds },
  ];

  return (
    <section className="border-y border-border bg-background-secondary">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden"
        style={{
          background:
            "radial-gradient(60% 120% at 10% 50%, rgba(230,57,70,0.05) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-10 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-sale-badge">
            <Flame className="h-4 w-4" />
            Limited Time Offer
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
            FLASH SALE — Up to 30% OFF
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex h-16 w-14 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-card-background shadow-sm sm:h-20 sm:w-18"
            >
              <span className="text-2xl font-bold tabular-nums text-sale-badge sm:text-3xl">
                {pad(unit.value)}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-text-secondary">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/collections/sale"
          className="inline-flex items-center justify-center bg-text-primary px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-sale-badge"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}