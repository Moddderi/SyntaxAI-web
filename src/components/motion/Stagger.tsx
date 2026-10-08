'use client';

import { m } from 'motion/react';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -64px 0px',
} as const;

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}

export function Stagger({
  children,
  className,
  stagger = 0.07,
  delayChildren = 0,
}: StaggerProps) {
  return (
    <m.div
      className={className}
      initial="hidden"
      viewport={VIEWPORT}
      whileInView="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </m.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
}

export function StaggerItem({ children, className, y = 20 }: StaggerItemProps) {
  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, y, filter: 'blur(6px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.6, ease: EASE },
        },
      }}
    >
      {children}
    </m.div>
  );
}
