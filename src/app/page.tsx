import { BookCallSection } from '@/components/BookCallSection';
import { ContextCaptureDemo } from '@/components/ContextCaptureDemo';
import { DashboardShowcase } from '@/components/DashboardShowcase';
import { FaqSection } from '@/components/FaqSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { HeroSection } from '@/components/HeroSection';
import { HomeFlowDivider } from '@/components/HomeFlowDivider';
import { HomeJsonLd } from '@/components/HomeJsonLd';
import { HowItWorks } from '@/components/HowItWorks';
import { InviteTeaser } from '@/components/InviteTeaser';
import { LiveDemo } from '@/components/LiveDemo';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { TechMarquee } from '@/components/TechMarquee';
import { TryFreeSection } from '@/components/TryFreeSection';
import { SEO_DESCRIPTION, SEO_TITLE, buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <ScrollProgress />
      <HeroSection />
      <TechMarquee />
      <HowItWorks />
      <LiveDemo />
      <ContextCaptureDemo />
      <HomeFlowDivider />
      <DashboardShowcase />
      <HomeFlowDivider />
      <FeaturesSection />
      <HomeFlowDivider />
      <InviteTeaser />
      <TryFreeSection />
      <BookCallSection />
      <FaqSection />
    </>
  );
}
