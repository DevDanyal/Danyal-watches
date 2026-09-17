"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Categories", href: "/collections/men", icon: LayoutGrid },
  { name: "Cart", href: "/cart", icon: ShoppingBag },
  { name: "Account", href: "/account", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { openCart, count } = useCart();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-4">
        {navItems.map(({ name, href, icon: Icon }) => {
          if (name === "Cart") {
            return (
              <button
                key={name}
                onClick={openCart}
                className="flex flex-col items-center gap-1 py-2.5"
              >
                <span
                  className={cn(
                    "relative flex h-8 w-12 items-center justify-center rounded-full transition-all",
                    pathname === "/cart" && "bg-background-secondary"
                  )}
                >
                  <Icon className="h-5 w-5 text-text-secondary" />
                  {count > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-sale-badge text-[10px] font-bold text-white">
                      {count}
                    </span>
                  )}
                </span>
                <span className="text-[10px] font-medium text-text-secondary">
                  {name}
                </span>
              </button>
            );
          }

          const active = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className="flex flex-col items-center gap-1 py-2.5"
            >
              <span
                className={cn(
                  "flex h-8 w-12 items-center justify-center rounded-full transition-all",
                  active && "bg-background-secondary"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    active ? "text-text-primary" : "text-text-secondary"
                  )}
                />
              </span>
              <span
                className={cn(
                  "text-[10px] font-medium",
                  active ? "font-bold text-text-primary" : "text-text-secondary"
                )}
              >
                {name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}