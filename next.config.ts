import type { NextConfig } from 'next';

/**
 * When set on Vercel, browser calls to /api/v1/* are proxied to Railway.
 * Extension should still call API_PUBLIC_URL directly (avoids Vercel CDN quota).
 */
const railwayApiOrigin = process.env.RAILWAY_API_ORIGIN?.replace(/\/$/, '');

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
        protocol: 'https',
      },
      {
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
        protocol: 'https',
      },
    ],
  },
  async rewrites() {
    if (!railwayApiOrigin) {
      return [];
    }

    return [
      {
        source: '/api/v1/:path*',
        destination: `${railwayApiOrigin}/api/v1/:path*`,
      },
      {
        source: '/api/me',
        destination: `${railwayApiOrigin}/api/me`,
      },
    ];
  },
};

export default nextConfig;
