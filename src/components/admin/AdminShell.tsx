"use client";

import { useState, useEffect } from "react";
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
  Newspaper,
  Settings,
  Lock,
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
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

const ADMIN_PASS = "admin123";

function Gate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [tried, setTried] = useState(false);
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setAuthed(window.localStorage.getItem("crysma_admin_session") === "1");
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === ADMIN_PASS) {
      window.localStorage.setItem("crysma_admin_session", "1");
      setAuthed(true);
    } else {
      setError(true);
      setTried(true);
    }
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <Link href="/" className="mb-8 font-serif text-2xl font-bold tracking-wider text-accent-gold">
          CRYSMA
        </Link>
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-2xl border border-background-secondary bg-card-background p-8"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-gold/10 text-accent-gold">
            <Lock className="h-5 w-5" />
          </span>
          <h1 className="mt-4 font-serif text-2xl font-bold text-text-primary">Admin Access</h1>
          <p className="mt-1 text-sm text-text-secondary">Enter the admin password to continue.</p>
          <input
            type="password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            className={cn(
              "mt-6 h-12 w-full rounded-xl border bg-background px-4 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1",
              error
                ? "border-error focus:border-error focus:ring-error"
                : "border-background-secondary focus:border-accent-gold focus:ring-accent-gold"
            )}
          />
          {error && (
            <p className="mt-2 text-xs text-error">Incorrect password. Hint: admin123</p>
          )}
          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-accent-gold py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-accent-gold-light"
          >
            {tried ? "Try Again" : "Enter Dashboard"}
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const logout = () => {
    window.localStorage.removeItem("crysma_admin_session");
    window.location.reload();
  };

  return (
    <AdminProvider>
      <Gate>
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
                  {collapsed ? "C" : "CRYSMA Admin"}
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
                        ? "bg-accent-gold text-black"
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
      </Gate>
    </AdminProvider>
  );
}