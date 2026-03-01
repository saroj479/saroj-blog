/** @type {import('next').NextConfig} */
const nextConfig = {
  // msedge-tts uses the 'ws' WebSocket library which must run as native Node.
  // Webpack bundling breaks its native C++ addons (bufferUtil, etc.).
  // In Next.js 14 this must be under 'experimental'.
  experimental: {
    serverComponentsExternalPackages: ['msedge-tts', 'ws'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Security headers — protect against XSS, clickjacking, MIME-sniffing, etc.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
