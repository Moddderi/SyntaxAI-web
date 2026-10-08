import { ImageResponse } from 'next/og';

export const alt = 'SyntaxAI — AI developer notebook for Chrome';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          padding: 72,
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            color: '#f5f5f5',
            display: 'flex',
            fontSize: 28,
            fontWeight: 700,
            gap: 16,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              background: '#f5f5f5',
              borderRadius: 16,
              color: '#050505',
              display: 'flex',
              fontSize: 32,
              fontWeight: 700,
              height: 56,
              justifyContent: 'center',
              width: 56,
            }}
          >
            S
          </div>
          SyntaxAI
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#ffffff',
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: 2,
              lineHeight: 1.1,
              maxWidth: 900,
              textTransform: 'uppercase',
            }}
          >
            Turn every tab into a code library
          </div>
          <div
            style={{
              color: '#8a8a8a',
              fontSize: 28,
              marginTop: 24,
              maxWidth: 820,
            }}
          >
            Capture snippets, page context, and screenshots from any Chrome tab.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
