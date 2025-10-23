import CategorySection from "@/components/CategorySection";
import FeaturedItemsSection from "@/components/FeaturedItemsSection";
import Hero from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Hero />
      <CategorySection />
      <FeaturedItemsSection />
    </div>
  );
}
