import type { ReactNode } from 'react';
import { SOCIAL_LINKS } from '@/lib/site';

type SocialId = keyof typeof SOCIAL_LINKS;

const SOCIAL_META: Record<SocialId, { label: string; icon: ReactNode }> = {
  discord: {
    label: 'Discord',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M20.32 4.37a19.8 19.8 0 0 0-4.93-1.52 12.1 12.1 0 0 0-.57 1.17 18.3 18.3 0 0 0-5.5 0 11.6 11.6 0 0 0-.58-1.17 19.7 19.7 0 0 0-4.93 1.52A20.1 20.1 0 0 0 .96 17.4a20 20 0 0 0 6.12 3.08 14.5 14.5 0 0 0 1.24-2 12.8 12.8 0 0 1-1.95-.94l.47-.38a14.4 14.4 0 0 0 12.32 0l.48.38a12.7 12.7 0 0 1-1.96.94 14.4 14.4 0 0 0 1.24 2 19.9 19.9 0 0 0 6.13-3.08 20 20 0 0 0-3.36-13.03zM8.02 14.87c-1.17 0-2.13-1.07-2.13-2.38s.94-2.38 2.13-2.38c1.2 0 2.16 1.08 2.13 2.38 0 1.31-.94 2.38-2.13 2.38zm7.97 0c-1.17 0-2.13-1.07-2.13-2.38s.94-2.38 2.13-2.38c1.2 0 2.16 1.08 2.13 2.38 0 1.31-.93 2.38-2.13 2.38z"
        />
      </svg>
    ),
  },
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
  instagram: {
    label: 'Instagram',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm6-1.25a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1zM12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"
        />
      </svg>
    ),
  },
  tiktok: {
    label: 'TikTok',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.34 6.34 0 0 0 9.37 22a6.34 6.34 0 0 0 6.38-6.34V9.02a8.16 8.16 0 0 0 4.84 1.52V7.1a4.85 4.85 0 0 1-1.6-.41z"
        />
      </svg>
    ),
  },
};

const SOCIAL_ORDER: SocialId[] = ['discord', 'twitter', 'linkedin', 'instagram', 'tiktok'];

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {SOCIAL_ORDER.map((id) => {
        const { label, icon } = SOCIAL_META[id];
        const href = SOCIAL_LINKS[id];

        if (href) {
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
        }

        return (
          <span
            key={id}
            aria-label={`${label} (link coming soon)`}
            className="text-syntax-muted/35"
            title="Coming soon"
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
}
