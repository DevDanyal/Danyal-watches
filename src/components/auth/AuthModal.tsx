"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User as UserIcon, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal({
  open,
  onClose,
  onSuccess,
  title,
  subtitle,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
  subtitle?: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card-background shadow-2xl"
          >
            <AuthForm
              title={title}
              subtitle={subtitle}
              onClose={onClose}
              onSuccess={onSuccess}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AuthForm({
  title,
  subtitle,
  onClose,
  onSuccess,
}: {
  title?: string;
  subtitle?: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res =
      mode === "login"
        ? await login(email.trim(), password)
        : await register(name.trim(), email.trim(), password);
    setBusy(false);
    if (!res.ok) {
      setError(res.error ?? "Something went wrong.");
      return;
    }
    onClose();
    onSuccess();
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h2 className="text-lg font-extrabold text-text-primary">
            {title ?? (mode === "login" ? "Welcome Back" : "Create Account")}
          </h2>
          <p className="mt-0.5 text-xs text-text-secondary">
            {subtitle ??
              "Sign in to track orders and manage your profile."}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-text-primary hover:text-text-primary"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-6">
        <div className="flex rounded-xl border border-border p-1">
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setError(null);
              }}
              className={`relative flex-1 rounded-lg py-2.5 text-center text-xs font-bold uppercase tracking-wider transition-colors ${
                mode === m ? "text-black" : "text-text-secondary"
              }`}
            >
              {mode === m && (
                <motion.span
                  layoutId="auth-modal-tab"
                  className="absolute inset-0 rounded-lg bg-text-primary"
                />
              )}
              <span className="relative z-10">
                {m === "login" ? "Sign In" : "Register"}
              </span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
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

          {mode === "login" && (
            <p className="text-right text-xs">
              <span
                onClick={() => {
                  setMode("register");
                  setError(null);
                }}
                className="cursor-pointer font-semibold text-text-primary hover:underline"
              >
                New here? Create an account
              </span>
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-text-primary py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-sale-badge disabled:opacity-60"
          >
            {busy ? "Please wait..." : mode === "login" ? "Sign In & Continue" : "Register & Continue"}
          </button>
        </form>
      </div>
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