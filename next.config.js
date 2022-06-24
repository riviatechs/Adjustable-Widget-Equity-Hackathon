/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  devIndicators: {
    buildActivity: false,
  },
  images: {
    domains: ["storage.googleapis.com"],
  },
  distDir: "./.next",
}

module.exports = nextConfig
