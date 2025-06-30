/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "cdn.sanity.io" }],
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
