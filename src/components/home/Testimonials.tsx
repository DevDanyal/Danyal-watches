import Image from "next/image";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed R.",
    location: "Karachi",
    text: "Really happy with this watch. Elegant design, solid build quality and it looks premium on the wrist. Delivery was on time and packaging was neat.",
    avatar: "/images/home/images (20).jpg",
  },
  {
    name: "Maqbool Ahmed B.",
    location: "Lahore",
    text: "Beautiful stylish watch. Price is very reasonable and the quality is very good. Definitely worth the price.",
    avatar: "/images/home/images (21).jpg",
  },
  {
    name: "Sara K.",
    location: "Islamabad",
    text: "Ordered a couples set and both watches exceeded expectations. Fast COD delivery and the 1-year warranty gives great peace of mind.",
    avatar: "/images/home/images (22).jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-sale-badge">
          Customer Reviews
        </span>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
          Loved by Thousands Across Pakistan
        </h2>
        <p className="mx-auto mt-3 flex max-w-md items-center justify-center gap-1.5 text-sm text-text-secondary">
          <Star className="h-4 w-4 fill-star text-star" />
          <Star className="h-4 w-4 fill-star text-star" />
          <Star className="h-4 w-4 fill-star text-star" />
          <Star className="h-4 w-4 fill-star text-star" />
          <Star className="h-4 w-4 fill-star text-star" />
          <span className="ml-1 font-semibold text-text-primary">4.8</span> average
          rating
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="rounded-lg border border-border bg-card-background p-6"
          >
            <Quote className="h-6 w-6 text-sale-badge" />
            <p className="mt-4 text-sm leading-relaxed text-text-primary">
              “{t.text}”
            </p>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="relative block h-11 w-11 overflow-hidden rounded-full border border-border bg-background-secondary">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <div>
                <p className="text-sm font-bold text-text-primary">{t.name}</p>
                <p className="text-xs text-text-secondary">{t.location}</p>
              </div>
              <div className="ml-auto flex items-center gap-0.5 text-star">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}