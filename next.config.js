/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/PlayRadar",
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/PlayRadar/',
}

module.exports = nextConfig