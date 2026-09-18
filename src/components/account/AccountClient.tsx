"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import PageHeader from "@/components/shared/PageHeader";

export default function AccountClient() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const switchMode = () => {
    setMode((m) => (m === "login" ? "register" : "login"));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res =
      mode === "login"
        ? await login(email.trim(), password)
        : await register(name.trim(), email.trim(), password);
    setBusy(false);
    if (!res.ok) setError(res.error ?? "Something went wrong.");
  };

  return (
    <>
      <PageHeader
        kicker="My Account"
        title="Welcome Back"
        subtitle="Sign in to track orders, view your wishlist, and manage your profile."
      />

      <section className="mx-auto max-w-md px-4 py-14 sm:px-6">
        <div className="rounded-2xl border border-border bg-card-background p-6 sm:p-8">
          <div className="flex rounded-xl border border-border p-1">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={switchMode}
                className={`relative flex-1 rounded-lg py-2.5 text-center text-xs font-bold uppercase tracking-wider transition-colors ${
                  mode === m ? "text-black" : "text-text-secondary"
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="auth-tab"
                    className="absolute inset-0 rounded-lg bg-text-primary"
                  />
                )}
                <span className="relative z-10">
                  {m === "login" ? "Sign In" : "Register"}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <AnimatePresence mode="wait" initial={false}>
              {mode === "register" && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <Field
                    icon={<UserIcon className="h-4 w-4" />}
                    label="Full Name"
                    value={name}
                    onChange={setName}
                    placeholder="Your full name"
                    type="text"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Field
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              type="email"
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "register" ? "Min. 6 characters" : "Your password"}
                  className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-11 text-sm text-text-primary placeholder:text-text-secondary focus:border-text-primary focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg bg-error/10 px-4 py-2.5 text-xs text-error"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-text-primary py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-sale-badge disabled:opacity-60"
            >
              {busy ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {mode === "login" && (
            <p className="mt-5 text-center text-xs text-text-secondary">
              New to Danyal?{" "}
              <button onClick={switchMode} className="font-semibold text-text-primary hover:underline">
                Create an account
              </button>
            </p>
          )}

          <p className="mt-6 border-t border-border pt-5 text-center text-xs leading-relaxed text-text-secondary">
            By continuing you agree to our{" "}
            <Link href="/terms-and-conditions" className="text-text-primary hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

function Field({
  icon,
  label,
  value,
  onChange,
  placeholder,
  type,
  required,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-text-primary">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
          {icon}
        </span>
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-text-primary focus:outline-none"
        />
      </div>
    </div>
  );
}
