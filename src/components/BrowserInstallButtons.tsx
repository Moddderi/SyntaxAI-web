import Image from 'next/image';
import {
  BROWSER_ICON_CHROME,
  BROWSER_ICON_FIREFOX,
  CHROME_STORE_URL,
  FIREFOX_ADDON_URL,
} from '@/lib/site';

interface BrowserInstallButtonsProps {
  className?: string;
  layout?: 'row' | 'stack';
}

export function BrowserInstallButtons({
  className = '',
  layout = 'row',
}: BrowserInstallButtonsProps) {
  const layoutClass =
    layout === 'stack' ? 'flex flex-col gap-3' : 'flex flex-col gap-3 sm:flex-row sm:flex-wrap';

  return (
    <div className={`${layoutClass} ${className}`}>
      <a
        className="browser-install-btn browser-install-btn--chrome btn-primary inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-full px-6 font-mono text-[11px] font-bold uppercase tracking-[0.1em] sm:min-w-[14rem]"
        href={CHROME_STORE_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          alt=""
          aria-hidden
          className="h-[22px] w-[22px] object-contain"
          height={22}
          src={BROWSER_ICON_CHROME}
          width={22}
        />
        Add to Chrome
      </a>

      <a
        className="browser-install-btn browser-install-btn--firefox btn-secondary inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-medium sm:min-w-[14rem]"
        href={FIREFOX_ADDON_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          alt=""
          aria-hidden
          className="h-[22px] w-[22px] object-contain"
          height={22}
          src={BROWSER_ICON_FIREFOX}
          width={22}
        />
        Add to Firefox
      </a>
    </div>
  );
}
