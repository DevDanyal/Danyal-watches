"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-background-secondary bg-card-background p-5", className)}>
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="font-serif text-2xl font-bold text-text-primary">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  change,
  icon,
}: {
  label: string;
  value: string;
  change?: string;
  icon: ReactNode;
}) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute right-0 top-0 h-24 w-24 -translate-y-6 translate-x-6 rounded-full bg-accent-gold/5" />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            {label}
          </p>
          <p className="mt-2 font-montserrat text-2xl font-bold text-text-primary">{value}</p>
          {change && <p className="mt-1 text-xs text-success">▲ {change}</p>}
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gold/10 text-accent-gold">
          {icon}
        </span>
      </div>
    </Card>
  );
}

export function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "success" | "error" | "gold" | "muted";
}) {
  const tones: Record<string, string> = {
    default: "bg-card-background text-text-primary border-background-secondary",
    success: "bg-success/15 text-success border-success/30",
    error: "bg-error/15 text-error border-error/30",
    gold: "bg-accent-gold/15 text-accent-gold border-accent-gold/30",
    muted: "bg-text-secondary/10 text-text-secondary border-background-secondary",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

export function Input({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {label}
        </label>
      )}
      <input
        {...props}
        className="h-11 w-full rounded-xl border border-background-secondary bg-background px-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
      />
    </div>
  );
}

export function Select({
  label,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {label}
        </label>
      )}
      <select
        {...props}
        className="h-11 w-full rounded-xl border border-background-secondary bg-background px-4 text-sm text-text-primary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
      >
        {children}
      </select>
    </div>
  );
}

export function PrimaryBtn({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "flex items-center justify-center gap-2 rounded-full bg-accent-gold px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:scale-[1.02] hover:bg-accent-gold-light disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}

export function GhostBtn({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "flex items-center justify-center gap-2 rounded-full border border-background-secondary px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-text-secondary transition-colors hover:border-accent-gold hover:text-accent-gold",
        className
      )}
    >
      {children}
    </button>
  );
}

export function DangerBtn({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-error transition-colors hover:text-error/70",
        className
      )}
    >
      {children}
    </button>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-16 text-center">
      <p className="font-serif text-lg font-bold text-text-primary">{title}</p>
      <p className="max-w-sm text-sm text-text-secondary">{text}</p>
    </div>
  );
}