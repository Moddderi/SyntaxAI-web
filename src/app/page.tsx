import { BookCallSection } from '@/components/BookCallSection';
import { FaqSection } from '@/components/FaqSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { HomeFlowDivider } from '@/components/HomeFlowDivider';
import { HeroSection } from '@/components/HeroSection';
import { TryFreeSection } from '@/components/TryFreeSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeFlowDivider />
      <FeaturesSection />
      <HomeFlowDivider />
      <TryFreeSection />
      <BookCallSection />
      <FaqSection />
    </>
  );
}
