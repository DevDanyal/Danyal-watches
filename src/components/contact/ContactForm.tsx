"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-success/40 bg-success/10 px-6 py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-success" />
        <h2 className="text-2xl font-extrabold text-text-primary">
          Message Sent!
        </h2>
        <p className="max-w-sm text-sm text-text-secondary">
          Thank you for reaching out. Our team will get back to you within 24
          hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card-background p-6 sm:p-8"
    >
      <h2 className="text-2xl font-extrabold text-text-primary">
        Send us a Message
      </h2>
      <p className="mt-2 text-sm text-text-secondary">
        Fill out the form and we will respond as soon as possible.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-primary">
            Name
          </label>
          <input
            required
            placeholder="Your full name"
            className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-text-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-primary">
            Email
          </label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-text-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-primary">
            Phone
          </label>
          <input
            type="tel"
            placeholder="+92 3XX XXXXXXX"
            className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-text-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-primary">
            Subject
          </label>
          <select className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-text-primary focus:border-text-primary focus:outline-none">
            <option>General Inquiry</option>
            <option>Order Support</option>
            <option>Product Question</option>
            <option>Exchange / Return</option>
            <option>Wholesale / Bulk Order</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-primary">
            Message
          </label>
          <textarea
            required
            rows={5}
            placeholder="How can we help you?"
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-text-primary focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-6 flex w-full items-center justify-center gap-2 bg-text-primary py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-sale-badge disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {sending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}