import type { ReactNode } from 'react';

function Pill({
  children,
  name,
}: {
  children: ReactNode;
  name: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-syntax-border bg-syntax-bg px-2.5 py-1.5 text-[12px] font-medium text-syntax-text">
      <span className="inline-flex h-4 w-4 items-center justify-center" aria-hidden="true">
        {children}
      </span>
      {name}
    </span>
  );
}

export function TechPills({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <Pill name="React">
        <svg fill="#61DAFB" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="2.2" />
          <ellipse cx="12" cy="12" fill="none" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.4" />
          <ellipse
            cx="12"
            cy="12"
            fill="none"
            rx="10"
            ry="4.2"
            stroke="#61DAFB"
            strokeWidth="1.4"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            fill="none"
            rx="10"
            ry="4.2"
            stroke="#61DAFB"
            strokeWidth="1.4"
            transform="rotate(120 12 12)"
          />
        </svg>
      </Pill>
      <Pill name="TypeScript">
        <svg viewBox="0 0 24 24">
          <rect fill="#3178C6" height="24" rx="4" width="24" />
          <text fill="white" fontSize="11" fontWeight="700" x="4" y="16">
            TS
          </text>
        </svg>
      </Pill>
      <Pill name="JavaScript">
        <svg viewBox="0 0 24 24">
          <rect fill="#F7DF1E" height="24" rx="4" width="24" />
          <text fill="#111" fontSize="11" fontWeight="800" x="5" y="16">
            JS
          </text>
        </svg>
      </Pill>
      <Pill name="Python">
        <svg viewBox="0 0 24 24">
          <path
            d="M12.5 3c-3.2 0-3 .9-3 2.4V8h6.2c1.7 0 3.3 1 3.3 3.3v.4H9.2C6.7 11.7 5 13.6 5 16.2 5 18.8 6.8 21 9.6 21h1.7v-2.5c0-1.7 1.5-3.2 3.4-3.2h5.1c1.5 0 2.2-1.1 2.2-2.5V8.7C22 5.6 19.4 3 16.2 3H12.5zm-1.2 1.6c.6 0 1 .5 1 1.1 0 .6-.4 1-1 1s-1-.4-1-1c0-.6.4-1.1 1-1.1z"
            fill="#3776AB"
          />
          <path
            d="M11.6 21c3.2 0 3-.9 3-2.4V16H8.4C6.7 16 5.1 15 5.1 12.7v-.4h9.3C16.9 12.3 18.6 10.4 18.6 7.8 18.6 5.2 16.8 3 14 3h-1.7v2.5c0 1.7-1.5 3.2-3.4 3.2H3.8C2.3 8.7 1.6 9.8 1.6 11.2v3.1C1.6 17.4 4.2 21 7.4 21h4.2zm1.2-1.6c-.6 0-1-.5-1-1.1 0-.6.4-1 1-1s1 .4 1 1c0 .6-.4 1.1-1 1.1z"
            fill="#FFD43B"
          />
        </svg>
      </Pill>
      <Pill name="Go">
        <svg viewBox="0 0 24 24">
          <rect fill="#00ADD8" height="24" rx="4" width="24" />
          <text fill="white" fontSize="9" fontWeight="800" x="4.5" y="15.5">
            Go
          </text>
        </svg>
      </Pill>
      <Pill name="Rust">
        <svg fill="#DEA584" viewBox="0 0 24 24">
          <circle cx="12" cy="12" fill="none" r="7.2" stroke="#DEA584" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="2.2" />
          <path d="M12 3.2v2.4M12 18.4v2.4M3.2 12h2.4M18.4 12h2.4" stroke="#DEA584" strokeWidth="1.6" />
        </svg>
      </Pill>
      <Pill name="Node.js">
        <svg fill="#5FA04E" viewBox="0 0 24 24">
          <path d="M12 2.2 20.5 7v10L12 21.8 3.5 17V7L12 2.2z" />
        </svg>
      </Pill>
      <Pill name="Next.js">
        <svg fill="white" viewBox="0 0 24 24">
          <circle cx="12" cy="12" fill="none" r="9" stroke="white" strokeWidth="1.6" />
          <path d="M9 16V8l8 10" stroke="white" strokeWidth="1.8" />
        </svg>
      </Pill>
      <Pill name="Vue">
        <svg viewBox="0 0 24 24">
          <path d="M3 5h4.2L12 13.4 16.8 5H21L12 21 3 5z" fill="#41B883" />
          <path d="M7.2 5h3L12 8.4 13.8 5h3L12 13.2 7.2 5z" fill="#35495E" />
        </svg>
      </Pill>
      <Pill name="PostgreSQL">
        <svg fill="#4169E1" viewBox="0 0 24 24">
          <ellipse cx="12" cy="8" rx="6.5" ry="4.5" />
          <path d="M6.2 9c0 5 2.2 11 5.8 11s5.8-6 5.8-11" fill="#336791" />
        </svg>
      </Pill>
      <Pill name="Docker">
        <svg fill="#2496ED" viewBox="0 0 24 24">
          <rect height="3" rx="0.4" width="3.2" x="5" y="11" />
          <rect height="3" rx="0.4" width="3.2" x="8.8" y="11" />
          <rect height="3" rx="0.4" width="3.2" x="12.6" y="11" />
          <rect height="3" rx="0.4" width="3.2" x="8.8" y="7.4" />
          <path d="M3 14.6c.6 3.2 3.4 5.2 9 5.2 6.2 0 9.6-2.4 10.2-6.4-2 .8-4.2.8-5.4.6H3z" />
        </svg>
      </Pill>
      <Pill name="Tailwind">
        <svg fill="#38BDF8" viewBox="0 0 24 24">
          <path d="M6.5 13c1.5-5 4-7.5 7.5-7.5 2.6 0 4.3 1.3 5.2 3.8-1.2-.8-2.4-1.1-3.6-.8-1.7.4-3 1.8-4 4.2C10.6 15.2 8.8 17 6.7 17c-1.6 0-2.7-.8-3.2-2.4 1 .8 2.1 1.1 3 .8.9-.2 1.8-.9 2.5-2.4H6.5zm7.8 7.3c1.5-5 4-7.5 7.5-7.5.7 0 1.4.1 2 .4-1.2 2.2-2.6 3.3-4.3 3.3-1.7 0-3-1-4-3-1 2.5-2.8 4.3-4.9 4.3-.5 0-1-.1-1.4-.3 1.1 2.1 2.8 3 5.1 2.8z" />
        </svg>
      </Pill>
      <span className="inline-flex items-center rounded-lg border border-dashed border-syntax-border px-2.5 py-1.5 text-[12px] text-syntax-muted">
        and more…
      </span>
    </div>
  );
}
