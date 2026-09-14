import type { Metadata } from "next";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | CRYSMA Watches",
  description:
    "Get in touch with CRYSMA Watches. Visit our stores in Lahore or contact us via phone, email, or WhatsApp.",
};

const stores = [
  {
    name: "Khalid Watch Co., Fawara Chowk",
    area: "Main Shahalam Market Road, Lahore",
  },
  {
    name: "GMT Swiss Watches",
    area: "71-Naqi Arcade, The Mall, Lahore",
  },
  {
    name: "Khalid Watch Co., Eden Centre",
    area: "Near Jazz Office, Jail Road, Lahore",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Get in Touch"
        title="Contact Us"
        subtitle="Questions about an order, our watches, or need assistance? We are here to help."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-bold text-text-primary">
              Store Locations
            </h2>
            <div className="mt-6 space-y-4">
              {stores.map((store) => (
                <div
                  key={store.name}
                  className="flex items-start gap-3 rounded-xl border border-background-secondary bg-card-background p-4"
                >
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-gold" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {store.name}
                    </p>
                    <p className="mt-0.5 text-sm text-text-secondary">
                      {store.area}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 font-serif text-2xl font-bold text-text-primary">
              Contact Info
            </h2>
            <div className="mt-6 space-y-4 text-sm">
              <a
                href="mailto:info@crysmawatches.com"
                className="flex items-center gap-3 text-text-secondary hover:text-accent-gold"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gold/10 text-accent-gold">
                  <Mail className="h-4 w-4" />
                </span>
                info@crysmawatches.com
              </a>
              <a
                href="tel:+923000279762"
                className="flex items-center gap-3 text-text-secondary hover:text-accent-gold"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gold/10 text-accent-gold">
                  <Phone className="h-4 w-4" />
                </span>
                +92 300 0279762
              </a>
              <div className="flex items-center gap-3 text-text-secondary">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gold/10 text-accent-gold">
                  <Clock className="h-4 w-4" />
                </span>
                Mon - Sat: 11:00 AM - 10:00 PM
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}