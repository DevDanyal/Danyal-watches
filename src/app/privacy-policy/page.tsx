import type { Metadata } from "next";
import PolicyLayout from "@/components/shared/PolicyLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Danyal Watches",
  description:
    "How Danyal Watches collects, uses, and protects your personal information.",
};

const sections = [
  {
    heading: "Information We Collect",
    body: [
      "When you place an order on our website, we collect basic information necessary to process and deliver your purchase, including your name, phone number, email address, and shipping address.",
      "We may also collect anonymized analytics data about how you interact with our website to improve your shopping experience.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "Your information is used to process orders, arrange delivery, provide customer support, and — only with your consent — send promotional updates about new collections and offers.",
      "We do not sell, trade, or rent your personal information to third parties.",
    ],
  },
  {
    heading: "Payment Security",
    body: [
      "Payment transactions are processed securely through trusted payment providers including JazzCash, EasyPaisa, and card networks. We do not store card details on our servers.",
      "Cash on Delivery orders require only your contact and shipping details.",
    ],
  },
  {
    heading: "Data Protection",
    body: [
      "We take reasonable measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      "Your order information is retained only as long as necessary to fulfill orders, provide after-sales support, and comply with legal obligations.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "You can request a copy of the personal data we hold about you, or ask us to correct or delete your information at any time by contacting us at aidevdanyal@gmail.com.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "Our website uses cookies to remember your cart contents and preferences. You can disable cookies in your browser settings, though some site features may not function properly.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PolicyLayout
      kicker="Legal"
      title="Privacy Policy"
      updated="September 2026"
      sections={sections}
    />
  );
}