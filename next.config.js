/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/PlayRadar",
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig