"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    kicker: "Men Collection",
    title: "Timeless Luxury, Crafted for You",
    subtitle:
      "Precision timepieces for men, women & couples. Swiss-inspired design. Exceptional value.",
    cta: "Shop Men",
    href: "/collections/men",
    image: "/images/home/sveston-men.jpg",
    alt: "CRYSMA men's luxury watch",
  },
  {
    id: 2,
    kicker: "Flash Sale Live",
    title: "Up to 30% Off Luxury Watches",
    subtitle:
      "Limited time offer on premium timepieces. Free nationwide shipping on all orders.",
    cta: "Shop Sale",
    href: "/collections/sale",
    image: "/images/home/sveston-hero-3.jpg",
    alt: "CRYSMA watch on sale",
  },
  {
    id: 3,
    kicker: "For Her",
    title: "Elegance in Every Detail",
    subtitle:
      "Refined women's luxury watches — bracelets, chains and statement pieces.",
    cta: "Shop Women",
    href: "/collections/women",
    image: "/images/home/sveston-hero-1.jpg",
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
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-16">
        <div className="relative z-10 order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sale-badge">
                {slide.kicker}
              </span>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-[3.4rem]">
                {slide.title}
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">
                {slide.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={slide.href}
                  className="group inline-flex items-center justify-center gap-2 bg-text-primary px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-sale-badge"
                >
                  {slide.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/collections/couple"
                  className="inline-flex items-center justify-center border border-border px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-text-primary transition-all duration-300 hover:border-text-primary"
                >
                  Shop Couple
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-text-primary" : "w-3 bg-text-secondary/30"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card-background text-text-primary transition-all hover:border-text-primary"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card-background text-text-primary transition-all hover:border-text-primary"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-background-secondary">
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
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <span className="absolute left-4 top-4 rounded bg-sale-badge px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              {slide.kicker}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}