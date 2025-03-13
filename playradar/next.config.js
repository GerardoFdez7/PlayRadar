/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'playradar-a90bf.firebasestorage.app',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'production' ? false : true,
  },
};

module.exports = nextConfig;