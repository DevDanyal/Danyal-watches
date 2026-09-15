import Hero from "@/components/home/Hero";
import CategoryCards from "@/components/home/CategoryCards";
import FlashSaleTimer from "@/components/home/FlashSaleTimer";
import ProductCarousel from "@/components/home/ProductCarousel";
import ProductGrid from "@/components/home/ProductGrid";
import TrustBadges from "@/components/home/TrustBadges";
import BrandStory from "@/components/home/BrandStory";
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
      <ProductCarousel
        title="Featured Products"
        kicker="Handpicked for you"
        viewAllHref="/collections/featured"
        products={featured}
      />
      <ProductGrid
        title="Best Sellers"
        kicker="Most loved"
        viewAllHref="/collections/best-sellers"
        products={bestSellers.length ? bestSellers : products.slice(0, 8)}
      />
      {newArrivals.length > 0 && (
        <ProductCarousel
          title="New Arrivals"
          kicker="Just landed"
          viewAllHref="/collections/new-arrivals"
          products={newArrivals}
        />
      )}
      <TrustBadges />
      <BrandStory />
      <Newsletter />
    </>
  );
}