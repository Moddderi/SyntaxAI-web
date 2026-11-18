import type { Metadata } from 'next';
import Link from 'next/link';
import { eq } from 'drizzle-orm';
import { SharedNoteCard } from '@/components/share/SharedNoteCard';
import { db } from '@/lib/db';
import { getActiveNoteShareBySlug } from '@/lib/note-shares';
import { user } from '@/lib/schema';

export const dynamic = 'force-dynamic';

type SharePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const { slug } = await params;
  const share = await getActiveNoteShareBySlug(slug);

  if (!share) {
    return {
      title: 'Link expired',
      robots: { index: false, follow: false },
    };
  }

  const title = share.snapshot.title;
  const description =
    share.snapshot.summary?.trim().slice(0, 160) ||
    'A developer note shared from SyntaxAI.';

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      type: 'article',
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