import CategorySection from "@/components/CategorySection";
import Hero from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-amber-400">
      <Hero />
      <CategorySection />
    </div>
  );
}
