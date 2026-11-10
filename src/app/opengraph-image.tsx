import { ImageResponse } from 'next/og';
import { TECHS } from '@/lib/techIcons';

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
  { tech: { ...TECHS.typescript, color: '#4c9aff' }, title: 'Debounce hook' },
  { tech: TECHS.react, title: 'Optimistic form' },
  { tech: { ...TECHS.postgres, color: '#6f9bff' }, title: 'Window functions' },
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
              width: 590,
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
                width: 440,
                padding: 24,
                borderRadius: 28,
                background: '#0d0d12',
                border: '2px solid rgba(255,255,255,0.22)',
                boxShadow: '0 30px 90px rgba(139,92,246,0.4)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 18px',
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.09)',
                  fontSize: 22,
                  color: '#b4b4bf',
                }}
              >
                Search your library…
              </div>

              {notes.map((n) => (
                <div
                  key={n.title}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 14,
                    padding: '16px 18px',
                    borderRadius: 18,
                    background: 'rgba(255,255,255,0.07)',
                    border: '2px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      background: '#000000',
                      border: `2px solid ${n.tech.color}`,
                    }}
                  >
                    <svg width={38} height={38} viewBox="0 0 24 24" fill={n.tech.color}>
                      <path d={n.tech.path} />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 18, flex: 1 }}>
                    <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, lineHeight: 1.15 }}>
                      {n.title}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        marginTop: 6,
                        fontSize: 20,
                        fontWeight: 600,
                        color: n.tech.color,
                      }}
                    >
                      {n.tech.name}
                    </div>
                  </div>
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
