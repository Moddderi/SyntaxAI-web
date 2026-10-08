'use client';

import { RevealNeonLine } from '@/components/motion/Reveal';

interface SectionHeadProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHead({
  label,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeadProps) {
  const alignClass =
    align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex max-w-2xl flex-col ${alignClass} ${className}`}>
      {label ? (
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-syntax-muted">
          {label}
        </p>
      ) : null}
      <h2 className="mt-3 font-mono text-3xl font-bold uppercase tracking-[0.08em] text-syntax-text md:text-4xl">
        {title}
      </h2>
      <RevealNeonLine align={align} />
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-syntax-muted">{description}</p>
      ) : null}
    </div>
  );
}
