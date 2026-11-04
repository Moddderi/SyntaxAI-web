'use client';

import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import type { MouseEvent, ReactNode } from 'react';

interface TiltFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * 3D tilt that follows the cursor. Rests in a slight perspective pose
 * (matches the old static hero card) and flattens toward the pointer.
 */
export function TiltFrame({ children, className = '' }: TiltFrameProps) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 110, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 110, damping: 18, mass: 0.4 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-15, -1]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [11, 1]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  function onMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      className="[perspective:1600px]"
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      <m.div
        className={`lg:[transform-style:preserve-3d] ${className}`}
        style={{ rotateX, rotateY }}
      >
        {children}
      </m.div>
    </div>
  );
}
