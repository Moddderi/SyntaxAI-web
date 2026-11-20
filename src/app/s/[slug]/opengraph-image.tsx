import { ImageResponse } from 'next/og';
import { BrandMark } from '@/lib/brand-mark';
import { getActiveNoteShareBySlug } from '@/lib/note-shares';
import { resolveShareTech } from '@/lib/resolveShareTech';

export const alt = 'Shared note from SyntaxAI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function wrapTitle(title: string, maxChars = 36): string[] {
  const words = title.trim().split(/\s+/);
  const lines: string[] = [''];

  for (const word of words) {
    const current = lines[lines.length - 1];
    const next = current ? `${current} ${word}` : word;

    if (next.length <= maxChars) {
      lines[lines.length - 1] = next;
      continue;
    }

    if (lines.length >= 3) {
      lines[2] = `${current.slice(0, Math.max(1, maxChars - 1))}…`;
      break;
    }

    lines.push(word.slice(0, maxChars));
  }

  return lines.filter(Boolean);
}

export default async function ShareOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const share = await getActiveNoteShareBySlug(slug);

  if (!share) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#000',
            color: '#fff',
            padding: '72px 80px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BrandMark size={36} />
            <div
              style={{
                marginLeft: 18,
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 5,
                textTransform: 'uppercase',
              }}
            >
              SyntaxAI
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2 }}>Link expired</div>
            <div style={{ marginTop: 18, fontSize: 28, color: '#9a9aa5' }}>
              This share is no longer available.
            </div>
          </div>
          <div style={{ fontSize: 24, color: '#c4b5fd' }}>syntaxai.app</div>
        </div>
      ),
      { ...size },
    );
  }

  const titleLines = wrapTitle(share.snapshot.title);
  const tech =
    resolveShareTech(share.snapshot.primaryTech) ??
    resolveShareTech(share.snapshot.language);
  const techLabel = tech?.name ?? share.snapshot.primaryTech ?? share.snapshot.language;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#000',
          color: '#fff',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -140,
            right: -120,
            width: 640,
            height: 640,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(139,92,246,0.48) 0%, rgba(0,0,0,0) 62%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            borderRadius: 28,
            border: '1.5px solid rgba(255,255,255,0.1)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: '72px 80px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  background: '#0b0b0f',
                  border: '1.5px solid rgba(255,255,255,0.18)',
                }}
              >
                <BrandMark size={36} />
              </div>
              <div
                style={{
                  marginLeft: 18,
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: 5,
                  textTransform: 'uppercase',
                }}
              >
                SyntaxAI
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                padding: '10px 20px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.08)',
                fontSize: 22,
                color: '#c4b5fd',
              }}
            >
              Shared note · 7 days
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {titleLines.map((line) => (
              <div
                key={line}
                style={{
                  display: 'flex',
                  fontSize: titleLines.length > 2 ? 52 : 64,
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: -2,
                }}
              >
                {line}
              </div>
            ))}
            {tech ? (
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 28 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: '#000',
                    border: `2px solid ${tech.color}`,
                  }}
                >
                  <svg width={30} height={30} viewBox="0 0 24 24" fill={tech.color}>
                    <path d={tech.path} />
                  </svg>
                </div>
                <div
                  style={{
                    marginLeft: 16,
                    fontSize: 28,
                    fontWeight: 700,
                    color: tech.color,
                  }}
                >
                  {techLabel}
                </div>
              </div>
            ) : null}
          </div>

          <div style={{ display: 'flex', fontSize: 24, color: '#9a9aa5' }}>syntaxai.app/s</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
