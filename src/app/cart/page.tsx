import type { Metadata } from "next";
import CartPageContent from "@/components/cart/CartPageContent";

export const metadata: Metadata = {
  title: "Cart | CRYSMA Watches",
  description: "Review your selected watches and proceed to checkout.",
};

export default function CartPage() {
  return <CartPageContent />;
}