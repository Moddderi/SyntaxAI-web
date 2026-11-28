import type { ReactNode } from 'react';
import { SOCIAL_LINKS } from '@/lib/site';

type SocialId = keyof typeof SOCIAL_LINKS;

const SOCIAL_META: Record<SocialId, { label: string; icon: ReactNode }> = {
  twitter: {
    label: 'X',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-4.7-6.1L6.5 22H2.4l7.3-8.4L1 2h6.9l4.2 5.5L18.9 2zm-1.2 18h1.9L7.1 4H5.1l12.6 16z" />
      </svg>
    ),
  },
  linkedin: {
    label: 'LinkedIn',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z"
        />
      </svg>
    ),
  },
};

const SOCIAL_ORDER: SocialId[] = ['twitter', 'linkedin'];

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {SOCIAL_ORDER.map((id) => {
        const { label, icon } = SOCIAL_META[id];
        const href = SOCIAL_LINKS[id];

        return (
          <a
            key={id}
            aria-label={label}
            className="text-syntax-muted transition hover:text-syntax-text"
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {icon}
          </a>
        );
      })}
    </div>
  );
}
