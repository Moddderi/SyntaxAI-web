'use client';

import { m } from 'motion/react';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = {
  once: true,
  amount: 0.18,
  margin: '0px 0px -80px 0px',
} as const;

export type RevealVariant = 'up' | 'scale' | 'blur-up' | 'left' | 'right';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  variant?: RevealVariant;
}

function getMotion(variant: RevealVariant, y: number) {
  switch (variant) {
    case 'scale':
      return {
        initial: { opacity: 0, scale: 0.96, y: y * 0.5 },
        whileInView: { opacity: 1, scale: 1, y: 0 },
      };
    case 'blur-up':
      return {
        initial: { opacity: 0, y, filter: 'blur(10px)' },
        whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
      };
    case 'left':
      return {
        initial: { opacity: 0, x: -22, y: y * 0.35 },
        whileInView: { opacity: 1, x: 0, y: 0 },
      };
    case 'right':
      return {
        initial: { opacity: 0, x: 22, y: y * 0.35 },
        whileInView: { opacity: 1, x: 0, y: 0 },
      };
    default:
      return {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
      };
  }
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  variant = 'up',
}: RevealProps) {
  const motion = getMotion(variant, y);

  return (
    <m.div
      className={className}
      initial={motion.initial}
      transition={{ duration: 0.62, delay, ease: EASE }}
      viewport={VIEWPORT}
      whileInView={motion.whileInView}
    >
      {children}
    </m.div>
  );
}

interface RevealNeonLineProps {
  className?: string;
  align?: 'left' | 'center';
}

export function RevealNeonLine({ className = '', align = 'center' }: RevealNeonLineProps) {
  return (
    <m.div
      aria-hidden
      className={`section-neon-line section-neon-line--animated ${align === 'center' ? 'mx-auto' : ''} ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      style={{ originX: align === 'center' ? 0.5 : 0 }}
      transition={{ duration: 0.75, ease: EASE }}
      viewport={VIEWPORT}
      whileInView={{ scaleX: 1, opacity: 1 }}
    />
  );
}
