import type { Metadata } from "next";
import AccountGate from "@/components/account/AccountGate";

export const metadata: Metadata = {
  title: "My Account | CRYSMA Watches",
  description: "Sign in or register to manage your CRYSMA account, orders, and profile.",
};

export default function AccountPage() {
  return <AccountGate />;
}