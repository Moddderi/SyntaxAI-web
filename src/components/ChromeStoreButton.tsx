import type { ReactNode } from 'react';
import { CHROME_STORE_URL } from '@/lib/site';

interface ChromeStoreButtonProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'inverse';
  showArrow?: boolean;
}

const SIZE_CLASS = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-base',
} as const;

const VARIANT_CLASS = {
  primary:
    'btn-gradient text-[#0d0d0f] shadow-[0_8px_28px_rgba(0,234,255,0.28)] hover:brightness-110',
  secondary:
    'border border-syntax-accent/40 bg-syntax-accent/10 text-syntax-accent hover:bg-syntax-accent/20',
  inverse: 'bg-[#0d0d0f] text-white hover:bg-black',
} as const;

export function ChromeStoreButton({
  size = 'md',
  className = '',
  children = 'Get Extension',
  variant = 'primary',
  showArrow = false,
}: ChromeStoreButtonProps) {
  return (
    <a
      className={`btn-shine inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-300 motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98] ${SIZE_CLASS[size]} ${VARIANT_CLASS[variant]} ${className}`}
      href={CHROME_STORE_URL}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      {showArrow ? <span aria-hidden="true">→</span> : null}
    </a>
  );
}
