'use client';

import { m } from 'motion/react';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -72px 0px',
} as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({ children, className, delay = 0, y = 18 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      viewport={VIEWPORT}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </m.div>
  );
}
