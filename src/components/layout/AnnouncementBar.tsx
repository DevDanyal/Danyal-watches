"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, RotateCcw, ShieldCheck, Star } from "lucide-react";

const messages = [
  { icon: Truck, text: "Free Nationwide Delivery" },
  { icon: RotateCcw, text: "30 Days Hassle-Free Returns & Easy Exchange" },
  { icon: ShieldCheck, text: "1 Year International Warranty" },
  { icon: Star, text: "UPTO 30% OFF | SALE IS NOW LIVE" },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const { icon: Icon, text } = messages[index];

  return (
    <div className="border-b border-border bg-background text-text-primary">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-1.5">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2"
          >
            <Icon className="h-3.5 w-3.5 text-sale-badge" />
            <span className="text-xs font-medium tracking-wide">{text}</span>
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}