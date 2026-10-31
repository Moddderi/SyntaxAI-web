'use client';

import { useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { FAQ_ITEMS } from '@/lib/faq';
import { SUPPORT_EMAIL } from '@/lib/site';

function FaqItem({
  answer,
  index,
  open,
  question,
  onToggle,
}: {
  answer: string;
  index: number;
  open: boolean;
  question: string;
  onToggle: () => void;
}) {
  return (
    <div className="faq-item border-b border-syntax-border/80 last:border-b-0">
      <button
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition hover:text-syntax-text"
        id={`faq-trigger-${index}`}
        onClick={onToggle}
        type="button"
      >
        <span className="text-sm font-medium text-syntax-text md:text-base">{question}</span>
        <span
          aria-hidden
          className={`faq-item__chevron shrink-0 text-syntax-muted ${open ? 'faq-item__chevron--open' : ''}`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div
        aria-labelledby={`faq-trigger-${index}`}
        className={`faq-item__panel grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'faq-item__panel--open' : ''}`}
        role="region"
      >
        <div className="overflow-hidden">
          <p className="pb-5 pr-8 text-sm leading-relaxed text-syntax-muted">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="scroll-mt-24 px-6 pb-20 pt-8 md:pb-28" id="faq">
      <Reveal className="mx-auto max-w-3xl text-center" variant="blur-up">
        <h2 className="font-mono text-3xl font-bold uppercase tracking-[0.06em] text-syntax-text md:text-4xl">
          Frequently asked{' '}
          <span className="accent-glow text-syntax-accent">questions</span>
        </h2>
        <p className="mt-4 text-base text-syntax-muted">
          Everything you need to know about SyntaxAI and how it fits into your dev workflow.
        </p>
      </Reveal>

      <Reveal className="mx-auto mt-12 max-w-3xl" delay={0.08} variant="up">
        <div className="faq-panel rounded-2xl border border-syntax-border bg-syntax-card/60 px-5 backdrop-blur-sm md:px-8">
          {FAQ_ITEMS.map((item, index) => (
            <FaqItem
              key={item.question}
              answer={item.answer}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              question={item.question}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-syntax-muted">
          Can&apos;t find what you&apos;re looking for?{' '}
          <a
            className="font-medium text-syntax-text underline-offset-4 hover:underline"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            Contact support
          </a>
        </p>
      </Reveal>
    </section>
  );
}
