import insights from '@/assets/shots/insights.png';
import library from '@/assets/shots/library.png';
import sidepanel from '@/assets/shots/sidepanel.png';
import stack from '@/assets/shots/stack.png';

/**
 * Real extension screenshots. Statically imported, so width/height come from the file itself.
 * To refresh them: overwrite the PNGs in src/assets/shots with @2x captures (same names) — nothing else to change.
 * Rendered with `unoptimized` so the lossless PNG is served as-is (no WebP re-compression of UI text).
 */
export const SHOTS = {
  library: {
    src: library,
    alt: 'SyntaxAI dashboard: all notes with stack icons, titles and code previews',
  },
  stack: {
    src: stack,
    alt: 'SyntaxAI stack view: notes grouped by JavaScript, React and Angular',
  },
  insights: {
    src: insights,
    alt: 'SyntaxAI usage and insights: stack breakdown, streaks and capture activity heatmap',
  },
  sidepanel: {
    src: sidepanel,
    alt: 'SyntaxAI side panel: paste code or drop an image, then save to library',
  },
} as const;
