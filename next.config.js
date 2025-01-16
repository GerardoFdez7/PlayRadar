/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/PlayRadar",
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/PlayRadar/',
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig