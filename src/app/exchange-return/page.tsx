import type { Metadata } from "next";
import PolicyLayout from "@/components/shared/PolicyLayout";

export const metadata: Metadata = {
  title: "Exchange & Return Policy | CRYSMA Watches",
  description:
    "CRYSMA's 7-day exchange and return policy. Learn how to return or exchange your watch.",
};

const sections = [
  {
    heading: "7-Day Easy Returns",
    body: [
      "We want you to be completely satisfied with your CRYSMA watch. If for any reason you are not happy with your purchase, you can return it within 7 days of delivery for a full refund or exchange.",
      "To be eligible for a return, the watch must be unused, in its original packaging, with all tags and accessories intact, and accompanied by the original invoice.",
    ],
  },
  {
    heading: "How to Initiate a Return",
    body: [
      "Contact our support team via WhatsApp (+92 346 4141007) or email (aidevdanyal@gmail.com) within 7 days of receiving your order.",
      "Provide your order ID, the reason for return, and clear photos of the product in its current condition.",
      "Once approved, our team will guide you through the return process. For pickups in Lahore, returns can be processed at any of our store locations.",
    ],
  },
  {
    heading: "Exchange Policy",
    body: [
      "If you would like to exchange your watch for a different color, size, or model, you can do so within 7 days of delivery, subject to stock availability.",
      "Any price difference will be adjusted — you will be charged the difference if the new watch costs more, or refunded if it costs less.",
    ],
  },
  {
    heading: "Non-Eligible Items",
    body: [
      "Custom or special-order items cannot be returned or exchanged unless they arrive damaged or defective.",
      "Watches that show signs of wear, scratches, or damage from misuse will not be eligible for return.",
    ],
  },
  {
    heading: "Refunds",
    body: [
      "Approved refunds are processed within 3-5 business days after we receive and inspect the returned item.",
      "For Cash on Delivery orders, refunds are issued via bank transfer or JazzCash/EasyPaisa. For prepaid card payments, refunds are issued back to the original payment method.",
    ],
  },
  {
    heading: "Warranty Coverage",
    body: [
      "All CRYSMA watches come with a 1-year international warranty covering manufacturing defects in the movement, case, and assembly.",
      "Warranty does not cover damage caused by accidents, misuse, water damage beyond rated resistance, or normal wear such as strap and battery replacement.",
    ],
  },
];

export default function ExchangeReturnPage() {
  return (
    <PolicyLayout
      kicker="Return Policy"
      title="Exchange & Return Policy"
      updated="September 2026"
      sections={sections}
    />
  );
}