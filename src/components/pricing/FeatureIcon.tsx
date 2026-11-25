import type { ReactNode } from 'react';

type FeatureIconName =
  | 'notes'
  | 'capture'
  | 'photo'
  | 'sparkle'
  | 'stack'
  | 'unlimited'
  | 'priority';

function IconSvg({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
}

function IconGlyph({ name }: { name: FeatureIconName }) {
  switch (name) {
    case 'notes':
      return (
        <IconSvg>
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M8 13h8" />
          <path d="M8 17h6" />
        </IconSvg>
      );
    case 'capture':
      return (
        <IconSvg>
          <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
          <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
          <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
        </IconSvg>
      );
    case 'photo':
      return (
        <IconSvg>
          <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </IconSvg>
      );
    case 'sparkle':
      return (
        <IconSvg>
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          <path d="M20 3v4" />
          <path d="M22 5h-4" />
        </IconSvg>
      );
    case 'stack':
      return (
        <IconSvg>
          <path d="M16 3H8a2 2 0 0 0-2 2v14l6-3 6 3V5a2 2 0 0 0-2-2Z" />
        </IconSvg>
      );
    case 'unlimited':
      return (
        <IconSvg>
          <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
        </IconSvg>
      );
    case 'priority':
      return (
        <IconSvg>
          <path d="M12 3 14.4 8.6 20.5 9.4 16 13.7l1.1 6.1L12 16.9 6.9 19.8 8 13.7 3.5 9.4 9.6 8.6 12 3Z" />
        </IconSvg>
      );
  }
}

export function FeatureIcon({ name }: { name: FeatureIconName }) {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-syntax-brand-soft">
      <IconGlyph name={name} />
    </span>
  );
}

export type { FeatureIconName };
