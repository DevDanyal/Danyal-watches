"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const messages = [
  "Free Nationwide Shipping",
  "7-Day Easy Returns",
  "1 Year Warranty",
  "UPTO 30% OFF | SALE IS NOW LIVE",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden bg-accent-gold text-black">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-1.5">
        <motion.p
          key={index}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center text-xs font-medium tracking-wide sm:text-sm"
        >
          {messages[index]}
        </motion.p>
      </div>
    </div>
  );
}