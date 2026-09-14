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
    <section className="relative overflow-hidden bg-gradient-to-r from-accent-gold to-accent-gold-light">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 32px, #000 32px 34px)",
        }}
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-black/70">
            <Flame className="h-4 w-4" />
            Limited Time Offer
          </span>
          <h2 className="font-serif text-2xl font-bold text-black sm:text-3xl">
            FLASH SALE — Up to 30% OFF
          </h2>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex h-20 w-16 flex-col items-center justify-center rounded-xl bg-black text-white shadow-lg sm:h-24 sm:w-20"
            >
              <span className="text-2xl font-bold tabular-nums sm:text-3xl">
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
          className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-accent-gold transition-all duration-300 hover:scale-105"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}