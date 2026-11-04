'use client';

import { m, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.25 });

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[130] h-[2px] origin-left bg-gradient-to-r from-syntax-brand-soft via-syntax-brand to-indigo-400 shadow-[0_0_14px_var(--syntax-brand)]"
      style={{ scaleX }}
    />
  );
}
