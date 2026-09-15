"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, Banknote, Smartphone, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/data/products";
import type { CartItem } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export type SavedOrder = {
  orderId: string;
  items: CartItem[];
  total: number;
  shipping: Record<string, string>;
  paymentMethod: string;
  date: string;
};

export async function saveOrder(order: SavedOrder) {
  const key = "crysma_orders";
  try {
    const existing = JSON.parse(window.localStorage.getItem(key) ?? "[]") as SavedOrder[];
    window.localStorage.setItem(key, JSON.stringify([order, ...existing]));
  } catch {
    // ignore
  }

  // Push to the real API when the database is configured. Fail silently offline.
  try {
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: order.orderId,
        email: order.shipping.email,
        customerName: `${order.shipping.firstName} ${order.shipping.lastName}`,
        phone: order.shipping.phone,
        address: order.shipping.address,
        city: order.shipping.city,
        province: order.shipping.province,
        items: order.items,
        subtotal: order.total,
        total: order.total,
        paymentMethod: order.paymentMethod,
      }),
    });
  } catch {
    // ignore
  }
}

type Step = "shipping" | "payment" | "confirmation";

const steps: { id: Step; label: string }[] = [
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "confirmation", label: "Confirmation" },
];

const paymentMethods = [
  { id: "cod", label: "Cash on Delivery", icon: Banknote, desc: "Pay when you receive your order" },
  { id: "jazzcash", label: "JazzCash", icon: Smartphone, desc: "Pay via JazzCash mobile account" },
  { id: "easypaisa", label: "EasyPaisa", icon: Smartphone, desc: "Pay via EasyPaisa mobile account" },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, UnionPay" },
];

function OrderConfirmation({ orderId }: { orderId: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center py-12 text-center"
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/20">
        <Check className="h-10 w-10 text-success" />
      </div>
      <h2 className="font-serif text-2xl font-bold text-text-primary sm:text-3xl">
        Order Confirmed!
      </h2>
      <p className="mt-3 max-w-md text-text-secondary">
        Thank you for your purchase. You will receive a confirmation on your
        phone and email shortly.
      </p>
      <div className="mt-6 rounded-xl border border-background-secondary bg-card-background px-8 py-5">
        <p className="text-xs uppercase tracking-wider text-text-secondary">Order ID</p>
        <p className="mt-1 font-montserrat text-xl font-bold text-accent-gold">
          {orderId}
        </p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm text-success">
        <Truck className="h-4 w-4" />
        Expected delivery in 3-5 business days
      </div>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent-gold px-10 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-105 hover:bg-accent-gold-light"
      >
        Back to Home
      </Link>
    </motion.div>
  );
}

