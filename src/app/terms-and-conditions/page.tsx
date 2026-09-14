import type { Metadata } from "next";
import PolicyLayout from "@/components/shared/PolicyLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions | CRYSMA Watches",
  description:
    "The terms and conditions governing the use of the CRYSMA Watches website and purchases.",
};

const sections = [
  {
    heading: "Acceptance of Terms",
    body: [
      "By accessing or using the CRYSMA Watches website, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website or services.",
    ],
  },
  {
    heading: "Products & Pricing",
    body: [
      "All product prices are listed in Pakistani Rupees (PKR) and include applicable taxes unless stated otherwise. We reserve the right to change prices, modify product specifications, or discontinue products at any time without prior notice.",
      "While we strive to display colors and specifications accurately, actual product appearance may vary slightly due to photography and screen differences.",
    ],
  },
  {
    heading: "Orders",
    body: [
      "Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order placed through our website.",
      "We may contact you to verify order information before processing. Orders are subject to stock availability.",
    ],
  },
  {
    heading: "Payment",
    body: [
      "We accept Cash on Delivery, JazzCash, EasyPaisa, and major credit/debit cards. Orders are only confirmed once payment is received (excluding COD orders, which are confirmed at dispatch).",
    ],
  },
  {
    heading: "Shipping & Delivery",
    body: [
      "Orders are dispatched within 1-2 business days and typically delivered within 3-5 business days. Delivery times may vary based on location and courier conditions.",
      "Risk of loss passes to the customer upon successful delivery. Please inspect your order at the time of delivery.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "CRYSMA Watches shall not be liable for any indirect, incidental, or consequential damages arising out of the use of our website or products, to the maximum extent permitted by law.",
    ],
  },
  {
    heading: "Intellectual Property",
    body: [
      "All content on this website — including logos, images, text, and designs — is the property of CRYSMA Watches and is protected by applicable intellectual property laws. Unauthorized use is prohibited.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "For questions about these Terms & Conditions, contact us at info@crysmawatches.com or +92 300 0279762.",
    ],
  },
];

export default function TermsPage() {
  return (
    <PolicyLayout
      kicker="Legal"
      title="Terms & Conditions"
      updated="September 2026"
      sections={sections}
    />
  );
}