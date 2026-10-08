import { Reveal } from '@/components/motion/Reveal';

export function HomeFlowDivider() {
  return (
    <div className="relative px-6 py-2">
      <Reveal className="mx-auto max-w-6xl" y={0}>
        <div className="home-flow-divider" aria-hidden>
          <span className="home-flow-divider__beam" />
          <span className="home-flow-divider__dot" />
        </div>
      </Reveal>
    </div>
  );
}
