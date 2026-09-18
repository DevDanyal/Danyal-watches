import type { Metadata } from "next";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | Danyal Watches",
  description: "Complete your purchase securely with Danyal Watches.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}