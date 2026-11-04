'use client';

import { useEffect, useRef } from 'react';

/** Soft brand-colored light that follows the pointer across its parent section. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;

    if (!el || !parent || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      el.style.setProperty('--gx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--gy', `${event.clientY - rect.top}px`);
      el.style.opacity = '1';
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };

    parent.addEventListener('pointermove', onMove);
    parent.addEventListener('pointerleave', onLeave);

    return () => {
      parent.removeEventListener('pointermove', onMove);
      parent.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <div aria-hidden className="cursor-glow" ref={ref} />;
}
