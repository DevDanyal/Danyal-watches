"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Boxes,
  TicketPercent,
  Image as ImageIcon,
  Tag,
  Newspaper,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";
import { AdminProvider } from "@/context/AdminContext";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/inventory", label: "Inventory", icon: Boxes },
  { href: "/admin/coupons", label: "Coupons", icon: TicketPercent },
  { href: "/admin/banners", label: "Banners", icon: ImageIcon },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        if (!json?.ok || json?.data?.role !== "admin") {
          window.location.replace("/admin");
        }
      } catch {
        if (!cancelled) window.location.replace("/admin");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.replace("/admin");
    }
  };

  return (
    <AdminProvider>
      <div className="flex min-h-screen bg-background">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-background-secondary bg-background-secondary transition-all duration-300 lg:static",
            collapsed ? "lg:w-16" : "lg:w-60",
            sidebarOpen ? "w-60 translate-x-0" : "w-60 -translate-x-full lg:translate-x-0"
          )}
        >
          <div className={cn("flex h-16 items-center border-b border-background-secondary px-4", collapsed ? "lg:justify-center" : "lg:justify-between")}>
            <Link href="/admin" className="shrink-0">
              <span className="font-serif text-lg font-bold tracking-wider text-accent-gold">
                {collapsed ? "C" : "Danyal Admin"}
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-text-secondary lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className={cn("flex-1 overflow-y-auto p-3", collapsed ? "lg:px-2" : "")}>
            {nav.map(({ href, label, icon: Icon, exact }) => {
              const active = exact ? pathname === href : pathname?.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    collapsed ? "lg:justify-center" : "",
                    active
                      ? "bg-accent-gold text-white"
                      : "text-text-secondary hover:bg-background hover:text-text-primary"
                  )}
                  title={collapsed ? label : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {(!collapsed || sidebarOpen) && <span>{label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-background-secondary p-3">
            <button
              onClick={logout}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-error",
                collapsed ? "lg:justify-center" : ""
              )}
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {(!collapsed || sidebarOpen) && <span>Logout</span>}
            </button>
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="hidden h-9 w-full items-center justify-center rounded-xl text-text-secondary hover:bg-background lg:flex"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
            </button>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-background-secondary bg-background/80 px-4 backdrop-blur-md sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-text-secondary lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <span className="hidden text-sm text-text-secondary sm:block">
                Welcome back, <span className="font-semibold text-text-primary">Admin</span>
              </span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent-gold hover:text-accent-gold-light"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Store
            </Link>
          </header>

          <main className="flex-1 p-4 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}
