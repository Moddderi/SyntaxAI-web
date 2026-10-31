import { Reveal } from '@/components/motion/Reveal';
import { CalendarIcon, MailIcon } from '@/components/icons/BrowserIcons';
import { BOOK_CALL_URL, SUPPORT_EMAIL } from '@/lib/site';

const PERKS_LINE =
  '30-minute personal onboarding · Setup assistance · Live Q&A · 100% free';

export function BookCallSection() {
  const scheduleHref =
    BOOK_CALL_URL ||
    `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Book a free SyntaxAI call')}`;
  const mailHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('SyntaxAI onboarding question')}`;

  return (
    <section className="border-t border-syntax-border px-6 py-16 md:py-24">
      <Reveal className="mx-auto max-w-3xl text-center" variant="blur-up">
        <h2 className="text-2xl font-semibold leading-snug tracking-tight text-syntax-text md:text-3xl lg:text-[2rem]">
          Need help getting started?{' '}
          <span className="accent-glow text-syntax-accent">Book a free call with me</span>
        </h2>
        <p className="mt-4 text-sm text-syntax-muted md:text-base">{PERKS_LINE}</p>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
          <a
            className="book-call-btn btn-primary inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6 font-mono text-[11px] font-bold uppercase tracking-[0.1em] sm:min-w-[12.5rem]"
            href={scheduleHref}
            rel={BOOK_CALL_URL ? 'noopener noreferrer' : undefined}
            target={BOOK_CALL_URL ? '_blank' : undefined}
          >
            <CalendarIcon className="h-[18px] w-[18px]" />
            Schedule a call
          </a>
          <a
            className="book-call-btn btn-secondary inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium sm:min-w-[12.5rem]"
            href={mailHref}
          >
            <MailIcon className="h-[18px] w-[18px]" />
            Email me
          </a>
        </div>
      </Reveal>
    </section>
  );
}
