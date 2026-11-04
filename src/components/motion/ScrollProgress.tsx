'use client';

import { m, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.25 });

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[130] h-[2px] origin-left bg-white/85 shadow-[0_0_12px_rgb(255_255_255/0.55)]"
      style={{ scaleX }}
    />
  );
}
