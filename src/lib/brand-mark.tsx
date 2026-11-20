import type { ReactElement } from 'react';

/** Three-bar mark used in OG/icons (vector, no font download). */
export function BrandMark({ size }: { size: number }): ReactElement {
  return (
    <svg width={size} height={size * 0.75} viewBox="80 170 660 510" fill="#ffffff">
      <polygon points="170,408 302,408 238,612 160,612 90,662" />
      <polygon points="378,298 514,298 412,612 278,612" />
      <polygon points="596,182 726,182 590,612 456,612" />
    </svg>
  );
}
