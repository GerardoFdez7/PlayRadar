/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/PlayRadar',
  assetPrefix: '/PlayRadar/',
}

module.exports = nextConfig 