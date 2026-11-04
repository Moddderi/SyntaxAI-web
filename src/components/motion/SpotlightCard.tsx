'use client';

import type { MouseEvent, ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/** Card with a soft light + border highlight that tracks the cursor (see .spotlight in globals.css). */
export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  function onMove(event: MouseEvent<HTMLDivElement>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }

  return (
    <div className={`spotlight ${className}`} onMouseMove={onMove}>
      {children}
    </div>
  );
}
