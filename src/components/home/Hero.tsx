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
    image:
      "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_2940b79d-6b95-478d-9ad3-913212ced9c4.jpg",
  },
  {
    id: 2,
    kicker: "Flash Sale Live",
    title: "Up to 30% Off\nLuxury Watches",
    subtitle:
      "Limited time offer on premium timepieces. Free nationwide shipping on all orders.",
    cta: "Shop Sale",
    href: "/collections/sale",
    image:
      "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_7e40cc81-e924-412b-a755-034ae056a929.jpg",
  },
  {
    id: 3,
    kicker: "For Her",
    title: "Elegance in\nEvery Detail",
    subtitle:
      "Refined women's luxury watches — bracelets, chains and statement pieces.",
    cta: "Shop Women",
    href: "/collections/women",
    image:
      "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_d23c90e3-40ff-4c89-ab22-09a9ebfdf5a8.jpg",
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
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-background sm:min-h-[85vh]" aria-roledescription="carousel" aria-label="Featured collections">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-20 sm:min-h-[85vh] sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl"
          >
            <span className="inline-block rounded-full border border-accent-gold/40 bg-accent-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              {slides[current].kicker}
            </span>
            <h1 className="mt-6 whitespace-pre-line font-serif text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
              {slides[current].title}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">
              {slides[current].subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={slides[current].href}
                className="inline-flex items-center justify-center rounded-full bg-accent-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105 hover:bg-accent-gold-light"
              >
                {slides[current].cta}
              </Link>
              <Link
                href="/collections/couple"
                className="inline-flex items-center justify-center rounded-full border border-text-secondary/40 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-text-primary transition-all duration-300 hover:border-accent-gold hover:text-accent-gold"
              >
                Shop Couple
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-16 right-4 z-10 flex items-center gap-3 sm:bottom-20 sm:right-8">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-text-secondary/30 text-text-primary backdrop-blur-sm transition-all hover:border-accent-gold hover:text-accent-gold"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-text-secondary/30 text-text-primary backdrop-blur-sm transition-all hover:border-accent-gold hover:text-accent-gold"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-10 bg-accent-gold" : "w-4 bg-text-secondary/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}