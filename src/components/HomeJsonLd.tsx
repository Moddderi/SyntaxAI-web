import { JsonLd } from '@/components/JsonLd';
import { FAQ_ITEMS } from '@/lib/faq';
import { faqJsonLd, softwareApplicationJsonLd } from '@/lib/seo';

export function HomeJsonLd() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
    </>
  );
}
