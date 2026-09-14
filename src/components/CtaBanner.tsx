import { ChromeStoreButton } from './ChromeStoreButton';
import { Reveal } from '@/components/motion/Reveal';

export function CtaBanner() {
  return (
    <section className="px-6 pb-20 pt-6">
      <Reveal>
        <div className="cta-grid mx-auto max-w-6xl rounded-2xl px-6 py-16 text-center text-[#0d0d0f] md:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]">
            SyntaxAI for Chrome
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Save the next good snippet.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#0d0d0f]/75">
            Start free and build a personal code library that&apos;s actually easy to reuse.
          </p>
          <div className="mt-8">
            <ChromeStoreButton showArrow size="lg" variant="inverse">
              Get Extension
            </ChromeStoreButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
