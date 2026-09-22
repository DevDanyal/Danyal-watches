import type { Metadata } from "next";
import TrackOrder from "@/components/tracking/TrackOrder";

export const metadata: Metadata = {
  title: "Track Order | Danyal Watches",
  description: "Track your Danyal order status by entering your order ID.",
};

export default async function TrackOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  return <TrackOrder initialOrderId={order ?? ""} />;
}