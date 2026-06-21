import { PageTransition } from "@/components/ui/PageTransition";
import { CarouselSection } from "@/components/home/CarouselSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { StatsSection } from "@/components/home/StatsSection";

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <StatsSection />
      <CarouselSection />
      <CategoriesSection />
      <FeaturedSection />
      <NewsletterSection />
    </PageTransition>
  );
}

