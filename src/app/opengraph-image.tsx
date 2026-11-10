import { ImageResponse } from 'next/og';

export const alt = 'SyntaxAI — AI developer notebook for Chrome';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Brand mark (same bars as /logo-mark.png), drawn as vector so it stays crisp. */
function LogoMark({ size: s }: { size: number }) {
  return (
    <svg width={s} height={s * 0.75} viewBox="80 170 660 510" fill="#ffffff">
      <polygon points="170,408 302,408 238,612 160,612 90,662" />
      <polygon points="378,298 514,298 412,612 278,612" />
      <polygon points="596,182 726,182 590,612 456,612" />
    </svg>
  );
}

const notes = [
  { lang: 'TypeScript', title: 'Debounce hook with cleanup', tone: '#60a5fa' },
  { lang: 'React', title: 'useOptimistic form pattern', tone: '#22d3ee' },
  { lang: 'SQL', title: 'Window functions cheat sheet', tone: '#c4b5fd' },
];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#000000',
          color: '#ffffff',
          overflow: 'hidden',
        }}
      >
        {/* violet glow behind the library card */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -160,
            width: 820,
            height: 820,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(99,102,241,0.18) 35%, rgba(0,0,0,0) 60%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -300,
            left: -200,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.28) 0%, rgba(0,0,0,0) 60%)',
            display: 'flex',
          }}
        />

        {/* hairline frame */}
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
            width: '100%',
            height: '100%',
            padding: '72px 80px',
          }}
        >
          {/* left: copy */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: 620,
            }}
          >
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
                <LogoMark size={36} />
              </div>
              <div
                style={{
                  display: 'flex',
                  marginLeft: 18,
                  fontSize: 30,
                  fontWeight: 700,
                  letterSpacing: 5,
                  textTransform: 'uppercase',
                }}
              >
                SyntaxAI
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  fontSize: 74,
                  fontWeight: 800,
                  lineHeight: 1.02,
                  letterSpacing: -2,
                }}
              >
                Turn every tab into a code library
              </div>
              <div
                style={{
                  display: 'flex',
                  marginTop: 26,
                  fontSize: 28,
                  lineHeight: 1.35,
                  color: '#9a9aa5',
                }}
              >
                AI titles, tags and a searchable library.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  padding: '10px 22px',
                  borderRadius: 999,
                  background: '#ffffff',
                  color: '#050505',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                Free for Chrome
              </div>
              <div
                style={{
                  display: 'flex',
                  marginLeft: 20,
                  fontSize: 24,
                  letterSpacing: 1,
                  color: '#c4b5fd',
                }}
              >
                syntaxai.app
              </div>
            </div>
          </div>

          {/* right: library card */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 420,
                padding: 22,
                borderRadius: 26,
                background: 'rgba(14,14,20,0.92)',
                border: '1.5px solid rgba(255,255,255,0.16)',
                boxShadow: '0 30px 80px rgba(139,92,246,0.35)',
              }}
            >
              {/* window dots + search */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
                <div style={{ display: 'flex', width: 12, height: 12, borderRadius: 99, background: '#3f3f46', marginRight: 8 }} />
                <div style={{ display: 'flex', width: 12, height: 12, borderRadius: 99, background: '#3f3f46', marginRight: 8 }} />
                <div style={{ display: 'flex', width: 12, height: 12, borderRadius: 99, background: '#3f3f46' }} />
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                    marginLeft: 18,
                    padding: '8px 16px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.06)',
                    fontSize: 18,
                    color: '#8a8a95',
                  }}
                >
                  Search your library…
                </div>
              </div>

              {notes.map((n) => (
                <div
                  key={n.title}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 10,
                    padding: '16px 18px',
                    borderRadius: 16,
                    background: 'rgba(255,255,255,0.045)',
                    border: '1.5px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        display: 'flex',
                        padding: '3px 12px',
                        borderRadius: 999,
                        fontSize: 15,
                        fontWeight: 700,
                        color: n.tone,
                        border: `1.5px solid ${n.tone}`,
                      }}
                    >
                      {n.lang}
                    </div>
                    <div style={{ display: 'flex', marginLeft: 10, fontSize: 15, color: '#6b6b76' }}>
                      auto-tagged
                    </div>
                  </div>
                  <div style={{ display: 'flex', marginTop: 10, fontSize: 22, fontWeight: 600 }}>{n.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
