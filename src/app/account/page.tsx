import type { Metadata } from "next";
import AccountGate from "@/components/account/AccountGate";

export const metadata: Metadata = {
  title: "My Account | Danyal Watches",
  description: "Sign in or register to manage your Danyal account, orders, and profile.",
};

export default function AccountPage() {
  return <AccountGate />;
}