import type { Metadata } from "next";
import Image from "next/image";
import { Award, Gem, Handshake, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "About Us | CRYSMA Watches",
  description:
    "Learn about CRYSMA's 25+ years of craftsmanship in precision watchmaking.",
};

const values = [
  {
    icon: Gem,
    title: "Craftsmanship",
    text: "Every timepiece is precision-crafted with premium materials and reliable movements.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    text: "Each watch passes rigorous quality checks and comes with a 1-year warranty.",
  },
  {
    icon: Handshake,
    title: "Customer First",
    text: "7-day easy returns, responsive support, and nationwide shipping on every order.",
  },
  {
    icon: Award,
    title: "Timeless Design",
    text: "Swiss-inspired design language that blends luxury with everyday elegance.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="Our Story"
        title="About CRYSMA Watches"
        subtitle="Precision-crafted timepieces combining Swiss-inspired design with exceptional value — for over two decades."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-gold">
              25+ Years of Excellence
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
              A Legacy of Precision Since 1998
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-text-secondary">
              <p>
                CRYSMA Watches began with a simple belief: that a watch is more
                than a timekeeper — it is a statement of who you are. From our
                first collection to our newest releases, we have stayed true to
                that vision.
              </p>
              <p>
                Today, we craft timepieces for men, women, and couples across
                Pakistan, blending premium stainless steel, scratch-resistant
                glass, and reliable quartz and automatic movements into designs
                that never go out of style.
              </p>
              <p>
                Every CRYSMA watch is a testament to quality — a promise of
                durability, elegance, and value that lives up to the legacy of
                the name it carries.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-xl">
              <Image
                src="https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_00b8b87e-35e7-49dd-9ecf-112dd6c9490d.jpg"
                alt="CRYSMA luxury watch"
                width={400}
                height={400}
                className="aspect-square object-cover"
              />
            </div>
            <div className="mt-8 overflow-hidden rounded-xl">
              <Image
                src="https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_7e40cc81-e924-412b-a755-034ae056a929.jpg"
                alt="CRYSMA craftsmanship"
                width={400}
                height={400}
                className="aspect-square object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-background-secondary bg-background-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-gold">
              What We Stand For
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-xl border border-background-secondary bg-card-background p-6 transition-all hover:border-accent-gold/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/10 text-accent-gold">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-bold text-text-primary">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}