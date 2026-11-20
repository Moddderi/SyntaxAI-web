import type { Metadata } from 'next';
import Link from 'next/link';
import { eq } from 'drizzle-orm';
import { SharedNoteCard } from '@/components/share/SharedNoteCard';
import { db } from '@/lib/db';
import { getActiveNoteShareBySlug } from '@/lib/note-shares';
import { user } from '@/lib/schema';
import { OG_IMAGE, SITE_NAME, absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';

type SharePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const { slug } = await params;
  const share = await getActiveNoteShareBySlug(slug);
  const url = absoluteUrl(`/s/${slug}`);

  if (!share) {
    const title = 'Link expired';
    const description = 'This SyntaxAI share link is no longer available.';

    return {
      title: { absolute: `${title} · ${SITE_NAME}` },
      description,
      robots: { index: false, follow: false },
      openGraph: {
        title,
        description,
        url,
        siteName: SITE_NAME,
        type: 'article',
        images: [OG_IMAGE],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [OG_IMAGE.url],
      },
    };
  }

  const title = share.snapshot.title;
  const description =
    share.snapshot.summary?.trim().slice(0, 160) ||
    'A developer note shared from SyntaxAI.';
  const socialTitle = `${title} · ${SITE_NAME}`;
  const image = {
    url: `/s/${slug}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: title,
    type: 'image/png',
  };

  return {
    title: { absolute: socialTitle },
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: 'article',
      locale: 'en_US',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image.url],
    },
  };
}

export default async function SharedNotePage({ params }: SharePageProps) {
  const { slug } = await params;
  const share = await getActiveNoteShareBySlug(slug);

  if (!share) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 py-20 text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-syntax-muted">
          SyntaxAI
        </p>
        <h1 className="mt-4 font-mono text-2xl font-bold uppercase tracking-[0.06em] text-syntax-text">
          Link expired
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-syntax-muted">
          This share link is no longer available. It may have expired after 7 days or been
          revoked by the owner.
        </p>
        <Link className="btn-primary syntax-btn-primary mt-8 inline-flex h-11 items-center rounded-full px-8 font-mono text-[11px] font-bold uppercase tracking-[0.1em]" href="/">
          Get SyntaxAI
        </Link>
      </div>
    );
  }

  const [owner] = await db
    .select({ name: user.name })
    .from(user)
    .where(eq(user.id, share.userId))
    .limit(1);

  return (
    <SharedNoteCard
      expiresAt={share.expiresAt}
      sharerName={owner?.name ?? null}
      snapshot={share.snapshot}
    />
  );
}