"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: pass }),
      });
      const json = await res.json();
      if (!json?.ok) {
        setError(json?.error ?? "Login failed.");
        return;
      }
      window.location.replace("/admin");
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <Link
        href="/"
        className="mb-8 font-serif text-2xl font-bold tracking-wider text-accent-gold"
      >
        Danyal
      </Link>
      <form
        onSubmit={login}
        className="w-full max-w-sm rounded-2xl border border-background-secondary bg-card-background p-8"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-gold/10 text-accent-gold">
          <Lock className="h-5 w-5" />
        </span>
        <h1 className="mt-4 font-serif text-2xl font-bold text-text-primary">
          Admin Access
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Sign in with your administrator account.
        </p>
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
        {error && <p className="mt-2 text-xs text-error">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-5 w-full rounded-full bg-accent-gold py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-accent-gold-light disabled:opacity-60"
        >
          {busy ? "Signing in..." : "Enter Dashboard"}
        </button>
      </form>
    </div>
  );
}
