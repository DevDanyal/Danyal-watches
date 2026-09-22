import Hero from "@/components/home/Hero";
import CategoryCards from "@/components/home/CategoryCards";
import FlashSaleTimer from "@/components/home/FlashSaleTimer";
import CatalogSection from "@/components/home/CatalogSection";
import TrustBadges from "@/components/home/TrustBadges";
import BrandStory from "@/components/home/BrandStory";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import { products } from "@/lib/data/products";

export default function Home() {
  const featured = products.slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <>
      <Hero />
      <CategoryCards />
      <FlashSaleTimer />
      <CatalogSection
        type="featured"
        layout="carousel"
        seed={featured}
        title="Featured Products"
        kicker="Handpicked for you"
        viewAllHref="/collections/featured"
      />
      <CatalogSection
        type="best"
        layout="grid"
        seed={bestSellers.length ? bestSellers : products.slice(0, 8)}
        title="Best Sellers"
        kicker="Most loved"
        viewAllHref="/collections/best-sellers"
      />
      {newArrivals.length > 0 && (
        <CatalogSection
          type="new"
          layout="carousel"
          seed={newArrivals}
          title="New Arrivals"
          kicker="Just landed"
          viewAllHref="/collections/new-arrivals"
        />
      )}
      <TrustBadges />
      <BrandStory />
      <Testimonials />
      <Newsletter />
    </>
  );
}