"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Accordion({
  items,
}: {
  items: { title: string; content: React.ReactNode }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-background-secondary rounded-xl border border-background-secondary bg-card-background">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-accent-gold transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed text-text-secondary">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}