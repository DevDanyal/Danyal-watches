"use client";

import { useAuth } from "@/context/AuthContext";
import AccountClient from "@/components/account/AccountClient";
import AccountDashboard from "@/components/account/AccountDashboard";
import { motion } from "framer-motion";

export default function AccountGate() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <motion.div
      key={user ? "dash" : "auth"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {user ? <AccountDashboard /> : <AccountClient />}
    </motion.div>
  );
}