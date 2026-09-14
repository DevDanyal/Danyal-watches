import type { Metadata } from "next";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | CRYSMA Watches",
  description: "Complete your purchase securely with CRYSMA Watches.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}