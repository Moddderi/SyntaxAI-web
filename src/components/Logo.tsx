import Image from 'next/image';

interface LogoProps {
  className?: string;
  /** `light` = white mark on dark UI; `dark` = mark for light backgrounds */
  variant?: 'light' | 'dark';
}

export function Logo({ className = 'h-9 w-9', variant = 'light' }: LogoProps) {
  const src = variant === 'dark' ? '/logo-mark-black.png' : '/logo-mark.png';

  return (
    <Image
      alt=""
      aria-hidden
      className={`object-contain ${className}`}
      height={32}
      priority
      src={src}
      width={32}
    />
  );
}
