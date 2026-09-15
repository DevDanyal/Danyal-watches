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
    <section className="relative overflow-hidden border-t border-border bg-background-secondary">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 100% at 50% 0%, rgba(198,161,91,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-gold">
          Stay Updated
        </span>
        <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          Join Our Newsletter
        </h2>
        <p className="mt-4 text-text-secondary">
          Subscribe to receive exclusive offers, new arrivals, and watch care
          tips. No spam, ever.
        </p>

        {subscribed ? (
          <div className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-success/40 bg-success/10 px-6 py-4 text-success">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-semibold">
              Thank you for subscribing!
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="h-12 flex-1 rounded-full border border-background-secondary bg-card-background px-6 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent-gold px-8 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105 hover:bg-accent-gold-light"
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