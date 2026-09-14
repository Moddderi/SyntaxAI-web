import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#00eaff',
          borderRadius: 8,
          color: '#0d0d0f',
          display: 'flex',
          fontSize: 18,
          fontWeight: 700,
          height: '100%',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}
