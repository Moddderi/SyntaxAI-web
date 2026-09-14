import { CtaBanner } from '@/components/CtaBanner';
import { FeaturesSection } from '@/components/FeaturesSection';
import { HeroSection } from '@/components/HeroSection';
import { PricingTeaser } from '@/components/PricingCards';
import { TeamTeaser } from '@/components/TeamTeaser';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TeamTeaser />
      <PricingTeaser />
      <CtaBanner />
    </>
  );
}
