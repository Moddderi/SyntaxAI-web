import { CtaBanner } from '@/components/CtaBanner';
import { FeaturesSection } from '@/components/FeaturesSection';
import { HomeFlowDivider } from '@/components/HomeFlowDivider';
import { HeroSection } from '@/components/HeroSection';
import { PricingTeaser } from '@/components/PricingCards';
import { TeamTeaser } from '@/components/TeamTeaser';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeFlowDivider />
      <FeaturesSection />
      <HomeFlowDivider />
      <TeamTeaser />
      <PricingTeaser />
      <CtaBanner />
    </>
  );
}
