import { ImageResponse } from 'next/og';

export const alt = 'SyntaxAI — AI developer notebook for Chrome';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0d0d0f',
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
            color: '#00eaff',
            display: 'flex',
            fontSize: 28,
            fontWeight: 600,
            gap: 16,
          }}
        >
          <div
            style={{
              alignItems: 'center',
              background: '#00eaff',
              borderRadius: 16,
              color: '#0d0d0f',
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
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: -1.5,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Turn every tab into a code library
          </div>
          <div
            style={{
              color: '#9ca3af',
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
