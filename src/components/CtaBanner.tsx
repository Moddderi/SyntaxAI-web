import { ChromeStoreButton } from './ChromeStoreButton';
import { Reveal, RevealNeonLine } from '@/components/motion/Reveal';

export function CtaBanner() {
  return (
    <section className="px-6 pb-20 pt-6">
      <Reveal variant="scale">
        <div className="cta-panel cta-panel--animated relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-6 py-16 text-center md:py-20">
          <span className="cta-panel__grid pointer-events-none" aria-hidden />
          <p className="relative z-10 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-syntax-muted">
            SyntaxAI for Chrome
          </p>
          <h2 className="relative z-10 mx-auto mt-4 max-w-3xl font-mono text-3xl font-bold uppercase tracking-[0.06em] md:text-4xl">
            Save the next good snippet.
          </h2>
          <RevealNeonLine className="relative z-10" />
          <p className="relative z-10 mx-auto mt-6 max-w-xl text-base text-syntax-muted">
            Start free and build a personal code library that&apos;s actually easy to reuse.
          </p>
          <div className="relative z-10 mt-8">
            <ChromeStoreButton showArrow size="lg">
              Add to Chrome
            </ChromeStoreButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