export default function CheckoutClient() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("shipping");
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [formError, setFormError] = useState("");
  const [orderId] = useState(() =>
    `CRYSMA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  );

  const shippingCost = subtotal > 0 ? 0 : 0;
  const total = subtotal + shippingCost;

  const updateShipping = (field: string, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    setFormError("");
  };

  const validateShipping = (): boolean => {
    if (!shipping.firstName.trim() || !shipping.lastName.trim()) {
      setFormError("Please enter your full name.");
      return false;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email.trim());
    if (!emailOk) {
      setFormError("Please enter a valid email address.");
      return false;
    }
    const phoneOk = shipping.phone.replace(/\D/g, "").length >= 10;
    if (!phoneOk) {
      setFormError("Please enter a valid phone number.");
      return false;
    }
    if (!shipping.address.trim() || !shipping.city.trim() || !shipping.province) {
      setFormError("Please complete your shipping address.");
      return false;
    }
    return true;
  };

  const validatePayment = (): boolean => {
    if (paymentMethod !== "card") return true;
    const digits = card.number.replace(/\s/g, "");
    if (digits.length < 12) {
      setFormError("Please enter a valid card number.");
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(card.expiry.trim())) {
      setFormError("Please enter the card expiry as MM/YY.");
      return false;
    }
    if (!/^\d{3,4}$/.test(card.cvv.trim())) {
      setFormError("Please enter a valid CVV.");
      return false;
    }
    if (!card.name.trim()) {
      setFormError("Please enter the cardholder name.");
      return false;
    }
    return true;
  };

  const placeOrder = () => {
    if (!validatePayment()) return;
    saveOrder({
      orderId,
      items,
      total,
      shipping,
      paymentMethod,
      date: new Date().toISOString(),
    });
    clearCart();
    setStep("confirmation");
  };

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="font-serif text-xl text-text-primary">Your cart is empty</p>
        <Link
          href="/collections/men"
          className="mt-2 rounded-full bg-accent-gold px-8 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-105"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  if (step === "confirmation") {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <OrderConfirmation orderId={orderId} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-serif text-3xl font-bold text-text-primary">Checkout</h1>

      <div className="mb-10 flex items-center justify-between max-w-lg mx-auto">
        {steps.map((s, i) => {
          const current = s.id === step;
          const done = steps.findIndex((x) => x.id === step) > i;
          return (
            <div key={s.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors",
                    done
                      ? "bg-success text-white"
                      : current
                        ? "bg-accent-gold text-black"
                        : "bg-background-secondary text-text-secondary"
                  )}
                >
                  {done ? <Check className="h-5 w-5" /> : i + 1}
                </span>
                <span className="mt-1.5 text-xs text-text-secondary">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="mx-2 mb-5 h-px flex-1 bg-background-secondary">
                  <div
                    className={cn(
                      "h-full transition-colors duration-300",
                      done ? "bg-success" : "bg-transparent"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === "shipping" && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                className="rounded-xl border border-background-secondary bg-card-background p-6"
              >
                <h2 className="mb-5 font-serif text-xl font-bold text-text-primary">
                  Shipping Information
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="First Name"
                    value={shipping.firstName}
                    onChange={(v) => updateShipping("firstName", v)}
                    required
                  />
                  <Input
                    label="Last Name"
                    value={shipping.lastName}
                    onChange={(v) => updateShipping("lastName", v)}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={shipping.email}
                    onChange={(v) => updateShipping("email", v)}
                    required
                    className="sm:col-span-2"
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={shipping.phone}
                    onChange={(v) => updateShipping("phone", v)}
                    required
                    className="sm:col-span-2"
                  />
                  <Input
                    label="Address"
                    value={shipping.address}
                    onChange={(v) => updateShipping("address", v)}
                    required
                    className="sm:col-span-2"
                  />
                  <Input
                    label="City"
                    value={shipping.city}
                    onChange={(v) => updateShipping("city", v)}
                    required
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                      Province
                    </label>
                    <select
                      value={shipping.province}
                      onChange={(e) => updateShipping("province", e.target.value)}
                      className="h-12 rounded-xl border border-background-secondary bg-background px-4 text-sm text-text-primary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
                    >
                      <option value="">Select Province</option>
                      <option>Punjab</option>
                      <option>Sindh</option>
                      <option>Khyber Pakhtunkhwa</option>
                      <option>Balochistan</option>
                      <option>Azad Kashmir</option>
                      <option>Islamabad Capital</option>
                    </select>
                  </div>
                </div>
                {formError && step !== "confirmation" && (
                  <p className="mt-4 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
                    {formError}
                  </p>
                )}
                <button
                  onClick={() => {
                    if (validateShipping()) setStep("payment");
                  }}
                  className="mt-6 w-full rounded-full bg-accent-gold py-4 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-[1.02] hover:bg-accent-gold-light"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                className="rounded-xl border border-background-secondary bg-card-background p-6"
              >
                <h2 className="mb-5 font-serif text-xl font-bold text-text-primary">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {paymentMethods.map((pm) => {
                    const Icon = pm.icon;
                    const active = paymentMethod === pm.id;
                    return (
                      <button
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={cn(
                          "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all",
                          active
                            ? "border-accent-gold bg-accent-gold/10"
                            : "border-background-secondary bg-card-background hover:border-text-secondary/40"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors",
                            active
                              ? "bg-accent-gold text-black"
                              : "bg-background-secondary text-text-secondary"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-text-primary">
                            {pm.label}
                          </p>
                          <p className="text-xs text-text-secondary">{pm.desc}</p>
                        </div>
                        <span
                          className={cn(
                            "h-5 w-5 rounded-full border-2 transition-all",
                            active
                              ? "border-accent-gold bg-accent-gold"
                              : "border-background-secondary"
                          )}
                        >
                          {active && (
                            <Check className="h-5 w-5 text-black p-0.5" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      className="sm:col-span-2"
                      value={card.number}
                      onChange={(v) => setCard((c) => ({ ...c, number: v }))}
                    />
                    <Input
                      label="Expiry"
                      placeholder="MM/YY"
                      value={card.expiry}
                      onChange={(v) => setCard((c) => ({ ...c, expiry: v }))}
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                      value={card.cvv}
                      onChange={(v) => setCard((c) => ({ ...c, cvv: v }))}
                    />
                    <Input
                      label="Cardholder Name"
                      className="sm:col-span-2"
                      value={card.name}
                      onChange={(v) => setCard((c) => ({ ...c, name: v }))}
                    />
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setStep("shipping")}
                    className="rounded-full border border-background-secondary py-4 px-8 text-sm font-bold uppercase tracking-wider text-text-secondary transition-colors hover:border-accent-gold hover:text-accent-gold sm:w-auto"
                  >
                    Back
                  </button>
                  <button
                    onClick={placeOrder}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent-gold py-4 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-[1.02] hover:bg-accent-gold-light"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Place Order — {formatPrice(total)}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-fit rounded-xl border border-background-secondary bg-card-background p-5 lg:sticky lg:top-24">
          <h2 className="mb-4 font-serif text-lg font-bold text-text-primary">
            Order Summary
          </h2>
          <div className="max-h-64 space-y-3 overflow-y-auto">
            {items.map((item) => (
              <div
                key={`${item.id}::${item.color ?? "default"}`}
                className="flex items-center gap-3 border-b border-background-secondary pb-3 last:border-0 last:pb-0"
              >
                <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-background-secondary">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-gold text-[10px] font-bold text-black">
                    {item.quantity}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-xs font-medium text-text-primary">
                    {item.name}
                  </p>
                  {item.color && (
                    <p className="text-[11px] text-text-secondary">{item.color}</p>
                  )}
                </div>
                <span className="font-montserrat text-xs font-bold text-text-primary">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 border-t border-background-secondary pt-4 text-sm">
            <div className="flex justify-between text-text-secondary">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Shipping</span>
              <span className="text-success">FREE</span>
            </div>
            <div className="flex justify-between pt-2 text-base font-bold text-text-primary">
              <span>Total</span>
              <span className="font-montserrat">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  className,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-xs font-semibold uppercase tracking-wider text-text-primary">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        className="h-12 rounded-xl border border-background-secondary bg-background px-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
      />
    </div>
  );
}