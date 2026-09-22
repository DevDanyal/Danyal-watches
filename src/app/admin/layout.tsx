import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";
import AdminLogin from "@/components/admin/AdminLogin";

export const metadata: Metadata = {
  title: "Admin | Danyal Watches",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  if (!session) {
    return <AdminLogin />;
  }

  return <AdminShell>{children}</AdminShell>;
}
