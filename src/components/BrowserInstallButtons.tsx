import Image from 'next/image';
import {
  BROWSER_ICON_CHROME,
  BROWSER_ICON_FIREFOX,
  CHROME_STORE_URL,
  FIREFOX_ADDON_URL,
} from '@/lib/site';

interface BrowserInstallButtonsProps {
  chromeClassName?: string;
  className?: string;
  layout?: 'row' | 'stack';
}

export function BrowserInstallButtons({
  chromeClassName = '',
  className = '',
  layout = 'row',
}: BrowserInstallButtonsProps) {
  const layoutClass =
    layout === 'stack' ? 'flex flex-col gap-3' : 'flex flex-col gap-3 sm:flex-row sm:flex-wrap';

  return (
    <div className={`${layoutClass} ${className}`}>
      <a
        className={`browser-install-btn browser-install-btn--chrome btn-brand inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-full px-6 text-sm sm:min-w-[14rem] ${chromeClassName}`}
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
