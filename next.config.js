/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/PlayRadar",
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/PlayRadar/',
}

module.exports = nextConfig 