import { CHROME_STORE_URL, FIREFOX_ADDON_URL } from '@/lib/site';

const STORE_BTN =
  'inline-flex h-8 min-w-[5.25rem] items-center justify-center rounded-full px-3 font-mono text-[10px] font-bold uppercase tracking-[0.1em] transition duration-200 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]';

/** Compact Chrome + Firefox pair for the site header (matched height, label style, width). */
export function HeaderInstallButtons() {
  return (
    <div
      className="hidden items-center rounded-full border border-syntax-border bg-syntax-card/40 p-0.5 sm:flex"
      role="group"
      aria-label="Install extension"
    >
      <a
        className={`${STORE_BTN} btn-primary shadow-none`}
        href={CHROME_STORE_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        Chrome
      </a>
      <a
        className={`${STORE_BTN} btn-secondary border-0 bg-transparent hover:bg-syntax-hover`}
        href={FIREFOX_ADDON_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        Firefox
      </a>
    </div>
  );
}