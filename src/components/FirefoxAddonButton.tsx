import type { ReactNode } from 'react';
import { FIREFOX_ADDON_URL } from '@/lib/site';

interface FirefoxAddonButtonProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'inverse';
  showArrow?: boolean;
}

const SIZE_CLASS = {
  sm: 'h-9 px-4 text-[10px]',
  md: 'h-11 px-6 text-[11px]',
  lg: 'h-12 px-8 text-xs',
} as const;

const VARIANT_CLASS = {
  primary: 'btn-primary rounded-full',
  secondary: 'btn-secondary rounded-full font-medium normal-case tracking-normal font-sans',
  inverse:
    'rounded-full border border-syntax-border bg-syntax-accent-fg font-mono text-xs font-bold uppercase tracking-[0.12em] text-syntax-accent hover:bg-black',
} as const;

export function FirefoxAddonButton({
  size = 'md',
  className = '',
  children = 'Add to Firefox',
  variant = 'secondary',
  showArrow = false,
}: FirefoxAddonButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 transition duration-300 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98] ${SIZE_CLASS[size]} ${VARIANT_CLASS[variant]} ${className}`}
      href={FIREFOX_ADDON_URL}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      {showArrow ? <span aria-hidden="true">→</span> : null}
    </a>
  );
}