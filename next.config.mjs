/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {
      enabled: true
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.urbanrealities.com',
      },
    ],
  }

}

export default nextConfig
