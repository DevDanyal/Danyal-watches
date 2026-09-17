"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <section className="border-t border-border bg-background-secondary">
      <div className="relative mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-sale-badge">
          Stay Updated
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
          Join Our Newsletter
        </h2>
        <p className="mt-4 text-text-secondary">
          Subscribe to get special offers, new arrivals, and once-in-a-lifetime
          deals.
        </p>

        {subscribed ? (
          <div className="mt-8 flex items-center justify-center gap-2 rounded-lg border border-success/40 bg-success/10 px-6 py-4 text-success">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-semibold">
              Thank you for subscribing!
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="h-12 flex-1 rounded-lg border border-border bg-card-background px-5 text-sm text-text-primary placeholder:text-text-secondary focus:border-text-primary focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-text-primary px-8 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-sale-badge"
            >
              <Send className="h-4 w-4" />
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}