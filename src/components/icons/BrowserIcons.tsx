export function ChromeIcon({ className = 'h-5 w-5 shrink-0' }: { className?: string }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 48 48">
      <path
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-11.86C35.9 0 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        fill="#EA4335"
      />
      <path
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        fill="#4285F4"
      />
      <path
        d="M10.53 28.59a15.05 15.05 0 0 1 0-9.18l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        fill="#FBBC05"
      />
      <path
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        fill="#34A853"
      />
      <path
        d="M24 37.5c6.9 0 12.5-5.6 12.5-12.5S30.9 12.5 24 12.5 11.5 18.1 11.5 25s5.6 12.5 12.5 12.5z"
        fill="#fff"
      />
      <circle cx="24" cy="25" fill="#4285F4" r="6.5" />
    </svg>
  );
}

export function FirefoxIcon({ className = 'h-5 w-5 shrink-0' }: { className?: string }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 48 48">
      <path
        d="M44.5 15.2c-.3-2.8-1.2-5.4-2.6-7.7-3.4 4.9-8.2 8.3-13.8 9.6 1.2-2.8 1.7-5.9 1.3-9.1C26.2 4.5 22.4 2 18 2 9.6 2 2.5 8.4 1 16.6c4.1-.6 7.8.2 11 2.3-4.8 0-8.9 2.7-11 6.6 4.5-2.2 9.8-2.4 14.5-.3 3.8 1.7 6.5 4.8 7.4 8.5 2.1-1.5 3.7-3.6 4.6-6.1-1.8 5.2-6.4 9.2-12 10.2 7.8 4.7 17.9 1.5 21.5-6.2z"
        fill="#FF7139"
      />
      <path
        d="M18 46c10.5 0 19.2-7.2 21.5-17-3.6 7.7-13.7 10.9-21.5 6.2 5.6-1 10.2-5 12-10.2-4.7-2.1-10-.1-14.5 2.7 2.1-3.9 6.2-6.6 11-6.6-3.2-2.1-6.9-2.9-11-2.3C4.5 24.6 9.8 38.5 18 46z"
        fill="#FF9500"
      />
      <path
        d="M1 16.6C2.5 8.4 9.6 2 18 2c4.4 0 8.2 2.5 10.2 6.4.4 3.2-.1 6.3-1.3 9.1-1.8-.4-3.6-.5-5.4-.2-4.2.8-7.8 3.4-9.8 7.1C9.8 20.4 5.1 18.2 1 16.6z"
        fill="#FF7139"
      />
    </svg>
  );
}

export function CalendarIcon({ className = 'h-4 w-4 shrink-0' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect height="18" rx="2" width="18" x="3" y="4.5" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  );
}

export function MailIcon({ className = 'h-4 w-4 shrink-0' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect height="14" rx="2" width="18" x="3" y="5" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
