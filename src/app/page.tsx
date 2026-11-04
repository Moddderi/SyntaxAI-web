import { BookCallSection } from '@/components/BookCallSection';
import { DashboardShowcase } from '@/components/DashboardShowcase';
import { FaqSection } from '@/components/FaqSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { HeroSection } from '@/components/HeroSection';
import { HomeFlowDivider } from '@/components/HomeFlowDivider';
import { HowItWorks } from '@/components/HowItWorks';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { TechMarquee } from '@/components/TechMarquee';
import { TryFreeSection } from '@/components/TryFreeSection';

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <HeroSection />
      <TechMarquee />
      <HowItWorks />
      <HomeFlowDivider />
      <DashboardShowcase />
      <HomeFlowDivider />
      <FeaturesSection />
      <HomeFlowDivider />
      <TryFreeSection />
      <BookCallSection />
      <FaqSection />
    </>
  );
}
