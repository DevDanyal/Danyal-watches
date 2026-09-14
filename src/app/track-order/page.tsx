import type { Metadata } from "next";
import TrackOrder from "@/components/tracking/TrackOrder";

export const metadata: Metadata = {
  title: "Track Order | CRYSMA Watches",
  description: "Track your CRYSMA order status by entering your order ID.",
};

export default function TrackOrderPage() {
  return <TrackOrder />;
}