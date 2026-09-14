"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  const next = () => setActive((a) => (a + 1) % images.length);
  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);

  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative aspect-square overflow-hidden rounded-xl border border-background-secondary bg-background-secondary"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={`${name} - image ${active + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={cn(
                "object-cover transition-transform duration-500",
                zoom && "scale-125"
              )}
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70 sm:hidden"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70 sm:hidden"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 sm:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to image ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active ? "w-6 bg-accent-gold" : "w-1.5 bg-white/60"
              )}
            />
          ))}
        </div>
      </div>

      <div className="hidden gap-3 sm:flex">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={cn(
              "relative h-24 w-24 overflow-hidden rounded-lg border-2 transition-all",
              i === active
                ? "border-accent-gold opacity-100"
                : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Image
              src={img}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}