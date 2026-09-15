"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    kicker: "New Season Collection",
    title: "Timeless Luxury,\nCrafted for You",
    subtitle:
      "Precision timepieces for men, women & couples. Swiss-inspired design. Exceptional value.",
    cta: "Shop Men",
    href: "/collections/men",
    image: "/images/home/images (8).jpg",
    alt: "CRYSMA men's luxury watch",
  },
  {
    id: 2,
    kicker: "Flash Sale Live",
    title: "Up to 30% Off\nLuxury Watches",
    subtitle:
      "Limited time offer on premium timepieces. Free nationwide shipping on all orders.",
    cta: "Shop Sale",
    href: "/collections/sale",
    image: "/images/home/images (1).jpg",
    alt: "CRYSMA watch on sale",
  },
  {
    id: 3,
    kicker: "For Her",
    title: "Elegance in\nEvery Detail",
    subtitle:
      "Refined women's luxury watches — bracelets, chains and statement pieces.",
    cta: "Shop Women",
    href: "/collections/women",
    image: "/images/home/images (6).jpg",
    alt: "CRYSMA women's luxury watch",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section
      className="relative overflow-hidden bg-background"
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(198,161,91,0.10) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-64 -left-40 h-[36rem] w-[36rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(198,161,91,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-gold/30 bg-accent-gold-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
                {slide.kicker}
              </span>
              <h1 className="mt-6 whitespace-pre-line font-serif text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">
                {slide.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={slide.href}
                  className="inline-flex items-center justify-center rounded-full bg-accent-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-accent-gold-light hover:scale-[1.03]"
                >
                  {slide.cta}
                </Link>
                <Link
                  href="/collections/couple"
                  className="inline-flex items-center justify-center rounded-full border border-text-secondary/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-text-primary transition-all duration-300 hover:border-accent-gold hover:text-accent-gold"
                >
                  Shop Couple
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative hidden sm:block">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 scale-90 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(198,161,91,0.14) 0%, transparent 62%)",
            }}
          />
          <div className="relative mx-auto max-w-[420px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card-background">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={current === 0}
                    sizes="(max-width: 1024px) 0vw, 420px"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute -left-6 bottom-8 hidden rounded-xl border border-border bg-card-background/90 px-5 py-3 shadow-2xl shadow-black/40 backdrop-blur-md lg:block">
              <p className="font-serif text-lg font-bold text-accent-gold">
                {slide.kicker}
              </p>
              <p className="text-[11px] uppercase tracking-wider text-text-secondary">
                CRYSMA Collection
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pb-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-accent-gold"
                  : "w-3 bg-text-secondary/30 hover:bg-text-secondary/50"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card-background text-text-primary transition-all hover:border-accent-gold hover:text-accent-gold"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card-background text-text-primary transition-all hover:border-accent-gold hover:text-accent-gold"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}