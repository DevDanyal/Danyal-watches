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
  Tag,
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
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

const ADMIN_ACCOUNT_KEY = "crysma_admin_account";
const ADMIN_SESSION_KEY = "crysma_admin_session";
const SETUP_KEY = process.env.NEXT_PUBLIC_ADMIN_SETUP_KEY ?? "";

type AdminAccount = { email: string; password: string };

function readAccount(): AdminAccount | null {
  try {
    const raw = window.localStorage.getItem(ADMIN_ACCOUNT_KEY);
    return raw ? (JSON.parse(raw) as AdminAccount) : null;
  } catch {
    return null;
  }
}

function Gate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [dbMode, setDbMode] = useState(false);
  const [checking, setChecking] = useState(true);
  const [setupKey, setSetupKey] = useState("");
  const [setupEmail, setSetupEmail] = useState("");
  const [setupPass, setSetupPass] = useState("");
  const [setupPass2, setSetupPass2] = useState("");
  const [setupError, setSetupError] = useState("");

  const hasAccount = () => readAccount() !== null;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setAuthed(!!window.localStorage.getItem(ADMIN_SESSION_KEY));
        const res = await fetch("/api/health", { cache: "no-store" });
        const json = await res.json();
        const connected = json?.data?.status === "connected";
        if (!cancelled) setDbMode(connected);
      } catch {
        // offline — keep demo mode
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (dbMode) {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: pass }),
        });
        const json = await res.json();
        if (!json?.ok) {
          setError(json?.error ?? "Login failed.");
          return;
        }
        if (json?.data?.role !== "admin") {
          setError("This account is not an administrator.");
          return;
        }
        window.localStorage.setItem(ADMIN_SESSION_KEY, json.data.email);
        setAuthed(true);
      } catch {
        setError("Could not reach the server. Please try again.");
      }
      return;
    }

    const account = readAccount();
    if (!account) {
      setError("Admin account is not configured.");
      return;
    }
    if (
      email.trim().toLowerCase() !== account.email.toLowerCase() ||
      pass !== account.password
    ) {
      setError("Incorrect email or password.");
      return;
    }
    window.localStorage.setItem(ADMIN_SESSION_KEY, account.email);
    setAuthed(true);
  };

  const setupAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setSetupError("");
    if (!SETUP_KEY) {
      setSetupError("Admin setup is locked. The site owner must set NEXT_PUBLIC_ADMIN_SETUP_KEY.");
      return;
    }
    if (setupKey !== SETUP_KEY) {
      setSetupError("Incorrect setup key.");
      return;
    }
    if (!setupEmail.trim() || !setupPass) {
      setSetupError("Email and password are required.");
      return;
    }
    if (setupPass.length < 6) {
      setSetupError("Password must be at least 6 characters.");
      return;
    }
    if (setupPass !== setupPass2) {
      setSetupError("Passwords do not match.");
      return;
    }
    const account: AdminAccount = { email: setupEmail.trim(), password: setupPass };
    window.localStorage.setItem(ADMIN_ACCOUNT_KEY, JSON.stringify(account));
    window.localStorage.setItem(ADMIN_SESSION_KEY, account.email);
    setAuthed(true);
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-background-secondary border-t-accent-gold" />
      </div>
    );
  }

  if (!authed) {
    const showSetup = !dbMode && !hasAccount();
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <Link href="/" className="mb-8 font-serif text-2xl font-bold tracking-wider text-accent-gold">
          CRYSMA
        </Link>
        {showSetup ? (
          <form
            onSubmit={setupAccount}
            className="w-full max-w-sm rounded-2xl border border-background-secondary bg-card-background p-8"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-gold/10 text-accent-gold">
              <Lock className="h-5 w-5" />
            </span>
            <h1 className="mt-4 font-serif text-2xl font-bold text-text-primary">Set Up Admin</h1>
            <p className="mt-1 text-sm text-text-secondary">
              No admin account exists yet. Enter the setup key to create one.
            </p>
            <input
              type="password"
              value={setupKey}
              onChange={(e) => {
                setSetupKey(e.target.value);
                setSetupError("");
              }}
              placeholder="Setup key"
              className="mt-4 h-12 w-full rounded-xl border border-background-secondary bg-background px-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
            />
            <input
              type="email"
              value={setupEmail}
              onChange={(e) => {
                setSetupEmail(e.target.value);
                setSetupError("");
              }}
              placeholder="Admin email"
              className="mt-3 h-12 w-full rounded-xl border border-background-secondary bg-background px-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
            />
            <input
              type="password"
              value={setupPass}
              onChange={(e) => {
                setSetupPass(e.target.value);
                setSetupError("");
              }}
              placeholder="Password (min 6 chars)"
              className="mt-3 h-12 w-full rounded-xl border border-background-secondary bg-background px-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
            />
            <input
              type="password"
              value={setupPass2}
              onChange={(e) => {
                setSetupPass2(e.target.value);
                setSetupError("");
              }}
              placeholder="Confirm password"
              className="mt-3 h-12 w-full rounded-xl border border-background-secondary bg-background px-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
            />
            {setupError && <p className="mt-2 text-xs text-error">{setupError}</p>}
            {!SETUP_KEY && (
              <p className="mt-3 rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-xs text-error">
                Admin setup is locked — the site owner must define{" "}
                <span className="font-mono">NEXT_PUBLIC_ADMIN_SETUP_KEY</span> in the
                environment before an admin account can be created.
              </p>
            )}
            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-accent-gold py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-accent-gold-light"
            >
              Create Admin Account
            </button>
          </form>
        ) : (
          <form
            onSubmit={login}
            className="w-full max-w-sm rounded-2xl border border-background-secondary bg-card-background p-8"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-gold/10 text-accent-gold">
              <Lock className="h-5 w-5" />
            </span>
            <h1 className="mt-4 font-serif text-2xl font-bold text-text-primary">Admin Access</h1>
            <p className="mt-1 text-sm text-text-secondary">Sign in with your administrator account.</p>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Admin email"
              className="mt-4 h-12 w-full rounded-xl border border-background-secondary bg-background px-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
            />
            <input
              type="password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                setError("");
              }}
              placeholder="Password"
              className="mt-3 h-12 w-full rounded-xl border border-background-secondary bg-background px-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
            />
            {error && (
              <p className="mt-2 text-xs text-error">{error}</p>
            )}
            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-accent-gold py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-accent-gold-light"
            >
              Enter Dashboard
            </button>
          </form>
        )}
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